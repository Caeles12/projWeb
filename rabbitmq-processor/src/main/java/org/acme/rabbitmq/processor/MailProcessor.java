package org.acme.rabbitmq.processor;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import org.acme.rabbitmq.model.AssociationData;
import org.acme.rabbitmq.model.MinuteData;
import org.acme.rabbitmq.model.VoterData;
import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.eclipse.microprofile.reactive.messaging.Message;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.reactive.ReactiveMailer;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
/**
 * A bean consuming data from the "quote-requests" RabbitMQ queue and giving out a random quote.
 * The result is pushed to the "quotes" RabbitMQ exchange.
 */
@ApplicationScoped
public class MailProcessor {

    
    @Inject
    ReactiveMailer reactiveMailer; 

    @Incoming("requests")
    public Uni<Void> consume(Message<byte[]> message) throws InterruptedException {
        String msg = new String(message.getPayload());
        JsonObject obj = new JsonObject(msg);
        MinuteData minuteData = new MinuteData();
        minuteData.date = obj.getString("date");
        minuteData.content = obj.getString("content");

        AssociationData association = new AssociationData(
            obj.getJsonObject("association").getString("name"),
            obj.getJsonObject("association").getInteger("id"));
        minuteData.association = association;

        JsonArray voters = obj.getJsonArray("voters");
        VoterData[] votersData = new VoterData[voters.size()];
        for(int i=0; i<voters.size(); i++){
            VoterData voter = new VoterData(
                voters.getJsonObject(i).getString("name"),
                voters.getJsonObject(i).getString("firstname"),
                voters.getJsonObject(i).getInteger("age"),
                voters.getJsonObject(i).getInteger("id")
            );
            votersData[i] = voter;
        }
        minuteData.voters = votersData;        

        String to = "admin@test.test";
        String subject = minuteData.association.name+": PV du "+minuteData.date;
        String html = "<div>";
        html += "<h1><a href='/associations/"+minuteData.association.id+"'>"+minuteData.association.name+"</a>: Procès Verbal du "+minuteData.date+"</h1>";
        html += "<pre>"+minuteData.content+"</pre>";
        html += "<h2>Voté par:</h2><ul>";
        for(VoterData v: minuteData.voters){
            html += "<li><a href='/users/"+v.id+"'>"+v.firstname+" "+v.name+"</a></li>";
        }
        html += "</ul>";

        message.ack();
        return reactiveMailer.send(Mail.withHtml(to, subject, html));
    }
}
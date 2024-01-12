package org.acme.rabbitmq.processor;

import jakarta.enterprise.context.ApplicationScoped;

import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.eclipse.microprofile.reactive.messaging.Message;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;

import java.util.concurrent.CompletionStage;


/**
 * A bean consuming data from the "quote-requests" RabbitMQ queue and giving out a random quote.
 * The result is pushed to the "quotes" RabbitMQ exchange.
 */
@ApplicationScoped
public class QuoteProcessor {

    @Incoming("requests")                   
    public CompletionStage<Void> consume(Message<byte[]> message) throws InterruptedException {
        String msg = new String(message.getPayload());
        System.out.println(msg);
        return message.ack();
    }
}
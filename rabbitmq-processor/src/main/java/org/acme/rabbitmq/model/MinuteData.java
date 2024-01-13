package org.acme.rabbitmq.model;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class MinuteData {

    public String date;
    public String content;
    public String html;
    public AssociationData association;
    public VoterData[] voters;

    /**
    * Default constructor required for Jackson serializer
    */
    public MinuteData() { }

    public MinuteData(String date, String content, AssociationData association, VoterData[] voters) {
        this.date = date;
        this.content = content;
        this.association = association;
        this.voters = voters;
    }
}
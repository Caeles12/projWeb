package org.acme.rabbitmq.model;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class Quote {

    public String email;
    public String subject;
    public String html;

    /**
    * Default constructor required for Jackson serializer
    */
    public Quote() { }

    public Quote(String email, String subject, String html) {
        this.email = email;
        this.subject = subject;
        this.html = html;
    }

    @Override
    public String toString() {
        return "Quote{" +
                "email='" + email + '\'' +
                ", subject=" + subject + '\'' +
                ", html=" + html +
                '}';
    }
}
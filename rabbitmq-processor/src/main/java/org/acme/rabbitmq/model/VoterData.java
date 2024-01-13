package org.acme.rabbitmq.model;

public class VoterData {
    public String name;
    public String firstname;
    public int age;
    public int id;

    public VoterData() { }

    public VoterData(String name, String firstname, int age, int id) {
        this.name = name;
        this.firstname = firstname;
        this.age = age;
        this.id = id;
    }
}

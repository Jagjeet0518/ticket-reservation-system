package com.train.ticket_reservation.dto;

import com.train.ticket_reservation.model.Train;

public class TrainDTO {
    private Long id;
    private String name;
    private String from;
    private String to;
    private String time;
    private Integer seats;
    private Double fare;

    public TrainDTO(Train train) {
        this.id = train.getId();
        this.name = train.getName();
        this.from = train.getFrom();
        this.to = train.getTo();
        this.time = train.getTime();
        this.seats = train.getSeats();
        this.fare = train.getFare();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getFrom() {
        return from;
    }

    public String getTo() {
        return to;
    }

    public String getTime() {
        return time;
    }

    public Integer getSeats() {
        return seats;
    }

    public Double getFare() {
        return fare;
    }
}

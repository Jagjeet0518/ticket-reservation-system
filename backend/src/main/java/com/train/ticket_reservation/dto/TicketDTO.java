package com.train.ticket_reservation.dto;

import com.train.ticket_reservation.model.Ticket;
import com.train.ticket_reservation.model.Train;
import java.time.LocalDateTime;
import java.util.Date;

public class TicketDTO {
    private Long id;
    private String passengerName;
    private String passengerEmail;
    private String passengerPhone;
    private Integer seatNumber;
    private LocalDateTime bookingTime;
    private Date bookingDate;
    private Double amount;
    private Boolean status;
    private TrainDTO train;

    public TicketDTO(Ticket ticket) {
        this.id = ticket.getId();
        this.passengerName = ticket.getPassengerName();
        this.passengerEmail = ticket.getPassengerEmail();
        this.passengerPhone = ticket.getPassengerPhone();
        this.seatNumber = ticket.getSeatNumber();
        this.bookingTime = ticket.getBookingTime();
        this.bookingDate = ticket.getBookingDate();
        this.amount = ticket.getAmount();
        this.status = ticket.getStatus();
        this.train = ticket.getTrain() != null ? new TrainDTO(ticket.getTrain()) : null;
    }

    public Long getId() {
        return id;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public String getPassengerEmail() {
        return passengerEmail;
    }

    public String getPassengerPhone() {
        return passengerPhone;
    }

    public Integer getSeatNumber() {
        return seatNumber;
    }

    public LocalDateTime getBookingTime() {
        return bookingTime;
    }

    public Date getBookingDate() {
        return bookingDate;
    }

    public Double getAmount() {
        return amount;
    }

    public Boolean getStatus() {
        return status;
    }

    public TrainDTO getTrain() {
        return train;
    }
}

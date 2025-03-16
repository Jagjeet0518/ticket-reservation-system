package com.train.ticket_reservation.service;

import com.train.ticket_reservation.dto.TicketBookingRequest;
import com.train.ticket_reservation.model.Ticket;
import com.train.ticket_reservation.model.Train;
import com.train.ticket_reservation.model.User;
import com.train.ticket_reservation.repository.TicketRepository;
import com.train.ticket_reservation.repository.TrainRepository;
import com.train.ticket_reservation.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final TrainRepository trainRepository;
    private final UserRepository userRepository;

    public TicketService(TicketRepository ticketRepository,
            TrainRepository trainRepository,
            UserRepository userRepository) {
        this.ticketRepository = ticketRepository;
        this.trainRepository = trainRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Ticket bookTicket(TicketBookingRequest request) {
        Train train = trainRepository.findById(request.getTrainId())
                .orElseThrow(() -> new NoSuchElementException("Train not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        Integer bookedSeats = ticketRepository.countBookedSeatsByTrain(train.getId());
        if (bookedSeats >= train.getSeats()) {
            throw new RuntimeException("No seats available on this train");
        }

        Ticket ticket = new Ticket();
        ticket.setTrain(train);
        ticket.setUser(user);
        ticket.setPassengerName(request.getPassengerName());
        ticket.setPassengerEmail(request.getPassengerEmail());
        ticket.setPassengerPhone(request.getPassengerPhone());
        ticket.setBookingTime(LocalDateTime.now());
        ticket.setAmount(train.getFare());
        ticket.setStatus(true);

        ticket.setSeatNumber(bookedSeats + 1);

        return ticketRepository.save(ticket);
    }

    public List<Ticket> getUserTickets(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        return ticketRepository.findByUserAndStatusTrue(user);
    }

    @Transactional
    public Ticket cancelTicket(Long ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new NoSuchElementException("Ticket not found"));

        ticket.setStatus(false);
        return ticketRepository.save(ticket);
    }
}
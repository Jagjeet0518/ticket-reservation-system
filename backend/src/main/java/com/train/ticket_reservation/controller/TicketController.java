package com.train.ticket_reservation.controller;

import com.train.ticket_reservation.dto.TicketBookingRequest;
import com.train.ticket_reservation.model.Ticket;
import com.train.ticket_reservation.service.TicketService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookTicket(@RequestBody TicketBookingRequest request) {
        try {
            Ticket ticket = ticketService.bookTicket(request);
            return new ResponseEntity<>(ticket, HttpStatus.CREATED);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserTickets(@PathVariable Long userId) {
        try {
            List<Ticket> tickets = ticketService.getUserTickets(userId);
            return new ResponseEntity<>(tickets, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{ticketId}/cancel")
    public ResponseEntity<?> cancelTicket(@PathVariable Long ticketId) {
        try {
            Ticket ticket = ticketService.cancelTicket(ticketId);
            return new ResponseEntity<>(ticket, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
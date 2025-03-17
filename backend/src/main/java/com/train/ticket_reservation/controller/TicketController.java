package com.train.ticket_reservation.controller;

import com.train.ticket_reservation.dto.TicketBookingRequest;
import com.train.ticket_reservation.dto.TicketDTO;
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

    @GetMapping("/{id}")
    public ResponseEntity<TicketDTO> getTicketById(@PathVariable Long id) {
        TicketDTO ticketDTO = ticketService.getTicketById(id);
        if (ticketDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ticketDTO);
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

    @GetMapping("/user/{username}")
    public ResponseEntity<?> getUserTickets(@PathVariable String username) {
        try {
            List<Ticket> tickets = ticketService.getUserTickets(username);
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
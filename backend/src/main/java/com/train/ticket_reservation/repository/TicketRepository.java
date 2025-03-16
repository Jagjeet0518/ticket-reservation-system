package com.train.ticket_reservation.repository;

import com.train.ticket_reservation.model.Ticket;
import com.train.ticket_reservation.model.Train;
import com.train.ticket_reservation.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByUserAndStatusTrue(User user);

    List<Ticket> findByTrainAndStatusTrue(Train train);

    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.train.id = :trainId AND t.status = true")
    Integer countBookedSeatsByTrain(Long trainId);
}

package com.train.ticket_reservation.repository;

import com.train.ticket_reservation.model.Ticket;
import com.train.ticket_reservation.model.Train;
import com.train.ticket_reservation.model.User;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    @Query("SELECT t FROM Ticket t WHERE t.user.username = :username AND t.status = true")
    List<Ticket> findByUserAndStatusTrue(User user);

    @Query("SELECT t FROM Ticket t WHERE t.train.id = :trainId AND t.status = true")
    List<Ticket> findByTrainAndStatusTrue(Train train);

    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.train.id = :trainId AND t.status = true")
    Integer countBookedSeatsByTrain(Long trainId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Ticket t WHERE t.train.id = :trainId")
    void deleteByTrainId(@Param("trainId") Long trainId);
}

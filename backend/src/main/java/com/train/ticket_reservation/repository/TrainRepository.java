package com.train.ticket_reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.train.ticket_reservation.model.Train;

public interface TrainRepository extends JpaRepository<Train, Long> {

    @Query("select t from Train where t.name = :name")
    public Train findByName(String name);

    @Query("select t from Train where t.from = :from and t.to = :to")
    public Train findByFromAndTo(String from, String to);
}

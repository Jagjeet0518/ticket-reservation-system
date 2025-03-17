package com.train.ticket_reservation.service;

import java.util.Collections;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.train.ticket_reservation.model.Train;
import com.train.ticket_reservation.repository.TicketRepository;
import com.train.ticket_reservation.repository.TrainRepository;

@Service
public class TrainService {
    private final TrainRepository trainRepository;
    private final TicketRepository ticketRepository;

    public TrainService(TrainRepository trainRepository, TicketRepository ticketRepository) {
        this.trainRepository = trainRepository;
        this.ticketRepository = ticketRepository;
    }

    public int getAvailableSeats(Long trainId) {
        Train train = trainRepository.findById(trainId)
                .orElseThrow(() -> new NoSuchElementException("Train not found"));

        int totalSeats = train.getSeats();
        int bookedSeats = ticketRepository.countBookedSeatsByTrain(trainId);

        return Math.max(totalSeats - bookedSeats, 0);
    }

    public Iterable<Train> getAllTrains() {
        return trainRepository.findAll();
    }

    public Train getTrainById(Long id) {
        return trainRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Train not found"));
    }

    public Train saveOrUpdateTrain(Train train) {
        if (train.getId() == null) {
            return trainRepository.save(train);
        }

        Train existingTrain = trainRepository.findById(train.getId())
                .orElseThrow(() -> new NoSuchElementException("Train not found"));

        if (train.getName() != null)
            existingTrain.setName(train.getName());
        if (train.getFrom() != null)
            existingTrain.setFrom(train.getFrom());
        if (train.getTo() != null)
            existingTrain.setTo(train.getTo());
        if (train.getTime() != null)
            existingTrain.setTime(train.getTime());
        if (train.getSeats() != null)
            existingTrain.setSeats(train.getSeats());
        if (train.getFare() != null)
            existingTrain.setFare(train.getFare());

        return trainRepository.save(existingTrain);
    }

    public void deleteTrain(Long id) {
        trainRepository.deleteById(id);
    }

    public Train getTrainByName(String name) {
        return trainRepository.findByName(name);
    }

    public Iterable<Train> getTrainBetween(String from, String to) {
        Iterable<Train> trains = trainRepository.getTrainBetween(from, to);
        return (trains != null) ? trains : Collections.emptyList();
    }

    public Double getTrainFare(Long id) {
        Double fare = trainRepository.getTrainFare(id);
        if (fare == null) {
            throw new NoSuchElementException("Train not found");
        }
        return fare;
    }
}

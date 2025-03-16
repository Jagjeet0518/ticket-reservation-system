package com.train.ticket_reservation.service;

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
        return trainRepository.findById(id).orElse(null);
    }

    public Train saveOrUpdateTrain(Train train) {
        Train savedTrain = trainRepository.save(train);
        return savedTrain;
    }

    public void deleteTrain(Long id) {
        trainRepository.deleteById(id);
    }

    public Train getTrainByName(String name) {
        return trainRepository.findByName(name);
    }

    public Train getTrainByFromAndTo(String from, String to) {
        return trainRepository.findByFromAndTo(from, to);
    }

    public Double getTrainFare(Long id) {
        return trainRepository.getTrainFare(id);
    }
}

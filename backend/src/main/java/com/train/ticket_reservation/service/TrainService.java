package com.train.ticket_reservation.service;

import org.springframework.stereotype.Service;

import com.train.ticket_reservation.model.Train;
import com.train.ticket_reservation.repository.TrainRepository;

@Service
public class TrainService {
    private final TrainRepository trainRepository;

    public TrainService(TrainRepository trainRepository) {
        this.trainRepository = trainRepository;
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

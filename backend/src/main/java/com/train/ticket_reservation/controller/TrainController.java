package com.train.ticket_reservation.controller;

import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.train.ticket_reservation.model.Train;
import com.train.ticket_reservation.service.TrainService;

@RestController
@RequestMapping("/api/trains")
public class TrainController {

    private final TrainService trainService;

    public TrainController(TrainService trainService) {
        this.trainService = trainService;
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<Train>> getAllTrains() {
        return ResponseEntity.ok(trainService.getAllTrains());
    }

    @GetMapping("/{name}")
    public ResponseEntity<Train> getTrainByName(@PathVariable String name) {
        return ResponseEntity.ok(trainService.getTrainByName(name));
    }

    @GetMapping("/between/{from}/{to}")
    public ResponseEntity<Train> getTrainBetween(@PathVariable String from, @PathVariable String to) {
        return ResponseEntity.ok(trainService.getTrainByFromAndTo(from, to));
    }

    @GetMapping("/fare/{id}")
    public ResponseEntity<Double> getTrainFare(@PathVariable Long id) {
        return ResponseEntity.ok(trainService.getTrainFare(id));
    }

    @GetMapping("/{trainId}/available-seats")
    public ResponseEntity<?> checkSeatAvailability(@PathVariable Long trainId) {
        try {
            int availableSeats = trainService.getAvailableSeats(trainId);
            return new ResponseEntity<>(availableSeats, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("Train not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<Train> saveTrain(@RequestBody Train train) {
        return ResponseEntity.ok(trainService.saveOrUpdateTrain(train));
    }
}

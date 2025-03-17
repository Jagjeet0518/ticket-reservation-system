package com.train.ticket_reservation.controller;

import java.util.Map;
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

    @GetMapping("/{id}")
    public ResponseEntity<?> getTrainByName(@PathVariable Long id) {
        try {
            Train train = trainService.getTrainById(id);
            return ResponseEntity.ok(train);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/between/{from}/{to}")
    public ResponseEntity<?> getTrainBetween(@PathVariable String from, @PathVariable String to) {
        Iterable<Train> trains = trainService.getTrainBetween(from, to);
        return ResponseEntity.ok(Map.of("trains", trains));
    }

    @GetMapping("/fare/{id}")
    public ResponseEntity<?> getTrainFare(@PathVariable Long id) {
        try {
            Double fare = trainService.getTrainFare(id);
            return ResponseEntity.ok(Map.of("fare", fare));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{trainId}/available-seats")
    public ResponseEntity<?> checkSeatAvailability(@PathVariable Long trainId) {
        try {
            int availableSeats = trainService.getAvailableSeats(trainId);
            return ResponseEntity.ok(Map.of("seats", availableSeats));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/save")
    public ResponseEntity<Train> saveTrain(@RequestBody Train train) {
        return ResponseEntity.ok(trainService.saveOrUpdateTrain(train));
    }

    @PostMapping("/delete")
    public ResponseEntity<Void> deleteTrain(@RequestBody Long id) {
        trainService.deleteTrain(id);
        return ResponseEntity.ok().build();
    }
}

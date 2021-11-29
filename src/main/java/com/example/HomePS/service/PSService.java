package com.example.HomePS.service;

import com.example.HomePS.model.PlayStation;
import com.example.HomePS.repository.PSRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class PSService {

    private final PSRepository psRepository;


    public Iterable<PlayStation> getAllPS(){
        return psRepository.findAll();
    }

    public PlayStation getPS(long id){
        return psRepository
                .findById(id)
                .orElseThrow(()->new IllegalStateException("PS not found!"));
    }

    public Iterable<PlayStation> getPSByStatus(Integer psStatus) {
        return psRepository
                .findAllByPsStatus(psStatus)
                .orElse(List.of());
    }


    public PlayStation save(PlayStation playStation){
        return psRepository.save(playStation);
    }

    public void delete(long id){
        psRepository.deleteById(id);
    }
}

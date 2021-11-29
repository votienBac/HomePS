package com.example.HomePS.service;

import com.example.HomePS.model.PlayStation;
import com.example.HomePS.repository.PSRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public PlayStation save(PlayStation playStation){
        return psRepository.save(playStation);
    }

    public void delete(long id){
        psRepository.deleteById(id);
    }
}

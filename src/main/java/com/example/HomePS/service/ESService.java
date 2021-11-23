package com.example.HomePS.service;

import com.example.HomePS.model.ExtraService;
import com.example.HomePS.repository.ServiceRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class ESService {
    private final ServiceRepository serviceRepository;

    public Iterable<ExtraService> getAllService(){
        return serviceRepository.findAll();
    }

    public ExtraService getService(long id){
        return serviceRepository
                .findById(id)
                .orElseThrow(()->new IllegalStateException("Service not found!"));


    }
    public ExtraService save(ExtraService extraService){
        return serviceRepository.save(extraService);
    }

    public void delete(long id){
        serviceRepository.deleteById(id);
    }
}

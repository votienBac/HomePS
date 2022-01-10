package com.example.HomePS.service;

import com.example.HomePS.model.PlayStation;
import com.example.HomePS.repository.PSRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public List<PlayStation> getAll() {
        return psRepository.findAll();
    }
    public List<PlayStation> getPSByPage(Integer pageNumber, Integer pageSize, String sortBy){
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<PlayStation> result = psRepository.findAll(pageable);

        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }

    public List<PlayStation> getAllByStatus(Integer psStatus) {
        return psRepository.findAllByPsStatus(psStatus);
    }
    public List<PlayStation> getPSByStatus(Integer psStatus, Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<PlayStation> result = psRepository.findAllByPsStatus(psStatus, pageable);

        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }

    public PlayStation getPS(long id){
        return psRepository
                .findById(id)
                .orElseThrow(()->new IllegalStateException("PS not found!"));
    }

    public List<PlayStation> searchPSByName(String query) {
        return psRepository.search(query);
    }
    public List<PlayStation> searchPSByName(String query, Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<PlayStation> result = psRepository.search(query, pageable);
        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }

    public List<PlayStation> searchPSByNameAndStatus(String query, int status) {
        return psRepository.searchByStatus(query, status);
    }
    public List<PlayStation> searchPSByNameAndStatus(String query, int status, Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<PlayStation> result = psRepository.searchByStatus(query, status, pageable);
        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }


    public PlayStation save(PlayStation playStation){
        return psRepository.save(playStation);
    }

    public void delete(long id){
        psRepository.deleteById(id);
    }



    public PlayStation update(Long id, PlayStation playStation) {
        var oldPS = getPS(id);
        if (playStation.getPsName() != null)
            oldPS.setPsName(playStation.getPsName());
        if (playStation.getPsStatus() != null)
            oldPS.setPsStatus(playStation.getPsStatus());
        return save(oldPS);
    }
}

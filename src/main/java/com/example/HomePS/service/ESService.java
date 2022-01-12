package com.example.HomePS.service;

import com.example.HomePS.model.ExtraService;
import com.example.HomePS.repository.ServiceRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class ESService {
    private final ServiceRepository serviceRepository;

    public List<ExtraService> getAllService() {
        return serviceRepository.findAllService();
    }
    public List<ExtraService> getServicesByPage(Integer pageNumber, Integer pageSize, String sortBy){
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<ExtraService> result = serviceRepository.findAllService(pageable);
        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }

    public List<ExtraService> getESByName(String query) {
        return serviceRepository.search(query);
    }

    public List<ExtraService> getESByName(String query, Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<ExtraService> result = serviceRepository.search(query, pageable);
        if (result.hasContent()) {
            return result.getContent();
        } else {
            return List.of();
        }
    }

    public ExtraService getService(long id){
        return serviceRepository
                .findServiceById(id)
                .orElseThrow(()->new IllegalStateException("Service not found!"));


    }
    public ExtraService save(ExtraService extraService){
        return serviceRepository.save(extraService);
    }

    public void delete(long id){
        var toDelete = getService(id);
        toDelete.setDeleted(true);
        save(toDelete);
    }



    public ExtraService update(Long id, ExtraService service) {
        var oldService = getService(id);
        if (service.getServiceName() != null)
            oldService.setServiceName((service.getServiceName()));
        if (service.getPrice() != 0.0)
            oldService.setPrice((service.getPrice()));
        return save(oldService);
    }
}


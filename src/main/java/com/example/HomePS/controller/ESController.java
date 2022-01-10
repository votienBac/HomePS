package com.example.HomePS.controller;


import com.example.HomePS.dto.ServiceResponse;
import com.example.HomePS.model.ExtraService;
import com.example.HomePS.service.ESService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/extraservice")
@AllArgsConstructor
public class ESController {
    private final ESService esService;

    @PostMapping
    public ExtraService createNewExtraService(@RequestBody ExtraService extraService){
        return esService.save(extraService);
    }

    @GetMapping
    public ServiceResponse getServicesByPage(
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "serviceId") String sortBy
    ){
        int totalPage = (int) Math.ceil(esService.getAllService().size() * 1.0 / size);
        List<ExtraService> serviceList = esService.getServicesByPage(page - 1, size, sortBy);
        return new ServiceResponse(page, totalPage, serviceList);
    }

    @GetMapping("/{id}")
    public ExtraService getES(@PathVariable Long id){
        return esService.getService(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        esService.delete(id);
    }

    @GetMapping("/search")
    public ServiceResponse searchESByName(
            @RequestParam(required = false, defaultValue = "") String query,
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "serviceId") String sortBy
    ) {
        if (query.equals("")) {
            int totalPage = (int) Math.ceil(esService.getAllService().size() * 1.0 / size);
            List<ExtraService> serviceList = esService.getServicesByPage(page - 1, size, sortBy);
            return new ServiceResponse(page, totalPage, serviceList);
        }
        int totalPage = (int) Math.ceil(esService.getESByName(query).size() * 1.0 / size);
        List<ExtraService> serviceList = esService.getESByName(query, page - 1, size, sortBy);
        return new ServiceResponse(page, totalPage, serviceList);
    }

    @PutMapping("/{id}")
    public ExtraService updateEvent(@PathVariable Long id, @RequestBody ExtraService service) {
        return esService.update(id, service);
    }
}

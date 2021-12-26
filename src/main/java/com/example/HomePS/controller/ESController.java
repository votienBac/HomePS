package com.example.HomePS.controller;


import com.example.HomePS.model.ExtraService;
import com.example.HomePS.service.ESService;

import lombok.AllArgsConstructor;
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
    public Iterable<ExtraService> getServicesByPage(
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "serviceId") String sortBy
    ){
        return esService.getServicesByPage(page - 1, size, sortBy);
    }

    @GetMapping("/{id}")
    public ExtraService getES(@PathVariable Long id){
        return esService.getService(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        esService.delete(id);
    }

    @GetMapping("/search/{query}")
    public List<ExtraService> searchESByName(@PathVariable String query) {
        return esService.getESByName(query);
    }
}

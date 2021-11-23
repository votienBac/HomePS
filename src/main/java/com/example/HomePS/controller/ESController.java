package com.example.HomePS.controller;


import com.example.HomePS.model.ExtraService;
import com.example.HomePS.service.ESService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/extraservice/")
@AllArgsConstructor
public class ESController {
    private final ESService esService;

    @PostMapping
    public void createNewExtraService(@RequestBody ExtraService extraService){
        esService.save(extraService);
    }

    @GetMapping
    public Iterable<ExtraService> getAllES(){
        return esService.getAllService();
    }

    @GetMapping("/{id}")
    public ExtraService getES(@PathVariable Long id){
        return esService.getService(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        esService.delete(id);
    }
}

package com.example.HomePS.controller;

import com.example.HomePS.model.PlayStation;
import com.example.HomePS.service.PSService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ps/")
@AllArgsConstructor
public class PSController {
    private final PSService psService;

    @PostMapping
    public void createNewPS(@RequestBody PlayStation playStation){
        psService.save(playStation);
    }

    @GetMapping
    public Iterable<PlayStation> getAllPS(){
        return psService.getAllPS();
    }

    @GetMapping("/{id}")
    public PlayStation getPS(@PathVariable Long id){
        return psService.getPS(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        psService.delete(id);
    }



}

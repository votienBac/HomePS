package com.example.HomePS.controller;

import com.example.HomePS.dto.PsResponse;
import com.example.HomePS.model.PlayStation;
import com.example.HomePS.service.PSService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.example.HomePS.model.PlayStation.*;
import static com.example.HomePS.model.PlayStation.BROKEN;

@RestController
@RequestMapping("/api/ps")
@AllArgsConstructor
public class PSController {
    private final PSService psService;

    @PostMapping
    public PlayStation createNewPS(@RequestBody PlayStation playStation){
        return psService.save(playStation);
    }

    @GetMapping
    public ResponseEntity<PsResponse> getPSByPage(
            @RequestParam(required = false, defaultValue = "full") String status,
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "psId") String sortBy
    ){
        List<PlayStation> psList;
        int totalPage;

        switch (status) {
            case "free":
                psList = psService.getPSByStatus(FREE, page - 1, size, sortBy);
                totalPage = (int) Math.ceil(psService.getAllByStatus(FREE).size() * 1.0 / size);
                break;
            case "busy":
                psList = psService.getPSByStatus(BUSY, page - 1, size, sortBy);
                totalPage = (int) Math.ceil(psService.getAllByStatus(BUSY).size() * 1.0 / size);
                break;
            case "broken":
                psList = psService.getPSByStatus(BROKEN, page - 1, size, sortBy);
                totalPage = (int) Math.ceil(psService.getAllByStatus(BROKEN).size() * 1.0 / size);
                break;
            default:
                psList = psService.getPSByPage(page - 1, size, sortBy);
                totalPage = (int) Math.ceil(psService.getAll().size() * 1.0 / size);
                break;
        }
        return ResponseEntity.ok(new PsResponse(page, totalPage, psList));
    }

    @GetMapping("/{id}")
    public PlayStation getPS(@PathVariable Long id){
        return psService.getPS(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        psService.delete(id);
    }

    @GetMapping("/search/{query}")
    public List<PlayStation> searchPSByName(
            @PathVariable String query,
            @RequestParam(required = false, defaultValue = "full") String status,
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "psId") String sortBy
    ) {
        var searchList = psService.searchPSByName(query, page - 1, size, sortBy);
        switch(status) {
            case "free": return searchList.stream().filter(p -> p.getPsStatus() == 0).collect(Collectors.toList());
            case "busy": return searchList.stream().filter(p -> p.getPsStatus() == 1).collect(Collectors.toList());
            case "broken": return searchList.stream().filter(p -> p.getPsStatus() == 2).collect(Collectors.toList());
            default: return searchList;
        }
    }

    @PutMapping("/{id}")
    public PlayStation update(@PathVariable Long id, PlayStation playStation) {
        return psService.update(id, playStation);
    }
}
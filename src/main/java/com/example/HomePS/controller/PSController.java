package com.example.HomePS.controller;

import com.example.HomePS.dto.PsResponse;
import com.example.HomePS.model.PlayStation;
import com.example.HomePS.service.PSService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.HomePS.model.PlayStation.*;

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
    public PsResponse getPSByPage(
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
        return new PsResponse(page, totalPage, psList);
    }

    @GetMapping("/{id}")
    public PlayStation getPS(@PathVariable Long id){
        return psService.getPS(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        psService.delete(id);
    }

    @GetMapping("/search")
    public PsResponse searchPSByName(
            @RequestParam(required = false, defaultValue = "") String query,
            @RequestParam(required = false, defaultValue = "full") String status,
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "psId") String sortBy
    ) {
        List<PlayStation> psList;
        int totalPage;

        switch(status) {
            case "free":
                if (query.equals("")) {
                    psList = psService.getPSByStatus(FREE, page - 1, size, sortBy);
                    totalPage = (int) Math.ceil(psService.getAllByStatus(FREE).size() * 1.0 / size);
                    return new PsResponse(page, totalPage, psList);
                }
                psList = psService.searchPSByNameAndStatus(query, FREE, page - 1, size, sortBy);
                totalPage = (int) Math.ceil(psService.searchPSByNameAndStatus(query, FREE).size() * 1.0 / size);
                break;
            case "busy":
                if (query.equals("")) {
                    psList = psService.getPSByStatus(BUSY, page - 1, size, sortBy);
                    totalPage = (int) Math.ceil(psService.getAllByStatus(BUSY).size() * 1.0 / size);
                    return new PsResponse(page, totalPage, psList);
                }
                psList = psService.searchPSByNameAndStatus(query, BUSY, page - 1, size, sortBy);
                totalPage = (int) Math.ceil(psService.searchPSByNameAndStatus(query, BUSY).size() * 1.0 / size);
                break;
            case "broken":
                if (query.equals("")) {
                    psList = psService.getPSByStatus(BROKEN, page - 1, size, sortBy);
                    totalPage = (int) Math.ceil(psService.getAllByStatus(BROKEN).size() * 1.0 / size);
                    return new PsResponse(page, totalPage, psList);
                }
                psList = psService.searchPSByNameAndStatus(query, BROKEN, page - 1, size, sortBy);
                totalPage = (int) Math.ceil(psService.searchPSByNameAndStatus(query, BROKEN).size() * 1.0 / size);
                break;
            default:
                if (query.equals("")) {
                    psList = psService.getPSByPage(page - 1, size, sortBy);
                    totalPage = (int) Math.ceil(psService.getAll().size() * 1.0 / size);
                    return new PsResponse(page, totalPage, psList);
                }
                psList = psService.searchPSByName(query, page - 1, size, sortBy);
                totalPage = (int) Math.ceil(psService.searchPSByName(query).size() * 1.0 / size);
                break;
        }
        return new PsResponse(page, totalPage, psList);
    }

    @PutMapping("/{id}")
    public PlayStation update(@PathVariable Long id, PlayStation playStation) {
        return psService.update(id, playStation);
    }
}
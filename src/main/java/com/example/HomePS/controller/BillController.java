package com.example.HomePS.controller;

import com.example.HomePS.dto.BillRequest;
import com.example.HomePS.dto.BillResponse;
import com.example.HomePS.dto.OrderServiceDto;
import com.example.HomePS.model.Bill;
import com.example.HomePS.model.OrderService;
import com.example.HomePS.service.BillService;
import com.example.HomePS.service.ESService;
import com.example.HomePS.service.OrderESService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bills")
@AllArgsConstructor
public class BillController {

    private final BillService billService;
    private final OrderESService orderESService;
    private final ESService esService;

    @PostMapping
    public Bill createNewBill(@RequestBody BillRequest billRequest) {
        return billService.create(billRequest);
    }

    @PutMapping("/endbill/{billId}")
    public void finishBill(@PathVariable Long billId) {
        billService.endBill(billId);
    }

    @PutMapping("/{billId}")
    public Bill addExtraService(@RequestBody OrderForm form, @PathVariable Long billId) {
        List<OrderServiceDto> formDtos = form.getServices();
        Bill bill = billService.getBill(billId);
        if (!bill.isPaid()) {
            List<OrderService> orderServices = new ArrayList<>();
            for (OrderServiceDto dto : formDtos) {
                orderServices.add(orderESService.create(new OrderService(bill, esService.getService(dto.getEsId()), dto.getQuantity())));
            }
            bill.setOrderServices(orderServices);
            return billService.update(bill);
        }
        return bill;
    }

    @GetMapping
    public ResponseEntity<BillResponse> getBillsByPage(
            @RequestParam(required = false, defaultValue = "full") String status,
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "timeStart") String sortBy
    ) {
        List<Bill> currentTurns;
        int currentPlaying = billService.findUnpaidBill().size();
        int totalPage;

        switch (status) {
            case "paid":
                currentTurns = billService.getPaidBillsByPage(page - 1, size, sortBy);
                totalPage = (int) Math.ceil(billService.findPaidBill().size() * 1.0 / size);
                break;
            case "unpaid":
                currentTurns = billService.getUnpaidBillByPage(page - 1, size, sortBy);
                totalPage = (int) Math.ceil(currentPlaying * 1.0 / size);
                break;
            default:
                currentTurns = billService.getBillsByPage(page - 1, size, sortBy);
                totalPage = (int) Math.ceil(billService.findAll().size() * 1.0 / size);
                break;
        }
        return ResponseEntity.ok(new BillResponse(currentPlaying, page, totalPage, currentTurns));
    }

    @GetMapping("/search/{query}")
    public List<Bill> searchByPS(
            @PathVariable String query,
            @RequestParam(required = false, defaultValue = "full") String status,
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "timeStart") String sortBy
    ) {
        var searchList = billService.searchByPS(query, page - 1, size, sortBy);
        switch (status) {
            case "paid":
                return searchList.stream().filter(Bill::isPaid).collect(Collectors.toList());
            case "unpaid":
                return searchList.stream().filter(b -> !b.isPaid()).collect(Collectors.toList());
            default:
                return searchList;
        }
    }

    @DeleteMapping("/{billId}")
    public ResponseEntity<?> deleteBill(@PathVariable Long billId) {
        var bill = billService.getBill(billId);
        if (bill == null) return ResponseEntity.notFound().build();
        orderESService.getAllOrderById(billId).forEach(orderESService::delete);
        billService.deleteBill(bill);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public Bill getBill(@PathVariable Long id) {
        return billService.getBill(id);
    }

    public static class OrderForm {
        private List<OrderServiceDto> services;

        public List<OrderServiceDto> getServices() {
            return services;
        }

        public void setServices(List<OrderServiceDto> services) {
            this.services = services;
        }
    }
}

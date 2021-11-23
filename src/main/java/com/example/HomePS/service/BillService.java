package com.example.HomePS.service;

import com.example.HomePS.dto.BillRequest;
import com.example.HomePS.model.Bill;
import com.example.HomePS.model.PlayStation;
import com.example.HomePS.repository.BillRepository;
import com.example.HomePS.repository.PSRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@AllArgsConstructor
@Transactional
public class BillService {
    private final BillRepository billRepository;
    private final PSRepository psRepository;

    public Iterable<Bill> getAllBill(){
        return billRepository.findAll();

    }
    public Bill getBill(Long id){
        return billRepository.getById(id);
    }

    public Bill create(BillRequest billRequest){
        Bill bill = new Bill();
        bill.setPlayStation(psRepository.getById(billRequest.getPsId()));
        bill.setTimeStart(Instant.now());
        bill.setStatus("in process");

        return billRepository.save(bill);
    }

    public Bill endBill(BillRequest billRequest){
        Bill bill = billRepository.getById(billRequest.getBillId());
        bill.setTimeEnd(Instant.now());
        bill.setStatus("done!");
        //bill.setTotalPrice(bill.getTotalBillPrice());
        return billRepository.save(bill);
    }

    public Bill update(Bill bill){
        return billRepository.save(bill);
    }

}

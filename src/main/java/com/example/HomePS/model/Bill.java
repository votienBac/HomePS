package com.example.HomePS.model;



import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.FetchType.LAZY;
import static javax.persistence.GenerationType.IDENTITY;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="orderServices")
public class Bill {
    private static final int PricePerHour = 30000;
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long billId;
    private Instant timeStart;
    private Instant timeEnd;
    private String status;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "psId", referencedColumnName = "psId")
    private PlayStation playStation;

    @OneToMany(mappedBy = "pk.bill")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<OrderService> orderServices = new ArrayList<>();


    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "eventId", referencedColumnName = "eventId")
    private Event event;
    private Double totalPrice;

//    public void addExtraService(ExtraService extraService){
//        //check if the extraService is in the Hash Map
//        ExtraService fromBill = this.extraServices.get(extraService.getServiceId());
//
//        if(fromBill == null){
//            this.extraServices.put(extraService.getServiceId(), extraService);
//        }
//    }
//    public void  addExtraServiceQuantity(ExtraService extraService){
//        Long extraServiceId = extraService.getServiceId();
//        if(this.quantity.containsKey(extraServiceId)){
//            int quantity = this.quantity.get(extraServiceId);
//            quantity++;
//            this.quantity.put(extraServiceId, quantity);
//        }else{
//            this.quantity.put(extraServiceId, 1);
//        }
//        this.totalPrice += extraService.getPrice();
//    }
//    public void removeExtraService(Long extraServiceId){
//        if(this.extraServices.containsKey(extraServiceId)){
//            this.extraServices.remove(extraServiceId);
//        }
//    }
//
//    public void removeExtraServiceQuantity(ExtraService extraService) {
//        Long extraServiceId = extraService.getServiceId();
//        if (this.quantity.containsKey(extraServiceId)) {
//            int quantity = this.quantity.get(extraServiceId);
//            quantity--;
//            if (quantity < 1) {
//                this.quantity.remove(extraServiceId);
//                this.removeExtraService(extraServiceId);
//            } else {
//                this.quantity.put(extraServiceId, quantity);
//            }
//            this.totalPrice -= extraService.getPrice();
//        }
//    }




//    public Double getTotalHourPlayed(){
//        Duration duration = Duration.between(getTimeStart(), getTimeEnd());
//        Long totalMinutes = duration.toMinutes(); //tong so phut choi
//        Double totalHours = ((totalMinutes%60)>30)?(totalMinutes/60 + 1):(totalMinutes/60 + 0.5);
//        return totalHours;
//    }


//    public Double getTotalBillPrice(){
//        //double sum = checkEvent(event) ? (getTotalHourPlayed()*PricePerHour*event.getPercentDiscount()) : getTotalHourPlayed()*PricePerHour;
//        double sum = getTotalHourPlayed()*PricePerHour;
//
////        if(getOrderServices() != null){
////            List<OrderService> orderServices = getOrderServices();
////            for(OrderService os: orderServices){
////                sum+=os.getTotalPrice();
////            }
////        }
//
//
//        return sum;
//    }

    public boolean checkEvent(Event event){
        if(timeStart.isAfter(event.getTimeStart()) && timeStart.isBefore(event.getTimeEnd())){
            return true;
        }
        return false;
    }


}

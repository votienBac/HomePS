import { useNavigate, useParams } from 'react-router-dom'
import { DialogTitle } from '@material-ui/core'
import { DialogActions } from '@material-ui/core'
import { Dialog } from '@material-ui/core'
import {useState} from 'react'
const Payment = () => {
    const params = useParams()
    const navigate = useNavigate()
    const billId = params.id
    const [paymentDialog, setPaymentDialog] = useState(false)
    const handlePayment = ()=>{
        fetch(`https://homeps.herokuapp.com/api/bills/endbill/${billId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
                
            }
        })
            
    
        navigate('/luotchoi')
        setPaymentDialog(false)
    }
    const closePaymentDialog = ()=>setPaymentDialog(false)
    const turn = {
        orderServices: [ ],
        billId: 6,
        timeStart: "2021-12-12T07:59:34.035431Z",
        timeEnd: null,
        playStation: {
        psId: 6,
        psName: "May 06",
        psStatus: 1,
        psState: "Đang sử dụng",
        hibernateLazyInitializer: { }
        },
        event: null,
        totalHourPlayed: null,
        totalPrice: null,
        paid: false
        }
    return (
        <section class="body">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <ul class="row">ID lượt chơi</ul>
                        <ul class="row">Tên Máy</ul>
                        <ul class="row">Thời điểm bắt đầu</ul>
                        <ul class="row">Thời điểm kết thúc</ul>
                        <ul class="row">Danh sách dịch vụ</ul>
                        <ul class="row">Sự kiện được áp dụng</ul>
                        <ul class="row">Tổng tiền</ul>
                    </div>
                    <div class="col">
                        <ul class="row">{turn.billId}</ul>
                        <ul class="row">{turn.playStation.psName}</ul>
                        <ul class="row">{turn.timeStart}</ul>
                        <ul class="row">{turn.timeEnd}</ul>
                        <table>
                            <tr>
                                <th>Tên</th>
                                <th>Số lượng</th>
                            </tr>
                            {turn.orderServices && turn.orderServices.map(orderService => {
                                return (
                                    <tr key={orderService.service.serviceId}>
                                        <td>{orderService.service.serviceName}</td>
                                        <td>{orderService.quatity}</td>
                                    </tr>
                                )
                            })}

                        </table>
                        <ul class="row">{turn.event || 'Không có'}</ul>
                        <ul class="row">{turn.totalPrice || 'Không có'}</ul>
                    </div>
                </div>
                <div class="row">
                    <button class="col" onClick = {()=>navigate(-1)}>Quay về</button>
                    <button class="col" onClick = {()=>setPaymentDialog(true)}>Thanh toán</button>
                </div>
            </div>
            <Dialog open = {paymentDialog} onClose = {closePaymentDialog}>
                <DialogTitle>Xác nhận thanh toán</DialogTitle>
                <DialogActions>
                    <button onClick = {handlePayment}>Đồng ý</button>
                    <button onClick = {()=>setPaymentDialog(false)}>Quay lại</button>
                </DialogActions>
            </Dialog>
        </section>
    
    )
}
export default Payment
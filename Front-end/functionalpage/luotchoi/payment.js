import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
const Payment = () => {
    const params = useParams()
    const navigate = useNavigate()
    const billId = params.id
    const [turn, setTurn] = useState([])
    useEffect(()=>{
        fetch(`https://homeps.herokuapp.com/api/bills/${billId}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(turn => setTurn(turn))
    }, [])
    console.log(turn);
    console.log(turn.orderServices);
    
    return (
        <section className="body">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <ul className="row">ID lượt chơi</ul>
                        <ul className="row">Tên Máy</ul>
                        <ul className="row">Thời điểm bắt đầu</ul>
                        <ul className="row">Thời điểm kết thúc</ul>
                        <ul className="row">Danh sách dịch vụ</ul>
                        <ul className="row">Sự kiện được áp dụng</ul>
                        <ul className="row">Tổng tiền</ul>
                    </div>
                    <div className="col">
                        <ul className="row">{turn.billId}</ul>
                        <li className="row">{turn.playStation&&turn.playStation.psName}</li>
                        <ul className="row">{turn.timeStart}</ul>
                        <ul className="row">{turn.timeEnd}</ul>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Tên</th>
                                    <th>Số lượng</th>
                                </tr>
                                {turn.orderServices && turn.orderServices.map(orderService => {
                                    return (
                                        <tr key={orderService.service.serviceId}>
                                            <td>{orderService.service.serviceName}</td>
                                            <td>{orderService.quantity}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <ul className="row">{turn.event || 'Không có'}</ul>
                        <ul className="row">{turn.totalPrice || 'Không có'}</ul>
                    </div>
                </div>
                <div className="row">
                    <button className="col" onClick={() => navigate('/luotchoi')}>Quay về trang chính</button>
                </div>
            </div>
        </section>

    )
}
export default Payment
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import formatTime from '../../utility/formattime'
import formatMoney from '../../utility/formatmoney'
const Payment = () => {
    let params = useParams()
    let sumServiceCost = 0;
    const navigate = useNavigate()
    const billId = params.id
    const [turn, setTurn] = useState({ orderServices: [] })
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/bills/${billId}`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(turn => setTurn(turn))
        sumServiceCost = 0;
    }, [])

    return (
        <section className="pageDetail">
            <div className="container">
                <div className="col-detail">
                    <ul className="top-bar-detailsName">
                        <li style={{ marginBottom: '10px' }}>ID lượt chơi</li>
                        <li style={{ marginBottom: '10px' }}>Tên Máy</li>
                        <li style={{ marginBottom: '10px' }}>Thời điểm bắt đầu</li>
                        <li style={{ marginBottom: '10px' }}>Thời điểm kết thúc</li>
                        <li style={{ marginBottom: '10px' }}>Sự kiện được áp dụng</li>
                        <li style={{ marginBottom: '10px' }}>Tổng tiền</li>
                        <li style={{ marginBottom: '10px' }}>Tổng tiền chơi</li>
                        {(turn.orderServices.length != 0) && (<li style={{ marginBottom: '10px' }}>Danh sách dịch vụ</li>)}
                    </ul>
                    <ul className="top-bar-details-inf">
                        <li style={{ marginBottom: '10px' }}>{turn.billId}</li>
                        <li style={{ marginBottom: '10px' }}>{turn.playStation && turn.playStation.psName}</li>
                        <li style={{ marginBottom: '10px' }}>{formatTime(turn.timeStart)}</li>
                        <li style={{ marginBottom: '10px' }}>{formatTime(turn.timeEnd)}</li>
                        <li style={{ marginBottom: '10px' }}>{turn.event && turn.event.eventName + ' (giảm ' + turn.event.percentDiscount + '%)' || 'Không có'} </li>
                        <li style={{ marginBottom: '10px' }}>{formatMoney(turn.totalPrice)  || 'Không có'}</li>
                        {turn.orderServices && turn.orderServices.map(orderService => {
                            sumServiceCost = sumServiceCost + orderService.totalPrice
                        })}
                        <li style={{ marginBottom: '10px' }}>{formatMoney(turn.totalPrice-sumServiceCost)  || 'Không có'}</li>
                    </ul>
                </div>
                {(turn.orderServices.length != 0) && <div className="list-service">
                    <table className='tb' style={{ width: '70%', }}>
                        <tbody className='t'>
                            <tr className='table-list'>
                                <th>Tên</th>
                                <th >Giá dịch vụ</th>
                                <th>Số lượng</th>
                                <th>Tổng tiền</th>
                            </tr>
                            {turn.orderServices && turn.orderServices.map(orderService => {
                                return (
                                    <tr key={orderService.service.serviceId} className='list-turn'>
                                        <td>{orderService.service.serviceName}</td>
                                        <td>{formatMoney(orderService.service.price)}</td>
                                        <td>{orderService.quantity}</td>
                                        <td>{formatMoney(orderService.totalPrice)}</td>
                                    </tr>
                                )
                            })}
                            <tr className='list-turn'>
                                <td colSpan={3}>Tổng tiền dịch vụ</td>
                                <td>{formatMoney(sumServiceCost)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>}
            </div>
            <div className='button-detail'>
                <button onClick={() => navigate('/luotchoi')}>Quay về trang chính</button>
            </div>
        </section>

    )
}
export default Payment
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import formatTime from '../../utility/formattime'
import formatMoney from '../../utility/formatmoney'
const Payment = () => {
    let params = useParams()
    const navigate = useNavigate()
    const billId = params.id
    const [turn, setTurn] = useState({ orderServices: [] })
    useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/bills/${billId}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(turn => setTurn(turn))
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
                        {(turn.orderServices.length != 0) && (<li style={{ marginBottom: '7%' }}>Danh sách dịch vụ</li>)}
                    </ul>
                    <ul className="top-bar-details-inf">
                        <li style={{ marginBottom: '10px' }}>{turn.billId}</li>
                        <li style={{ marginBottom: '10px' }}>{turn.playStation && turn.playStation.psName}</li>
                        <li style={{ marginBottom: '10px' }}>{formatTime(turn.timeStart)}</li>
                        <li style={{ marginBottom: '10px' }}>{formatTime(turn.timeEnd)}</li>
                        <li style={{ marginBottom: '10px' }}>{turn.event && turn.event.eventName + ' (giảm ' + turn.event.percentDiscount + '%)' || 'Không có'} </li>
                        <li style={{ marginBottom: '10px' }}>{formatMoney(turn.totalPrice)  || 'Không có'}</li>
                    </ul>
                </div>
                {(turn.orderServices.length != 0) && <div className="list-service">
                    <table className='tb' style={{ width: '70%', }}>
                        <tbody className='t'>
                            <tr className='table-list'>
                                <th>Tên</th>
                                <th>Số lượng</th>
                                <th >Giá dịch vụ</th>
                            </tr>
                            {turn.orderServices && turn.orderServices.map(orderService => {
                                return (
                                    <tr key={orderService.service.serviceId} className='list-turn'>
                                        <td>{orderService.service.serviceName}</td>
                                        <td>{orderService.quantity}</td>
                                        <td>{formatMoney(orderService.service.price)}</td>
                                    </tr>
                                )
                            })}
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
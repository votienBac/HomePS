import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';
import formatTime from '../../utility/formattime';
import formatMoney from '../../utility/formatmoney';
const DetailsFinishTurn = () => {
    const navigate = useNavigate()
    let params = useParams();
    let sumServiceCost = 0;
    const billId = params.id
    const [turn, setTurn] = useState({ orderServices: [] })
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");

    //Load the bill
    useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/bills/${billId}`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(turn => setTurn(turn))
        sumServiceCost = 0
    }, [])
    //Delete Turn Dialog
    const [deleteTurnDialog, setDeleteTurnDialog] = useState(false)
    const handleDeleteTurn = async () => {
        await fetch(`https://homeps.herokuapp.com/api/bills/${billId}`, {
            method: 'DELETE',
            headers: myHeaders
        })
        navigate(-1)
    }
    const closeDeleteTurnDialog = () => setDeleteTurnDialog(false)



    return (
        <div className='pageBody'>
            <img onClick={() => navigate(-1)}
                src={'https://img.icons8.com/ios/50/000000/circled-left-2.png'}
                className='back-icon' />
            <div className='pageDetail'>
                <section className="turn-details">
                    <div className="container">
                        <div className="col-detail">
                            <ul className="top-bar-detailsName">
                                <li style={{ marginBottom: '10px' }}>ID lượt chơi</li>
                                <li style={{ marginBottom: '10px' }}>Tên máy</li>
                                <li style={{ marginBottom: '10px' }}>Thời điểm bắt đầu</li>
                                <li style={{ marginBottom: '10px' }}>Thời điểm kết thúc</li>
                                <li style={{ marginBottom: '10px' }}>Sự kiện được áp dụng</li>
                                <li style={{ marginBottom: '10px' }}>Tổng tiền</li>
                                <li style={{ marginBottom: '10px' }}>Tổng tiền chơi</li>
                                {(turn.orderServices.length != 0) && <li>Danh sách dịch vụ</li>}
                            </ul>
                            <ul className="top-bar-details-inf">
                                <li style={{ marginBottom: '10px' }}>{turn.billId}</li>
                                <li style={{ marginBottom: '10px' }}>{turn.playStation && turn.playStation.psName}</li>
                                <li style={{ marginBottom: '10px' }}>{formatTime(turn.timeStart)}</li>
                                <li style={{ marginBottom: '10px' }}>{formatTime(turn.timeEnd)}</li>
                                <li style={{ marginBottom: '10px' }}>{turn.event && turn.event.eventName + ' (giảm ' + turn.event.percentDiscount + '%)' || 'Không có'} </li>
                                <li style={{ marginBottom: '10px' }}>{formatMoney(turn.totalPrice) || 'Không có'}</li>
                                {turn.orderServices && turn.orderServices.map(orderService => {
                                    sumServiceCost = sumServiceCost + orderService.totalPrice
                                })}
                                <li style={{ marginBottom: '10px' }}>{formatMoney(turn.totalPrice - sumServiceCost) || 'Không có'}</li>
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
                        <div className='button-detail'>

                            <button className="delete-turn"
                                onClick={() => { setDeleteTurnDialog(true) }}>
                                Xóa lượt chơi
                            </button>
                        </div>
                    </div>


                    <Dialog open={deleteTurnDialog} onClose={closeDeleteTurnDialog} >
                        <DialogTitle>Bạn có chắc chắn muốn xóa lượt chơi?</DialogTitle>
                        <DialogContent>Bạn không thể khôi phục lại lượt chơi sau khi đã xóa.</DialogContent>
                        <DialogActions>
                            <button onClick={handleDeleteTurn}>Xoá lượt chơi</button>
                            <button onClick={() => setDeleteTurnDialog(false)}>Quay về</button>
                        </DialogActions>
                    </Dialog>
                </section>

            </div>
        </div>
    )
}
export default DetailsFinishTurn
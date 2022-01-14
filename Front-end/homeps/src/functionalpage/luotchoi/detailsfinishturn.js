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
    const billId = params.id
    const [turn, setTurn] = useState({ orderServices: [] })


    //Load the bill
    useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/bills/${billId}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(turn => setTurn(turn))
    }, [])
    //Delete Turn Dialog
    const [deleteTurnDialog, setDeleteTurnDialog] = useState(false)
    const handleDeleteTurn = async () => {
        await fetch(`https://homeps.herokuapp.com/api/bills/${billId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
        })
        navigate(-1)
    }
    const closeDeleteTurnDialog = () => setDeleteTurnDialog(false)



    return (
        <div className='pageDetail'>
            <section className="turn-details">
                <div className="container">
                    <div className="col-detail">
                        <ul className="top-bar-detailsName">
                            <li>ID lượt chơi</li>
                            <li>Tên máy</li>
                            <li>Thời điểm bắt đầu</li>
                            <li>Thời điểm kết thúc</li>
                            <li>Sự kiện được áp dụng</li>
                            <li>Tổng tiền</li>
                            {(turn.orderServices.length != 0) && <li>Danh sách dịch vụ</li>}
                        </ul>
                        <ul className="top-bar-details-inf">
                            <li className="row">{turn.billId}</li>
                            <li className="row">{turn.playStation && turn.playStation.psName}</li>
                            <li className="row">{formatTime(turn.timeStart)}</li>
                            <li className="row">{formatTime(turn.timeEnd)}</li>
                            <li className='row'>{turn.event && turn.event.eventName + ' (giảm ' + turn.event.percentDiscount + '%)' || 'Không có'} </li>
                            <li className='row'>{formatMoney(turn.totalPrice)  || 'Không có'}</li>
                        </ul>
                    </div>
                    {(turn.orderServices.length != 0) && <div className="list-service">
                        <table className='tb' style={{ width: '70%', }}>
                            <tbody className='t'>
                                <tr className='table-list'>
                                    <th>Tên</th>
                                    <th>Số lượng</th>
                                </tr>
                                {turn.orderServices && turn.orderServices.map(orderService => {
                                    return (
                                        <tr key={orderService.service.serviceId} className='list-turn'>
                                            <td>{orderService.service.serviceName}</td>
                                            <td>{orderService.quantity}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>}
                    <div className='button-detail'>
                        <button className='back'
                            onClick={() => navigate(-1)}>
                            Quay lại</button>
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
    )
}
export default DetailsFinishTurn
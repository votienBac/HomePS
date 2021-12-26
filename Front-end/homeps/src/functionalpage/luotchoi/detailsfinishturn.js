import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';

const DetailsFinishTurn = () => {
    const navigate = useNavigate()
    let params = useParams();
    const billId = params.id
    const [turn, setTurn] = useState([])


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
        <div>
            <section className="turn-details">
                <div className="container">
                    <div className="col">
                        <button
                            className='back'
                            onClick={() => navigate(-1)}>
                            Quay lại</button>
                    </div>
                    <div className="col">
                        <ul className="top-bar-detailsName">
                            <li className="row">ID lượt chơi</li>
                            <li className="row">Tên máy</li>
                            <li className="row">Thời điểm bắt đầu</li>
                            <li className="row">Thời điểm kết thúc</li>
                            <li className="row">Danh sách dịch vụ</li>
                        </ul>

                    </div>
                    <div className="col">
                        <ul className="top-bar-details-inf">
                            <li className="row">{turn.billId}</li>
                            <li className="row">{turn.playStation && turn.playStation.psName}</li>
                            <li className="row">{turn.timeStart}</li>
                          <li className="row">{turn.timeEnd}</li>
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
                            <button
                                className="delete-turn"
                                onClick={() => { setDeleteTurnDialog(true) }}>
                                Xóa lượt chơi
                            </button>
                        </ul>
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
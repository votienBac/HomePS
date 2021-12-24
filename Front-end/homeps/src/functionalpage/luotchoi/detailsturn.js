import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';

const DetailsTurn = (props) => {
    const [addServiceDialog, setAddServiceDialog] = useState(false)
    const handleAddService = () => {
        setAddServiceDialog(false)
        //TODO
    }
    const closeAddServiceDialog = () => setAddServiceDialog(false)

    const [removeServiceDialog, setRemoveServiceDialog] = useState(false)
    const handleRemoveService = () => {
        setRemoveServiceDialog(false)
        //TODO
    }
    const closeRemoveServiceDialog = () => setRemoveServiceDialog(false)

    const [deleteTurnDialog, setDeleteTurnDialog ] = useState(false)
    const handleDeleteTurn = () =>{
        navigate(-1)
        //TODO
    }
    const closeDeleteTurnDialog = () => setDeleteTurnDialog(false)


    const navigate = useNavigate()



    let params = useParams();
    const billId = params.id
    const [turn, setTurn] = useState([])
    useEffect(()=>{
        fetch(`https://homeps.herokuapp.com/api/bills/${billId}`, {
            method: 'GET'
        })
        .then(res=>res.json())
        .then(turn=>setTurn(turn))
    }, [])
    console.log('abc', turn);
    const [extraServices, setExtraServices] = useState([])
    useEffect(()=>{
        fetch(`https://homeps.herokuapp.com/api/extraservice?page=${1}&size=${10}`, {
            method: 'GET'
        })
        .then(res=>res.json())
        .then(extraServices=>setExtraServices(extraServices))
    },[])

    return (
        <div>
            <section class="turn-details">
                <div class="container">
                    <div class="col">
                        <button
                            class='back'
                            onClick={() => navigate(-1)}>
                            Quay lại</button>
                    </div>
                    <div class="col">
                        <ul class="top-bar-detailsName">
                            <li class="row">ID lượt chơi</li>
                            <li class="row">Tên máy</li>
                            <li class="row">Thời điểm bắt đầu</li>
                            {props.type||<li class="row">Thời điểm kết thúc</li>}
                            <li class="row">Danh sách dịch vụ</li>
                        </ul>
                        <div class="top-bar-button-3">
                            {props.type&&<button class="row" onClick={()=>setAddServiceDialog(true)}>Thêm dịch vụ</button>}
                            {props.type&&<button class="row" onClick={()=>setRemoveServiceDialog(true)}>Xóa dịch vụ</button>}
                            {props.type&&<Link to = {`/luotchoi/payment/${turn.billId}`}><button class="row">Thanh toán</button></Link>}
                        </div>
                    </div>
                    <div class="col">
                        <ul class="top-bar-details-inf">
                            <li class="row">{turn.billId}</li>
                            <li class="row">{turn.psName}</li>
                            <li class="row">{turn.timeStart}</li>
                            {props.type||<li class="row">{turn.timeEnd}</li>}
                            <table>
                                <tr>
                                    <th>Tên</th>
                                    <th>Số lượng</th>
                                </tr>
                                {turn.orderServices &&turn.orderServices.map(orderService => {
                                    return (
                                        <tr key={orderService.service.serviceId}>
                                            <td>{orderService.service.serviceName}</td>
                                            <td>{orderService.quatity}</td>
                                        </tr>
                                    )
                                })}

                            </table>
                            <button
                                class="delete-turn"
                                onClick={()=>{setDeleteTurnDialog(true)}}>
                                Xóa lượt chơi
                            </button>
                        </ul>
                    </div>
                </div>
                <Dialog open={addServiceDialog} onClose={closeAddServiceDialog} >
                    <table>
                        <tr>
                            <th>Dịch vụ</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                        </tr>
                        {extraServices.map(extraService => {
                            return (
                                <tr key={extraService.serviceId}>
                                    <td>{extraService.serviceName}</td>
                                    <td>{extraService.price}</td>
                                    <td><input type='number' /></td>
                                </tr>
                            )
                        })}
                    </table>
                    <button onClick={handleAddService}>Thêm</button>
                    <button onClick={closeAddServiceDialog}>Quay lại</button>
                </Dialog>
                <Dialog open={removeServiceDialog} onClose={closeRemoveServiceDialog} >
                    <table>
                        <tr>
                            <th>Dịch vụ</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                        </tr>
                        {extraServices.map(extraService => {
                            return (
                                <tr key={extraService.serviceId}>
                                    <td>{extraService.serviceName}</td>
                                    <td>{extraService.price}</td>
                                    <td><input type='number' /></td>
                                </tr>
                            )
                        })}
                    </table>
                    <button onClick={handleRemoveService}>Xóa</button>
                    <button onClick={closeRemoveServiceDialog}>Quay lại</button>
                </Dialog>
                <Dialog open = {deleteTurnDialog} onClose = {closeDeleteTurnDialog} >
                    <DialogTitle>Bạn có chắc chắn muốn xóa lượt chơi?</DialogTitle>
                    <DialogContent>Bạn không thể khôi phục lại lượt chơi sau khi đã xóa.</DialogContent>
                    <DialogActions>
                        <button onClick = {handleDeleteTurn}>Xoá lượt chơi</button>
                        <button onClick = {()=>setDeleteTurnDialog(false)}>Quay về</button>
                    </DialogActions>
                </Dialog>
            </section>

        </div>
    )
}
export default DetailsTurn
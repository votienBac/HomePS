import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';
const NewTurn = () => {

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
        setDeleteTurnDialog(false)
        //TODO
    }
    const closeDeleteTurnDialog = () => setDeleteTurnDialog(false)

    const navigate = useNavigate()

    let params = useParams();
    const psId = params.psId
    console.log(psId);
    const postNewBillData = {
        psId: psId
      }


    const [newTurn, setNewTurn] = useState([])
    useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/bills`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify(postNewBillData),
        })
            .then(res => res.json())
            .then(newTurn => { setNewTurn(newTurn) })
    }, [])


    const extraServices = [
        {
            serviceId: 1,
            serviceName: "Mì tôm",
            price: 15000
        },
        {
            serviceId: 2,
            serviceName: "Xúc xích",
            price: 20000
        },
        {
            serviceId: 3,
            serviceName: "Bò húc",
            price: 12000
        },
        {
            serviceId: 4,
            serviceName: "Sting",
            price: 18000
        }
    ]

        console.log(newTurn);
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
                            <li class="row">Danh sách dịch vụ</li>
                        </ul>
                        <div class="top-bar-button-3">
                            <button class="row" onClick={() => setAddServiceDialog(true)}>Thêm dịch vụ</button>
                            <button class="row" onClick={() => setRemoveServiceDialog(true)}>Xóa dịch vụ</button>
                            <Link to = {`/luotchoi/payment/${newTurn.billId}`}><button class="row">Thanh toán</button></Link>
                        </div>
                    </div>
                    <div class="col">
                        <ul class="top-bar-details-inf">
                            <li class="row">{newTurn.billId}</li>
                            <li class="row">{newTurn.psName}</li>
                            <li class="row">{newTurn.timeStart}</li>
                            <table>
                                <tr>
                                    <th>Tên</th>
                                    <th>Số lượng</th>
                                </tr>
                                {newTurn.orderServices && newTurn.orderServices.map(orderService => {
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
export default NewTurn
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';
import formatTime from '../../utility/formattime.js'
let addS = 0, removeS = 0

const DetailsTurn = (props) => {
    const navigate = useNavigate()
    let params = useParams();
    const billId = params.id
    const [turn, setTurn] = useState([])
    const [extraServices, setExtraServices] = useState({
        currentPage : 1,
        serviceList: [],
        totalPage: 1
    })
    const [checkChangeServices, setCheckChangeServices] = useState(false)
    let services = []

    //Load the bill
    useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/bills/${billId}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(turn => setTurn(turn))
    }, [checkChangeServices])



    const handleChangeNumberService = (index, quantity) => {
        quantity = parseInt(quantity)
        services[index].quantity = quantity;
    }


    //Change Service Dialog
    const [changeServicesDialog, setChangeServicesDialog] = useState(false)
    var deleteDialog = false;
    const openChangeServicesDialog =(add, remove) => {
        if(remove == 1) deleteDialog = true;
        else deleteDialog = false;
        setChangeServicesDialog(true)
        addS = add
        removeS = remove
        //console.log('42', addS, removeS);
        fetch(`https://homeps.herokuapp.com/api/extraservice?page=${1}&size=${10}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => setExtraServices(res))
    }
    extraServices.serviceList.map(service => (
        services = [...services, { esId: service.serviceId, quantity: 0 }]
    ))
    //console.log(services);

    const handleChangeServices = async () => {
        services = services.filter(service => service.quantity != 0)
        console.log('abc', addS, removeS);
        if (addS === 0 && removeS === 1)
            services.map(service => {
                service.quantity = - service.quantity
            })
        console.log(services);
        await fetch(`https://homeps.herokuapp.com/api/bills/${billId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify({ services })
        })
        setCheckChangeServices(!checkChangeServices)
        console.log(JSON.stringify({ services }));
        closeChangeServicesDialog()
        console.log(addS, removeS);
    }

    const closeChangeServicesDialog = () => {
        setChangeServicesDialog(false)
        addS = 0
        removeS = 0
        services.map(service => {
            service.quantity = 0
        })
    }


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
        navigate('/luotchoi')
    }
    const closeDeleteTurnDialog = () => setDeleteTurnDialog(false)

    //Payment Dialog
    const [paymentDialog, setPaymentDialog] = useState(false)
    const handlePayment = async () => {
        await fetch(`https://homeps.herokuapp.com/api/bills/endbill/${billId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            }
        })
        navigate(`/luotchoi/payment/${turn.billId}`)
        setPaymentDialog(false)
    }
    const closePaymentDialog = () => setPaymentDialog(false)

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
                            <li className="row">Danh sách dịch vụ</li>
                        </ul>
                        <div className="top-bar-button-3">
                            <button className="row" onClick={() => openChangeServicesDialog(1, 0)}>Thêm dịch vụ</button>
                            <button className="row" onClick={() => openChangeServicesDialog(0, 1)}>Xóa dịch vụ</button>
                            <button onClick={() => setPaymentDialog(true)} className="row">Thanh toán</button>
                        </div>
                    </div>
                    <div className="col">
                        <ul className="top-bar-details-inf">
                            <li className="row">{turn.billId}</li>
                            <li className="row">{turn.playStation && turn.playStation.psName}</li>
                            <li className="row">{formatTime(turn.timeStart)}</li>
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
                <Dialog open={changeServicesDialog} onClose={closeChangeServicesDialog} >
                    <table>
                        <tbody>
                            <tr>
                                <th>Dịch vụ</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                            </tr>
                            {extraServices.serviceList.map((extraService, index) => {
                                return (
                                    <tr key={extraService.serviceId}>
                                        <td>{extraService.serviceName}</td>
                                        <td>{extraService.price}</td>
                                        <td>
                                            <input
                                                type='number'
                                                min='0'
                                                onChange={e => handleChangeNumberService(index, e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <button onClick={handleChangeServices}>Thay đổi</button>
                    <button onClick={closeChangeServicesDialog}>Quay lại</button>
                </Dialog>

                <Dialog open={deleteTurnDialog} onClose={closeDeleteTurnDialog} >
                    <DialogTitle>Bạn có chắc chắn muốn xóa lượt chơi?</DialogTitle>
                    <DialogContent>Bạn không thể khôi phục lại lượt chơi sau khi đã xóa.</DialogContent>
                    <DialogActions>
                        <button onClick={handleDeleteTurn}>Xoá lượt chơi</button>
                        <button onClick={() => setDeleteTurnDialog(false)}>Quay về</button>
                    </DialogActions>
                </Dialog>

                <Dialog open={paymentDialog} onClose={closePaymentDialog}>
                    <DialogTitle>Xác nhận thanh toán</DialogTitle>
                    <DialogActions>
                        <button onClick={handlePayment}>Đồng ý</button>
                        <button onClick={() => setPaymentDialog(false)}>Quay lại</button>
                    </DialogActions>
                </Dialog>
            </section>

        </div>
    )
}
export default DetailsTurn
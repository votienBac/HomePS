import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';
import formatTime from '../../utility/formattime.js'
import '../../css/detail.css';
import formatMoney from '../../utility/formatmoney';
let addS = 0, removeS = 0

const DetailsTurn = (props) => {
    const navigate = useNavigate()
    let params = useParams();
    const billId = params.id
    const [turn, setTurn] = useState({ orderServices: [] })
    const [extraServices, setExtraServices] = useState({
        currentPage: 1,
        serviceList: [],
        totalPage: 1
    })
    const [checkChangeServices, setCheckChangeServices] = useState(false)
    let services = []
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
    }, [checkChangeServices])


    const handleChangeNumberService = (index, quantity) => {
        quantity = parseInt(quantity)
        services[index].quantity = quantity;
    }


    //Change Service Dialog
    const [changeServicesDialog, setChangeServicesDialog] = useState(false)
    var deleteDialog = false;
    const openChangeServicesDialog = (add, remove) => {
        if (remove == 1) deleteDialog = true;
        else deleteDialog = false;
        setChangeServicesDialog(true)
        addS = add
        removeS = remove
        fetch(`https://homeps.herokuapp.com/api/extraservice?page=${1}&size=${100000}`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(res => setExtraServices(res))
    }
    extraServices.serviceList.map(service => (
        services = [...services, { esId: service.serviceId, quantity: 0 }]
    ))

    const handleChangeServices = async () => {
        services = services.filter(service => service.quantity != 0)
        if (addS === 0 && removeS === 1)
            services.map(service => {
                service.quantity = - service.quantity
            })
        await fetch(`https://homeps.herokuapp.com/api/bills/${billId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify({ services })
        })
        setCheckChangeServices(!checkChangeServices)
        closeChangeServicesDialog()
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
            headers: myHeaders
        })
        navigate(`/luotchoi/payment/${turn.billId}`)
        setPaymentDialog(false)
    }
    const closePaymentDialog = () => setPaymentDialog(false)
    return (
        <div className='pageBody'>        <img onClick={() => navigate(-1)} src={'https://img.icons8.com/ios/50/000000/circled-left-2.png'
    } className='back-icon'/>
        <div class="pageDetail">
           
            <section className="turn-details">
                <div className="container">
                    <div className="col-detail">
                        <ul className="top-bar-detailsName">
                            <li>ID lượt chơi</li>
                            <li>Tên máy</li>
                            <li>Thời điểm bắt đầu</li>
                            {(turn.orderServices.length != 0) && (<li>Danh sách dịch vụ</li>)}
                        </ul>
                        <ul className="top-bar-details-inf">
                            <li>{turn.billId}</li>
                            <li>{turn.playStation && turn.playStation.psName}</li>
                            <li>{formatTime(turn.timeStart)}</li>
                        </ul>
                    </div>
                    {turn.orderServices.length != 0 && <div className="list-service">
                        <table className='tb' style={{ width: '36%', }} >
                            <tbody className='t'>
                                <tr className='table-list'>
                                    <th>Tên</th>
                                    <th >Giá dịch vụ</th>
                                    <th >Số lượng</th>
                                    <th>Tổng tiền</th>
                                </tr>
                                {(turn.orderServices) && turn.orderServices.map(orderService => {
                                    return (
                                        <tr key={orderService.service.serviceId} className='list-turn'>
                                            <td>{orderService.service.serviceName}</td>
                                            <td>{formatMoney(orderService.service.price)}</td>
                                            <td>{orderService.quantity}</td>
                                            <td>{formatMoney(orderService.totalPrice)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>}
                    <div className='button-detail'>
                        {/* <button
                            className='back'
                            onClick={() => navigate(-1)}>
                            Quay lại</button> */}
                        <div className="top-bar-button-3">
                            <button className="row" onClick={() => openChangeServicesDialog(1, 0)}>Thêm dịch vụ</button>
                            <button className="row" onClick={() => openChangeServicesDialog(0, 1)}>Xóa dịch vụ</button>
                            <button onClick={() => setPaymentDialog(true)} className="row">Thanh toán</button>
                            <button
                                className="delete-turn"
                                onClick={() => { setDeleteTurnDialog(true) }}>
                                Xóa lượt chơi
                            </button>
                        </div>
                    </div>
                </div>

                <Dialog open={changeServicesDialog} onClose={closeChangeServicesDialog} >
                    <img onClick={closeChangeServicesDialog} src={'https://img.icons8.com/ios-filled/50/000000/x.png'
                    } className='ex-icon'></img>
                    <table className="m-table" style={{ width: '515px',marginLeft:'0px' }}>
                    <thead>
                            <tr>
                                <th>Dịch vụ</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                            </tr>
                        </thead>
                    </table>
                    <div className='m-grid'>
                    <table className="m-table" style={{ width: '500px',marginLeft:'0px' }}>
                        
                        <tbody>
                            {extraServices.serviceList.map((extraService, index) => {
                                return (
                                    <tr key={extraService.serviceId} >
                                        <td>{extraService.serviceName}</td>
                                        <td>{formatMoney(extraService.price)}</td>
                                        <td>
                                            <input
                                                type='number'
                                                min='0'
                                                onChange={e => handleChangeNumberService(index, e.target.value)}
                                                style={{ borderRadius: '5px', border: '2px', paddingLeft: '10px', backgroundColor:'#dde4f1' }}
                                                placeholder='0'
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    </div>
                    <button onClick={handleChangeServices} style={{ width: '20%', alignSelf: 'center', margin: '10px', marginTop:'0%'}}>Thay đổi</button>
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
        </div>
    )
}
export default DetailsTurn

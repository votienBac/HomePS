import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';
import formatTime from '../../utility/formattime.js'
import '../../css/detail.css';
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

                    <div className="col-detail">
                        <ul className="top-bar-detailsName">
                            <li>ID lượt chơi:</li>
                            <li>Tên máy:</li>
                            <li>Thời điểm bắt đầu:</li>
                            <li>Danh sách dịch vụ</li>
                        </ul>
                        <ul className="top-bar-details-inf">
                            <li>{turn.billId}</li>
                            <li>{turn.playStation && turn.playStation.psName}</li>
                            <li>{formatTime(turn.timeStart)}</li>
                        </ul>
                    </div>
                    <div className="list-service">
                        <table className='tb' style={{width: '70%',}} >
                            <tbody className='t'>
                                <tr className='table-list'>
                                    <th>Tên</th>
                                    <th >Số lượng</th>
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
                    </div>
                    <div className='button-detail'>  
                        <button
                            className='back'
                            onClick={() => navigate(-1)}>
                            Quay lại</button>
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
                    <img onClick={closeChangeServicesDialog} src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8jHyAAAAAgHB0FAAAcFxjU1NQIAAAYExStrKwdGBlubGwhHB0aFRfZ2dnu7u739/cnIyRqaGmFg4Tj4+N/fX7i4uKPjo7y8vI1MTI6Nzj5+fkRCgzq6uqKiImgnp90cnOWlZViYGE/PT1bWVmko6NJR0eTkpKst4hvAAAEhklEQVR4nO2dbVfaQBBGIYgiYFtApbZUUWv9//+wjoiZCS8murMzs+e5X3sac8/d7ASPJL0eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOxy+jC9ubM+Cc3TeKpGg0F181Pl4O2525zGj/RHvq76xMXMVvF+cxqrefpD3676DhTfBPv9Kv1ZPIzejj00VLzbCvarb8kPvlj1zRVrwX71PfnRT+ujWykywdFfheNf1ce3uRaZ4KD6o/ET5iemikLwVOdnTCwVhWD6beYNw4o5ChJmFfMUJIwq5ipImFTMV5DgFTPdhucVNKiYWzB7xfyCmbcbC0G5UJUr2ghmXKg5x4QkU0WrggSrONL4pckrdgWJDEPDsiChfi1aC4qKGgvVXrChmLqiB8EXxUqt4pMLQcWKXgTVrsUn0zEhUanopyChMPo9FSTEdpOioq+CROKK/gQTD41zh4JJd9RzZ9fglmQVvQomGxo+l+iGeYqKfgsSCSr6FkwwNLwLfnlH9S8oK/7qqhhB8EsVYwhKxU4Vowg2Kv5u/d/iCH6yIhOcehdsbDftKkYqSHSuGKsg8dCtYrSCRKehEVGw0+iPKdhhaEQVlBUfD1eMK9hyaEQWlAv1QMV4Y0LyYcXYBYnJ2dEdNXpB4oEpPjYrxi9IzHlFqViGoFQUFUsRPLjdlCN4oGJJgnsrliW4p2JpgjuK5QlKxX8lCorRP16VKCgqlikoKpYpuFuxOMGmYoGCvd56VAtOBwUKvn9V+jXhTOUbkrYsKr5Kx6PiFKUgKV5an1JamoLFVdwVpLubgioywUG9o46HxVS8ZYIz9qX38aoQRS54dsmDFlKRC66ue2LNFlGxUZAoq+JOQYJfixfBFYVgPR0WxSiKJXrN/uGqkIV6oCDBK8a9uzlYkOAVp0EVjxQk4lfcMyYki+AV944JiaiY/rlPynxYkIhcsUVBgm03w3Goih9sMjW84jhQxeWxMSHhFfthKi7bFiRYxeFFEMUOBYl4FTsVJHjFYQDFZZsxIeEVZ+4Vl+3GhOQqUEUmOD1p/9vCRZhrseMmU8MrTh0r8oKdBGVFv4q84Ek3wRhDo/Wt2n78j/6jn+jb4L0iE5y2HhOShetPGlyw8zW4xfPov/38Lsrx+3mRX4PV5wX9XovLFEt0g8/Rf/uVOdjEo+Iy1RLdsHa3UD99L3oIb9uNKJjmYR2+hkbygoSnazHxNbjFT0XxaSLl82RERcNXhigVJHxUfNZ8IpCHocHvZBQeeWR/A6dakOAVLV4ZojAHm6xNh4Z6QWJtuN1kERSKF4Osis+6m0wNV8xZMZtgo2K27SajoM21eJ9TsDH6s1TMtMnU8IWaY/RnLkhMso5+A0G5ULWHhomgqKj8VhQjwXzbjZlg41pUW6j3uXdRziRDRVPBHKPf/EnpYqHqvS3XqiDBHsyk+bZcy+/wsmdsaL4t1/Ix1PVCVXxbru23sN8Xqt7bcq0fWvWmqPS23MHLkc2/Rz/ZnIbK3xOfz6pqbv+Xyk5OAwAAAAAAAAAAAAAAAAAAAAAAAAAAgJj8B0sMSmriXoasAAAAAElFTkSuQmCC'
                    } className='ex-icon'></img>
                    <table className="tb" style={{width:'500px'}}>
                        <tbody className="t" >
                            <tr lassName="table-list" style={{height:'2.765em'}}>
                                <th>Dịch vụ</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                            </tr>
                            {extraServices.serviceList.map((extraService, index) => {
                                return (
                                    <tr key={extraService.serviceId} className="list-turn">
                                        <td>{extraService.serviceName}</td>
                                        <td>{extraService.price}</td>
                                        <td>
                                            <input
                                                type='number'
                                                min='0'
                                                onChange={e => handleChangeNumberService(index, e.target.value)}
                                                style={{borderRadius:'5px',border:'2px',paddingLeft:'10px'}}
                                                placeholder='0'
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    
                    <button onClick={handleChangeServices} style={{width:'20%',alignSelf:'center', margin:'10px'}}>Thêm</button>
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

import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';
import formatMoney from '../../utility/formatmoney'
const DetailsService = (props) => {
    const navigate = useNavigate()
    let params = useParams();
    const serviceId = params.id
    const [service, setService] = useState([])
    const [checkChangeService, setCheckChangeService] = useState(false)

    //Load the event
    useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/extraservice/${serviceId}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(service => setService(service))
    },[checkChangeService])

    let serviceTmp = service

    //Delete Event Dialog
    const [deleteServiceDialog, setDeleteServiceDialog] = useState(false)
    const handleDeleteService = async () => {
        await fetch(`https://homeps.herokuapp.com/api/extraservice/${serviceId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
        })
        navigate('/dichvu')
    }
    const closeDeleteServiceDialog = () => setDeleteServiceDialog(false)

    //Change Service 
    const openChangeServicesDialog = () => {
        setChangeServicesDialog(true)
    }
    const handleChangeInforService = (key, infor) => {
        if(key=="price"){
            infor = parseInt(infor)
            serviceTmp.price = infor;
        }
        if(key=="serviceName"){
            serviceTmp.serviceName = infor;
        }
    }
    const [changeServicesDialog, setChangeServicesDialog] = useState(false)
    const closeChangeServicesDialog = () => {
        setChangeServicesDialog(false)
        serviceTmp = service
    }
    const handleChangeServices = async () => {
        console.log(serviceTmp)
        await fetch(`https://homeps.herokuapp.com/api/extraservice/${serviceId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify(serviceTmp)
        })
        setCheckChangeService(!checkChangeService)
        closeChangeServicesDialog()
    }

    return (
        <div className='pageDetail'>
            <section className="turn-details">
                <div className="container">
                    <div className="col-detail">
                        <ul className="top-bar-detailsName">
                            <li className="row">ID</li>
                            <li className="row">Tên dịch vụ</li>
                            <li className="row">Giá</li>
                        </ul>
                        <ul className="top-bar-details-inf">
                            <li className="row">{service.serviceId}</li>
                            <li className="row">{service.serviceName}</li>
                            <li className="row">{formatMoney(service.price)}</li>
                        </ul>
                    </div>
                </div>
                <div className='button-detail'>  
                        <button
                            className='back'
                            onClick={() => navigate(-1)}>
                            Quay lại</button>
                    <div className="top-bar-button-3">
                    <button className="row" onClick={() => openChangeServicesDialog(1, 0)}>Sửa dịch vụ</button>
                        <button
                            className="delete-turn"
                            onClick={() => { setDeleteServiceDialog(true) }}>
                            Xóa dịch vụ
                        </button>    
                    </div>
                </div>

                <Dialog open={changeServicesDialog} onClose={closeChangeServicesDialog} >
                <DialogTitle>Thêm dịch vụ</DialogTitle>
                <img onClick={closeChangeServicesDialog} src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8jHyAAAAAgHB0FAAAcFxjU1NQIAAAYExStrKwdGBlubGwhHB0aFRfZ2dnu7u739/cnIyRqaGmFg4Tj4+N/fX7i4uKPjo7y8vI1MTI6Nzj5+fkRCgzq6uqKiImgnp90cnOWlZViYGE/PT1bWVmko6NJR0eTkpKst4hvAAAEhklEQVR4nO2dbVfaQBBGIYgiYFtApbZUUWv9//+wjoiZCS8murMzs+e5X3sac8/d7ASPJL0eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOxy+jC9ubM+Cc3TeKpGg0F181Pl4O2525zGj/RHvq76xMXMVvF+cxqrefpD3676DhTfBPv9Kv1ZPIzejj00VLzbCvarb8kPvlj1zRVrwX71PfnRT+ujWykywdFfheNf1ce3uRaZ4KD6o/ET5iemikLwVOdnTCwVhWD6beYNw4o5ChJmFfMUJIwq5ipImFTMV5DgFTPdhucVNKiYWzB7xfyCmbcbC0G5UJUr2ghmXKg5x4QkU0WrggSrONL4pckrdgWJDEPDsiChfi1aC4qKGgvVXrChmLqiB8EXxUqt4pMLQcWKXgTVrsUn0zEhUanopyChMPo9FSTEdpOioq+CROKK/gQTD41zh4JJd9RzZ9fglmQVvQomGxo+l+iGeYqKfgsSCSr6FkwwNLwLfnlH9S8oK/7qqhhB8EsVYwhKxU4Vowg2Kv5u/d/iCH6yIhOcehdsbDftKkYqSHSuGKsg8dCtYrSCRKehEVGw0+iPKdhhaEQVlBUfD1eMK9hyaEQWlAv1QMV4Y0LyYcXYBYnJ2dEdNXpB4oEpPjYrxi9IzHlFqViGoFQUFUsRPLjdlCN4oGJJgnsrliW4p2JpgjuK5QlKxX8lCorRP16VKCgqlikoKpYpuFuxOMGmYoGCvd56VAtOBwUKvn9V+jXhTOUbkrYsKr5Kx6PiFKUgKV5an1JamoLFVdwVpLubgioywUG9o46HxVS8ZYIz9qX38aoQRS54dsmDFlKRC66ue2LNFlGxUZAoq+JOQYJfixfBFYVgPR0WxSiKJXrN/uGqkIV6oCDBK8a9uzlYkOAVp0EVjxQk4lfcMyYki+AV944JiaiY/rlPynxYkIhcsUVBgm03w3Goih9sMjW84jhQxeWxMSHhFfthKi7bFiRYxeFFEMUOBYl4FTsVJHjFYQDFZZsxIeEVZ+4Vl+3GhOQqUEUmOD1p/9vCRZhrseMmU8MrTh0r8oKdBGVFv4q84Ek3wRhDo/Wt2n78j/6jn+jb4L0iE5y2HhOShetPGlyw8zW4xfPov/38Lsrx+3mRX4PV5wX9XovLFEt0g8/Rf/uVOdjEo+Iy1RLdsHa3UD99L3oIb9uNKJjmYR2+hkbygoSnazHxNbjFT0XxaSLl82RERcNXhigVJHxUfNZ8IpCHocHvZBQeeWR/A6dakOAVLV4ZojAHm6xNh4Z6QWJtuN1kERSKF4Osis+6m0wNV8xZMZtgo2K27SajoM21eJ9TsDH6s1TMtMnU8IWaY/RnLkhMso5+A0G5ULWHhomgqKj8VhQjwXzbjZlg41pUW6j3uXdRziRDRVPBHKPf/EnpYqHqvS3XqiDBHsyk+bZcy+/wsmdsaL4t1/Ix1PVCVXxbru23sN8Xqt7bcq0fWvWmqPS23MHLkc2/Rz/ZnIbK3xOfz6pqbv+Xyk5OAwAAAAAAAAAAAAAAAAAAAAAAAAAAgJj8B0sMSmriXoasAAAAAElFTkSuQmCC'
            } style={{position:'fixed',width:'20px',
            marginTop:'20px',marginLeft:'323px'}}></img>
                        <div style={{marginLeft:'25px',marginBottom:'10px',marginTop:'10px'}}>    
                            <div>
                                <tr>
                                    <td style={{fontWeight:'700',marginBottom:'20px'}}>Tên dịch vụ</td>
                                    <td>
                                        <input
                                            type='text' style={{width:'200px',paddingLeft:'10px',borderRadius:'10px',
                                            marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                                            onChange={e => handleChangeInforService("serviceName", e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight:'700'}}>Giá</td>
                                    <td>
                                        <input style={{width:'200px',paddingLeft:'10px',borderRadius:'10px',
                                marginBottom:'10px',marginLeft:'20px',marginRight:'20px'}}
                                            type='number'
                                            min='0'
                                            onChange={e => handleChangeInforService("price", e.target.value)}
                                        />
                                    </td>
                                </tr>
                                </div>
                    <button onClick={handleChangeServices} style={{marginTop:'20px',marginBottom:'10px',width:'100px',marginLeft:'32%'}}>Thay đổi</button>
                    </div>
                </Dialog>

                <Dialog open={deleteServiceDialog} onClose={closeDeleteServiceDialog} >
                    <DialogTitle>Bạn có chắc chắn muốn xóa dịch vụ?</DialogTitle>
                    <DialogContent>Bạn không thể khôi phục lại dịch vụ sau khi đã xóa.</DialogContent>
                    <DialogActions>
                        <button onClick={handleDeleteService}>Xoá dịch vụ</button>
                        <button onClick={() => setDeleteServiceDialog(false)}>Quay về</button>
                    </DialogActions>
                </Dialog>
            </section>

        </div>
    )
}
export default DetailsService
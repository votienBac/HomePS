import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';

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
            body: JSON.stringify({ serviceTmp })
        })
        setCheckChangeService(!checkChangeService)
        closeChangeServicesDialog()
    }

    return (
        <div>
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
                            <li className="row">{service.price}</li>
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
                    <table>
                        <tbody>   
                                <tr>
                                    <td>Tên dịch vụ</td>
                                    <td>
                                        <input
                                            type='text'
                                            onChange={e => handleChangeInforService("serviceName", e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Giá</td>
                                    <td>
                                        <input
                                            type='number'
                                            min='0'
                                            onChange={e => handleChangeInforService("price", e.target.value)}
                                        />
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                    <button onClick={handleChangeServices}>Thay đổi</button>
                    <button onClick={closeChangeServicesDialog}>Quay lại</button>
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
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';
import formatMoney from '../../utility/formatmoney'
const DetailsService = () => {
    const navigate = useNavigate()
    let params = useParams();
    const serviceId = params.id
    const [service, setService] = useState([])
    const [error, setError] = useState("")
    const [checkChangeService, setCheckChangeService] = useState(false)

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    //Load the event
    useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/extraservice/${serviceId}`, {
            method: 'GET',
            headers: myHeaders,
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
            headers: myHeaders,
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
        if(serviceTmp.serviceName=== "" || serviceTmp.price ==="" ){
        setError("H??y nh???p ????? th??ng tin");
        }else{
        await fetch(`https://homeps.herokuapp.com/api/extraservice/${serviceId}`, {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(serviceTmp)
        })
        setCheckChangeService(!checkChangeService)
        closeChangeServicesDialog()
        }
    }

    return (
        <div className='pageBody'>        <img onClick={() => navigate(-1)} src={'https://img.icons8.com/ios/50/000000/circled-left-2.png'
    } className='back-icon'/>
        <div className='pageDetail'>
            <section className="turn-details">
                <div className="container">
                    <div className="col-detail">
                        <ul className="top-bar-detailsName">
                            <li style={{ marginBottom: '10px' }}>ID</li>
                            <li style={{ marginBottom: '10px' }}>T??n d???ch v???</li>
                            <li style={{ marginBottom: '10px' }}>Gi??</li>
                        </ul>
                        <ul className="top-bar-details-inf">
                            <li style={{ marginBottom: '10px' }}>{service.serviceId}</li>
                            <li style={{ marginBottom: '10px' }}>{service.serviceName}</li>
                            <li style={{ marginBottom: '10px' }}>{formatMoney(service.price)}</li>
                        </ul>
                    </div>
                </div>
                <div className='button-detail'>  
                    <div className="top-bar-button-3">
                    <button className="row" onClick={() => openChangeServicesDialog(1, 0)}>S???a d???ch v???</button>
                        <button
                            className="delete-turn"
                            onClick={() => { setDeleteServiceDialog(true) }}>
                            X??a d???ch v???
                        </button>    
                    </div>
                </div>

                <Dialog open={changeServicesDialog} onClose={closeChangeServicesDialog} >
                <img onClick={closeChangeServicesDialog} src={'https://img.icons8.com/ios-filled/50/000000/x.png'
            } style={{position:'fixed',width:'15px',
            marginTop:'12px',marginLeft:'329px'}}></img>
                        <div style={{marginLeft:'25px',marginBottom:'10px',marginTop:'10px'}}>    
                            <div>
                            <div  style={{ height: '3.965em' }}>
                                <th colSpan={2} style={{fontSize:'20px',paddingLeft:'85px'}}>Thay ?????i d???ch v???</th>
                            </div>   
                                <tr>
                                    <td style={{fontWeight:'700',marginBottom:'20px'}}>T??n d???ch v???</td>
                                    <td>
                                        <input
                                            type='text' style={{width:'200px',paddingLeft:'10px',borderRadius:'10px',
                                            marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                                            placeholder={service.serviceName} 
                                            onChange={e => handleChangeInforService("serviceName", e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight:'700'}}>Gi?? (vn??)</td>
                                    <td>
                                        <input style={{width:'200px',paddingLeft:'10px',borderRadius:'10px',
                                marginBottom:'10px',marginLeft:'20px',marginRight:'20px'}}
                                            type='number' placeholder={service.price} 
                                            min='0'
                                            onChange={e => handleChangeInforService("price", e.target.value)}
                                        />
                                    </td>
                                </tr>
                                {(error !=="") ? (<div className="error">{error} </div>): ""}
                                </div>
                    <button onClick={handleChangeServices} style={{marginTop:'20px',marginBottom:'10px',width:'100px',marginLeft:'32%'}}>Thay ?????i</button>
                    </div>
                </Dialog>

                <Dialog open={deleteServiceDialog} onClose={closeDeleteServiceDialog} >
                    <DialogTitle>B???n c?? ch???c ch???n mu???n x??a d???ch v????</DialogTitle>
                    <DialogContent>B???n kh??ng th??? kh??i ph???c l???i d???ch v??? sau khi ???? x??a.</DialogContent>
                    <DialogActions>
                        <button onClick={handleDeleteService}>Xo?? d???ch v???</button>
                        <button onClick={() => setDeleteServiceDialog(false)}>Quay v???</button>
                    </DialogActions>
                </Dialog>
            </section>

        </div>
        </div>
    )
}
export default DetailsService
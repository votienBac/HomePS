import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';
import formatTime from '../../utility/formattime.js';
import "../../css/luotchoi.css";
const DetailsEvent = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    const navigate = useNavigate()
    let params = useParams();
    const eventId = params.id
    const [event, setEvent] = useState({})
    const [checkChangeEvent, setCheckChangeEvent] = useState(false)
    const [error, setError] = useState("")
    //Load the event
    useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/events/${eventId}`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(event => setEvent(event))
    },[checkChangeEvent])

    var eventTmp = {
        eventName: event.eventName,
        timeStart: event.timeStart,
        timeEnd: event.timeEnd,
        percentDiscount: event.percentDiscount
    }
    //Delete Event Dialog
    const [deleteEventDialog, setDeleteEventDialog] = useState(false)
    const handleDeleteEvent = async () => {
        await fetch(`https://homeps.herokuapp.com/api/events/${eventId}`, {
            method: 'DELETE',
            headers: myHeaders,
        })
        navigate('/sukien')
    }
    const closeDeleteEventDialog = () => setDeleteEventDialog(false)

    //Change Event 
    const openChangeEventsDialog = () => {
        setChangeEventsDialog(true)
    }
    const handleChangeInforEvent = (key, infor) => {
        if(key=="EventName"){
            eventTmp.eventName = infor;
        }
        else if(key=="timeStart"){
            eventTmp.timeStart = new Date(infor);
        }
        else if(key=="timeEnd"){
            eventTmp.timeEnd = new Date(infor);
        }
        else if(key=="percentDiscount"){
            infor = parseInt(infor)
            eventTmp.percentDiscount = infor;
        }
    }
    const [changeEventsDialog, setChangeEventsDialog] = useState(false)
    const closeChangeEventsDialog = () => {
        setChangeEventsDialog(false)
        setError("")
    }
    const handleChangeEvents = async () => {
        if(eventTmp.eventName=== "" || eventTmp.timeStart ==="" || eventTmp.timeEnd ==="" || eventTmp.percentDiscount === ""){
            setError("Hãy nhập đủ thông tin");
        }
        else if(eventTmp.percentDiscount > 100){
                setError("Giảm giá không quá 100%")
        }else{
        await fetch(`https://homeps.herokuapp.com/api/events/${eventId}`, {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(eventTmp)
        })
        setCheckChangeEvent(!checkChangeEvent)
        closeChangeEventsDialog()
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
                            <li style={{ marginBottom: '10px' }}>Tên dịch vụ</li>
                            <li style={{ marginBottom: '10px' }}>Giảm giá(%)</li>
                            <li style={{ marginBottom: '10px' }}>Thời gian bắt đầu</li>
                            <li style={{ marginBottom: '10px' }}>Thời gian kết thúc</li>
                        </ul>
                        <ul className="top-bar-details-inf">
                            <li style={{ marginBottom: '10px' }}>{event.eventId}</li>
                            <li style={{ marginBottom: '10px' }}>{event.eventName}</li>
                            <li style={{ marginBottom: '10px' }}>{event.percentDiscount}</li>
                            <li style={{ marginBottom: '10px' }}>{formatTime(event.timeStart)}</li>
                            <li style={{ marginBottom: '10px' }}>{formatTime(event.timeEnd)}</li>
                        </ul>
                    </div>
                </div>
                <div className='button-detail'>  
                    <div className="top-bar-button-3">
                        <button className="row" onClick={() => openChangeEventsDialog(1, 0)}>Sửa sự kiện</button>
                        <button
                            className="delete-turn"
                            onClick={() => { setDeleteEventDialog(true) }}>
                            Xóa sự kiện
                        </button>    
                    </div>
                </div>

                <Dialog open={changeEventsDialog} onClose={closeChangeEventsDialog} >
                    <img onClick={closeChangeEventsDialog} src={'https://img.icons8.com/ios-filled/50/000000/x.png'
                    } className='ex-icon'></img>
            <div style={{marginLeft:'25px',marginBottom:'10px',marginTop:'10px',width:'480px'}}>
                <div>
                <div  style={{ height: '3.965em' }}>
                        <th colSpan={2} style={{fontSize:'20px',paddingLeft:'170px'}}>Thay đổi sự kiện</th>
                    </div>   
                                <tr>
                                    <td style={{fontWeight:'700',marginBottom:'20px'}}>Tên sự kiện</td>
                                    <td>
                                        <input style={{width:'250px',paddingLeft:'10px',borderRadius:'10px',
                                            marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                                            type='text' placeholder={event.eventName} 
                                            onChange={e => handleChangeInforEvent("EventName", e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight:'700',marginBottom:'20px'}}>Thời gian bắt đầu</td>
                                    <td>
                                        <input style={{width:'250px',paddingLeft:'10px',borderRadius:'10px',
                                            marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                                            type='datetime-local'
                                            onChange={e => handleChangeInforEvent("timeStart", e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td  style={{fontWeight:'700',marginBottom:'20px'}}>Thời gian kết thúc</td>
                                    <td>
                                        <input style={{width:'250px',paddingLeft:'10px',borderRadius:'10px',
                                            marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                                            type='datetime-local' 
                                            onChange={e => handleChangeInforEvent("timeEnd", e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight:'700',marginBottom:'20px'}}>Giảm giá(%)</td>
                                    <td>
                                        <input style={{width:'250px',paddingLeft:'10px',borderRadius:'10px',
                                            marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                                            type='number' placeholder={event.percentDiscount} 
                                            min= {0} max = {100}
                                            onChange={e => handleChangeInforEvent("percentDiscount", e.target.value)}
                                        />
                                    </td>
                                </tr>
                                {(error !=="") ? (<div className="error">{error} </div>): ""}
                        </div>
                    </div>
                    <button onClick={handleChangeEvents} style={{ width: '20%', alignSelf: 'center', margin: '10px',marginBottom:'20px' }}>Thay đổi</button>
                </Dialog>

                <Dialog open={deleteEventDialog} onClose={closeDeleteEventDialog} >
                    <DialogTitle>Bạn có chắc chắn muốn xóa sự kiện?</DialogTitle>
                    <DialogContent>Bạn không thể khôi phục lại sự kiện sau khi đã xóa.</DialogContent>
                    <DialogActions>
                        <button onClick={handleDeleteEvent}>Xoá sự kiện</button>
                        <button onClick={() => setDeleteEventDialog(false)}>Quay về</button>
                    </DialogActions>
                </Dialog>
            </section>

        </div>
        </div>
    )
}
export default DetailsEvent
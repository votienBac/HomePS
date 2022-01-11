import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';
import formatTime from '../../utility/formattime.js'

const DetailsEvent = (props) => {
    const navigate = useNavigate()
    let params = useParams();
    const eventId = params.id
    const [event, setEvent] = useState([])
    const [checkChangeEvent, setCheckChangeEvent] = useState(false)

    //Load the event
    useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/events/${eventId}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(event => setEvent(event))
    },[checkChangeEvent])

    let eventTmp = event

    //Delete Event Dialog
    const [deleteEventDialog, setDeleteEventDialog] = useState(false)
    const handleDeleteEvent = async () => {
        await fetch(`https://homeps.herokuapp.com/api/events/${eventId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
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
            eventTmp.EventName = infor;
        }
        else if(key=="timeStart"){
            eventTmp.timeStart = infor;
        }
        else if(key=="timeEnd"){
            eventTmp.timeEnd = infor;
        }
        else if(key=="percentDiscount"){
            infor = parseInt(infor)
            eventTmp.percentDiscount = infor;
        }
    }
    const [changeEventsDialog, setChangeEventsDialog] = useState(false)
    const closeChangeEventsDialog = () => {
        setChangeEventsDialog(false)
        eventTmp = Event
    }
    const handleChangeEvents = async () => {
        console.log(eventTmp)
        await fetch(`https://homeps.herokuapp.com/api/events/${eventId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify({ eventTmp })
        })
        setCheckChangeEvent(!checkChangeEvent)
        closeChangeEventsDialog()
    }

    return (
        <div>
            <section className="turn-details">
                <div className="container">
                    <div className="col-detail">
                        <ul className="top-bar-detailsName">
                            <li className="row">ID</li>
                            <li className="row">Tên dịch vụ</li>
                            <li className="row">Giảm giá</li>
                            <li className="row">Thời gian bắt đầu</li>
                            <li className="row">Thời gian kết thúc</li>
                        </ul>
                        <ul className="top-bar-details-inf">
                            <li className="row">{event.eventId}</li>
                            <li className="row">{event.eventName}</li>
                            <li className="row">{event.percentDiscount}</li>
                            <li className="row">{formatTime(event.timeStart)}</li>
                            <li className="row">{formatTime(event.timeEnd)}</li>
                        </ul>
                    </div>
                </div>
                <div className='button-detail'>  
                        <button
                            className='back'
                            onClick={() => navigate(-1)}>
                            Quay lại</button>
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
                    <table>
                        <tbody>   
                                <tr>
                                    <td>Tên sự kiện</td>
                                    <td>
                                        <input
                                            type='text'
                                            onChange={e => handleChangeInforEvent("EventName", e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Thời gian bắt đầu</td>
                                    <td>
                                        <input
                                            type='datetime-local'
                                            onChange={e => handleChangeInforEvent("timeStart", e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Thời gian kết thúc</td>
                                    <td>
                                        <input
                                            type='datetime-local'
                                            onChange={e => handleChangeInforEvent("timeEnd", e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Giảm giá</td>
                                    <td>
                                        <input
                                            type='number'
                                            min='0'
                                            onChange={e => handleChangeInforEvent("percentDiscount", e.target.value)}
                                        />
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                    <button onClick={handleChangeEvents}>Thay đổi</button>
                    <button onClick={closeChangeEventsDialog}>Quay lại</button>
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
    )
}
export default DetailsEvent
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';
import formatDailyEventTime from '../../utility/dailyEventTime.js';
import stringToWeekDays from '../../utility/stringToDay.js';
import "../../css/luotchoi.css";
const DetailsDailyEvent = () => {
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
        fetch(`https://homeps.herokuapp.com/api/dailyEvents/${eventId}`, {
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
        percentDiscount: event.percentDiscount,
        dayHappen: event.dayHappen
    }

    //Delete Event Dialog
    const [deleteEventDialog, setDeleteEventDialog] = useState(false)
    const handleDeleteEvent = async () => {
        await fetch(`https://homeps.herokuapp.com/api/dailyEvents/${eventId}`, {
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
        if(key=="dailyEventName"){
            eventTmp.dailyEventName = infor;
        }
        else if(key=="timeStart"){
            eventTmp.timeStart = infor + ':00';
        }
        else if(key=="timeEnd"){
            eventTmp.timeEnd = infor + ':00';
        }
        else if(key=="percentDiscount"){
            infor = parseInt(infor)
            eventTmp.percentDiscount = infor;
        }
        else if(key==="dayHappen"){
            eventTmp.dayHappen = infor;
        }
    }
    const [changeEventsDialog, setChangeEventsDialog] = useState(false)
    const closeChangeEventsDialog = () => {
        setChangeEventsDialog(false)
        setError("")
    }
    const handleChangeEvents = async () => {
        var checkDay = '';
        var inputEles = document.getElementsByClassName('weekday');
        for(let i = 0; i <= 6; i++){
            if(inputEles[i].checked){
                checkDay = checkDay + '1';
            }
            else{
                checkDay = checkDay + '0';
            }
        }
        eventTmp.dayHappen = checkDay
        if(eventTmp.dailyEventName=== "" || eventTmp.timeStart ==="" || 
            eventTmp.timeEnd ==="" || eventTmp.percentDiscount === "" || eventTmp.dayHappen === "0000000"){
            setError("H??y nh???p ????? th??ng tin");
        }
        else if(event.timeStart >= event.timeEnd){
            setError("Th???i gian b???t ?????u l???n h??n th???i gian k???t th??c")
        }else if(eventTmp.percentDiscount > 100){
            setError("Gi???m gi?? kh??ng qu?? 100%")
        }else{
        await fetch(`https://homeps.herokuapp.com/api/dailyEvents/${eventId}`, {
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
                            <li style={{ marginBottom: '10px' }}>T??n d???ch v???</li>
                            <li style={{ marginBottom: '10px' }}>Gi???m gi??(%)</li>
                            <li style={{ marginBottom: '10px' }}>Th???i gian b???t ?????u</li>
                            <li style={{ marginBottom: '10px' }}style={{ marginBottom: '10px' }}>Th???i gian k???t th??c</li>
                            <li style={{ marginBottom: '10px' }}>Ng??y l???p</li>
                        </ul>
                        <ul className="top-bar-details-inf">
                            <li style={{ marginBottom: '10px' }}>{event.dailyEventId}</li>
                            <li style={{ marginBottom: '10px' }}>{event.dailyEventName}</li>
                            <li style={{ marginBottom: '10px' }}>{event.percentDiscount}</li>
                            <li style={{ marginBottom: '10px' }}>{formatDailyEventTime(event.timeStart)}</li>
                            <li style={{ marginBottom: '10px' }}>{formatDailyEventTime(event.timeEnd)}</li>
                            <li style={{ marginBottom: '10px' }}>{stringToWeekDays(event.dayHappen)}</li>
                        </ul>
                    </div>
                </div>
                <div className='button-detail'>  
                    <div className="top-bar-button-3">
                        <button className="row" onClick={() => openChangeEventsDialog(1, 0)}>S???a s??? ki???n</button>
                        <button
                            className="delete-turn"
                            onClick={() => { setDeleteEventDialog(true) }}>
                            X??a s??? ki???n
                        </button>    
                    </div>
                </div>

                <Dialog open={changeEventsDialog} onClose={closeChangeEventsDialog} >
                    <img onClick={closeChangeEventsDialog} src={'https://img.icons8.com/ios-filled/50/000000/x.png'
                    } className='ex-icon'></img>
            <div style={{marginLeft:'25px',marginBottom:'10px',marginTop:'10px',width:'480px'}}>
                <div>
                <div  style={{ height: '3.965em' }}>
                        <th colSpan={2} style={{fontSize:'20px',paddingLeft:'170px'}}>Thay ?????i s??? ki???n</th>
                    </div>   
                                <tr>
                                    <td style={{fontWeight:'700',marginBottom:'20px'}}>T??n s??? ki???n</td>
                                    <td>
                                        <input style={{width:'250px',paddingLeft:'10px',borderRadius:'10px',
                                            marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                                            type='text' placeholder={event.dailyEventName} 
                                            onChange={e => handleChangeInforEvent("dailyEventName", e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight:'700',marginBottom:'20px'}}>Th???i gian b???t ?????u</td>
                                    <td>
                                        <input style={{width:'250px',paddingLeft:'10px',borderRadius:'10px',
                                            marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                                            type='time'
                                            onChange={e => handleChangeInforEvent("timeStart", e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td  style={{fontWeight:'700',marginBottom:'20px'}}>Th???i gian k???t th??c</td>
                                    <td>
                                        <input style={{width:'250px',paddingLeft:'10px',borderRadius:'10px',
                                            marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                                            type='time' 
                                            onChange={e => handleChangeInforEvent("timeEnd", e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr >
                                    <td style={{fontWeight:'700',marginBottom:'20px'}}>Ng??y l???p l???i</td>
                                    <td style={{textAlign:'right'}}>
                                        <div><label for='monday'>Th??? 2</label><input type='checkbox' id='monday' value = '0' className='weekday' /></div>
                                        <div><label for='tuesday'>Th??? 3</label><input type='checkbox' id='tuesday' value = '1' className='weekday'/></div>
                                        <div><label for='wednesday'>Th??? 4</label><input type='checkbox' id='wednesday' value = '2' className='weekday'/></div>
                                        <div><label for='thursday'>Th??? 5</label><input type='checkbox' id='thursday' value = '3' className='weekday'/></div>
                                        <div><label for='friday'>Th??? 6</label><input type='checkbox' id='friday' value = '4' className='weekday'/></div>
                                        <div><label for='saturday'>Th??? 7</label><input type='checkbox' id='saturday' value = '5' className='weekday'/></div>
                                        <div><label for='sunday' style={{marginBottom:'20px'}}>Ch??? nh???t</label><input type='checkbox' id='sunday' value = '6' className='weekday'/></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight:'700',marginBottom:'20px'}}>Gi???m gi??(%)</td>
                                    <td>
                                        <input style={{width:'250px',paddingLeft:'10px',borderRadius:'10px',
                                            marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                                            type='number' placeholder={event.percentDiscount} 
                                            min='0'
                                            onChange={e => handleChangeInforEvent("percentDiscount", e.target.value)}
                                        />
                                    </td>
                                </tr>
                                {(error !="") ? (<div className="error">{error}</div>): ""}
                        </div>
                    </div>
                    <button onClick={handleChangeEvents} style={{ width: '20%', alignSelf: 'center', margin: '10px',marginBottom:'20px' }}>Thay ?????i</button>
                </Dialog>

                <Dialog open={deleteEventDialog} onClose={closeDeleteEventDialog} >
                    <DialogTitle>B???n c?? ch???c ch???n mu???n x??a s??? ki???n?</DialogTitle>
                    <DialogContent>B???n kh??ng th??? kh??i ph???c l???i s??? ki???n sau khi ???? x??a.</DialogContent>
                    <DialogActions>
                        <button onClick={handleDeleteEvent}>Xo?? s??? ki???n</button>
                        <button onClick={() => setDeleteEventDialog(false)}>Quay v???</button>
                    </DialogActions>
                </Dialog>
            </section>

        </div>
        </div>
    )
}
export default DetailsDailyEvent

import { useState } from "react"

function AddEvent({isAdded, setAdded, close}){
    const [checkChangeEvent, setCheckChangeEvent] = useState(false)
    let event = {
        eventName: null,
        percentDiscount: null,
        timeEnd: null,
        timeStart: null
    }
    //Change Event 
    const handleChangeInforEvent = (key, infor) => {
        if(key=="EventName"){
            event.eventName = infor;
        }
        else if(key=="timeStart"){
            event.timeStart = new Date(infor);
        }
        else if(key=="timeEnd"){
            event.timeEnd = new Date(infor);
        }
        else if(key=="percentDiscount"){
            infor = parseInt(infor)
            event.percentDiscount = infor;
        }
    }
    
    const handleChangeEvents = async () => {
        await fetch(`https://homeps.herokuapp.com/api/events`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify(event)
        })
        setCheckChangeEvent(!checkChangeEvent)
        setAdded(!isAdded)
        close()
    }

    return(
        <div>
            <img onClick={close} src={'https://img.icons8.com/ios-filled/50/000000/x.png'
            } className='ex-icon'></img>
            <div style={{marginLeft:'25px',marginBottom:'10px',marginTop:'10px',width:'480px'}}>
                <div>
                    <div  style={{ height: '3.965em' }}>
                        <th colSpan={2} style={{fontSize:'20px',paddingLeft:'170px'}}>Thêm sự kiện</th>
                    </div>   
                    <tr>
                            <td style={{fontWeight:'700',marginBottom:'20px'}}>Tên sự kiện</td>
                            <td>
                                <input  type='text' style={{width:'250px',paddingLeft:'10px',borderRadius:'10px',
                                            marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                                    type='text'
                                    onChange={e => handleChangeInforEvent("EventName", e.target.value)}
                                />
                            </td>
                    </tr>
                    <tr>
                            <td style={{fontWeight:'700',marginBottom:'20px'}}>Thời gian bắt đầu</td>
                            <td>
                                <input  type='text' style={{width:'250px',paddingLeft:'10px',borderRadius:'10px',
                                            marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                                    type='datetime-local'
                                    onChange={e => handleChangeInforEvent("timeStart", e.target.value)}
                                />
                            </td>
                    </tr>
                    <tr>
                            <td style={{fontWeight:'700',marginBottom:'20px'}}>Thời gian kết thúc</td>
                            <td>
                                <input  type='text' style={{width:'250px',paddingLeft:'10px',borderRadius:'10px',
                                            marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                                    type='datetime-local'
                                    onChange={e => handleChangeInforEvent("timeEnd", e.target.value)}
                                />
                            </td>
                    </tr>
                    <tr>
                            <td style={{fontWeight:'700',marginBottom:'20px'}}>Giảm giá</td>
                            <td>
                                <input  type='text' style={{width:'250px',paddingLeft:'10px',borderRadius:'10px',
                                            marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                                    type='number'
                                    min='0'
                                    onChange={e => handleChangeInforEvent("percentDiscount", e.target.value)}
                                />
                            </td>
                    </tr>
                </div>
            </div>
            <button onClick={handleChangeEvents} style={{ width: '120px', alignSelf:'center', margin: '10px' ,marginLeft:'40%',marginBottom:'20px'}}>Thêm sự kiện</button>
        </div>
    )
}

export default AddEvent
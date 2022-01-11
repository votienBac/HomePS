import { useState } from "react"

function AddEvent(){
    const [checkChangeEvent, setCheckChangeEvent] = useState(false)
    let event = []
    //Change Event 
    const handleChangeInforEvent = (key, infor) => {
        if(key=="EventName"){
            event.EventName = infor;
        }
        else if(key=="timeStart"){
            event.timeStart = infor;
        }
        else if(key=="timeEnd"){
            event.timeEnd = infor;
        }
        else if(key=="percentDiscount"){
            infor = parseInt(infor)
            event.percentDiscount = infor;
        }
    }
    const [changeEventsDialog, setChangeEventsDialog] = useState(false)
    const closeChangeEventsDialog = () => {
        setChangeEventsDialog(false)
    }
    const handleChangeEvents = async () => {
        await fetch(`https://homeps.herokuapp.com/api/events`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify({ event })
        })
        setCheckChangeEvent(!checkChangeEvent)
        closeChangeEventsDialog()
    }

    return(
        <div className="add-event">
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
        </div>
    )
}

export default AddEvent
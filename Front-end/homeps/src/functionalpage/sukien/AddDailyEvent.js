import { useState } from "react"

function AddDailyEvent({isAdded, setAdded, close}){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    const [checkChangeEvent, setCheckChangeEvent] = useState(false)
    let event = {
        dailyEventName: "",
        percentDiscount: "",
        timeEnd: "",
        timeStart: ""
    }
    const [error, setError] = useState("")
    //Change Event 
    const handleChangeInforEvent = (key, infor) => {
        if(key=="dailyEventName"){
            event.dailyEventName = infor;
        }
        else if(key=="timeStart"){
            event.timeStart = infor + ':00';
            console.log(event.timeStart);
        }
        else if(key=="timeEnd"){
            event.timeEnd = infor + ':00';
            console.log(event.timeEnd);
        }
        else if(key=="percentDiscount"){
            infor = parseInt(infor)
            event.percentDiscount = infor;
        }
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
        event.dayHappen = checkDay
        if(event.dailyEventName=== "" || event.timeStart ==="" 
        || event.timeEnd ==="" || event.percentDiscount === "" || event.dayHappen === "0000000"){
            setError("Hãy nhập đủ thông tin");
        }
        else if(event.timeStart >= event.timeEnd){
            setError("Thời gian bắt đầu lớn hơn thời gian kết thúc")
        }else{
        await fetch(`https://homeps.herokuapp.com/api/dailyEvents`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(event)
        })
        setCheckChangeEvent(!checkChangeEvent)
        setAdded(!isAdded)
        close()
        }
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
                                    onChange={e => handleChangeInforEvent("dailyEventName", e.target.value)}
                                />
                            </td>
                    </tr>
                    <tr>
                            <td style={{fontWeight:'700',marginBottom:'20px'}}>Thời gian bắt đầu</td>
                            <td>
                                <input  type='text' style={{width:'250px',paddingLeft:'10px',borderRadius:'10px',
                                            marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                                    type='time' 
                                    onChange={e => handleChangeInforEvent("timeStart", e.target.value)}
                                />
                            </td>
                    </tr>
                    <tr>
                            <td style={{fontWeight:'700',marginBottom:'20px'}}>Thời gian kết thúc</td>
                            <td>
                                <input  type='text' style={{width:'250px',paddingLeft:'10px',borderRadius:'10px',
                                            marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                                    type='time' 
                                    onChange={e => handleChangeInforEvent("timeEnd", e.target.value)}
                                />
                            </td>
                    </tr>
                    <tr >
                        <td style={{fontWeight:'700',marginBottom:'20px'}}>Ngày lặp lại</td>
                        <td style={{textAlign:'right'}}>
                            <div><label for='monday'>Thứ 2</label><input type='checkbox' id='monday' value = '0'className='weekday' /></div>
                            <div><label for='tuesday'>Thứ 3</label><input type='checkbox' id='tuesday' value = '1' className='weekday'/></div>
                            <div><label for='wednesday'>Thứ 4</label><input type='checkbox' id='wednesday' value = '2' className='weekday'/></div>
                            <div><label for='thursday'>Thứ 5</label><input type='checkbox' id='thursday' value = '3' className='weekday'/></div>
                            <div><label for='friday'>Thứ 6</label><input type='checkbox' id='friday' value = '4' className='weekday'/></div>
                            <div><label for='saturday'>Thứ 7</label><input type='checkbox' id='saturday' value = '5' className='weekday'/></div>
                            <div><label for='sunday' style={{marginBottom:'20px'}}>Chủ nhật</label><input type='checkbox' id='sunday' value = '6' className='weekday'/></div>
                        </td>
                    </tr>
                    <tr >
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
                    {(error !=="") ? (<div className="error">{error} </div>): ""}
                </div>
            </div>
            <button onClick={handleChangeEvents} style={{ width: '120px', alignSelf:'center', margin: '10px' ,marginLeft:'40%',marginBottom:'20px'}}>Thêm sự kiện</button>
        </div>
    )
}

export default AddDailyEvent


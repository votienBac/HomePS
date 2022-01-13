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
            <img onClick={close} src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8jHyAAAAAgHB0FAAAcFxjU1NQIAAAYExStrKwdGBlubGwhHB0aFRfZ2dnu7u739/cnIyRqaGmFg4Tj4+N/fX7i4uKPjo7y8vI1MTI6Nzj5+fkRCgzq6uqKiImgnp90cnOWlZViYGE/PT1bWVmko6NJR0eTkpKst4hvAAAEhklEQVR4nO2dbVfaQBBGIYgiYFtApbZUUWv9//+wjoiZCS8murMzs+e5X3sac8/d7ASPJL0eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOxy+jC9ubM+Cc3TeKpGg0F181Pl4O2525zGj/RHvq76xMXMVvF+cxqrefpD3676DhTfBPv9Kv1ZPIzejj00VLzbCvarb8kPvlj1zRVrwX71PfnRT+ujWykywdFfheNf1ce3uRaZ4KD6o/ET5iemikLwVOdnTCwVhWD6beYNw4o5ChJmFfMUJIwq5ipImFTMV5DgFTPdhucVNKiYWzB7xfyCmbcbC0G5UJUr2ghmXKg5x4QkU0WrggSrONL4pckrdgWJDEPDsiChfi1aC4qKGgvVXrChmLqiB8EXxUqt4pMLQcWKXgTVrsUn0zEhUanopyChMPo9FSTEdpOioq+CROKK/gQTD41zh4JJd9RzZ9fglmQVvQomGxo+l+iGeYqKfgsSCSr6FkwwNLwLfnlH9S8oK/7qqhhB8EsVYwhKxU4Vowg2Kv5u/d/iCH6yIhOcehdsbDftKkYqSHSuGKsg8dCtYrSCRKehEVGw0+iPKdhhaEQVlBUfD1eMK9hyaEQWlAv1QMV4Y0LyYcXYBYnJ2dEdNXpB4oEpPjYrxi9IzHlFqViGoFQUFUsRPLjdlCN4oGJJgnsrliW4p2JpgjuK5QlKxX8lCorRP16VKCgqlikoKpYpuFuxOMGmYoGCvd56VAtOBwUKvn9V+jXhTOUbkrYsKr5Kx6PiFKUgKV5an1JamoLFVdwVpLubgioywUG9o46HxVS8ZYIz9qX38aoQRS54dsmDFlKRC66ue2LNFlGxUZAoq+JOQYJfixfBFYVgPR0WxSiKJXrN/uGqkIV6oCDBK8a9uzlYkOAVp0EVjxQk4lfcMyYki+AV944JiaiY/rlPynxYkIhcsUVBgm03w3Goih9sMjW84jhQxeWxMSHhFfthKi7bFiRYxeFFEMUOBYl4FTsVJHjFYQDFZZsxIeEVZ+4Vl+3GhOQqUEUmOD1p/9vCRZhrseMmU8MrTh0r8oKdBGVFv4q84Ek3wRhDo/Wt2n78j/6jn+jb4L0iE5y2HhOShetPGlyw8zW4xfPov/38Lsrx+3mRX4PV5wX9XovLFEt0g8/Rf/uVOdjEo+Iy1RLdsHa3UD99L3oIb9uNKJjmYR2+hkbygoSnazHxNbjFT0XxaSLl82RERcNXhigVJHxUfNZ8IpCHocHvZBQeeWR/A6dakOAVLV4ZojAHm6xNh4Z6QWJtuN1kERSKF4Osis+6m0wNV8xZMZtgo2K27SajoM21eJ9TsDH6s1TMtMnU8IWaY/RnLkhMso5+A0G5ULWHhomgqKj8VhQjwXzbjZlg41pUW6j3uXdRziRDRVPBHKPf/EnpYqHqvS3XqiDBHsyk+bZcy+/wsmdsaL4t1/Ix1PVCVXxbru23sN8Xqt7bcq0fWvWmqPS23MHLkc2/Rz/ZnIbK3xOfz6pqbv+Xyk5OAwAAAAAAAAAAAAAAAAAAAAAAAAAAgJj8B0sMSmriXoasAAAAAElFTkSuQmCC'
            } className='ex-icon'></img>
            <table className='tb' style={{ width: '500px',marginLeft:'0px' }}>
                <tbody className='t'>
                    <tr  style={{ height: '2.765em' }}>
                        <th colSpan={2}>Thêm sự kiện</th>
                    </tr>   
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
            <button onClick={handleChangeEvents} style={{ width: '20%', alignSelf:'center', margin: '10px' ,marginLeft:'40%'}}>Thêm</button>
        </div>
    )
}

export default AddEvent
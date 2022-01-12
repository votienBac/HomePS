import { useState } from "react"

function AddService(){
    const [checkChangeService, setCheckChangeService] = useState(false)
    let service = []
    //Change Service 
    const handleChangeInforService = (key, infor) => {
        if(key=="price"){
            infor = parseInt(infor)
            service.price = infor;
        }
        if(key=="serviceName"){
            service.serviceName = infor;
        }
    }
    const [changeServicesDialog, setChangeServicesDialog] = useState(false)
    const closeChangeServicesDialog = () => {
        setChangeServicesDialog(false)
    }
    const handleChangeServices = async () => {
        await fetch(`https://homeps.herokuapp.com/api/extraservice`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify({ service })
        })
        setCheckChangeService(!checkChangeService)
        closeChangeServicesDialog()
    }

    return(
        <div className="add-service">
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
            <button onClick={handleChangeServices}>Thêm dịch vụ</button>
            <button onClick={closeChangeServicesDialog}>Quay lại</button>
        </div>
    )
}

export default AddService
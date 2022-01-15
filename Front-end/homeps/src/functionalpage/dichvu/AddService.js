import { useState } from "react"

function AddService({isAdded, setAdded, close}){
    const [checkChangeService, setCheckChangeService] = useState(false)
    let service = {
        serviceName: "",
        price: ""
    }
    const [error, setError] = useState("");
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
    const handleChangeServices = async () => {
        if(service.serviceName==="" ||service.price==="" ){
            setError("Hãy nhập đủ thông tin");
        }else{
            await fetch(`https://homeps.herokuapp.com/api/extraservice`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify(service)
        })
        setCheckChangeService(!checkChangeService)
        setAdded(!isAdded)
        close()
        }
    }

    return(
        <div className="add-service" style={{marginLeft:'13px'}}>
            <img onClick={close} src={'https://img.icons8.com/ios-filled/50/000000/x.png'
            } style={{position:'fixed',width:'15px',
            marginTop:'5px',marginLeft:'315px'}}></img>
                <div> 
                    <div  style={{ height: '3.965em' }}>
                        <th colSpan={2} style={{fontSize:'20px',paddingLeft:'110px'}}>Thêm dịch vụ</th>
                    </div>   
                        <tr>
                            <td style={{fontWeight:'700',marginBottom:'20px'}}>Tên dịch vụ</td>
                            <td>
                                <input style={{width:'200px',paddingLeft:'10px',borderRadius:'10px',
                                marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                                    type='text'
                                    onChange={e => handleChangeInforService("serviceName", e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:'700'}}>Giá (vnđ)</td>
                            <td>
                                <input style={{width:'200px',paddingLeft:'10px',borderRadius:'10px',
                                marginBottom:'10px',marginLeft:'20px',marginRight:'20px'}}
                                    type='number'
                                    min='0'
                                    onChange={e => handleChangeInforService("price", e.target.value)}
                                />
                            </td>
                        </tr>
                        {(error !=="") ? (<div className="error">{error} </div>): ""}
                </div>
            <button onClick={handleChangeServices} style={{marginTop:'20px',marginBottom:'10px',marginLeft:'33%'}}>Thêm dịch vụ</button>
        </div>
    )
}

export default AddService
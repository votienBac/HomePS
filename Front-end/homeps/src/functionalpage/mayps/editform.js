import React,{} from 'react'
import { useNavigate } from "react-router-dom";
import { useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';
const EditForm = () => {

  const navigate = useNavigate();
  const Back = () => {
      navigate(-1, {replace: true});
      setError("")
  } 
  let params = useParams();
  const psId = params.id
  const psStatus = params.status
  //Load the psData
  const [psData, setdata] = useState([])
  const [checkChangePs,setCheckChangePs] = useState(false)
  const [error, setError] = useState("")

      useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/ps/${psId}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(psData => setdata(psData))
    }, [checkChangePs])

    //Delete Ps Dialog
    const [deletePs, setDeletePs] = useState(false)
    const [CheckDeletePsDialog, setCheckDeletePsDialog] = useState(false)
    const closeCheckDeletePsDialog = () => {
      setCheckDeletePsDialog(false)
      // window.location.reload();
    }
    const handleDeletePs = async () => {
       await fetch(`https://homeps.herokuapp.com/api/ps/${psId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
        })
        navigate('/mayps')
        // if(psStatus ==="1"){const CheckDeletePsDialog =() =>setCheckDeletePsDialog(true)}
    }
     const closeDeletePsDialog = () => setDeletePs(false)

    //change dataPs
    const [ details,setDetails] = useState({psName:"",psStatus:""});
    const [changePsDialog, setChangePsDialog] = useState(false)
    const openChangePsDialog = () => {
      setChangePsDialog(true)
  }
    const closeChangePsDialog = () => {
    setError(false)
    setChangePsDialog(false)
    // window.location.reload();
  }

    const submitChange = () => {
    if(details.psName==="" ||details.psStatus==="" )
    {
        setError("Hãy nhập đủ thông tin");
    }else if(psStatus ==="1"){
      setError("Máy đang được sử dụng không thể sửa");
    }else if(details.psStatus !=="0" && details.psStatus !=="2"){
      setError("Trạng thái không hợp lệ")
    }
    else{
      fetch(`https://homeps.herokuapp.com/api/ps/${psId}?psName=${details.psName}&psStatus=${details.psStatus}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
      },
      })
      .then(res => res.json())
      .then(details => setDetails(details))
      setError(false)
      setCheckChangePs(!checkChangePs)
      closeChangePsDialog()
      // window.location.reload();


  }
}
  return ( 
    <div>
      <section className='pageDetail'>
        <div className="container">
                     <div className="col-detail">
                        <ul className="top-bar-detailsName">
                            <li className="row">ID</li>
                            <li className="row">Tên máy</li>
                            <li className="row">Trạng thái</li>
                        </ul>
                        <ul className="top-bar-details-inf">
                            <li className="row">{psData.psId}</li>
                            <li className="row">{psData.psName}</li>
                            <li className="row">{psData.psState}</li>
                        </ul>
                    </div>

        </div>

    <div className='button-detail'>
      <button className="row" onClick={() => openChangePsDialog(1, 0)}>Sửa thông tin</button>
      <button className="delete-turn" onClick={() => { 
          if(psStatus === "1"){
            setCheckDeletePsDialog(true)
          }else{
            setDeletePs(true)
          }}}> Xóa máy </button>
      <button className="row" type = 'back'   onClick={Back}>Quay lại</button>
    </div>
    <Dialog open={changePsDialog} onClose={closeChangePsDialog} >
         <img onClick={closeChangePsDialog} src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8jHyAAAAAgHB0FAAAcFxjU1NQIAAAYExStrKwdGBlubGwhHB0aFRfZ2dnu7u739/cnIyRqaGmFg4Tj4+N/fX7i4uKPjo7y8vI1MTI6Nzj5+fkRCgzq6uqKiImgnp90cnOWlZViYGE/PT1bWVmko6NJR0eTkpKst4hvAAAEhklEQVR4nO2dbVfaQBBGIYgiYFtApbZUUWv9//+wjoiZCS8murMzs+e5X3sac8/d7ASPJL0eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOxy+jC9ubM+Cc3TeKpGg0F181Pl4O2525zGj/RHvq76xMXMVvF+cxqrefpD3676DhTfBPv9Kv1ZPIzejj00VLzbCvarb8kPvlj1zRVrwX71PfnRT+ujWykywdFfheNf1ce3uRaZ4KD6o/ET5iemikLwVOdnTCwVhWD6beYNw4o5ChJmFfMUJIwq5ipImFTMV5DgFTPdhucVNKiYWzB7xfyCmbcbC0G5UJUr2ghmXKg5x4QkU0WrggSrONL4pckrdgWJDEPDsiChfi1aC4qKGgvVXrChmLqiB8EXxUqt4pMLQcWKXgTVrsUn0zEhUanopyChMPo9FSTEdpOioq+CROKK/gQTD41zh4JJd9RzZ9fglmQVvQomGxo+l+iGeYqKfgsSCSr6FkwwNLwLfnlH9S8oK/7qqhhB8EsVYwhKxU4Vowg2Kv5u/d/iCH6yIhOcehdsbDftKkYqSHSuGKsg8dCtYrSCRKehEVGw0+iPKdhhaEQVlBUfD1eMK9hyaEQWlAv1QMV4Y0LyYcXYBYnJ2dEdNXpB4oEpPjYrxi9IzHlFqViGoFQUFUsRPLjdlCN4oGJJgnsrliW4p2JpgjuK5QlKxX8lCorRP16VKCgqlikoKpYpuFuxOMGmYoGCvd56VAtOBwUKvn9V+jXhTOUbkrYsKr5Kx6PiFKUgKV5an1JamoLFVdwVpLubgioywUG9o46HxVS8ZYIz9qX38aoQRS54dsmDFlKRC66ue2LNFlGxUZAoq+JOQYJfixfBFYVgPR0WxSiKJXrN/uGqkIV6oCDBK8a9uzlYkOAVp0EVjxQk4lfcMyYki+AV944JiaiY/rlPynxYkIhcsUVBgm03w3Goih9sMjW84jhQxeWxMSHhFfthKi7bFiRYxeFFEMUOBYl4FTsVJHjFYQDFZZsxIeEVZ+4Vl+3GhOQqUEUmOD1p/9vCRZhrseMmU8MrTh0r8oKdBGVFv4q84Ek3wRhDo/Wt2n78j/6jn+jb4L0iE5y2HhOShetPGlyw8zW4xfPov/38Lsrx+3mRX4PV5wX9XovLFEt0g8/Rf/uVOdjEo+Iy1RLdsHa3UD99L3oIb9uNKJjmYR2+hkbygoSnazHxNbjFT0XxaSLl82RERcNXhigVJHxUfNZ8IpCHocHvZBQeeWR/A6dakOAVLV4ZojAHm6xNh4Z6QWJtuN1kERSKF4Osis+6m0wNV8xZMZtgo2K27SajoM21eJ9TsDH6s1TMtMnU8IWaY/RnLkhMso5+A0G5ULWHhomgqKj8VhQjwXzbjZlg41pUW6j3uXdRziRDRVPBHKPf/EnpYqHqvS3XqiDBHsyk+bZcy+/wsmdsaL4t1/Ix1PVCVXxbru23sN8Xqt7bcq0fWvWmqPS23MHLkc2/Rz/ZnIbK3xOfz6pqbv+Xyk5OAwAAAAAAAAAAAAAAAAAAAAAAAAAAgJj8B0sMSmriXoasAAAAAElFTkSuQmCC'
                    } className='ex-icon'></img>
    <div style={{marginLeft:'25px',marginBottom:'10px',marginTop:'10px',width:'480px'}}>                 
       <div>
       <div  style={{ height: '3.965em' }}>
            <th colSpan={2} style={{fontSize:'20px',paddingLeft:'170px'}}>Thay đổi thông tin máy</th>
       </div> 
           <tr>
                <td style={{fontWeight:'700',marginBottom:'20px'}}>Tên máy</td>
                <td>
                   <input style={{width:'200px',paddingLeft:'10px',borderRadius:'10px',
                          marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                           type='text' placeholder={psData.psName} onChange={e => setDetails({...details,psName:e.target.value})} />
                </td>
            </tr>
            <tr>
                <td style={{fontWeight:'700',marginBottom:'20px'}}>Trạng thái</td>
                <td>
                   <input style={{width:'200px',paddingLeft:'10px',borderRadius:'10px',
                                            marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}} type='text' list ="status" placeholder={psData.psState} onChange={e => setDetails({...details,psStatus:e.target.value})} />
                   <datalist id="status">
                           <option value="0"> Có thể sử dụng</option>
                           <option value="2"> Đang hỏng</option>
                    </datalist>
                </td>
            </tr>
                {(error !=="") ? (<div className="error">{error} </div>): ""}
                    
         </div>
      </div>
                    <button style={{ height: '20%', alignSelf: 'center', margin: '10px' }}  onClick={submitChange}>Thay đổi</button><br></br>
                    {/* <button style={{ height: '20%', alignSelf: 'center', margin: '10px' }} onClick={Back}>Quay lại</button> */}

                </Dialog>
    <Dialog  open={CheckDeletePsDialog} >
          <DialogTitle>Máy đang được sử dụng không thể xóa</DialogTitle>
              <DialogActions>
                  <button onClick = {closeCheckDeletePsDialog}>Quay lại</button>
              </DialogActions>
           
    </Dialog>
    <Dialog open={deletePs} onClose={closeDeletePsDialog} >
          <DialogTitle>Bạn có chắc chắn muốn xóa máy?</DialogTitle>
          <DialogContent>Bạn không thể khôi phục lại máy sau khi đã xóa.</DialogContent>
              <DialogActions>
                  <button  onClick={handleDeletePs}>Xoá máy</button>
                   <button onClick={() => setDeletePs(false)}>Quay về</button>
              </DialogActions>
           
    </Dialog>
    </section>

    </div>
  


  )
}
export default EditForm

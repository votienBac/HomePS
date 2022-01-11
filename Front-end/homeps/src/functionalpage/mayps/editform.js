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
  } 
  let params = useParams();
  const psId = params.id
  // const psName = params.id
  // const psStatus = params.id
  const [psData, setdata] = useState([])
  const [error, setError] = useState("")
      //Load the psData
      useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/ps/${psId}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(psData => setdata(psData))
    }, [])
    //Delete Ps Dialog
    const [deletePs, setDeletePs] = useState(false)
    const handleDeletePs = async () => {
        await fetch(`https://homeps.herokuapp.com/api/ps/${psId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
        })
        navigate('/mayps')
    }
    const closeDeletePsDialog = () => setDeletePs(false)

    //change dataPs

    const [ details,setDetails] = useState({psName:"",psStatus:""});
    const [changePsDialog, setChangePsDialog] = useState(false)

    const submitChange = () => {
      if(details.psName==="" ||details.psStatus==="" ){
        setError("Hãy nhập đủ thông tin");
    }else{
      fetch(`https://homeps.herokuapp.com/api/ps/${psId}?psName=${details.psName}&psStatus=${details.psStatus}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
      },
      })
      .then(res => res.json())
      .then(details => setDetails(details))
      setChangePsDialog(true)


  }
}

  return ( 
    
    <div>
        <p>
          <strong>Thông tin máy ID: {psId} </strong> 
        </p>
        <div className="container">
                <label>Tên máy</label>
                <input align='center' id ="psName" placeholder={psData.psName} onChange={e => setDetails({...details,psName:e.target.value})} value={details.psName}   /><p></p>

                <label>Trạng thái</label> 
                <input align='center' id = "psVersion" list ="status" placeholder={psData.psStatus} onChange={e => setDetails({...details,psStatus:e.target.value})} value={details.psStatus} />
                    <datalist id="status">
                           <option value="0"> Trống </option>
                           <option value="1"> Đang sử dụng</option>
                           <option value="2"> Đang hỏng</option>
                    </datalist>
                
                <p></p>
                {/* <label>Tình trạng</label> 
                <input id= "psState" placeholder={psData.psState}   /><p></p> */}
                {(error !=="") ? (<div className="error">{error} </div>): ""}

             
        </div>

    <div className='button-detail'>
      <button className="row"  type = 'submit' color="primary" onClick={submitChange}>Lưu</button>
      <button className="delete-turn" onClick={() => { setDeletePs(true) }}> Xóa máy </button>
      <button className="row" type = 'back' color= "danger"  onClick={Back}>Quay lại</button>
    </div>
    <Dialog open={deletePs} onClose={closeDeletePsDialog} >
          <DialogTitle>Bạn có chắc chắn muốn xóa máy?</DialogTitle>
          <DialogContent>Bạn không thể khôi phục lại máy sau khi đã xóa.</DialogContent>
              <DialogActions>
                  <button  onClick={handleDeletePs}>Xoá máy</button>
                   <button onClick={() => setDeletePs(false)}>Quay về</button>
              </DialogActions>
    </Dialog>
    <Dialog open={changePsDialog} className = "dialog">
        <DialogTitle className="dialogTitle">Bạn đã đổi thông tin thành công</DialogTitle>
        <DialogContent>Vui lòng quay trở lại</DialogContent>
        <DialogActions>
            <button onClick = {Back}>Đồng ý</button>
        </DialogActions>
    </Dialog>

   
    </div>
  


  )
}
export default EditForm

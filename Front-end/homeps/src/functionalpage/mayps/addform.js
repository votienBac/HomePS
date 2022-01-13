import React,{} from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';
const AddForm = () => {

  const navigate = useNavigate();
  const Back = () => {
      navigate(-1, {replace: true});
  } 
    //change dataPs

    const [ details,setDetails] = useState({psName:"",psStatus:""});
    const [changePsDialog, setChangePsDialog] = useState(false)
    const [error, setError] = useState("");



    const submitChange = () => {
      if(details.psName==="" ||details.psStatus==="" ){
        setError("Hãy nhập đủ thông tin");
    }else{
      var news = JSON.stringify({
        "psName": details.psName,
        "psStatus": details.psStatus
      });
      fetch(`https://homeps.herokuapp.com/api/ps`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
      },
      body: news,
      })
      .then(res => res.json())
      .then(details => setDetails(details))
      setChangePsDialog(true)


  }
}

  return ( 
    
    <div className='pageDetail'>
        <p>
          <strong>Thông tin máy</strong> 
        </p>
        <div>
                <label style={{fontWeight:'700'}}>Tên máy</label>
                <input id ="input"  onChange={e => setDetails({...details,psName:e.target.value})} value={details.psName}  
                className='input1'  style={{marginLeft:'100px'}}/><p></p>

                <label style={{fontWeight:'700'}}>Trạng thái</label> 
                <input id = "input" list='status' onChange={e => setDetails({...details,psStatus:e.target.value})} value={details.psStatus}
                className='input1' style={{marginLeft:'88px'}}/>
                <datalist id="status">
                           <option value="0"> Có thể sử dụng </option>
                           <option value="2"> Đang hỏng</option>
                    </datalist>
                <p></p>
                {(error !=="") ? (<div className="error">{error} </div>): ""}

             
        </div>

    <div className='button-detail' >
      <button className="row"  onClick={submitChange}>Lưu</button>

      <button  className="row"  onClick={Back}>Quay lại</button>
    </div>
 
    <Dialog open={changePsDialog} className = "dialog">
        <DialogTitle className="dialogTitle">Bạn đã thêm máy thành công</DialogTitle>
        <DialogContent>Vui lòng quay trở lại</DialogContent>
        <DialogActions>
            <button onClick = {Back}>Đồng ý</button>
        </DialogActions>
    </Dialog>

   
    </div>
  


  )
}
export default AddForm

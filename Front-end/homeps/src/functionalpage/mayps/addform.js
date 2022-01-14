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
    }else if(details.psStatus !=="0" && details.psStatus !=="2"){
      setError("Trạng thái không hợp lệ")
    }
    else{
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
       <div  style={{ height: '3.965em' }}>
            <th colSpan={2} style={{fontSize:'20px'}}>Thông tin máy</th>
       </div>
          <tr>
        
                <td colSpan={2} style={{fontSize:'18px'}}>Tên máy</td>
                <td>
                   <input id='input' style={{width:'400px',paddingLeft:'10px',borderRadius:'10px',
                          marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                           type='text' onChange={e => setDetails({...details,psName:e.target.value})} value={details.psName}  />
                </td>
          </tr>  
          <tr>
                <td colSpan={2} style={{fontSize:'18px'}}>Trạng thái</td> 
                <td>
                  <input id='input'  list='status' style={{width:'400px',paddingLeft:'10px',borderRadius:'10px',
                         marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}} onChange={e => setDetails({...details,psStatus:e.target.value})} value={details.psStatus}/>
                    <datalist id="status">
                           <option value="0"> Có thể sử dụng </option>
                           <option value="2"> Đang hỏng</option>
                    </datalist>
                  </td>
          </tr>     
                {(error !=="") ? (<div className="error">{error} </div>): ""}
         
           
        

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

import React,{} from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';
const AddForm = () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('access_token'));
  myHeaders.append("Content-Type", "application/json");
  const navigate = useNavigate();
  const Back = () => {
      navigate(-1, {replace: true});
  } 
    //change dataPs

    const [ details,setDetails] = useState({psName:"",psStatus:"0"});
    const [changePsDialog, setChangePsDialog] = useState(false)
    const [error, setError] = useState("");



    const submitChange = async() => {
      if(details.psName===""){
        setError("Hãy nhập đủ thông tin");
      }
    else{
      var news = JSON.stringify({
        "psName": details.psName,
        "psStatus" : "0"
      });
      await fetch(`https://homeps.herokuapp.com/api/ps`, {
        method: 'POST',
        headers: myHeaders,
      body: news,
      })
      .then(res => res.json())
      .then(details => setDetails(details))
      setChangePsDialog(true)


  }
}

  return ( 
    <div className='pageBody'>        <img onClick={() => navigate(-1)} src={'https://img.icons8.com/ios/50/000000/circled-left-2.png'
  } className='back-icon'/>
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
                {(error !=="") ? (<div className="error">{error} </div>): ""}
         
           
        

    <div className='button-detail' >
      <button className="row"  onClick={submitChange}>Lưu</button>

    </div>
 
    <Dialog open={changePsDialog} className = "dialog">
        <DialogTitle className="dialogTitle">Bạn đã thêm máy thành công</DialogTitle>
        <DialogContent>Vui lòng quay trở lại</DialogContent>
        <DialogActions>
            <button onClick = {Back}>Đồng ý</button>
        </DialogActions>
    </Dialog>

   
    </div>
  

  </div>
  )
}
export default AddForm

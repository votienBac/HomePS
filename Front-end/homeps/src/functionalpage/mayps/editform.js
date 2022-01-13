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
    setChangePsDialog(false)
    setError("")
    // window.location.reload();
  }

    const submitChange = () => {
    if(details.psName==="" ||details.psStatus==="" )
    {
        setError("Hãy nhập đủ thông tin");
    }else if(psStatus ==="1"){
      setError("Máy đang được sử dụng không thể sửa");
    }else if(details.psStatus ==="1"){
      setError("Trạng thái 1-Đang được sử dụng, không thể được lựa chọn")
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
      setCheckChangePs(!checkChangePs)
      closeChangePsDialog()
      // window.location.reload();


  }
}
  return ( 
    <div>
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
      <table>
         <tbody>
           <tr>
                <td style={{fontSize:'20px'}} >Tên máy</td>
                <td>
                   <input className='input1'  style={{marginLeft:'20px'}}   type='text' placeholder={psData.psName} onChange={e => setDetails({...details,psName:e.target.value})} />
                </td>
            </tr><br></br>
            <tr>
                <td style={{fontSize:'20px'}} >Trạng thái</td>
                <td>
                   <input className='input1'  style={{marginLeft:'20px'}}type='text' list ="status" placeholder={psData.psState} onChange={e => setDetails({...details,psStatus:e.target.value})} />
                   <datalist id="status">
                           <option value="0"> Có thể sử dụng</option>
                           <option value="2"> Đang hỏng</option>
                    </datalist>
                </td>
            </tr><br></br>
                {(error !=="") ? (<div className="error">{error} </div>): ""}
                </tbody>      
       </table>
                    <button style={{ height: '20%', alignSelf: 'center', margin: '10px' }}  onClick={submitChange}>Thay đổi</button><br></br>
                    {/* <button style={{ height: '20%', alignSelf: 'center', margin: '10px' }} onClick={Back}>Quay lại</button> */}
                </Dialog>
    <Dialog  open={CheckDeletePsDialog} >
          <DialogTitle>Máy đang được sử dụng không thể xóa</DialogTitle>
              <DialogActions>
                  <button onClick = {Back}>Quay lại</button>
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

    </div>
  


  )
}
export default EditForm

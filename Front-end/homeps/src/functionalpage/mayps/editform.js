import React,{} from 'react'
import { useNavigate } from "react-router-dom";
import { useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';
const EditForm = () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('access_token'));
  myHeaders.append("Content-Type", "application/json");
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
            method: 'GET',
            headers: myHeaders
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
            headers: myHeaders,
        })
        navigate('/mayps')
        // if(psStatus ==="1"){const CheckDeletePsDialog =() =>setCheckDeletePsDialog(true)}
    }
     const closeDeletePsDialog = () => setDeletePs(false)

    //change dataPs
    //const [ details,setDetails] = useState({psName:"",psStatus:""});
    let details = {psName: psData.psName, psStatus: psData.psStatus};
    const [changePsDialog, setChangePsDialog] = useState(false)
    const [checkChangePsStatusDialog,setCheckChangePsStatusDialog] = useState(false)
    const openChangePsDialog = () => {
      if(psStatus ==="1"){
        setCheckChangePsStatusDialog(true)
      }else{
        setChangePsDialog(true)
      }
  }
    const closeChangePsDialog = () => {
    setError(false)
    setChangePsDialog(false)
    
    // window.location.reload();
  }
    const closeCheckChangePsStatusDialog = () =>{
      setCheckChangePsStatusDialog(false)
    }
    const submitChange = async() => {
    if(details.psName==="" ||details.psStatus==="" )
    {
        setError("Hãy nhập đủ thông tin");
    }else if(details.psStatus !="0" && details.psStatus !="2"){
      setError("Trạng thái không hợp lệ")
    }
    else{
      await fetch(`https://homeps.herokuapp.com/api/ps/${psId}?psName=${details.psName}&psStatus=${details.psStatus}`, {
        method: 'PUT',
        headers: myHeaders
      })
      .then(res => res.json())
      .then(details => details)
      setError(false)
      setCheckChangePs(!checkChangePs)
      closeChangePsDialog()
      window.location.reload();


  }
}
  return ( 
    <div className='pageBody'>
    <img onClick={() => navigate(-1)} src={'https://img.icons8.com/ios/50/000000/circled-left-2.png'
    } className='back-icon'/>
      <section className='pageDetail'>
        <div className="container">
                     <div className="col-detail">
                        <ul className="top-bar-detailsName">
                            <li style={{ marginBottom: '10px' }}>ID</li>
                            <li style={{ marginBottom: '10px' }}>Tên máy</li>
                            <li style={{ marginBottom: '10px' }}>Trạng thái</li>
                        </ul>
                        <ul className="top-bar-details-inf">
                            <li style={{ marginBottom: '10px' }}>{psData.psId}</li>
                            <li style={{ marginBottom: '10px' }}>{psData.psName}</li>
                            <li style={{ marginBottom: '10px' }}>{psData.psState}</li>
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
    </div>
    <Dialog open={changePsDialog} onClose={closeChangePsDialog} >
         <img onClick={closeChangePsDialog} src={'https://img.icons8.com/ios-filled/50/000000/x.png'
                    } className='ex-icon' style={{marginLeft:'340px'}}></img>
    <div style={{marginLeft:'25px',marginBottom:'10px',marginTop:'10px',width:'350px'}}>                 
       <div>
       <div  style={{ height: '3.965em' }}>
            <th colSpan={2} style={{fontSize:'20px',paddingLeft:'60px'}}>Thay đổi thông tin máy</th>
       </div> 
           <tr>
                <td style={{fontWeight:'700',marginBottom:'20px'}}>Tên máy</td>
                <td>
                   <input style={{width:'200px',paddingLeft:'10px',borderRadius:'10px',
                          marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}}
                           type='text' placeholder={psData.psName} onChange={e => details.psName = e.target.value} />
                </td>
            </tr>
            <tr>
                <td style={{fontWeight:'700',marginBottom:'20px'}}>Trạng thái</td>
                <td>
                   <select style={{width:'218px',paddingLeft:'10px',borderRadius:'10px', 
                                            marginBottom:'20px',marginLeft:'20px',marginRight:'20px'}} type='text' placeholder={psData.psState} onChange={e => details.psStatus=e.target.value} >
                   
                           <option value="0"> Có thể sử dụng</option>
                           <option value="2" selected ={(psData.psStatus == '2')}> Đang hỏng</option>
                    </select>
                </td>
            </tr>
                {(error !=="") ? (<div className="error">{error} </div>): ""}
                    
         </div>
      </div>
                    <button style={{ height: '20%', alignSelf: 'center', margin: '10px' }}  onClick={submitChange}>Thay đổi</button><br></br>
                    {/* <button style={{ height: '20%', alignSelf: 'center', margin: '10px' }} onClick={Back}>Quay lại</button> */}

    </Dialog>
    <Dialog open = {checkChangePsStatusDialog} onClose={closeCheckChangePsStatusDialog}>
          <DialogTitle>Máy đang được sử dụng không thể sửa đổi</DialogTitle>
              <DialogActions>
                  <button onClick = {closeCheckChangePsStatusDialog}>Quay lại</button>
          </DialogActions>
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

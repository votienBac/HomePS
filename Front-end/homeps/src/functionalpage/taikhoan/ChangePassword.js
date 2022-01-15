import React, {useState} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';

function ChangePassword({setPage,Logout}) {
    const [ details,setDetails] = useState({mkcu:"", mkmoi:"",xn:""});
    const [error,setError] = useState("");
    const [ out,setOut] = useState(false);
    const submitHandler = e => {
        e.preventDefault();
    }
    const Complete = () => {
        if(details.mkcu==="" || details.mkmoi==="" ||details.xn==="" ){
            setError("Hãy nhập đủ thông tin");
        }else if(details.mkmoi !== details.xn){
            setError("Xác nhận mật khẩu không chính xác");
        }else if(details.mkmoi === details.mkcu){
            setError("Trùng mật khẩu cũ");
        }else{
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('access_token'));
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
              "username": "admin",
              "oldPassword": details.mkcu,
              "newPassword": details.mkmoi
            });
            var requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            fetch("https://homeps.herokuapp.com/api/user", requestOptions)
              .then(response => response.json())
              .then(result => {
                  if(result.message === "Wrong password."){
                    setError("Mật khẩu hiện tại không chính xác");
                  }else{
                    setOut(true);
                  }
                })
              .catch(error => {
                  console.log('error', error)
                });
        }
      }
    return (
      <div className='pageDetail'>
        <form onSubmit={ submitHandler } className='forms' style={{paddingLeft:'30%'}}>
            <div className="form-inner">
                <h2>Đổi mật khẩu</h2>
                <div className="form-group">
                    <label htmlFor="password">Mật khẩu hiện tại:</label>
                    <input type="password" name = "password" id = "password"  onChange={e => setDetails({...details,mkcu:e.target.value})} value={details.mkcu}/>           
                    <label htmlFor="password">Mật khẩu mới: </label>
                    <input type="password" name = "password" id = "password"  onChange={e => setDetails({...details,mkmoi:e.target.value})} value={details.mkmoi}/>
                    <label htmlFor="password">Nhập lại mật khẩu mới: </label>
                    <input type="password" name = "password" id = "password"  onChange={e => setDetails({...details,xn:e.target.value})} value={details.xn}/>
                    {(error !== "") ? (<div className="error">{error}</div>) : ""}                   
                </div>
                <input type="submit" className="submitt" value="Đổi mật khẩu"  onClick={Complete} />
                <Dialog open={out} className="dialog">
                  <DialogTitle className="dialogTitle">Bạn đã đổi mật khẩu thành công</DialogTitle>
                  <DialogContent>Vui lòng quay trở lại trang đăng nhập</DialogContent>
                  <DialogActions>
                      <button onClick = {Logout}>Đồng ý</button>
                  </DialogActions>
                </Dialog>
            </div>
        </form>
      </div>  
    )
}

export default ChangePassword
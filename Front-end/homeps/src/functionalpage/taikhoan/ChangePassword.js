import React, {useState} from 'react'

function ChangePassword({setPage}) {
    const [ details,setDetails] = useState({mkcu:"", mkmoi:"",xn:""});
    const [error,setError] = useState("");
    const submitHandler = e => {
        e.preventDefault();
    }
    const Complete = () => {
        if(details.mkcu==="" || details.mkmoi==="" ||details.xn==="" ){
            setError("Hãy nhập đủ thông tin");
        // }else if(details.mkcu !== ){
        //     setError("Mật khẩu hiện tại không chính xác");
        }else if(details.mkmoi !== details.xn){
            setError("Xác nhận mật khẩu không chính xác");
        }else if(details.mkmoi === details.mkcu){
            setError("Trùng mật khẩu cũ");
        }else{
            var myHeaders = new Headers();
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
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => {
                  console.log('error', error)
                });


            back();
        }
      }
    const back = () => {
        setPage({page:"account"});
    }
    return (
        <form onSubmit={ submitHandler }>
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
                <input type="submit" value="Trở lại" onClick={back}/>
                <input type="submit" className="submitt" value="Đổi mật khẩu"  onClick={Complete} />
            </div>
        </form>
    )
}

export default ChangePassword
import React, {useState} from "react";
import '../../css/login.css';
export default function Login(){
  const [ details,setDetails] = useState({username:"admin",password:""});
  const [error,setError] = useState("");
  const submitHandler = e => {
      e.preventDefault();
      if(details.password === ""){
        setError("Hãy nhập mật khẩu");
      }else
        login()    
  }
  const login = () =>{
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      var urlencoded = new URLSearchParams();
      urlencoded.append("username", details.username);
      urlencoded.append("password", details.password);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
    fetch("https://homeps.herokuapp.com/login", requestOptions)
      .then(response => {
          console.log(response)
          if(response.ok)
            return response.json()
          throw Error(response.status)
        })
      .then(result =>{
          console.log(result)
          localStorage.setItem("access_token",result.access_token)
          window.location.href =window.location.href + "luotchoi";} )
      .catch(error => {
        setError("Mật khẩu không chính xác")
        console.log('error', error)
      });
}

  return(
    <div className="AppLogin">
      <form onSubmit={ submitHandler }>
        <div className="form-inner">
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu: </label>
            <input type="password" name = "password" id = "password"  onChange={e => setDetails({...details,password:e.target.value})} value={details.password}/>
          </div>
            {(error !== "") ? (<div className="error">{error}</div>) : ""}
            <input type="submit" value="LOGIN"/>
        </div>
      </form>
    </div>
  )
}
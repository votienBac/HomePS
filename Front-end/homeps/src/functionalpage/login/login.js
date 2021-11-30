import React, {useState} from "react";


export default function Login(){
  const adminUser = {password:"12345"};
  const [ details,setDetails] = useState({password:""});
  const [error,setError] = useState("");
  const submitHandler = e => {
      e.preventDefault();
      sign();
  }
  const sign = () => {
    console.log(details);
    if(details.password == ""){
      console.log("False1");
      setError("Vui lòng nhập mật khẩu");
    }else{
      if (details.password == adminUser.password){
        console.log("logged in");
        window.location.href =window.location.href + "/luotchoi";
      }else{
        console.log("False");
        setError("Mật khẩu không chính xác")
      }
    }
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
            {(error != "") ? (<div className="error">{error}</div>) : ""}
            <input type="submit" value="LOGIN" onClick={sign} />
        </div>
      </form>
    </div>
  )
}
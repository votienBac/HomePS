import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import '../../css/taikhoan.css';
import '../../css/popup.css';
export default function TaiKhoan(){
    const [page, setPage] = useState({page: "change"});
    let navigate = useNavigate();
    const Logout = () => {
        sessionStorage.clear();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('access_token'));
        myHeaders.append("Content-Type", "application/json");
        var urlencoded = new URLSearchParams();
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        fetch("http://homeps.herokuapp.com/logout", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => {
            console.log('error', error)
          });

        navigate('/', {replace: true});
    }
    const change = () => {
        setPage({page:"change"});
    }
    return(
        <div className="pageBody">
            {(page.page === "change") ? (
                <ChangePassword setPage={setPage} Logout={Logout}/>
            ) : (
                <div className="taikhoan">
                    <input type="submit" value="Đăng xuất" onClick={Logout}/>
                    <input type="submit" value="Đổi mật khẩu"  onClick={change} />
                </div>
               
            )}
        </div>
    )
}
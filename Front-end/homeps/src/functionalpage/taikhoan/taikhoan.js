import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import '../../css/taikhoan.css';
import '../../css/popup.css';
export default function TaiKhoan(){
    const [page, setPage] = useState({page: "account"});
    let navigate = useNavigate();
    const Logout = () => {
        localStorage.clear();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
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
        <div className="doimk">
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
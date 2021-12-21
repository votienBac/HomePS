import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import '../../css/taikhoan.css';
export default function TaiKhoan(){
    const [user, setUser] = useState({password: "12345"});
    const [page, setPage] = useState({page: "account"});
    let navigate = useNavigate();
    const Logout = () => {
        navigate('/', {replace: true});
    }
    const change = () => {
        setPage({page:"change"});
    }
    return(
        <div className="doimk">
            {(page.page === "change") ? (
                <ChangePassword setPage={setPage} user={user} setUser={setUser}/>
            ) : (
                <div className="taikhoan">
                    <input type="submit" value="Đăng xuất" onClick={Logout}/>
                    <input type="submit" value="Đổi mật khẩu"  onClick={change} />
                </div>
            )}
        </div>
    )
}
import React, {useState} from "react";
import ChangePassword from "./ChangePassword";

export default function TaiKhoan(){
    const [user, setUser] = useState({password: "12345"});
    const [page, setPage] = useState({page: "account"});

    const Logout = () => {
        window.location.href = "/";
    }
    const change = () => {
        setPage({page:"change"});
    }
    return(
        <div>
            {(page.page == "change") ? (
                <ChangePassword setPage={setPage} user={user} setUser={setUser}/>
            ) : (
                <div>
                    <input type="submit" value="Đăng xuất" onClick={Logout}/>
                    <input type="submit" value="Đổi mật khẩu"  onClick={change} />
                </div>
            )}
        </div>
    )
}
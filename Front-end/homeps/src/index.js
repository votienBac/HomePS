import React, {useState} from "react";
import ReactDOM from 'react-dom';
import LuotChoi from './functionalpage/luotchoi/luotchoi.js';
import MayPS from './functionalpage/mayps/mayps.js';
import SuKien from './functionalpage/sukien/sukien.js';
import DichVu from './functionalpage/dichvu/dichvu.js';
import ThongKe from './functionalpage/thongke/thongke.js';
import TaiKhoan from './functionalpage/taikhoan/taikhoan.js';
import Login from './functionalpage/login/login.js';
import './css/index.css';
import './css/index_dark.css';

import { Tab,Tabs ,Menu, MenuItem} from '@material-ui/core';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";
import store from './store/store.js'
import { Provider } from 'react-redux'

export default function App() {
        const navigate = useNavigate()
        const location = useLocation();
        const isLogin = location.pathname === "/";

        const [value, setValue] = React.useState('luotchoi');

        const [darkMode, setDarkMode] = useState(false);
        const changeMode =() =>{
                localStorage.setItem("dark-mode",darkMode)
                if(darkMode){
                        document.body.style.background = "#F9F9FA";
                }else{
                        document.body.style.background = "#212121";
                }
        }

        const mql = window.matchMedia('(max-width: 2000px)');
        const smallScreen = mql.matches;

        const [anchorEl, setAnchorEl] = React.useState(null);
        function handleClick(event) {
                if (anchorEl !== event.currentTarget) {
                  setAnchorEl(event.currentTarget);
                }
              }
            
        function handleClose() {
                setAnchorEl(null);
        }

        const handleChange = (event, newValue) => {
                setValue(newValue);
                navigate('/'+newValue);
        };
        const change = () =>{
                setValue('luotchoi')
        }
        const handleDMK = () => {
                setValue('taikhoan')
                navigate('/taikhoan');
        }
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

        if(!localStorage.getItem("access_token") && !isLogin) {
                window.location.href = "/"
                return <Login />
        }

        if(isLogin) {
                return <Login />
        }else
        return (
        <div> 
        {!isLogin && (
        <div className='headerOut'>
        <div className={darkMode ? "header-dark" : "header"}>
                <Link to ="/luotchoi"><img onClick={change} 
                        src={darkMode ? "https://cdn.discordapp.com/attachments/916240096196431892/929912871620575272/playstation-icon-logo-isolated-sign-symbol-vector-illustration-high-quality-black-style-icons-198185612.jpg" : "https://cdn.discordapp.com/attachments/916240096196431892/929744287074230362/playstation-icon-logo-isolated-sign-symbol-vector-illustration-high-quality-black-style-icons-198185612.jpg" }></img></Link>
        
                <div className="btn-group">
                        <Tabs value={value} onChange={handleChange} variant={smallScreen ? 'scrollable' : 'standard'}
                                TabIndicatorProps={{style: {backgroundColor: "white"}}}>
                                <Tab value = 'luotchoi' label="Lượt chơi" />
                                <Tab value = 'mayps' label="Máy PS" />
                                <Tab value = 'sukien' label="Sự kiện" />
                                <Tab value = 'dichvu' label="Dịch vụ" />
                                <Tab value = 'thongke' label="Thống kê" />
                                <Tab value = 'taikhoan' label="Tài khoản" 
                                        onClick = {handleClick} 
                                        onMouseOver={handleClick}
                                />
                        </Tabs>
                        <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                MenuListProps={{ onMouseLeave: handleClose }}
                                marginThreshold={61}
                        >
                                <MenuItem onClick={handleDMK}>Đổi mật khẩu</MenuItem>
                                <MenuItem onClick={Logout}>Logout</MenuItem>
                        </Menu>
                </div>
                
                <label>
                        <input type="checkbox" onChange={()=> {
                                setDarkMode(!darkMode);
                                changeMode()
                                }}></input>
                        <span className="check"></span>
                </label>

        </div>
        </div>
        )}
        <div className={darkMode ? "pageMain-dark" : "pageMain"}>
        <Routes>
          <Route path="/luotchoi/*"
                  element = {<LuotChoi />}>
          </Route>
          <Route path="/mayps/*"
                  element = {<MayPS />}>
          </Route>
          <Route path="/sukien/*"
                  element = {<SuKien />}>
          </Route>
          <Route path="/dichvu/*"
                  element = {<DichVu />}>
          </Route>
          <Route path="/thongke/*"
                  element = {<ThongKe />}>
          </Route>
          <Route path="/taikhoan/*"
                  element = {<TaiKhoan />}> 
          </Route>
          <Route  path="/"
                  element = {<Login/>}>
          </Route>
          <Route path="/*"
                  element = {<Error />}>  
          </Route> 
        </Routes>
        </div>
    </div>
    )
}


function Error(){
        window.location.href = "/luotchoi"
  //return <a href="/luotchoi" style={{ textDecoration: 'underline' }} to="/">Return to home page</a>
}


ReactDOM.render(
  <Provider store = {store}>
          <Router>
                <App />
          </Router>
  </Provider>,
  document.getElementById('root')
);


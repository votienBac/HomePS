import React from 'react';
import ReactDOM from 'react-dom';
import LuotChoi from './functionalpage/luotchoi/luotchoi.js';
import MayPS from './functionalpage/mayps/mayps.js';
import SuKien from './functionalpage/sukien/sukien.js';
import DichVu from './functionalpage/dichvu/dichvu.js';
import ThongKe from './functionalpage/thongke/thongke.js';
import TaiKhoan from './functionalpage/taikhoan/taikhoan.js';
import Login from './functionalpage/login/login.js';
import './css/index.css';
import { Tab,Tabs } from '@material-ui/core';
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

        const handleChange = (event, newValue) => {
                setValue(newValue);
                navigate('/'+newValue);
        };

        if(!localStorage.getItem("access_token") && !isLogin) {
                window.location.href = "/"
                return <Login />
        }

        return (
        <div> 
        {!isLogin && (
        <div className='headerOut'>
        <div className='header'>
                <Link to ="/luotchoi"><img  src="https://thumbs.dreamstime.com/b/playstation-icon-logo-isolated-sign-symbol-vector-illustration-high-quality-black-style-icons-198185612.jpg"></img></Link>
        
                <div className="btn-group">
                        <Tabs value={value} onChange={handleChange} variant='fullWidth'>
                                <Tab value = 'luotchoi' label="Lượt chơi" />
                                <Tab value = 'mayps' label="Máy PS" />
                                <Tab value = 'sukien' label="Sự kiện" />
                                <Tab value = 'dichvu' label="Dịch vụ" />
                                <Tab value = 'thongke' label="Thống kê" />
                                <Tab value = 'taikhoan' label="Tài khoản" />
                        </Tabs>
                </div>
                <label>
                        <input type="checkbox"></input>
                        <span class="check"></span>
                </label>

        </div>
        </div>
        )}
        <div className="pageMain">
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


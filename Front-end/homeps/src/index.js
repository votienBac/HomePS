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
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import store from './store/store.js'
import { Provider } from 'react-redux'

export default function App() {
  
  return (
    <div> 
    <Router>
      <a href="/"><h1>HOME PS</h1></a>
        <Routes>
          <Route path="/luotchoi"
                  element = {<LuotChoi />}>
          </Route>
          <Route path="/mayps"
                  element = {<MayPS />}>
          </Route>
          <Route path="/sukien"
                  element = {<SuKien />}>
          </Route>
          <Route path="/dichvu"
                  element = {<DichVu />}>
          </Route>
          <Route path="/thongke"
                  element = {<ThongKe />}>
          </Route>
          <Route path="/taikhoan"
                  element = {<TaiKhoan />}> 
          </Route>
          <Route path="/"
                  element = {<Login />}>
          </Route>
          <Route path="/**"
                  element = {<Error />}>  
          </Route> 
        </Routes>
    </Router>
    </div>
    )
}


function Error(){
  return <a href="/luotchoi" style={{ textDecoration: 'underline' }} to="/">Return to home page</a>
}


ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


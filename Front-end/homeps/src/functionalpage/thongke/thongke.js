import BarChart from "./revenuachart"
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, MenuItem } from "@material-ui/core";
import '../../css/thongke.css';

export default function ThongKe(){
    const [dateBegin, setDateBegin] = useState(new Date("2021/01/01"));
    const [dateEnd, setDateEnd] = useState(new Date());
    const [queryType, setQueryType] = useState('ngay');
    const isQueryNgay = (queryType === 'ngay')
    const handleChange = (event) => {
        setQueryType(event.target.value);
    }
    var stringBegin;
    var stringEnd
    if(isQueryNgay){
        stringBegin = getParsedDate(dateBegin);
        stringEnd = getParsedDate(dateEnd);
    }
    else{
        stringBegin = getParsedDate(dateBegin);
        stringEnd = getParsedDate(dateEnd);
    }
    return(
        <div>
            {isQueryNgay? (
            <div className="queryBox">
                <pre>Chọn ngày bắt đầu  </pre>
                <DatePicker className = 'startTime' 
                            selected={dateBegin} 
                            onChange={(date) => setDateBegin(date)} 
                            dateFormat={'dd-MM-yyyy'} 
                            maxDate={dateEnd}
                            />
                <pre>Chọn ngày kết thúc  </pre>
                <DatePicker className= 'endTime'
                            selected={dateEnd} 
                            onChange={(date) => setDateEnd(date)} 
                            dateFormat={'dd-MM-yyyy'} 
                            minDate={dateBegin}
                            />
                <pre>Chọn loại thống kê  </pre>
                <Select 
                    value={queryType}
                    label="Chọn loại thống kê"
                    placeholder="Chọn loại thống kê"
                    onChange={handleChange}
                >
                    <MenuItem value={'ngay'}>Theo ngày</MenuItem>
                    <MenuItem value={'thang'}>Theo tháng</MenuItem>
                </Select>
            </div>
            )
            :(
            <div className="queryBox">
                <pre>Chọn tháng bắt đầu  </pre>
                <DatePicker className = 'startTime' 
                            selected={dateBegin} 
                            onChange={(date) => setDateBegin(date)} 
                            dateFormat= "MM-yyyy" 
                            showMonthYearPicker
                            />
                <pre>Chọn tháng kết thúc  </pre>
                <DatePicker className= 'endTime'
                            selected={dateEnd} 
                            onChange={(date) => setDateEnd(date)} 
                            dateFormat="MM-yyyy"
                            showMonthYearPicker
                            />
                <pre>Chọn loại thống kê  </pre>
                <Select 
                    value={queryType}
                    label="Chọn loại thống kê"
                    placeholder="Chọn loại thống kê"
                    onChange={handleChange}
                >
                    <MenuItem value={'ngay'}>Theo ngày</MenuItem>
                    <MenuItem value={'thang'}>Theo tháng</MenuItem>
                </Select>
            </div>
            )}
            <div>
                <BarChart stringBegin={stringBegin} stringEnd={stringEnd} type={isQueryNgay}/>
            </div>
        </div>
    )
    
}
function getParsedDate(date){
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date =  yyyy + "/" + mm + "/" + dd;
    return date.toString();
}

function getParsedMonth(date){
    //var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (mm < 10) {
        mm = '0' + mm;
    }
    date =  yyyy + "/" + mm;
    return date.toString();
}
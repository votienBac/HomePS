import BarChart from "./revenuachart"
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, MenuItem } from "@material-ui/core";
import '../../css/thongke.css';

export default function ThongKe(){
    const [dateBegin, setDateBegin] = useState(new Date("2021/12/23"));
    const [dateEnd, setDateEnd] = useState(new Date());
    const [queryType, setQueryType] = useState('ngay');
    const isQueryNgay = (queryType === 'ngay')
    const handleChange = (event) => {
        setQueryType(event.target.value);
        setDateEnd(new Date());
        setDateBegin(new Date("2021/12/23"));
    }
    var stringBegin;
    var stringEnd
    if(isQueryNgay){
        stringBegin = getParsedDate(dateBegin);
        stringEnd = getParsedDate(dateEnd);
    }
    else{
        stringBegin = getParsedMonth(dateBegin);
        stringEnd = getParsedMonth(dateEnd);
    }
    return(
        <div>
            {isQueryNgay? (
            <div className="queryBox">
                <label>Chọn ngày bắt đầu  </label>
                <DatePicker className = 'startTime' 
                            selected={dateBegin} 
                            onChange={(date) => setDateBegin(date)} 
                            dateFormat={'dd-MM-yyyy'} 
                            minDate = {new Date("2021/12/23")}
                            maxDate={new Date}
                            />
                <label>Chọn ngày kết thúc  </label>
                <DatePicker className= 'endTime'
                            selected={dateEnd} 
                            onChange={(date) => setDateEnd(date)} 
                            dateFormat={'dd-MM-yyyy'} 
                            minDate={dateBegin}
                            />
                <label>Chọn loại thống kê  </label>
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
                <label>Chọn tháng bắt đầu  </label>
                <DatePicker className = 'startTime' 
                            selected={dateBegin} 
                            onChange={(date) => setDateBegin(date)} 
                            dateFormat= "MM-yyyy" 
                            minDate={new Date("2021/12")}
                            maxDate={dateEnd}
                            showMonthYearPicker
                            label = 'start'
                            />
                <label>Chọn tháng kết thúc  </label>
                <DatePicker className= 'endTime'
                            selected={dateEnd} 
                            onChange={(date) => setDateEnd(date)} 
                            dateFormat="MM-yyyy"
                            minDate={dateBegin}
                            maxDate={new Date}
                            showMonthYearPicker
                            />
                <label>Chọn loại thống kê  </label>
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
    date =  yyyy + "-" + mm;
    return date.toString();
}
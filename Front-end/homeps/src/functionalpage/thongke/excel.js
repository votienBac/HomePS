import React from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Download = ({dataSet, type, begin, end, formatDay, formatMonth}) => {
        return (
            <ExcelFile element={<img className="download"
            url = 'https://img.icons8.com/office/16/000000/download--v1.png'></img>} 
                filename = {type? 'Thống kê doanh thu homeps(' + formatDay(begin) + ' - ' + formatDay(end) + ')'
                    : 'Thống kê doanh thu homeps(' + formatMonth(begin) + ' - ' + formatMonth(end) + ')'} >
                {type? <ExcelSheet data={dataSet} name="Thống kê doanh thu ngày">
                    <ExcelColumn label="Ngày" value="day" />
                    <ExcelColumn label="Doanh thu (vnđ)"  value="turnover"/>
                </ExcelSheet>
                : <ExcelSheet data={dataSet} name="Thống kê doanh thu tháng">
                    <ExcelColumn label="Tháng" value="month"/>
                    <ExcelColumn label="Doanh thu (vnđ)" value="turnover"/>
                </ExcelSheet>}
            </ExcelFile>
        );
}
export default Download
import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import '../../css/thongke.css';
import formatMoney from '../../utility/formatmoney';
const BarChart = (props) => {
    const [chartData, setChartData] = useState({});
    //const [date, setDate] = useState([]);
    const [turnOver, setTurnOver] = useState();
    var baseUrl
    var begin, end
    if(props.type){
        baseUrl = `https://homeps.herokuapp.com/api/revenue`
        begin = `dateBegin`
        end = `dateEnd`
    }
    else{
        baseUrl = `https://homeps.herokuapp.com/api/revenue/months`
        begin = `monthBegin`
        end = `monthEnd` 
    }

    const formatDay = (str) =>{
        str = str.toString()
        let dd = str.substr(8)
        let MM = str.substr(5,2)
        let yyyy = str.substr(0,4)
        return dd+'/'+MM+'/'+yyyy;
    }

    const formatMonth = (str) =>{
        str = str.toString()
        let MM = str.substr(5,2)
        let yyyy = str.substr(0,4)
        return MM+'/'+yyyy;
    }

    useEffect(() => {
        let dateList = [];
        let turnOverList = [];
        let total = 0;
        const fetchData = async () => {
            await fetch(baseUrl+`?${begin}=${props.stringBegin}&${end}=${props.stringEnd}`, {
            //await fetch(baseUrl,{
                method: 'GET'
            }).then(res => {
                res.json().then(json => {
                    if(props.type){
                        json.revenueList.sort((a, b) => { return new Date(a.date) - new Date(b.date)})
                        for (const dataOjb of json.revenueList) {
                            dateList.push(formatDay(dataOjb.date))
                            turnOverList.push(dataOjb.turnOver)
                        }
                        setTurnOver(json.revenue);
                    }
                    else{
                        json.sort((a,b) => {return new Date(a.month) - new Date(b.month)})
                        for (const dataOjb of json){
                            dateList.push(formatMonth(dataOjb.month))
                            turnOverList.push(dataOjb.revenue)
                            total = total + dataOjb.revenue
                        }
                        setTurnOver(total);
                    }
                    setChartData({
                        labels: dateList,
                        datasets: [{
                            label: "Doanh thu",
                            data: turnOverList,
                            backgroundColor: [
                                'rgba(74, 191, 156, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(74, 191, 156, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    })
                })
            }).catch(err => {
                console.log(err)
            })
        }
        fetchData()
    }, [props])

    return (
        <div>
            <Line
                data={chartData}
                height={1.2}
                width={4}
                options={{
                    responsive: true,
                    scales: {
                        yAxes: {
                            maintainAspectRatio: false,
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    }
                }}
            />
            <div className='doanhthu'>
                Tổng doanh thu là: {formatMoney(turnOver)}
            </div>
        </div>
    )
}
export default BarChart;
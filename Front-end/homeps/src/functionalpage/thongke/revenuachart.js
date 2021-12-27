import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import '../../css/thongke.css';

const BarChart = (props) => {
    const [chartData, setChartData] = useState({});
    //const [date, setDate] = useState([]);
    const [turnOver, setTurnOver] = useState();
    const baseUrl = `https://homeps.herokuapp.com/api/revenue`
    useEffect(() => {
        let dateList = [];
        let turnOverList = [];
        const fetchData = async () => {
            await fetch(baseUrl+`?dateBegin=${props.stringBegin}&dateEnd=${props.stringEnd}&status=${props.type}`, {
            //await fetch(baseUrl,{
                method: 'GET'
            }).then(res => {
                res.json().then(json => {
                    console.log(json)
                    json.revenueList.sort((a, b) => { return new Date(a.date) - new Date(b.date)})
                    for (const dataOjb of json.revenueList) {
                        dateList.push(dataOjb.date)
                        turnOverList.push(dataOjb.turnOver)
                    }
                    setTurnOver(json.revenue);
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
    }, [props,baseUrl])

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
                Tổng doanh thu là: {turnOver} vnđ
            </div>
        </div>
    )
}
export default BarChart;
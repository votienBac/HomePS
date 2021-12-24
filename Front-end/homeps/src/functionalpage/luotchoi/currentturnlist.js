import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import SearchBar from './search.js'
const CurrentTurnList = () => {
    const [currentTurns, setCurrentTurns] = useState([])
    useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/bills?page=${1}&size=${10}&status=${'unpaid'}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(currentTurns => { setCurrentTurns(currentTurns) })
    }, [currentTurns])

    return (
        <div>
            <Link to = ''>Lượt chơi hiện tại</Link>
            <Link to = 'finished-turn'>Lượt chơi đã kết thúc</Link>
            <SearchBar />
            
            <table id='current-turns-list'>
                <tr>
                    <th style={{ width: '10%' }}>ID</th>
                    <th style={{ width: '10%' }}>Máy</th>
                    <th style={{ width: '20%' }}>Tình trạng</th>
                    <th style={{ width: '30%' }}>Bắt đầu</th>
                    <th style={{ width: '30%' }}></th>
                </tr>
                {currentTurns.map(currentTurn => {
                    return (<tr key={currentTurn.billId}>
                        <td>{currentTurn.billId}</td>
                        <td>{currentTurn.playStation.psName}</td>
                        <td>{currentTurn.playStation.psState}</td>
                        <td>{currentTurn.timeStart}</td>
                        <td><Link to={`current-turn/${currentTurn.billId}`} >Xem chi tiết</Link> </td>
                    </tr>)
                })}
            </table>
            <Link to="addturn"><button>Thêm lượt chơi</button></Link>
        </div>)
}

export default CurrentTurnList
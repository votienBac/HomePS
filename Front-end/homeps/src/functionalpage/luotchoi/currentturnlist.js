import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import SearchBar from './search.js'
import formatTime from '../../utility/formattime.js'
import '../../css/luotchoi.css';
const CurrentTurnList = () => {
    const [currentTurns, setCurrentTurns] = useState({
        currentPage: 1,
        currentPlaying: 0,
        currentTurns: [],
        totalPage: 1
    });
    useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/bills?page=${1}&size=${10}&status=${'unpaid'}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => setCurrentTurns(res))
    }, [])
    return (
        <div className="luot-choi">
            <div className="header-luot-choi" >
            <Link to='' className="hien-tai"><button>Lượt chơi hiện tại</button></Link>
            <Link to='finished-turn'><button>Lượt chơi đã kết thúc</button></Link>
            <div className="search-bar">
                <SearchBar 
                type = 'unpaid'
                query = {currentTurns}
                setQuery = {setCurrentTurns}/>                
            </div>

            </div>
            <table className="tb">
                <tbody className="t">
                    <tr className="table-list">
                        <th>ID</th>
                        <th>Máy</th>
                        <th >Tình trạng</th>
                        <th>Bắt đầu</th>
                        <th></th>
                    </tr>
                    {currentTurns.currentTurns.map(currentTurn => {
                        return (<tr key={currentTurn.billId} className="list-turn">
                            <td>{currentTurn.billId}</td>
                            <td>{currentTurn.playStation.psName}</td>
                            <td>{currentTurn.playStation.psState}</td>
                            <td>{formatTime(currentTurn.timeStart)}</td>
                            <td>
                                <Link to={`current-turn/${currentTurn.billId}`} >Xem chi tiết</Link>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <Link to="addturn"><button>Thêm lượt chơi</button></Link>
        </div>)
}

export default CurrentTurnList
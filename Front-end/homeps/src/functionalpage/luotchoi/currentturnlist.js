import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Select, MenuItem } from "@material-ui/core";
import SearchBar from './search.js'
import formatTime from '../../utility/formattime.js'
import '../../css/luotchoi.css';
const CurrentTurnList = () => {
    const [sizePage, setSizePage] = useState(10)
    const [currentTurns, setCurrentTurns] = useState({
        currentPage: 1,
        currentPlaying: 0,
        currentTurns: [],
        totalPage: 1
    });
    useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/bills?page=${currentTurns.currentPage}&size=${sizePage}&status=${'unpaid'}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => setCurrentTurns(res))
    }, [currentTurns.currentPage, sizePage])
    console.log(currentTurns);
    return (
        <div className="luot-choi">
            <div className="header-luot-choi" >
            <Link to='' className="hien-tai"><button>Lượt chơi hiện tại</button></Link>
            <Link to='finished-turn'><button>Lượt chơi đã kết thúc</button></Link>
            <div className="search-bar">
                <SearchBar 
                type = 'unpaid'
                query = {currentTurns}
                setQuery = {setCurrentTurns}
                size={sizePage}
                />                
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
                                <Link to={`current-turn/${currentTurn.billId}`} className="xem-ct" >Xem chi tiết</Link>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <div className='paging'>
                <button
                    onClick={() => setCurrentTurns({ ...currentTurns, currentPage: 1 })}>
                    {"<<"}
                </button>
                <button
                    onClick={() => {
                        if (currentTurns.currentPage > 1)
                            setCurrentTurns({ ...currentTurns, currentPage: currentTurns.currentPage - 1 })
                    }}
                >
                    {"<"}
                </button>
                <button>{currentTurns.currentPage}</button>
                {(currentTurns.currentPage == currentTurns.totalPage) || <button
                    onClick={() => setCurrentTurns({ ...currentTurns, currentPage: currentTurns.currentPage + 1 })}
                >
                    {currentTurns.currentPage + 1}
                </button>}
                <button

                    onClick={() => {
                        if (currentTurns.currentPage < currentTurns.totalPage)
                            setCurrentTurns({ ...currentTurns, currentPage: currentTurns.currentPage + 1 })
                    }}
                >
                    {">"}
                </button>
                <button
                    onClick={() => setCurrentTurns({ ...currentTurns, currentPage: currentTurns.totalPage })}
                >
                    {">>"}
                </button>
                <div className="item">
                <label>Items per page</label>
                <Select 
                    value={sizePage}
                    onChange={(e)=>setSizePage(e.target.value)}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                </Select>
                </div>
            </div>
            <Link to="addturn"><button>Thêm lượt chơi</button></Link>
        </div>)
}

export default CurrentTurnList
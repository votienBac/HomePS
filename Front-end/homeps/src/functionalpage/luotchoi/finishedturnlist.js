import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Select, MenuItem } from "@material-ui/core";
import SearchBar from './search.js'
import formatTime from '../../utility/formattime.js'
function FinishedTurn() {
    const navigate = useNavigate()
    const [sizePage, setSizePage] = useState(10)
    const [finishedTurns, setFinishedTurns] = useState({
        currentPage: 1,
        currentPlaying: 0,
        currentTurns: [],
        totalPage: 1
    })
    //Load the bill list
    useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/bills?page=${finishedTurns.currentPage}&size=${sizePage}&status=${'paid'}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(finishedTurns => { setFinishedTurns(finishedTurns) })
    }, [finishedTurns.currentPage, sizePage])
    console.log(111);
    return (
        <div>
            <u onClick={() => navigate(-1)}>Lượt chơi hiện tại</u>
            <Link to=''>Lượt chơi đã kết thúc</Link>
            <SearchBar
                type='paid'
                query={finishedTurns}
                setQuery={setFinishedTurns}
                size={sizePage}
            />
            <table id='finished-turns-list'>
                <tbody>
                    <tr>
                        <th style={{ width: '10%' }}>ID</th>
                        <th style={{ width: '10%' }}>Máy</th>
                        <th style={{ width: '25%' }}>Bắt đầu</th>
                        <th style={{ width: '25%' }}>Kết thúc</th>
                        <th style={{ width: '30%' }}></th>
                    </tr>
                    {finishedTurns.currentTurns.map(finishedTurn => {
                        return (<tr key={finishedTurn.billId}>
                            <td>{finishedTurn.billId}</td>
                            <td>{finishedTurn.playStation.psName}</td>
                            <td>{formatTime(finishedTurn.timeStart)}</td>
                            <td>{formatTime(finishedTurn.timeEnd)}</td>
                            <td><Link to={`${finishedTurn.billId}`} >Xem chi tiết</Link> </td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <div className='paging'>
                <button
                    onClick={() => setFinishedTurns({ ...finishedTurns, currentPage: 1 })}
                >
                    {"<<"}
                </button>
                <button
                    onClick={() => {
                        if (finishedTurns.currentPage > 1)
                            setFinishedTurns({ ...finishedTurns, currentPage: finishedTurns.currentPage - 1 });
                    }
                    }
                >
                    {"<"}
                </button>
                <button>{finishedTurns.currentPage}</button>
                {(finishedTurns.currentPage == finishedTurns.totalPage) || <button
                    onClick={() => setFinishedTurns({ ...finishedTurns, currentPage: finishedTurns.currentPage + 1 })}
                >
                    {finishedTurns.currentPage + 1}
                </button>}
                <button
                    onClick={() => {
                        if (finishedTurns.currentPage < finishedTurns.totalPage)
                            setFinishedTurns({ ...finishedTurns, currentPage: finishedTurns.currentPage + 1 })
                    }

                    }
                >
                    {">"}
                </button>
                <button
                    onClick={() => setFinishedTurns({ ...finishedTurns, currentPage: finishedTurns.totalPage })}
                >
                    {">>"}
                </button>
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
    )
}
export default FinishedTurn
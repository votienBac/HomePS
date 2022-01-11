import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Select, MenuItem } from "@material-ui/core";
import SearchBar from './search.js'
import formatTime from '../../utility/formattime.js'
function FinishedTurn() {
    const navigate = useNavigate()
    const [isQuery, setIsQuery] = useState(false)
    const [isChangePageQuery, setChangePageQuery] = useState(false)
    const [sizePage, setSizePage] = useState(10)
    const [finishedTurns, setFinishedTurns] = useState({
        currentPage: 1,
        currentPlaying: 0,
        currentTurns: [],
        totalPage: 1
    })
    //Load the bill list
    useEffect(() => {
        if(!isQuery)
        fetch(`https://homeps.herokuapp.com/api/bills?page=${finishedTurns.currentPage}&size=${sizePage}&status=${'paid'}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(finishedTurns => { setFinishedTurns(finishedTurns) })
    }, [finishedTurns.currentPage, sizePage, isQuery])
    console.log(111);
    return (
        <div className="luot-choi">
            <div className="header-luot-choi" >
            <u onClick={() => navigate(-1)} className="hien-tai"><button>Lượt chơi hiện tại</button></u>
            <Link to=''><button>Lượt chơi đã kết thúc</button></Link>
            <div className="search-bar">
            <SearchBar
                type='paid'
                query={finishedTurns}
                setQuery={setFinishedTurns}
                isQuery = {isQuery}
                setIsQuery = {setIsQuery}
                isChangePageQuery = {isChangePageQuery}
                setChangePageQuery = {setChangePageQuery}
                size={sizePage}
            />
            </div>
            </div>

            <table className="tb">
                <tbody className="t">
                    <tr className="table-list">
                        <th>ID</th>
                        <th>Máy</th>
                        <th>Bắt đầu</th>
                        <th>Kết thúc</th>
                        <th></th>
                    </tr>
                    {finishedTurns.currentTurns.map(finishedTurn => {
                        return (<tr key={finishedTurn.billId}  className="list-turn">
                            <td>{finishedTurn.billId}</td>
                            <td>{finishedTurn.playStation.psName}</td>
                            <td>{formatTime(finishedTurn.timeStart)}</td>
                            <td>{formatTime(finishedTurn.timeEnd)}</td>
                            <td><Link to={`${finishedTurn.billId}`} className="xem-ct">Xem chi tiết</Link> </td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <div className='paging'>
                <button
                    onClick={() => {
                        setFinishedTurns({ ...finishedTurns, currentPage: 1 })
                        setChangePageQuery(isQuery)
                    }
                }
                >
                    {"<<"}
                </button>
                <button
                    onClick={() => {
                        if (finishedTurns.currentPage > 1){
                            setFinishedTurns({ ...finishedTurns, currentPage: finishedTurns.currentPage - 1 });
                            setChangePageQuery(isQuery)
                        }
                    }
                    }
                >
                    {"<"}
                </button>
                <button>{finishedTurns.currentPage}</button>
                {(finishedTurns.currentPage == finishedTurns.totalPage) || <button
                    onClick={() => {
                        setFinishedTurns({ ...finishedTurns, currentPage: finishedTurns.currentPage + 1 })
                        setChangePageQuery(isQuery)
                    }
                    }
                >
                    {finishedTurns.currentPage + 1}
                </button>}
                <button
                    onClick={() => {
                        if (finishedTurns.currentPage < finishedTurns.totalPage){
                            setFinishedTurns({ ...finishedTurns, currentPage: finishedTurns.currentPage + 1 })
                            setChangePageQuery(isQuery)
                        }
                    }

                    }
                >
                    {">"}
                </button>
                <button
                    onClick={() => {
                        setFinishedTurns({ ...finishedTurns, currentPage: finishedTurns.totalPage })
                        setChangePageQuery(isQuery)
                    }
                    }
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
        </div>
    )
}
export default FinishedTurn
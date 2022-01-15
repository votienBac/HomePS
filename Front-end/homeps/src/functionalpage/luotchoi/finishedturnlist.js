import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SearchBar from './search.js'
import formatTime from '../../utility/formattime.js'
import '../../css/luotchoi.css';
import '../../css/components/paging-navigation.css'
import '../../css/components/table.css'



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
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    //Load the bill list
    useEffect(() => {
        if (!isQuery)
            fetch(`https://homeps.herokuapp.com/api/bills?page=${finishedTurns.currentPage}&size=${sizePage}&sortBy=${'timeEnd'}&status=${'paid'}`, {
                method: 'GET',
                headers: myHeaders
            })
                .then(res => res.json())
                .then(finishedTurns => { setFinishedTurns(finishedTurns) })
    }, [finishedTurns.currentPage, sizePage, isQuery])
    return (
        <div class="pageBody">
            <div className="header-luot-choi" >
                <u onClick={() => navigate(-1)} className="hien-tai"><button>Lượt chơi hiện tại</button></u>
                <Link to=''><button>Lượt chơi đã kết thúc</button></Link>
                <div className="search-bar">
                    <SearchBar
                        type='paid'
                        query={finishedTurns}
                        setQuery={setFinishedTurns}
                        isQuery={isQuery}
                        setIsQuery={setIsQuery}
                        isChangePageQuery={isChangePageQuery}
                        setChangePageQuery={setChangePageQuery}
                        size={sizePage}
                    />
                </div>
            </div>
            {(finishedTurns.totalPage === 0)? <h2 className="noResult">Không có lượt chơi nào</h2> :
            <div class="m-grid">
                <table className="m-table">  
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Máy</th>
                            <th>Bắt đầu</th>
                            <th>Kết thúc</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {finishedTurns.currentTurns.map(finishedTurn => {
                                return (<tr key={finishedTurn.billId}>
                                    <td>{finishedTurn.billId}</td>
                                    <td>{finishedTurn.playStation.psName}</td>
                                    <td>{formatTime(finishedTurn.timeStart)}</td>
                                    <td>{formatTime(finishedTurn.timeEnd)}</td>
                                    <td><Link to={`${finishedTurn.billId}`} className="xem-ct"><button>Xem chi tiết</button></Link> </td>
                                </tr>)
                            })}
                    </tbody>
                </table>
            </div>}
            
            {(finishedTurns.totalPage === 0)? <div></div> :<div class='m-table-paging'>
                <div className="m-paging-left">

                </div>
                <div class="m-paging-center">
                    
                    <div class = "m-paging-first"
                        onClick={() => {
                            setFinishedTurns({ ...finishedTurns, currentPage: 1 })
                            setChangePageQuery(isQuery)
                        }
                        }
                    >
                    </div>
                    <div class = "m-paging-prev"
                        onClick={() => {
                            if (finishedTurns.currentPage > 1) {
                                setFinishedTurns({ ...finishedTurns, currentPage: finishedTurns.currentPage - 1 });
                                setChangePageQuery(isQuery)
                            }
                        }
                        }
                    >
                    </div>
                    <div class = "page-number">{finishedTurns.currentPage}</div>
                    {(finishedTurns.currentPage == finishedTurns.totalPage) || <div class="page-number"
                        onClick={() => {
                            setFinishedTurns({ ...finishedTurns, currentPage: finishedTurns.currentPage + 1 })
                            setChangePageQuery(isQuery)
                        }
                        }
                    >
                        {finishedTurns.currentPage + 1}
                    </div>}
                    <div class="m-paging-next"
                        onClick={() => {
                            if (finishedTurns.currentPage < finishedTurns.totalPage) {
                                setFinishedTurns({ ...finishedTurns, currentPage: finishedTurns.currentPage + 1 })
                                setChangePageQuery(isQuery)
                            }
                        }

                        }
                    >
                    </div>
                    <div class="m-paging-last"
                        onClick={() => {
                            setFinishedTurns({ ...finishedTurns, currentPage: finishedTurns.totalPage })
                            setChangePageQuery(isQuery)
                        }
                        }
                    >
                    </div>
                </div>

                <div className="m-paging-right">
                <label style ={{whiteSpace: 'pre'}}>Số bản ghi   </label>
                        <select id="input" 
                            value={sizePage}
                            onChange={(e) => {
                                setSizePage(e.target.value)
                                setChangePageQuery(isQuery)
                            }}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            
                        </select>
                </div>
            </div>}
        </div>)
}
export default FinishedTurn
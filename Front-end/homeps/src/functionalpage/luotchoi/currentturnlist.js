import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import SearchBar from './search.js'
import formatTime from '../../utility/formattime.js'
import '../../css/luotchoi.css';
import '../../css/components/paging-navigation.css'
import '../../css/components/table.css'


const CurrentTurnList = () => {

    const [sizePage, setSizePage] = useState(10)
    const [isQuery, setIsQuery] = useState(false)
    const [isChangePageQuery, setChangePageQuery] = useState(false)
    const [currentTurns, setCurrentTurns] = useState({
        currentPage: 1,
        currentPlaying: 0,
        currentTurns: [],
        totalPage: 1
    });

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    useEffect(() => {
        if (!isQuery)
            fetch(`https://homeps.herokuapp.com/api/bills?page=${currentTurns.currentPage}&size=${sizePage}&status=${'unpaid'}`, {
                method: 'GET',
                headers: myHeaders
            })
                .then(res => res.json())
                .then(res => setCurrentTurns(res))
    }, [currentTurns.currentPage, sizePage, isQuery])

    return (
        <div className="pageBody">
            <div className="header-luot-choi" >
                <Link to='' className="hien-tai"><button>Lượt chơi hiện tại</button></Link>
                <Link to='finished-turn'><button>Lượt chơi đã kết thúc</button></Link>
                <div className="search-bar">
                    <SearchBar
                        type='unpaid'
                        query={currentTurns}
                        setQuery={setCurrentTurns}
                        isQuery={isQuery}
                        setIsQuery={setIsQuery}
                        isChangePageQuery={isChangePageQuery}
                        setChangePageQuery={setChangePageQuery}
                        size={sizePage}
                    />
                </div>
            </div>

            {(currentTurns.totalPage === 0) ? <h2 className="noResult">Không có lượt chơi nào</h2> :
                <div className="m-grid">
                    <table className="m-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Máy</th>
                                <th>Bắt đầu</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTurns.currentTurns.map(currentTurn => {
                                return (<tr key={currentTurn.billId}>
                                    <td>{currentTurn.billId}</td>
                                    <td>{currentTurn.playStation.psName}</td>
                                    <td>{formatTime(currentTurn.timeStart)}</td>
                                    <td>
                                        <Link to={`current-turn/${currentTurn.billId}`} className="xem-ct" ><button>Xem chi tiết</button></Link>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>}
            <Link to="addturn"><button>Thêm lượt chơi</button></Link>

            {(currentTurns.totalPage === 0) ? <div></div> : <div className="m-table-paging">
                <div className="m-paging-left">
                </div>
                <div className="m-paging-center">
                    <div className="m-paging-first"
                        onClick={() => {
                            setCurrentTurns({ ...currentTurns, currentPage: 1 })
                            setChangePageQuery(isQuery)
                        }}>
                    </div>
                    <div className="m-paging-prev"
                        onClick={() => {
                            if (currentTurns.currentPage > 1) {
                                setCurrentTurns({ ...currentTurns, currentPage: currentTurns.currentPage - 1 })
                                setChangePageQuery(isQuery)
                            }
                        }}>
                    </div>
                    <div className="page-number">{currentTurns.currentPage}</div>
                    {(currentTurns.currentPage == currentTurns.totalPage) || <div className="page-number"
                        onClick={() => {
                            setCurrentTurns({ ...currentTurns, currentPage: currentTurns.currentPage + 1 })
                            setChangePageQuery(isQuery)
                        }}>
                        {currentTurns.currentPage + 1}
                    </div>}
                    <div className="m-paging-next"
                        onClick={() => {
                            if (currentTurns.currentPage < currentTurns.totalPage) {
                                setCurrentTurns({ ...currentTurns, currentPage: currentTurns.currentPage + 1 })
                                setChangePageQuery(isQuery)
                            }
                        }}>
                    </div>
                    <div className="m-paging-last"
                        onClick={() => {
                            setCurrentTurns({ ...currentTurns, currentPage: currentTurns.totalPage })
                            setChangePageQuery(isQuery)
                        }}>
                    </div>

                </div>
                <div className="m-paging-right">
                    <label style={{ whiteSpace: 'pre' }}>Số bản ghi   </label>
                    <select id="input"
                        value={sizePage}
                        onChange={(e) => {
                            setSizePage(e.target.value)
                            setChangePageQuery(isQuery)
                            setCurrentTurns({ ...currentTurns, currentPage: 1 })
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

export default CurrentTurnList
import { Link , useNavigate} from "react-router-dom"
import { useState, useEffect } from "react"
import EventSearch from './EventSearch.js'
import Dialog from '@material-ui/core/Dialog';
import AddDailyEvent from './AddDailyEvent.js'
import formatDailyEventTime from "../../utility/dailyEventTime.js";
import '../../css/luotchoi.css';

const DailyEventList = () => {
    const navigate = useNavigate()
    const [currentEvents, setCurrentEvents] = useState({
        currentPage: 1,
        totalPage: 1,
        dailyEventList: []
    });
    const [addEventDialog, setAddEventDialog] = useState(false)
    const closeAddEventDialog = () => {
        setAddEventDialog(false)
    }
    const [isAdded, setAdded] = useState(false)
    const [sizePage, setSizePage] = useState(10)
    const [isQuery, setIsQuery] = useState(false)
    const [isChangePageQuery, setChangePageQuery] = useState(false)

    //Add Event Dialog
    useEffect(() => {
        if(!isQuery)
        fetch(`https://homeps.herokuapp.com/api/dailyEvents?page=${currentEvents.currentPage}&size=${sizePage}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => { setCurrentEvents(res) })
    }, [currentEvents.currentPage, sizePage, isAdded, isQuery])
    return (
        <div className="pageBody">
            <div className="header-luot-choi">
                <u onClick={() => navigate(-1)} className="hien-tai"><button>Sự kiện một lần</button></u>
                <Link to='daily-event'><button>Sự kiện lặp lại</button></Link>
                <div className="search-bar">    
                    <EventSearch 
                    type = 'dailyEvents'
                    query = {currentEvents}
                    setQuery = {setCurrentEvents}
                    isQuery = {isQuery}
                    setIsQuery = {setIsQuery}
                    isChangePageQuery = {isChangePageQuery}
                    setChangePageQuery = {setChangePageQuery}
                    size={sizePage}
                    />                
            </div>
            </div>
            {(currentEvents.totalPage === 0)? <h2 className="noResult">Không có sự kiện nào</h2> :
            <div className="m-grid">
            <table className="m-table">
                <thead>
                    <tr >
                        <th >ID</th>
                        <th >Tên sự kiện</th>
                        <th >Khoảng thời gian</th>
                        <th >Giảm giá</th>
                        <th ></th>
                    </tr>
                </thead>
                <tbody >
                    {currentEvents.dailyEventList.map(currentEvent => {
                        return (<tr key={currentEvent.dailyEventId} >
                            <td>{currentEvent.dailyEventId}</td>
                            <td>{currentEvent.dailyEventName}</td>
                            <td>{formatDailyEventTime(currentEvent.timeStart) + ' - ' + formatDailyEventTime(currentEvent.timeEnd)}</td>
                            <td>{currentEvent.percentDiscount}%</td>
                            <td>
                                <Link to={`${currentEvent.dailyEventId}`} className="xem-ct"><button>Xem Chi tiết</button></Link>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
            </div>}

            <Link to=''><button
                onClick={() => { setAddEventDialog(true) }}>
                Thêm sự kiện
            </button></Link>

            {(currentEvents.totalPage === 0)? <div></div> : <div className='m-table-paging'>
                <div className="m-paging-left">

                </div>
                <div className="m-paging-center">

                <div className="m-paging-first"
                    onClick={() => {
                        setCurrentEvents({ ...currentEvents, currentPage: 1 })
                        setChangePageQuery(isQuery)
                    }
                    }>
                </div>
                <div className="m-paging-prev"
                    onClick={() => {
                        if (currentEvents.currentPage > 1){
                            setCurrentEvents({ ...currentEvents, currentPage: currentEvents.currentPage - 1 })
                            setChangePageQuery(isQuery)
                        }
                    }}
                >
                </div>
                <div className="page-number">{currentEvents.currentPage}</div>
                {(currentEvents.currentPage == currentEvents.totalPage) || <div className="page-number"
                    onClick={() => {
                        setCurrentEvents({ ...currentEvents, currentPage: currentEvents.currentPage + 1 })
                        setChangePageQuery(isQuery)
                    }
                    }
                >
                    {currentEvents.currentPage + 1}
                </div>}
                <div className="m-paging-next"

                    onClick={() => {
                        if (currentEvents.currentPage < currentEvents.totalPage){
                            setCurrentEvents({ ...currentEvents, currentPage: currentEvents.currentPage + 1 })
                            setChangePageQuery(isQuery)
                        }
                    }}
                >
                </div>
                <div className="m-paging-last"
                    onClick={() => {
                        setCurrentEvents({ ...currentEvents, currentPage: currentEvents.totalPage })
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

            

            <Dialog open={addEventDialog} onClose={closeAddEventDialog} >
                <AddDailyEvent isAdded={isAdded} setAdded={setAdded} close = {closeAddEventDialog}/>
            </Dialog>
        </div>)
}

export default DailyEventList
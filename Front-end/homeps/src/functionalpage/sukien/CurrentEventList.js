import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import EventSearch from './EventSearch.js'
import Dialog from '@material-ui/core/Dialog';
// import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Select, MenuItem, DialogActions } from "@material-ui/core";
import AddEvent from './AddEvent.js'
import '../../css/luotchoi.css';

const CurrentEventList = () => {
    const [currentEvents, setCurrentEvents] = useState({
        currentPage: 1,
        totalPage: 1,
        eventList: []
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
        fetch(`https://homeps.herokuapp.com/api/events?page=${currentEvents.currentPage}&size=${sizePage}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => { setCurrentEvents(res) })
    }, [currentEvents.currentPage, sizePage, isAdded])
    return (
        <div className="pageBody">
            <div className="header-luot-choi">
                <div className="search-bar">    
                    <EventSearch 
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
            <div className="m-grid">
            <table className="m-table">
                <thead>
                    <tr >
                        <th >ID</th>
                        <th >Tên sự kiện</th>
                        <th >Tình trạng</th>
                        <th >Giảm giá</th>
                        <th ></th>
                    </tr>
                </thead>
                <tbody >
                    {currentEvents.eventList.map(currentEvent => {
                        return (<tr key={currentEvent.eventId} >
                            <td>{currentEvent.eventId}</td>
                            <td>{currentEvent.eventName}</td>
                            <td>{currentEvent.happenning?"Được áp dụng":"Không áp dụng"}</td>
                            <td>{currentEvent.percentDiscount}%</td>
                            <td>
                                <Link to={`current-event/${currentEvent.eventId}`} className="xem-ct">Xem Chi tiết</Link>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
            </div>

            <Link to=''><button
                onClick={() => { setAddEventDialog(true) }}>
                Thêm sự kiện
            </button></Link>

            <div className='m-table-paging'>
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
                    <label>Items per page</label>
                    <Select 
                        value={sizePage}
                        onChange={(e)=>{
                            setSizePage(e.target.value)
                            setChangePageQuery(isQuery)
                        }}
                    >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    </Select>
                </div>
            </div>

            

            <Dialog open={addEventDialog} onClose={closeAddEventDialog} >
                <AddEvent isAdded={isAdded} setAdded={setAdded} close = {closeAddEventDialog}/>
            </Dialog>
        </div>)
}

export default CurrentEventList
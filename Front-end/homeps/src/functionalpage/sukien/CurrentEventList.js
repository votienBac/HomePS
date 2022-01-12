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
        <div className="luot-choi">
            <div className="search-bar">    
                <EventSearch 
                query = {currentEvents}
                setQuery = {setCurrentEvents}
                isQuery = {isQuery}
                setIsQuery = {setIsQuery}
                isChangePageQuery = {isChangePageQuery}
                setChangePageQuery = {setChangePageQuery}
                size={sizePage}
                style = {{display: 'flex', float: 'right'}}
                />                
            </div>

            <table className="tb">
                <tbody className="t">
                    <tr className="table-list">
                        <th >ID</th>
                        <th >Tên sự kiện</th>
                        <th >Tình trạng</th>
                        <th >Giảm giá</th>
                        <th ></th>
                    </tr>
                    {currentEvents.eventList.map(currentEvent => {
                        return (<tr key={currentEvent.eventId} className="list-turn">
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
            <div className='paging'>
                <button
                    onClick={() => {
                        setCurrentEvents({ ...currentEvents, currentPage: 1 })
                        setChangePageQuery(isQuery)
                    }
                    }>
                    {"<<"}
                </button>
                <button
                    onClick={() => {
                        if (currentEvents.currentPage > 1){
                            setCurrentEvents({ ...currentEvents, currentPage: currentEvents.currentPage - 1 })
                            setChangePageQuery(isQuery)
                        }
                    }}
                >
                    {"<"}
                </button>
                <button>{currentEvents.currentPage}</button>
                {(currentEvents.currentPage == currentEvents.totalPage) || <button
                    onClick={() => {
                        setCurrentEvents({ ...currentEvents, currentPage: currentEvents.currentPage + 1 })
                        setChangePageQuery(isQuery)
                    }
                    }
                >
                    {currentEvents.currentPage + 1}
                </button>}
                <button

                    onClick={() => {
                        if (currentEvents.currentPage < currentEvents.totalPage){
                            currentEvents({ ...currentEvents, currentPage: currentEvents.currentPage + 1 })
                            setChangePageQuery(isQuery)
                        }
                    }}
                >
                    {">"}
                </button>
                <button
                    onClick={() => {
                        setCurrentEvents({ ...currentEvents, currentPage: currentEvents.totalPage })
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

            <button
                className="add-service"
                onClick={() => { setAddEventDialog(true) }}>
                Thêm sự kiện
            </button>

            <Dialog open={addEventDialog} onClose={closeAddEventDialog} >
                <DialogTitle>Thêm sự kiện</DialogTitle>
                <DialogActions>
                    <AddEvent isAdded={isAdded} setAdded={setAdded} close = {closeAddEventDialog}/>
                </DialogActions>
            </Dialog>
        </div>)
}

export default CurrentEventList
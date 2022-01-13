import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ServiceSearch from './ServiceSearch.js'
import { Select, MenuItem, DialogActions } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
// import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddService from './AddService.js'

const CurrentServiceList = () => {
    const [currentServices, setCurrentServices] = useState({
        currentPage: 1,
        totalPage: 1,
        serviceList: []
    });
    const [addServiceDialog, setAddServiceDialog] = useState(false)
    const closeAddServiceDialog = () => {
        setAddServiceDialog(false)
    }
    const [isAdded, setAdded] = useState(false)
    const [sizePage, setSizePage] = useState(10)
    const [isQuery, setIsQuery] = useState(false)
    const [isChangePageQuery, setChangePageQuery] = useState(false)
    
    //Add Service Dialog
    useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/extraservice?page=${currentServices.currentPage}&size=${sizePage}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => { setCurrentServices(res) })
    }, [currentServices.currentPage, sizePage, isAdded])
    return (
        <div>
            <div className="search-bar">    
                <ServiceSearch 
                query = {currentServices}
                setQuery = {setCurrentServices}
                isQuery = {isQuery}
                setIsQuery = {setIsQuery}
                isChangePageQuery = {isChangePageQuery}
                setChangePageQuery = {setChangePageQuery}
                size={sizePage}
                />                
            </div>

            <table id='current-services-list'>
                <tbody>
                    <tr>
                        <th >ID</th>
                        <th >Tên dịch vụ</th>
                        <th >Giá</th>
                        <th ></th>
                    </tr>
                    {currentServices.serviceList.map(currentService => {
                        return (<tr key={currentService.serviceId}>
                            <td>{currentService.serviceId}</td>
                            <td>{currentService.serviceName}</td>
                            <td>{currentService.price}</td>
                            <td></td>
                            <td>
                                <Link to={`current-service/${currentService.serviceId}`} >Xem Chi tiết</Link>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <div className='paging'>
                <button
                    onClick={() => {
                        setCurrentServices({ ...currentServices, currentPage: 1 })
                        setChangePageQuery(isQuery)
                    }
                    }>
                    {"<<"}
                </button>
                <button
                    onClick={() => {
                        if (currentServices.currentPage > 1){
                            setCurrentServices({ ...currentServices, currentPage: currentServices.currentPage - 1 })
                            setChangePageQuery(isQuery)
                        }
                    }}
                >
                    {"<"}
                </button>
                <button>{currentServices.currentPage}</button>
                {(currentServices.currentPage == currentServices.totalPage) || <button
                    onClick={() => {
                        setCurrentServices({ ...currentServices, currentPage: currentServices.currentPage + 1 })
                        setChangePageQuery(isQuery)
                    }
                    }
                >
                    {currentServices.currentPage + 1}
                </button>}
                <button

                    onClick={() => {
                        if (currentServices.currentPage < currentServices.totalPage){
                            setCurrentServices({ ...currentServices, currentPage: currentServices.currentPage + 1 })
                            setChangePageQuery(isQuery)
                        }
                    }}
                >
                    {">"}
                </button>
                <button
                    onClick={() => {
                        setCurrentServices({ ...currentServices, currentPage: currentServices.totalPage })
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
                onClick={() => { setAddServiceDialog(true) }}>
                Thêm dịch vụ
            </button>

            <Dialog open={addServiceDialog} onClose={closeAddServiceDialog} >
                <DialogTitle>Thêm dịch vụ</DialogTitle>
                <DialogActions>
                    <AddService isAdded={isAdded} setAdded={setAdded} close = {closeAddServiceDialog}/>
                </DialogActions>
            </Dialog>
        </div>)
}

export default CurrentServiceList
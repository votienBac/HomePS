import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ServiceSearch from './ServiceSearch.js'
import { Select, MenuItem, DialogActions } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
// import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddService from './AddService.js'
import formatMoney from '../../utility/formatmoney'

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
        if(!isQuery)
        fetch(`https://homeps.herokuapp.com/api/extraservice?page=${currentServices.currentPage}&size=${sizePage}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => { setCurrentServices(res) })
    }, [currentServices.currentPage, sizePage, isAdded, isQuery])
    return (
    <div className="pageBody">
        <div className="header-luot-choi">
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
            </div>
            {(currentServices.totalPage === 0)? <h2 className="noResult">Không có dịch vụ nào</h2> :
            <div class="m-grid">
            <table className="m-table" >
                <thead>
                    <tr>
                        <th >ID</th>
                        <th >Tên dịch vụ</th>
                        <th >Giá</th>
                        <th ></th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentServices.serviceList.map(currentService => {
                        return (<tr key={currentService.serviceId}>
                            <td>{currentService.serviceId}</td>
                            <td>{currentService.serviceName}</td>
                            <td>{formatMoney(currentService.price)}</td>
                            <td>
                                <Link to={`current-service/${currentService.serviceId}`}  className="xem-ct">Xem Chi tiết</Link>
                            </td>
                        </tr>)
                    })}
                    </tbody>
            </table>
            </div>}
            <button
                onClick={() => { setAddServiceDialog(true) }} 
                style={{width:'110px'}}
                >
                Thêm dịch vụ
            </button>
            {(currentServices.totalPage === 0)? <div></div> : <div class="m-table-paging">
                <div className="m-paging-left">

                </div>
                <div class="m-paging-center">
                
                <div class = "m-paging-first"
                    onClick={() => {
                        setCurrentServices({ ...currentServices, currentPage: 1 })
                        setChangePageQuery(isQuery)
                    }
                    }>
                </div>
                <div class = "m-paging-prev"
                    onClick={() => {
                        if (currentServices.currentPage > 1){
                            setCurrentServices({ ...currentServices, currentPage: currentServices.currentPage - 1 })
                            setChangePageQuery(isQuery)
                        }
                    }}
                >
                </div>
                <div class="page-number">{currentServices.currentPage}</div>
                {(currentServices.currentPage == currentServices.totalPage) || <div class="page-number"
                    onClick={() => {
                        setCurrentServices({ ...currentServices, currentPage: currentServices.currentPage + 1 })
                        setChangePageQuery(isQuery)
                    }
                    }
                >
                    {currentServices.currentPage + 1}
                </div>}
                <div class="m-paging-next"

                    onClick={() => {
                        if (currentServices.currentPage < currentServices.totalPage){
                            setCurrentServices({ ...currentServices, currentPage: currentServices.currentPage + 1 })
                            setChangePageQuery(isQuery)
                        }
                    }}
                >
                </div>
                <div class="m-paging-last"
                    onClick={() => {
                        setCurrentServices({ ...currentServices, currentPage: currentServices.totalPage })
                        setChangePageQuery(isQuery)
                    }
                    }
                >
                </div>
                </div>
                <div class="m-paging-right">
                <label>Số bản ghi một trang </label>
                <Select 
                    value={sizePage}
                    onChange={(e)=>setSizePage(e.target.value)}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                </Select>
                </div>
            </div>}

            <Dialog open={addServiceDialog} onClose={closeAddServiceDialog} >
                <DialogActions>
                    <AddService isAdded={isAdded} setAdded={setAdded} close = {closeAddServiceDialog}/>
                </DialogActions>
            </Dialog>
        </div>)
}

export default CurrentServiceList
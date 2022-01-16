import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ServiceSearch from './ServiceSearch.js'
import Dialog from '@material-ui/core/Dialog';
import AddService from './AddService.js'
import formatMoney from '../../utility/formatmoney'

const CurrentServiceList = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
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
            method: 'GET',
            headers: myHeaders
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
                                <Link to={`current-service/${currentService.serviceId}`}  className="xem-ct"><button>Xem Chi tiết</button></Link>
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
                <label style ={{whiteSpace: 'pre'}}>Số bản ghi   </label>
                        <select id="input" 
                            value={sizePage}
                            onChange={(e) => {
                                setSizePage(e.target.value)
                                setChangePageQuery(isQuery)
                                setCurrentServices({ ...currentServices, currentPage: 1 })
                            }}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            
                        </select>
                </div>
            </div>}

            <Dialog open={addServiceDialog} onClose={closeAddServiceDialog} >
                    <AddService isAdded={isAdded} setAdded={setAdded} close = {closeAddServiceDialog}/>
            </Dialog>
        </div>)
}

export default CurrentServiceList
import { Routes, Route, useNavigate } from 'react-router-dom'
import SearchBar from "./search.js"
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions, Select, MenuItem } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react'
import '../../css/luotchoi.css';
import '../../css/components/paging-navigation.css'
import '../../css/components/table.css'
const UnusedPsList = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");

    const navigate = useNavigate()
    const [unusedPs, setUnusedPs] = useState({
        currentPage: 1,
        psList: [],
        totalPage: 1
    })
    const [popup, setPopup] = useState(false)
    const [tieptuc, setTiepTuc] = useState(false)
    const closePopup = () => {
        setPopup(false)
        setTiepTuc(!tieptuc)
    }
    const [addTurnDialog, setAddTurnDialog] = useState(false)
    const closeAddTurnDialog = () => setAddTurnDialog(false)

    //Add new turn
    const handleAddTurn = async (psId) => {
        const postNewBillData = {
            psId: psId
        }
        await fetch(`https://homeps.herokuapp.com/api/bills`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(postNewBillData),
        })
        setAddTurnDialog(false)
        setPopup(true)
    }

    //Load the free PS list
    const [sizePage, setSizePage] = useState(10)
    useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/ps?page=${unusedPs.currentPage}&size=${sizePage}&status=${'free'}`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(unusedPs => setUnusedPs(unusedPs))
    }, [unusedPs.currentPage, sizePage, tieptuc])
    const psId = useRef()

    //Pop-up

    return (
        <div class="pageBody">
            <img onClick={() => navigate(-1)} src={'https://img.icons8.com/ios/50/000000/circled-left-2.png'
    } className='back-icon'/>
            <div className="header-luot-choi" ></div>
            <div class="m-grid">
                <table className="m-table">
                    <thead>
                        <tr className="table-list">
                            <th >PS ID</th>
                            <th >M??y</th>
                            <th >T??nh tr???ng</th>
                            <th >H??nh ?????ng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {unusedPs.psList.map(unusedPs => {
                            return (<tr key={unusedPs.psId}>
                                <td>{unusedPs.psId}</td>
                                <td>{unusedPs.psName}</td>
                                <td>{unusedPs.psState}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            psId.current = unusedPs.psId
                                            setAddTurnDialog(true);
                                        }} style={{ float: 'right', marginRight: '30%' }}
                                    >
                                        Th??m l?????t ch??i
                                    </button>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
            
            <div class = "m-table-paging">
                <div className='m-paging-center'>
                    <div class = "m-paging-first"
                        onClick={() => setUnusedPs({ ...unusedPs, currentPage: 1 })}>
                    </div>
                    <div class = "m-paging-prev"
                        onClick={() => {
                            if (unusedPs.currentPage > 1)
                                setUnusedPs({ ...unusedPs, currentPage: unusedPs.currentPage - 1 })
                        }}>
                    </div>
                    <div class = "page-number">{unusedPs.currentPage}</div>
                    {(unusedPs.currentPage == unusedPs.totalPage) || <div class = "page-number"
                        onClick={() => setUnusedPs({ ...unusedPs, currentPage: unusedPs.currentPage + 1 })}>
                        {unusedPs.currentPage + 1}
                    </div>}
                    <div class = "m-paging-next"
                        onClick={() => {
                            if (unusedPs.currentPage < unusedPs.totalPage)
                                setUnusedPs({ ...unusedPs, currentPage: unusedPs.currentPage + 1 })
                        }}>
                    </div>
                    <div class = "m-paging-last"
                        onClick={() => setUnusedPs({ ...unusedPs, currentPage: unusedPs.totalPage })}>
                    </div>
                </div>
                <div className="m-paging-right">
                <label style ={{whiteSpace: 'pre'}}>S??? b???n ghi   </label>
                        <select id="input" 
                            value={sizePage}
                            onChange={(e) => {
                                setSizePage(e.target.value)
                                setUnusedPs({ ...unusedPs, currentPage: 1 })
                            }}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            
                        </select>
                </div>
            </div>
            
            <Dialog open={addTurnDialog} onClose={closeAddTurnDialog} >
                <DialogTitle>B???n c?? ch???c ch???n mu???n th??m l?????t ch??i?</DialogTitle>
                <DialogActions>
                    <button onClick={() => handleAddTurn(psId.current)}>Th??m l?????t ch??i</button>
                    <button onClick={() => setAddTurnDialog(false)}>Quay v???</button>
                </DialogActions>
            </Dialog>
            <Dialog open={popup} onClose={closePopup} >
                <DialogTitle>Th??m l?????t ch??i th??nh c??ng</DialogTitle>
                <DialogActions>
                    <button onClick={() => closePopup()}>Ti???p t???c th??m m??y</button>
                    <button onClick={() => navigate('/luotchoi')}>Quay v??? trang ch???</button>
                </DialogActions>
            </Dialog>

        </div>)
}


function AddTurn() {
    return (
        <Routes>
            <Route path='' element={<UnusedPsList />}></Route>
        </Routes>
    )
}
export default AddTurn
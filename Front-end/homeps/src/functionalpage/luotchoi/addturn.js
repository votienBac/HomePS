import { Routes, Route, useNavigate } from 'react-router-dom'
import SearchBar from "./search.js"
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react'

const UnusedPsList = () => {
    const navigate = useNavigate()
    const [unusedPs, setUnusedPs] = useState([])
    const [popup, setPopup] = useState(false)
    const closePopup = () => setPopup(false)
    const [addTurnDialog, setAddTurnDialog] = useState(false)
    const closeAddTurnDialog = () => setAddTurnDialog(false)

    //Add new turn
    const handleAddTurn = async (psId) => {
        const postNewBillData = {
            psId: psId
        }
        await fetch(`https://homeps.herokuapp.com/api/bills`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
            },
            body: JSON.stringify(postNewBillData),
        })
        setAddTurnDialog(false)
        setPopup(true)
    }

    //Load the free PS list
    useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/ps?page=${1}&size=${10}&status=${'free'}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(unusedPs => setUnusedPs(unusedPs))
    }, [])
    const psId = useRef()

    //Pop-up

    return (
        <div>
            <SearchBar />
            <table>
                <tbody>
                    <tr>
                        <th className="text-align-left" style={{ width: '50px' }}>PS ID</th>
                        <th className="text-align-left">Máy</th>
                        <th className="text-align-left" style={{ width: "50px" }}>Tình trạng</th>
                        <th className="text-align-center" style={{ width: "100px" }}>Hành động</th>
                        <th className="text-align-right" style={{ width: "150px" }}></th>
                    </tr>
                    {unusedPs.map(unusedPs => {
                        return (<tr key={unusedPs.psId}>
                            <td>{unusedPs.psId}</td>
                            <td>{unusedPs.psName}</td>
                            <td>{unusedPs.psState}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        psId.current = unusedPs.psId
                                        setAddTurnDialog(true);
                                    }}
                                >
                                    Thêm lượt chơi
                                </button>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <button
                onClick={() => navigate(-1)}
            >
                Quay lại
            </button>
            <Dialog open={addTurnDialog} onClose={closeAddTurnDialog} >
                <DialogTitle>Bạn có chắc chắn muốn thêm lượt chơi?</DialogTitle>
                <DialogActions>
                    <button onClick={() => handleAddTurn(psId.current)}>Thêm lượt chơi</button>
                    <button onClick={() => setAddTurnDialog(false)}>Quay về</button>
                </DialogActions>
            </Dialog>
            <Dialog open={popup} onClose={closePopup} >
                <DialogTitle>Thêm lượt chơi thành công</DialogTitle>
                <DialogActions>
                    <button onClick={() => navigate('/luotchoi')}>Quay về trang chủ</button>
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
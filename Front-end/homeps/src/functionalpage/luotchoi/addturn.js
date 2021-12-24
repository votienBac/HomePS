import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import SearchBar from "./search.js"
import NewTurn from './newturn.js'
import { useEffect, useState} from 'react'
const UnusedPsList = () => {
    const navigate = useNavigate()
    const [unusedPs, setUnusedPs] = useState([])
    useEffect(()=>{
        fetch(`https://homeps.herokuapp.com/api/ps?page=${1}&size=${10}&status=${'free'}`, {
            method: 'GET'
        })
        .then(res=>res.json())
        .then(unusedPs=>setUnusedPs(unusedPs))
    }, [])

    return (<div>
        <SearchBar />
        <table>
            <tr>
                <th style={{ wpsIdth: '10%' }}>PS ID</th>
                <th style={{ wpsIdth: '10%' }}>Máy</th>
                <th style={{ wpsIdth: '20%' }}>Tình trạng</th>
                <th style={{ wpsIdth: '30%' }}>Hành động</th>
                <th style={{ wpsIdth: '30%' }}></th>
            </tr>
            {unusedPs.map(unusedPs => {
                return (<tr key={unusedPs.psId}>
                    <td>{unusedPs.psId}</td>
                    <td>{unusedPs.psName}</td>
                    <td>{unusedPs.psState}</td>
                    <td>
                        <Link to={`${unusedPs.psId}`}>Tạo lượt chơi</Link>
                    </td>
                </tr>)
            })}
        </table>
        <button
            onClick={() => navigate(-1)}
        >
            Quay lại
        </button>
    </div>)
}


function AddTurn() {
    return (
        <Routes>
            <Route path='' element={<UnusedPsList />}></Route>
            <Route path={`:psId`} element={<NewTurn />}></Route>


        </Routes>
    )
}
export default AddTurn
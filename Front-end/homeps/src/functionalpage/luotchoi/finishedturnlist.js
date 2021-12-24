import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import SearchBar from './search.js'
function FinishedTurn(){
    const navigate = useNavigate()
    const [finishedTurns, setFinishedTurns] = useState([])
    useEffect(() => {
        fetch(`https://homeps.herokuapp.com/api/bills?page=${1}&size=${10}&status=${'paid'}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(finishedTurns => { setFinishedTurns(finishedTurns) })
    }, [])
    console.log(finishedTurns);
    return(
        <div>
            <u onClick = {()=>navigate(-1)}>Lượt chơi hiện tại</u>
            <Link to = ''>Lượt chơi đã kết thúc</Link>
            <SearchBar />
            <table id='finished-turns-list'>
                <tr>
                    <th style={{ width: '10%' }}>ID</th>
                    <th style={{ width: '10%' }}>Máy</th>
                    <th style={{ width: '25%' }}>Bắt đầu</th>
                    <th style={{ width: '25%' }}>Kết thúc</th>
                    <th style={{ width: '30%' }}></th>
                </tr>
                {finishedTurns.map(finishedTurn => {
                    return (<tr key={finishedTurn.billId}>
                        <td>{finishedTurn.billId}</td>
                        <td>{finishedTurn.playStation.psName}</td>
                        <td>{finishedTurn.timeStart}</td>
                        <td>{finishedTurn.timeEnd}</td>
                        <td><Link to={`${finishedTurn.billId}`} >Xem chi tiết</Link> </td>
                    </tr>)
                })}
            </table>
        </div>
    )
}
export default FinishedTurn
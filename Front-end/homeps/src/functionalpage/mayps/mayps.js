import { Link,   Routes, Route} from "react-router-dom"
import { useState, useEffect } from "react"
import PsSearch from './PsSearch.js'
import { Select, MenuItem } from "@material-ui/core";
import EditForm from "./editform";
import AddForm from "./addform";

export default function MayPS(){
  return (
    <Routes>
        <Route path='' element={<ExtraMayPS />} />
        <Route path ='editform'>
            <Route path={`:id`} element={<EditForm />} />
        </Route>
        <Route path='addform'>
            <Route path='' element={<AddForm />}></Route>
        </Route>
    </Routes>

)
}
function ExtraMayPS() {

    const [data, setData] = useState({
      psList:[],
      currentPage: 1,
      totalPage: 3,
    });
    const [sizePage, setSizePage] = useState(10)
    const [isQuery, setIsQuery] = useState(false)
    const [isChangePageQuery, setChangePageQuery] = useState(false)
    var psList = data.psList;
    useEffect(() => {
        if(!isQuery)
            fetch(`https://homeps.herokuapp.com/api/ps?page=${data.currentPage}&size=${sizePage}&status=${'full'}`, {
           
                method: 'GET'
            })
                .then(res => res.json())
                .then(res => { setData(res) })
        }, [data.currentPage, sizePage])

    return (
      
        <div className="luot-choi">
            {/* <SearchBar type = 'unpaid'/> */}
            <div className="search-bar">    
                <PsSearch
                query = {data}
                setQuery = {setData}
                isQuery = {isQuery}
                setIsQuery = {setIsQuery}
                isChangePageQuery = {isChangePageQuery}
                setChangePageQuery = {setChangePageQuery}
                size={sizePage}
                />                
            </div> <br></br>
            <table className="tb" >
                <tbody className="t">
                    <tr className="table-list"  >
                        <th >ID</th>
                        <th >Máy</th>
                        <th >Trạng thái</th>
                        <th >Tình trạng</th>
                        <th ></th>
                    </tr>
                    {psList.map(psList => {
                        return (
                        <tr key={psList.psId}  className="list-turn">
                            <td> {psList.psId}</td>
                            <td> {psList.psName}</td>
                            <td> {psList.psStatus}</td>
                            <td> {psList.psState}</td>
                            {/* <td> <Link to={`${psList.psId}`}>Sửa</Link></td> */}
                            <td><Link to={`editform/${psList.psId}`} >Sửa</Link> </td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <div className='paging'>
                <button
                    onClick={() => {
                        setData({ ...data, currentPage: 1 })
                        setChangePageQuery(isQuery)
                    }
                    }>
                    {"<<"}
                </button>
                <button
                    onClick={() => {
                        if (data.currentPage > 1){
                            setData({ ...data, currentPage: data.currentPage - 1 })
                            setChangePageQuery(isQuery)
                        }
                    }}
                >
                    {"<"}
                </button>
                <button>{data.currentPage}</button>
                {(data.currentPage == data.totalPage) || <button
                    onClick={() => {
                        setData({ ...data, currentPage: data.currentPage + 1 })
                        setChangePageQuery(isQuery)
                    }
                    }
                >
                    {data.currentPage + 1}
                </button>}
                <button

                    onClick={() => {
                        if (data.currentPage < data.totalPage){
                            data({ ...data, currentPage: data.currentPage + 1 })
                            setChangePageQuery(isQuery)
                        }
                    }}
                >
                    {">"}
                </button>
                <button
                    onClick={() => {
                        setData({ ...data, currentPage: data.totalPage })
                        setChangePageQuery(isQuery)
                    }
                    }
                >
                    {">>"}
                </button>
                <div className="item" >
                <label>Items per page</label>
                <Select 
                    value={sizePage}
                    onChange={(e) => {
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
            <Link to={`addform`}><button>Thêm máy</button></Link>
        </div>)
}


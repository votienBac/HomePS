import { Link,   Routes, Route} from "react-router-dom"
import { useState, useEffect } from "react"
import PsSearch from './PsSearch.js'
import EditForm from "./editform";
import AddForm from "./addform";

export default function MayPS(){
  return (
    <Routes>
        <Route path='' element={<ExtraMayPS />} />
        <Route path ='editform'>
            <Route path={`:id/:status`} element={<EditForm />} />
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
        }, [data.currentPage, sizePage, isQuery])

    return (
    <div className="pageBody">
        <div className="header-luot-choi">
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
            </div>
            </div>
            {(data.totalPage === 0)? <h2 className="noResult">Không có máy ps nào</h2> :
            <div class="m-grid">
            <table className="m-table" >
                <thead>
                    <tr>
                        <th >ID</th>
                        <th >Máy</th>
                        {/*<th >Trạng thái</th>*/}
                        <th >Tình trạng</th>
                        <th ></th>
                    </tr>
                </thead>
                <tbody>
                    {psList.map(psList => {
                        return (
                        <tr key={psList.psId}>
                            <td> {psList.psId}</td>
                            <td> {psList.psName}</td>
                            {/*<td> {psList.psStatus}</td>*/}
                            <td> {psList.psState}</td>
                            {/* <td> <Link to={`${psList.psId}`}>Sửa</Link></td> */}
                            <td><Link to={`editform/${psList.psId}/${psList.psStatus}`} className="xem-ct">Xem chi tiết</Link> </td>
                        </tr>)
                    })}
                </tbody>    
            </table>
            </div>}
            <Link to={`addform`}><button>Thêm máy</button></Link>

            {(data.totalPage === 0)? <div></div> : <div class="m-table-paging">
                <div className="m-paging-left">

                </div>
                <div class="m-paging-center">
                
                <div class = "m-paging-first"
                    onClick={() => {
                        setData({ ...data, currentPage: 1 })
                        setChangePageQuery(isQuery)
                    }
                    }>
                </div>
                <div class = "m-paging-prev"
                    onClick={() => {
                        if (data.currentPage > 1){
                            setData({ ...data, currentPage: data.currentPage - 1 })
                            setChangePageQuery(isQuery)
                        }
                    }}
                >
                </div>
                <div class="page-number">{data.currentPage}</div>
                {(data.currentPage === data.totalPage) || <div class="page-number"
                    onClick={() => {
                        setData({ ...data, currentPage: data.currentPage + 1 })
                        setChangePageQuery(isQuery)
                    }
                    }
                >
                    {data.currentPage + 1}
                </div>}
                <div class="m-paging-next"

                    onClick={() => {
                        if (data.currentPage < data.totalPage){
                            setData({ ...data, currentPage: data.currentPage + 1 })
                            setChangePageQuery(isQuery)
                        }
                    }}
                >
                </div>
                <div class="m-paging-last"
                    onClick={() => {
                        setData({ ...data, currentPage: data.totalPage })
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
                            }}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            
                        </select>
            </div>
        </div>}
    </div>)
}
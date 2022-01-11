import React, { useState } from 'react'
import '../../css/luotchoi.css';
const SearchBar = ({ type, query, setQuery, isQuery, setIsQuery, isChangePageQuery, setChangePageQuery, size }) => {
    const [details, setDetails] = useState('')
    console.log(details);
    const handleChange = (props) => {
        setDetails(props)
        if (props == '') {
            setIsQuery(false)
            setQuery({ ...query, currentPage: 1 })
        }
    }
    const handleKeypress = e => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    if(isQuery && isChangePageQuery){
        fetch(`https://homeps.herokuapp.com/api/bills/search?size=${size}&page=${query.currentPage}&query=${details}&status=${type}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(res => setQuery(res))
        setChangePageQuery(false)
    }
    const handleSearch = () => {
        setIsQuery(true);
        console.log(details);
        fetch(`https://homeps.herokuapp.com/api/bills/search?size=${size}&query=${details}&status=${type}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(res => setQuery(res))
        console.log(query);
        console.log(typeof (setQuery));
    }

    return (
        <section className="search">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <input
                            id='input'
                            type='text'
                            name='input'
                            placeholder='Nhập tên máy'
                            onChange={e => handleChange(e.target.value)}
                            onKeyPress = {handleKeypress} 
                            value={details}
                            style={{    fontFamily: "inherit",
                                border: "2px solid green",
                                borderRadius: "50px",
                                fontSize: "14px",
                                padding: "0.5rem 1.5rem",
                                backgroundColor: "white",
                                width:'100px'}}
                        />
                        {/* <button onClick={handleSearch}> Search </button>                         */}
                    </div>
                </div>
            </div>
        </section>)

}
export default SearchBar
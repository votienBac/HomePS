import React, { useState } from 'react'
import '../../css/luotchoi.css';
const PsSearch = ({ query, setQuery, isQuery, setIsQuery, isChangePageQuery, setChangePageQuery, size }) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem('access_token'));
    myHeaders.append("Content-Type", "application/json");
    const [details, setDetails] = useState('')
    console.log(details);
    const handleChange = (props) => {
        setDetails(props)
        if (props === '') {
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
        fetch(`https://homeps.herokuapp.com/api/ps/search?size=${size}&page=${query.currentPage}&query=${details}`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(res => setQuery(res))
        setChangePageQuery(false)
    }
    const handleSearch = () => {
        setIsQuery(true);
        fetch(`https://homeps.herokuapp.com/api/ps/search?size=${size}&query=${details}`, {
            method: 'GET',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(res => setQuery(res))
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
                            style={{
                                fontFamily: "inherit",
                                borderRadius: "50px",
                                fontSize: "14px",
                                padding: "0.5rem 1.5rem",
                                width: '100px'
                            }}
                        />
                        {/* <button onClick={handleSearch}> Search </button>                         */}
                    </div>
                </div>
            </div>
        </section>)

}
export default PsSearch
import React, { useState } from 'react'
import '../../css/luotchoi.css';
const SearchBar = ({ type, query, setQuery }) => {
    const [details, setDetails] = useState('')
    console.log(details);
    const handleChange = (props) => {
        setDetails(props)
        if (props == '') handleSearch()
    }
    const handleKeypress = e => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        console.log(details);
        fetch(`https://homeps.herokuapp.com/api/bills/search?query=${details}&status=${type}`, {
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
                        />
                        <button onClick={handleSearch}> Search </button>                        
                    </div>
                </div>
            </div>
        </section>)

}
export default SearchBar
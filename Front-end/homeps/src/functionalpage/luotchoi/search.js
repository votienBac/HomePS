import React, { useState } from 'react'

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
                    <div className="col">Search</div>
                    <div className="col">
                        <input
                            id='input'
                            type='text'
                            name='input'
                            placeholder='Enter psID'
                            onChange={e => handleChange(e.target.value)}
                            onKeyPress = {handleKeypress} 
                            value={details}
                        />
                    </div>
                    <div className="col">
                        <button
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </section>)

}
export default SearchBar
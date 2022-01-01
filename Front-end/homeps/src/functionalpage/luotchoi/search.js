import React, { useEffect, useLayoutEffect, useState } from 'react'

const SearchBar = ({type, setBillsQuery}) => {
    const [details, setDetails] = useState('')
    const [check, setCheck] = useState(false)
    console.log(details);
    const handleChange = (e) => {
        setDetails(e.target.value)
        setCheck(!check)
    }
    useEffect(()=>{
        fetch(`https://homeps.herokuapp.com/api/bills/search/${details}?status=${type}`, {
            method: 'GET',
        })
        .then(
            res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then(res => {setBillsQuery(res)
            })
            .catch((error) => {
                setBillsQuery([])
                console.log(error);
            })
    }, [check])
    
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
                            onInput={e => handleChange(e)}
                            value={details}
                        />
                    </div>
                    <div className="col">
                        <button
                        // onClick  = {handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </section>)

}
export default SearchBar
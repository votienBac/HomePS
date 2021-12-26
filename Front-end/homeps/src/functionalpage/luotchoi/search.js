import React, {useState} from 'react'

const SearchBar = () => {
    const [details, setDetails] = useState({searchValue:''})
    console.log(details);
    const handleSearch = ()=>{

        //TODO
    }
    return(
        <section className="search">
        <div className="container">
          <div className="row">
            <div className="col">Search</div>
            <div className="col">
                <input
                id = 'input'
                type = 'text'
                name = 'input'
                placeholder = 'Enter psID'
                onChange = {e=>setDetails({searchValue: e.target.value})}
                value = {details.searchValue}
                />
            </div>
            <div className="col">
                <button
                onClick  = {handleSearch}
                >
                    Search
                </button>
            </div>
          </div>
        </div>
        </section>)

}
export default SearchBar
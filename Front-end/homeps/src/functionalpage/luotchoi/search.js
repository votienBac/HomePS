import { useLinkClickHandler } from "react-router-dom";
import React, {useState} from 'react'

const handleSubmit =  () =>{
    console.log('submit')
}
const SearchBar = () => {
    const [details, setDetails] = useState({searchValue:''})
    const handleSearch = ()=>{
        //TODO
    }
    return(
        <section class="search">
        <div class="container">
          <div class="row">
            <div class="col">Search</div>
            <div class="col">
                <input
                id = 'input'
                type = 'text'
                name = 'input'
                placeholder = 'Search the current turn'
                onChange = {e=>setDetails({searchValue: e.target.value})}
                value = {details.searchValue}
                />
            </div>
            <div class="col">
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
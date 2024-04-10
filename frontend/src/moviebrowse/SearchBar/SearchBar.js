import React from "react";
import { useState } from "react";
import './SearchBar.css';

function SearchBar(props) {

    return (
        <div class="input-group">
        <input
            type={props.type == undefined ? "search" : props.type}
            class="form-control rounded" 
            placeholder={props.placeholder}
            aria-label="Search" 
            aria-describedby="search-addon" 
            onChange = {(e) => props.onSearch(e.target.value)}
        />
        {/* <button
            type="button" 
            class="btn btn-outline-primary" 
            data-mdb-ripple-init>search
        </button> */}
        </div>
    );
}

export default SearchBar;
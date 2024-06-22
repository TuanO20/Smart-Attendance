import { useRef, useState } from 'react';
import CreateStudent from '../CreateStudent';
import './SearchStudent.scss';

function SearchStudent() {
    const keyword = useRef('');
    const field = useRef('ID');

    // const handleSearch = (e) => {
    //     if (e.key === 'Enter') {
            
    //     }
    // }

    return (
        <>
            <div className="search__item">
                <label>Search by: </label>
                <select ref={field}>
                    <option value="ID" selected>ID</option>
                    <option value="FullName">Fullname</option>
                    <option value="Faculty">Faculty</option>
                    <option value="TypeOfTraining">Type of training</option>
                    <option value="Class">Class</option>
                    <option value="Year">Year</option>
                </select>

                <input type="text" ref={keyword} required onKeyDown={handleSearch}></input>
                {/* <i class="fa-solid fa-magnifying-glass"></i> */}

                <CreateStudent></CreateStudent>
            </div>

        </>
    );
}

export default SearchStudent;
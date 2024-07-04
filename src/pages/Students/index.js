import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import './Students.scss';
import { useEffect, useRef, useState } from 'react';
import CreateStudent from '../../components/CRUDStudent/CreateStudent';
import DeleteStudent from '../../components/CRUDStudent/DeleteStudent';
import UpdateStudent from '../../components/CRUDStudent/UpdateStudent';
import GetFeatureFile from '../../components/GetFeatureFile';


function Students() {
    const [studentList, setStudentList] = useState([]);

    const keyword = useRef('');
    const field = useRef('ID');

    // Display all students
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'Student'), (snapshot) => {
            if (!snapshot.empty) 
                setStudentList(snapshot.docs);
        });
        return () => unsubscribe();

    }, []);

    // Search student function
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const searchFunct = async () => {
                var searchField = field.current.value;
                var searchKeyword = (searchField == "Year") ? parseInt(keyword.current.value) : keyword.current.value;

                const q = (searchField != "Year") ? 
                query(
                    collection(db, 'Student'), 
                    orderBy(searchField), 
                    where(searchField, '>=', searchKeyword),
                    where(searchField, '<=', `${searchKeyword}` + "\uf8ff" )
                ) :
                query(
                    collection(db, 'Student'), 
                    orderBy('Year'), 
                    where('Year', '==', searchKeyword)
                );


                const data = await getDocs(q);
                setStudentList(data.docs);
            } 

            searchFunct();
        }
    }


    return (
        <>
            <h3>LIST OF STUDENTS</h3>
            <div className='studentList'>
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

                    <CreateStudent></CreateStudent>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Faculty</th>
                            <th>Type of training</th>
                            <th>Class</th>
                            <th>Year</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {(studentList.length == 0) ? 
                            <tr>
                                <td colspan="8" style={{textAlign: "center"}}>No data found</td>
                            </tr> : 
                            studentList.map((student, index) => (
                                <tr key={student.data().ID}>
                                    <td>{index + 1}</td>
                                    <td>{student.data().ID}</td>
                                    <td>{student.data().FullName}</td>
                                    <td>{student.data().Faculty}</td>
                                    <td>{student.data().TypeOfTraining}</td>
                                    <td>{student.data().Class}</td>
                                    <td>{student.data().Year}</td>
                                    <td className='icon'>
                                        <div>
                                            <UpdateStudent student={student.data()}></UpdateStudent>
                                            <DeleteStudent studentID={student.data().ID}></DeleteStudent>
                                            <GetFeatureFile></GetFeatureFile>
                                        </div>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    );
}

export default Students;
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import './Teachers.scss';
import { useEffect, useRef, useState } from 'react';
import CreateTeacher from '../../components/CRUDTeachers/CreateTeacher';
import DeleteTeacher from '../../components/CRUDTeachers/DeleteTeacher';
import UpdateTeacher from '../../components/CRUDTeachers/UpdateTeacher';
import { exportToExcel } from '../../utils/excel';

function Teachers() {
    const [teacherList, setTeacherList] = useState([]);

    const keyword = useRef('');
    const field = useRef('TeacherID');

    // Display all teachers
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'Teachers'), (snapshot) => {
            if (!snapshot.empty) 
                setTeacherList(snapshot.docs);
        });
        return () => unsubscribe();

    }, []);

    // Search teacher function
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const searchFunct = async () => {
                var searchField = field.current.value;
                var searchKeyword = keyword.current.value;

                const q = query(
                    collection(db, 'Teachers'), 
                    orderBy(searchField), 
                    where(searchField, '>=', searchKeyword),
                    where(searchField, '<=', `${searchKeyword}` + "\uf8ff" )
                );
                
                const data = await getDocs(q);
                setTeacherList(data.docs);
            } 

            searchFunct();
        }
    }

    // Define the order of columns
    const columns = ['TeacherID', 'TeacherName', 'LevelOfEducation', 'Faculty'];

    return (
        <>
            <h3>LIST OF TEACHERS</h3>
            <div className='teacherList'>
                <div className="search__item">
                    <label>Search by: </label>
                    <select ref={field}>
                        <option value="TeacherID" selected>TeacherID</option>
                        <option value="TeacherName">TeacherName</option>
                        <option value="Faculty">Faculty</option>
                        <option value="LevelOfEducation">Level of education</option>
                    </select>

                    <input type="text" ref={keyword} required onKeyDown={handleSearch}></input>

                    <button className='btn btn-info' onClick={() => exportToExcel(teacherList.map((teacher) => teacher.data()), columns, 'teachers.xlsx')}>Export to Excel</button>
                    <CreateTeacher></CreateTeacher>
                </div>

                

                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>TeacherID</th>
                            <th>Teacher Name</th>
                            <th>Level of education</th>
                            <th>Faculty</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {(teacherList.length == 0) ? 
                            <tr>
                                <td colSpan="6" style={{textAlign: "center"}}>No data found</td>
                            </tr> : 
                            teacherList.map((teacher, index) => (
                                <tr key={teacher.data().TeacherID}>
                                    <td>{index + 1}</td>
                                    <td>{teacher.data().TeacherID}</td>
                                    <td>{teacher.data().TeacherName}</td>
                                    <td>{teacher.data().LevelOfEducation}</td>
                                    <td>{teacher.data().Faculty}</td>
                                    <td className='icon'>
                                        <div>
                                            <UpdateTeacher teacher={teacher.data()}></UpdateTeacher>
                                            <DeleteTeacher teacherID={teacher.data().TeacherID}></DeleteTeacher>
                                            
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

export default Teachers;

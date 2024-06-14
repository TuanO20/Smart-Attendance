import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import './Students.scss';
import { useEffect, useState } from 'react';
import CreateStudent from '../../components/CRUDStudent/CreateStudent';
import DeleteStudent from '../../components/CRUDStudent/DeleteStudent';
import UpdateStudent from '../../components/CRUDStudent/UpdateStudent';


function Students(){
    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const snapshot = onSnapshot(collection(db, 'Student'), (snapshot) => {
                if (!snapshot.empty) 
                    setStudentList(snapshot.docs);
            });
            return () => snapshot();
        } 

        fetchStudents();
        
    }, []);

    return (
        <>
            <h3>LIST OF STUDENTS</h3>
            <div className='studentList'>
                <CreateStudent></CreateStudent>

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
                        { studentList.map((student, index )=> (
                            <tr key={student.data().ID}>
                                <td>{index +1}</td>
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
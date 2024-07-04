import { collection, getDoc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import './Classes.scss';
import { useEffect, useRef, useState } from 'react';
import { ReadDoc } from '../../utils/utils';

function Classes() {
    const [classList, setClassList] = useState([]);
    const [teachers, setTeachers] = useState({});

    const keyword = useRef('');
    const field = useRef('ID');

    // const fetchTeacherName = async (teacherRef) => {
    //     try {
    //         const teacherDoc = await getDoc(teacherRef);
    //         return teacherDoc.exists() ? teacherDoc.data().TeacherName || 'No name' : 'Teacher not found';
    //     } catch (error) {
    //         console.error("Error fetching teacher data:", error);
    //         return 'Error loading teacher';
    //     }
    // };

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'Classes'), async (snapshot) => {
            if (!snapshot.empty) {
                const classesData = snapshot.docs.map(doc => doc.data());
                setClassList(classesData);
            }
        });

        return () => unsubscribe();
    }, []);

    // Update teachers object to look up TeacherName
    useEffect(() => {
        const fetchData = async () => {
            for (const item of classList) {
                const data = await ReadDoc(item.TeacherID);
                if (data) {
                    setTeachers(old => 
                        ({
                            ...old,
                            [data.TeacherID] : data.TeacherName
                        })
                    );
                }
            }
        }

        fetchData();
    }, [classList]);

    const handleSearch = async (e) => {
        if (e.key === 'Enter') {
            const searchField = field.current.value;
            const searchKeyword = searchField === "Year" ? parseInt(keyword.current.value) : keyword.current.value;
            const q = query(
                collection(db, 'Classes'),
                orderBy(searchField),
                where(searchField, '>=', searchKeyword),
                where(searchField, '<=', `${searchKeyword}\uf8ff`)
            );

            const data = await getDocs(q);
            setClassList(data.docs.map(doc => doc.data()));
        }
    };

    return (
        <>
            <h3>LIST OF CLASSES</h3>
            <div className='classList'>
                <div className="search__item">
                    <label>Search by: </label>
                    <select ref={field}>
                        <option value="ClassID" selected>ClassID</option>
                        <option value="SubjectID">SubjectID</option>
                        <option value="TeacherName">TeacherName</option>
                        <option value="StartAt">Start at</option>
                        <option value="EndAt">End at</option>
                    </select>
                    <input type="text" ref={keyword} required onKeyDown={handleSearch}></input>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ClassID</th>
                            <th>SubjectID</th>
                            <th>TeacherName</th>
                            <th>Number of students</th>
                            <th>Number of Lessons</th>
                            <th>Start at</th>
                            <th>End at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classList.length === 0 ? (
                            <tr>
                                <td colSpan="8" style={{ textAlign: "center" }}>No data found</td>
                            </tr>
                        ) : (
                            classList.map((data, index) => (
                                <tr key={data.ClassID || index}>
                                    <td>{index + 1}</td>
                                    <td>{data.ClassID || 'N/A'}</td>
                                    <td>{data.SubjectID ? data.SubjectID.path.slice(-5) : 'N/A'}</td>
                                    <td>{teachers[data.TeacherID.id] || 'Loading...'}</td>
                                    <td>{data.StudentsID ? data.StudentsID.length : 'N/A'}</td>
                                    <td>{data.LessonsID ? data.LessonsID.length : 'N/A'}</td>
                                    <td>{data.StartAt ? data.StartAt.toDate().toLocaleDateString() : 'N/A'}</td>
                                    <td>{data.EndAt ? data.EndAt.toDate().toLocaleDateString() : 'N/A'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Classes;

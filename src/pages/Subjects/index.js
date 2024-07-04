import { collection, getDocs, onSnapshot, getDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import './Subjects.scss';
import { useEffect, useRef, useState } from 'react';
import CreateSubject from '../../components/CRUDSubject/CreateSubject';
import DeleteSubject from '../../components/CRUDSubject/DeleteSubject';
import UpdateSubject from '../../components/CRUDSubject/UpdateSubject';

function Subjects(){
    const [subjectList, setSubjectList] = useState([]);
    const [prevSubjects, setPrevSubjects] = useState({});
    const [prereqSubjects, setPrereqSubjects] = useState({});
    const [classes, setClasses] = useState({});

    const keyword = useRef('');
    const field = useRef('ID');

    // Display all subjects
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'Subjects'), (snapshot) => {
            if (!snapshot.empty) 
                setSubjectList(snapshot.docs);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchSubjects = async () => {
            const newPrevSubjects = {};
            const newPrereqSubjects = {};
            const newClasses = {};

            for (let subject of subjectList) {
                const prevSubjectRefs = Object.values(subject.data().PrevSubjectID || {});
                const fetchedPrevSubjects = await Promise.all(prevSubjectRefs.map(async (ref) => {
                    const docSnap = await getDoc(ref);
                    return docSnap.exists() ? docSnap.data() : null;
                }));
                newPrevSubjects[subject.data().SubjectID] = fetchedPrevSubjects.filter(data => data !== null);

                const prereqSubjectRefs = Object.values(subject.data().PrereqsSubjectID || {});
                const fetchedPrereqSubjects = await Promise.all(prereqSubjectRefs.map(async (ref) => {
                    const docSnap = await getDoc(ref);
                    return docSnap.exists() ? docSnap.data() : null;
                }));
                newPrereqSubjects[subject.data().SubjectID] = fetchedPrereqSubjects.filter(data => data !== null);

                const classRefs = Object.values(subject.data().ClassesID || {});
                const fetchedClasses = await Promise.all(classRefs.map(async (ref) => {
                    const docSnap = await getDoc(ref);
                    return docSnap.exists() ? docSnap.data() : null;
                }));
                newClasses[subject.data().SubjectID] = fetchedClasses.filter(data => data !== null);
            }

            setPrevSubjects(newPrevSubjects);
            setPrereqSubjects(newPrereqSubjects);
            setClasses(newClasses);
        };

        if (subjectList.length > 0) {
            fetchSubjects();
        }
    }, [subjectList]);

    // Search subject function
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const searchFunct = async () => {
                var searchField = field.current.value;
                var searchKeyword = keyword.current.value;

                const q = query(
                    collection(db, 'Subjects'), 
                    orderBy(searchField), 
                    where(searchField, '>=', searchKeyword),
                    where(searchField, '<=', `${searchKeyword}` + "\uf8ff" )
                );
                
                const data = await getDocs(q);
                setSubjectList(data.docs);
            } 

            searchFunct();
        }
    }

    return (
        <>
            <h3>LIST OF SUBJECTS</h3>
            <div className='subjectList'>
                <div className="search__item">
                    <label>Search by: </label>
                    <select ref={field}>
                        <option value="SubjectID" selected>SubjectID</option>
                        <option value="SubjectName">SubjectName</option>
                        <option value="PrevSubjectID">Previous subjects</option>
                        <option value="PrereqsSubjectID">Prerequisites subjects</option>
                        <option value="Faculty">Faculty</option>
                        <option value="ClassesID">ClassesID</option>
                    </select>

                    <input type="text" ref={keyword} required onKeyDown={handleSearch}></input>

                    <CreateSubject></CreateSubject>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>SubjectID</th>
                            <th>Subject Name</th>
                            <th>Previous subjects</th>
                            <th>Prerequisites subjects</th>
                            <th>Faculty</th>
                            <th>ClassesID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {(subjectList.length === 0) ? 
                            <tr>
                                <td colSpan="8" style={{textAlign: "center"}}>No data found</td>
                            </tr> : 
                            subjectList.map((subject, index) => (
                                <tr key={subject.data().SubjectID}>
                                    <td>{index + 1}</td>
                                    <td>{subject.data().SubjectID}</td>
                                    <td>{subject.data().SubjectName}</td>
                                    <td>
                                        {prevSubjects[subject.data().SubjectID] ? (
                                            prevSubjects[subject.data().SubjectID].map((prevSubject, index) => (
                                                <div key={index}>{prevSubject.SubjectID}</div>
                                            ))
                                        ) : (
                                            ""
                                        )}
                                    </td>
                                    <td>
                                        {prereqSubjects[subject.data().SubjectID] ? (
                                            prereqSubjects[subject.data().SubjectID].map((prereqSubject, index) => (
                                                <div key={index}>{prereqSubject.SubjectID}</div>
                                            ))
                                        ) : (
                                            ""
                                        )}
                                    </td>
                                    <td>{subject.data().Faculty}</td>
                                    <td>
                                        {classes[subject.data().SubjectID] ? (
                                            classes[subject.data().SubjectID].map((classItem, index) => (
                                                <div key={index}>{classItem.ClassID}</div>
                                            ))
                                        ) : (
                                            ""
                                        )}
                                    </td>
                                    <td className='icon'>
                                        <div>
                                            <UpdateSubject subject={subject.data()}></UpdateSubject>
                                            <DeleteSubject subjectID={subject.data().SubjectID}></DeleteSubject>
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

export default Subjects;

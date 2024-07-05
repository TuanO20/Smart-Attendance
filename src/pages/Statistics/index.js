import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import './Statistics.scss';

function Statistics() {
    const [numStudents, setNumStudents] = useState(0);
    const [numTeachers, setNumTeachers] = useState(0);
    const [numClasses, setNumClasses] = useState(0);
    const [numLateStudents, setNumLateStudents] = useState(0);
    const [numOnTimeStudents, setNumOnTimeStudents] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            // Get number of students
            const studentsSnapshot = await getDocs(collection(db, 'Student'));
            setNumStudents(studentsSnapshot.size);

            // Get number of teachers
            const teachersSnapshot = await getDocs(collection(db, 'Teachers'));
            setNumTeachers(teachersSnapshot.size);

            // Get number of classes
            const classesSnapshot = await getDocs(collection(db, 'Classes'));
            setNumClasses(classesSnapshot.size);

            // Get number of late students
            const lateStudentsQuery = query(collection(db, 'Attendances'), where('Status', '==', 'Late'));
            const lateStudentsSnapshot = await getDocs(lateStudentsQuery);
            setNumLateStudents(lateStudentsSnapshot.size);

            // Get number of on-time students
            const onTimeStudentsQuery = query(collection(db, 'Attendances'), where('Status', '==', 'On time'));
            const onTimeStudentsSnapshot = await getDocs(onTimeStudentsQuery);
            setNumOnTimeStudents(onTimeStudentsSnapshot.size);
        };

        fetchData();
    }, []);

    return (
        <div className="statistics">
            <div className="statistic-item">
                <h4>Number of students</h4>
                <p>{numStudents}</p>
            </div>
            <div className="statistic-item">
                <h4>Number of teachers</h4>
                <p>{numTeachers}</p>
            </div>
            <div className="statistic-item">
                <h4>Number of classes</h4>
                <p>{numClasses}</p>
            </div>
            <div className="statistic-item">
                <h4>Number of students going late</h4>
                <p>{numLateStudents}</p>
            </div>
            <div className="statistic-item">
                <h4>Number of students going on time</h4>
                <p>{numOnTimeStudents}</p>
            </div>
        </div>
    );
}

export default Statistics;

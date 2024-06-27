import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";



function UpdateTeacher({ teacher }) {
    const [show, setShow] = useState(false);

    const idRef = useRef();
    const fullNameRef = useRef();
    const LevelOfEducation = useRef();
    const facultyRef = useRef();



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        // This effect will run whenever the 'show' state changes to true
        if (show) {
            idRef.current.value = teacher.TeacherID;
            fullNameRef.current.value = teacher.TeacherName;
            LevelOfEducation.current.value = teacher.LevelOfEducation;
            facultyRef.current.value = teacher.Faculty;

        }
    }, [show, teacher]);

    const handleUpdate = async () => {
        // Get data from input using useRef()
        const newTeacher = {
            //TeacherID: idRef.current.value,
            TeacherName: fullNameRef.current.value,
            LevelOfEducation: LevelOfEducation.current.value,
            Faculty: facultyRef.current.value
        }

        const updateTeacher = await updateDoc(doc(db, 'Teacher', teacher.TeacherID), newTeacher)
            .then(() => alert("Update teacher " + teacher.TeacherID + " successfully"))
            .catch(err => alert("Failed to update teacher"));


        handleClose();
    }


    return (
        <>
            <i class="fa-solid fa-pencil" onClick={handleShow}></i>

            <Modal show={show} onHide={handleClose} style={{ color: "red" }}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i class="fa-solid fa-chalkboard-user" style={{ marginRight: "20px" }}></i>
                        <span>Edit teacher</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>TeacherID</Form.Label>
                            <Form.Control type="text" required disabled ref={idRef} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Teacher Name</Form.Label>
                            <Form.Control type='text' required autoFocus ref={fullNameRef} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Level of education</Form.Label>
                            <Form.Select ref={facultyRef}>
                                <option value='Computer Science'>Computer Science</option>
                                <option value='Computer Engineering'>Computer Engineering</option>
                                <option value='Software Engineering'>Software Engineering</option>
                                <option value='Information Systems'>Information Systems</option>
                                <option value='Computer Networks and Communications'>Computer Networks and Communications</option>
                                <option value='Information Science and Engineering'>Information Science and Engineering</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Faculty</Form.Label>
                            <Form.Select ref={LevelOfEducation}>
                                <option value='Bachelor'>Bachelor</option>
                                <option value='Master'>Master</option>
                                <option value='PhD'>PhD</option>
                                <option value='Professor'>Professor</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateTeacher;
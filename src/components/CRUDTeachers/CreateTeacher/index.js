import React, { useRef, useState, useCallback } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import './CreateTeacher.scss';

const CreateTeacher = () => {
  const [show, setShow] = useState(false);

  const idRef = useRef();
  const fullNameRef = useRef();
  const LevelOfEducation = useRef();
  const facultyRef = useRef();


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = () => {
    const newTeacher = {
      TeacherID: idRef.current.value,
      TeacherName: fullNameRef.current.value,
      LevelOfEducation: LevelOfEducation.current.value,
      Faculty: facultyRef.current.value
    };

    const addTeacher = async () => {
        await setDoc(doc(db, 'Teachers', newTeacher.TeacherID), newTeacher)
          .then(() => alert("Add new teacher successfully"))
          .catch(err => alert("Error"));
    };

    addTeacher();
    handleClose();
  };


  return (
    <>
      <Button id='add-new' variant="primary" onClick={handleShow}>
        Add new
      </Button>

      <Modal show={show} onHide={handleClose} style={{ color: "red" }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i class="fa-solid fa-chalkboard-user" style={{ marginRight: "20px" }}></i>
            <span>Add new teacher</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>TeacherID</Form.Label>
              <Form.Control type="text" placeholder="GV001" required autoFocus ref={idRef} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teacher Name</Form.Label>
              <Form.Control type='text' placeholder='Nguyen Van A' required ref={fullNameRef} />
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
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTeacher;

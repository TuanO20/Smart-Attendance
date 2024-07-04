import React, { useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { setDoc, doc, collection } from 'firebase/firestore';
import { db } from '../../../firebase';
import './CreateSubject.scss';

const CreateSubject = () => {
  const [show, setShow] = useState(false);

  const SubjectIDRef = useRef();
  const SubjectNameRef = useRef();
  const PrevSubjectIDRef = useRef();
  const PrereqsSubjectIDRef = useRef();
  const FacultyRef = useRef();
  const ClassesIDRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = () => {
    // Split string to array
    var tempPrev = PrevSubjectIDRef.current.value ? PrevSubjectIDRef.current.value.split(',') : [];
    var tempPrereqs = PrereqsSubjectIDRef.current.value ? PrereqsSubjectIDRef.current.value.split(','): [];
    var tempClasses = ClassesIDRef.current.value ? ClassesIDRef.current.value.split(','): [];

    // Get reference of each subject
    var PrevSub = tempPrev.length > 0 ? tempPrev.map(item => doc(collection(db, 'Subjects'), item)) : [];
    var PrereqsSub = tempPrereqs.length > 0 ? tempPrereqs.map(item => doc(collection(db, 'Subjects'), item)) : [];
    var Classes = tempClasses.length > 0 ? tempClasses.map(item => doc(collection(db, 'Classes'), item)) : [];

    const newSubject = {
      SubjectID: SubjectIDRef.current.value,
      SubjectName: SubjectNameRef.current.value,
      Faculty: FacultyRef.current.value,
      PrevSubjectID: PrevSub,
      PrereqsSubjectID: PrereqsSub,
      ClassesID: Classes
    };

    const addSubject = async () => {
      try {
        await setDoc(doc(db, 'Subjects', newSubject.SubjectID), newSubject);
        alert("Add new subject successfully");
      } catch (err) {
        alert("Error");
      }
    };

    addSubject();
    handleClose();
  };

  return (
    <>
      <Button id='add-new' variant="primary" onClick={handleShow}>
        Add new
      </Button>

      <Modal show={show} onHide={handleClose} style={{ color: "blue" }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fa-solid fa-book" style={{ marginRight: "20px" }}></i>
            <span>Add new subject</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>SubjectID</Form.Label>
              <Form.Control type="text" placeholder="IT001" required autoFocus ref={SubjectIDRef} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control type='text' placeholder='Introduction to programming' required ref={SubjectNameRef} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Previous subjects</Form.Label>
              <Form.Control type='text' placeholder='IT001,IT006' required ref={PrevSubjectIDRef} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prerequisites subjects</Form.Label>
              <Form.Control type='text' placeholder='IT001,IT006' required ref={PrereqsSubjectIDRef} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Faculty</Form.Label>
              <Form.Select ref={FacultyRef}>
                <option value='Computer Science'>Computer Science</option>
                <option value='Computer Engineering'>Computer Engineering</option>
                <option value='Software Engineering'>Software Engineering</option>
                <option value='Information Systems'>Information Systems</option>
                <option value='Computer Networks and Communications'>Computer Networks and Communications</option>
                <option value='Information Science and Engineering'>Information Science and Engineering</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ClassesID</Form.Label>
              <Form.Control type='text' placeholder='CE103.O21,CE103.O22' required ref={ClassesIDRef} />
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

export default CreateSubject;

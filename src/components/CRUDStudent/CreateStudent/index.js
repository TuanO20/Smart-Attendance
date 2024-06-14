import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './CreateStudent.scss';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import Webcam from 'react-webcam';

function CreateStudent() {
  const [show, setShow] = useState(false);

  const idRef = useRef();
  const fullNameRef = useRef();
  const facultyRef = useRef();
  const typeOfTrainingRef = useRef();
  const classRef = useRef();
  const yearRef = useRef();
  const imageRef = useRef();


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCapture = () => {
    const imgStudent = imageRef.current.video;
    //const imgStudent = imageRef.current.getScreenshot();
    console.log(imgStudent); 
  }

  const handleAdd = () => {
      // Get data from input using useRef()
      const newStudent = {
        ID: idRef.current.value,
        FullName: fullNameRef.current.value,
        Faculty: facultyRef.current.value,
        TypeOfTraining: typeOfTrainingRef.current.value,
        Class: classRef.current.value,
        Year: parseInt(yearRef.current.value)

      }

      var yearNow = new Date().getFullYear();
      
      if (newStudent.Year >= 2006 && newStudent.Year <= yearNow) {
        //Add new student to Firestore
        const addStudent = async () => {
          // newStudent.ID is the ID document
          const newDoc = await setDoc(doc(db,'Student', newStudent.ID), newStudent)
            .then(() => alert("Add new student successfully"))
            .catch(err => alert("Error"));
        }

        addStudent();
      }
      else alert(`Year has to be between 2006 and ${yearNow}`);

      handleClose();
      
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add new
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i class="fa-solid fa-graduation-cap" style={{marginRight: "20px"}}></i>
            <span>Add new student</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" placeholder="21521234" required autoFocus ref={idRef}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Full name</Form.Label>
              <Form.Control type='text' placeholder='Nguyen Van A' required ref={fullNameRef}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Faculty</Form.Label>
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
              <Form.Label>Type of training</Form.Label>
              <Form.Select ref={typeOfTrainingRef}>
                    <option value='Mass Education'>Mass Education</option>
                    <option value='High Quality'>High Quality</option>
                    <option value='Transnational Program'>Transnational Program</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Class</Form.Label>
              <Form.Control type='text' placeholder='MTIO2021' required ref={classRef}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control type='number' placeholder='2021' required ref={yearRef}/>
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label><br></br>
              <Webcam mirrored={true} ref={imageRef} style={{width: "100%"}}></Webcam>
              <Button className='btn btn-primary' onClick={handleCapture} style={{margin: "0"}}>Capture</Button>
            </Form.Group> */}

            
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
}

export default CreateStudent;
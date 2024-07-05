import React, { useRef, useState, useCallback } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import Webcam from 'react-webcam';
import './CreateStudent.scss';
import { clear } from '@testing-library/user-event/dist/clear';
import { Create } from '../../../utils/utils';

const CreateStudent = () => {
  const [show, setShow] = useState(false);
  const [imagesAll, setImagesAll] = useState({});
  // const [capturing, setCapturing] = useState(false);
  // const [recordedChunks, setRecordedChunks] = useState([]);
  // const mediaRecorderRef = useRef(null);

  const idRef = useRef();
  const fullNameRef = useRef();
  const facultyRef = useRef();
  const typeOfTrainingRef = useRef();
  const classRef = useRef();
  const yearRef = useRef();
  const webcamRef = useRef(null);

  // const videoConstraints = {
  //   width: 420,
  //   height: 420,
  //   facingMode: "user",
  // };

  // const handleStartCaptureClick = useCallback(() => {
  //   setCapturing(true);
  //   mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
  //     mimeType: "video/webm"
  //   });
  //   mediaRecorderRef.current.addEventListener(
  //     "dataavailable",
  //     handleDataAvailable
  //   );
  //   mediaRecorderRef.current.start();
  // }, [webcamRef, setCapturing, mediaRecorderRef]);

  // const handleDataAvailable = useCallback(
  //   ({ data }) => {
  //     if (data.size > 0) {
  //       setRecordedChunks((prev) => prev.concat(data));
  //     }
  //   },
  //   [setRecordedChunks]
  // );

  // const handleStopCaptureClick = useCallback(() => {
  //   mediaRecorderRef.current.stop();
  //   setCapturing(false);
  // }, [mediaRecorderRef, webcamRef, setCapturing]);

  // const handleDownload = useCallback(() => {
  //   if (recordedChunks.length) {
  //     const blob = new Blob(recordedChunks, {
  //       type: "video/mp4"
  //     });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     document.body.appendChild(a);
  //     a.style = "display: none";
  //     a.href = url;
  //     a.download = "react-webcam-stream-capture.mp4";
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     setRecordedChunks([]);
  //   }
  // }, [recordedChunks]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = () => {
    const newStudent = {
      ID: idRef.current.value,
      FullName: fullNameRef.current.value,
      Faculty: facultyRef.current.value,
      TypeOfTraining: typeOfTrainingRef.current.value,
      Class: classRef.current.value,
      Year: parseInt(yearRef.current.value),
      Images: imagesAll
    };

    const yearNow = new Date().getFullYear();

    if (newStudent.Year >= 2006 && newStudent.Year <= yearNow) {
      const addStudent = async () => {
        await setDoc(doc(db, 'Student', newStudent.ID), newStudent)
          .then(() => alert("Add new student successfully"))
          .catch(err => alert("Error"));
      };

      addStudent();
    } else {
      alert(`Year has to be between 2006 and ${yearNow}`);
    }

    handleClose();
  };

  // Automatically download after stopping capture
  // React.useEffect(() => {
  //   if (!capturing && recordedChunks.length) {
  //     handleDownload();
  //   }
  // }, [capturing, recordedChunks, handleDownload]);

  const handleCaptureImage = (e) => {
    var images = [];

    const autoCapture = setInterval(() => {
        images.push(webcamRef.current.getScreenshot());
        //console.log(images);

        if (images.length === 5) {
            clearInterval(autoCapture);
            console.log(images);
            
            if (e.target.innerHTML === 'Left') {
                setImagesAll({ ...imagesAll, Left: images });
            }
            else if (e.target.innerHTML === 'Right') {
                setImagesAll({ ...imagesAll, Right: images });
            }
            else if (e.target.innerHTML === 'Center') {
              setImagesAll({ ...imagesAll, Center: images });
            }
            else if (e.target.innerHTML === 'Top') {
              setImagesAll({ ...imagesAll, Top: images });
            }
            else if (e.target.innerHTML === 'Bottom') {
              setImagesAll({ ...imagesAll, Bottom: images });
            }
        }
        e.target.disabled = true;
    }, 500);
}



  return (
    <>
      <Button id='add-new' variant="primary" onClick={handleShow}>
        Add new
      </Button>

      <Modal show={show} onHide={handleClose} style={{ color: "green" }}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fa-solid fa-graduation-cap" style={{ marginRight: "20px" }}></i>
            <span>Add new student</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" placeholder="21521234" required autoFocus ref={idRef} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Full name</Form.Label>
              <Form.Control type='text' placeholder='Nguyen Van A' required ref={fullNameRef} />
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
              <Form.Control type='text' placeholder='MTIO2021' required ref={classRef} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control type='number' placeholder='2021' required ref={yearRef} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label><br></br>
              {/* <Webcam mirrored={true} videoConstraints={videoConstraints} ref={webcamRef} style={{ width: "100%" }}></Webcam>
              {capturing ? (
                <Button className='btn btn-primary' onClick={handleStopCaptureClick} style={{ margin: "0" }}>Stop Capture</Button>
              ) : (
                <Button className='btn btn-primary' onClick={handleStartCaptureClick} style={{ margin: "0" }}>Start Capture</Button>
              )} */}

              <Webcam mirrored={true} ref={webcamRef} style={{ width: "100%" }}></Webcam>
              <Button className='btn btn-primary' onClick={handleCaptureImage}>Left</Button>
              <Button className='btn btn-warning' onClick={handleCaptureImage}>Right</Button>
              <Button className='btn btn-secondary' onClick={handleCaptureImage}>Center</Button>
              <Button className='btn btn-danger' onClick={handleCaptureImage}>Top</Button>
              <Button className='btn btn-info' onClick={handleCaptureImage}>Bottom</Button>
              {/* <Button className='btn btn-success' onClick={handleOK}>Send</Button> */}
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

export default CreateStudent;

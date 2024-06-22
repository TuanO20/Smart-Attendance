import { useRef } from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";


function GetFeatureFile() {
    const [show, setShow] = useState(false);

    const fileRef = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUpload = () => {


        handleClose();
    }


    return (
        <>
            <i class="fa-solid fa-gear" onClick={handleShow}></i>

            <Modal show={show} onHide={handleClose} style={{color: "green"}}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i class="fa-solid fa-gear" style={{ marginRight: "20px" }}></i>
                        <span>Add feature file</span>
                    </Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Feature File</Form.Label>
                            <Form.Control type="file" ref={fileRef} />
                        </Form.Group>

                    </Form>
                </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpload}>
                        Upload
                    </Button>
                </Modal.Footer>
                
            </Modal>

        </>

    );
}

export default GetFeatureFile;
import Webcam from 'react-webcam';
import './Recognition.scss';
import { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';

function Recognition() {
    const webcamRef = useRef(null);
    const [isCamOpen, setIsCamOpen] = useState(false);

    const handleOpenCam = () => {
        setIsCamOpen(true);
    };

    const handleCloseCam = () => {
        setIsCamOpen(false);
    };

    return (
        <>
            <h3>Face Recognition</h3>
            <div className='container__box'>
                <div className="main__item">
                    <fieldset>
                        <legend>Recognition screen</legend>
                        <div className="main__title">
                            <div className="title--1">
                                <label>Choose LessonID</label>
                                <select>
                                    <option value={1}>Test 1</option>
                                    <option value={2}>Test 2</option>
                                </select>
                            </div>

                            <div className="title--2">
                                <label>Choose type of attendance</label>
                                <select>
                                    <option value="In">In</option>
                                    <option value="Out">Out</option>
                                </select>
                            </div>
                        </div>

                        <div className='main__camera'>
                            {isCamOpen ? ( <Webcam mirrored={true} ref={webcamRef} style={{ width: "50%" }} />)
                                    : (<img src='https://t4.ftcdn.net/jpg/01/07/57/91/360_F_107579101_QVlTG43Fwg9Q6ggwF436MPIBTVpaKKtb.jpg' className='mockBox'></img>)
                            }
                        </div>

                        <div className='main__button'>
                            <Button className='btn-success' onClick={handleOpenCam}>Open Camera</Button>
                            <Button className='btn-danger' onClick={handleCloseCam}>Close Camera</Button>
                        </div>
                    </fieldset>
                </div>

                <div className='main__info'>
                    <fieldset>
                        <legend>Student Infomation</legend>
                        <div className="info__student">
                            <div className='img__student' style={{display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "15px"}}>
                                <img src='https://st3.depositphotos.com/3581215/18899/v/450/depositphotos_188994514-stock-illustration-vector-illustration-male-silhouette-profile.jpg' style={{maxWidth: "250px", width: "100%"}}></img>
                            </div>

                            <div>
                                <div className='info__output'>
                                    <label>StudentID</label>
                                    <input type='text'></input>
                                </div>

                                <div className='info__output'>
                                    <label>Student Name</label>
                                    <input type='text'></input>
                                </div>

                                <div className='info__output'>
                                    <label>Time</label>
                                    <input type='text'></input>
                                </div>
                            </div>

                        </div>

                    </fieldset>

                    <fieldset>
                        <legend>Class infomation</legend>
                        <div className="info_class">
                            <div className='info__output'>
                                <label>ClassID</label>
                                <input type='text'></input>
                            </div>

                            <div className='info__output'>
                                <label>LessonID</label>
                                <input type='text'></input>
                            </div>

                            <div className='info__output'>
                                <label>Time</label>
                                <input type='text'></input>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </>
    );
}

export default Recognition;

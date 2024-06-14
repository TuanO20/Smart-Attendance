import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import Clock from "../Clock";
import './Welcome.scss';

function Welcome() {
    return (
        <div className="container">
            <div style={{textAlign: "center"}}>Welcome to Smart Attendance System!!!</div>
            <Clock></Clock>
            <img src={logo} alt="logo"></img>  
            <Link to="/login">
                <button className="btn btn-success">Go to login page</button>
            </Link>
        </div>

    );
}

export default Welcome;
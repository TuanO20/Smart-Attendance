import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Clock from "../../components/Clock";
import './DefaultDashBoard.scss';


function DefaultDashBoard() {
    return (
        <>
            <div className="container-fluid">
                <Sidebar></Sidebar>
                <div>
                    <Header></Header>
                    <div className="noti">
                        
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DefaultDashBoard;
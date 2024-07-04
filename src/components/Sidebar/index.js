import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logo.jpg';
import './Sidebar.scss';

function Sidebar() {
    return (
        <>
            <div className='sidebar'>
                <div className='sidebar__title'>
                    <img src={Logo} alt="Logo Smart Home" />
                    <h3>Smart Attendance</h3>
                </div>

                <div className='sidebar__list'>
                    <ul>
                        <NavLink to="/dashboard/students">
                            <li>
                                <i class="fa-solid fa-graduation-cap"></i>
                                <span>Students</span>
                            </li>
                        </NavLink>

                        <NavLink to="/dashboard/teachers">
                            <li>
                                <i class="fa-solid fa-chalkboard-user"></i>
                                <span>Teachers</span>
                            </li>
                        </NavLink>

                        <NavLink to="/dashboard/subjects">
                            <li>
                                <i class="fa-solid fa-book"></i>
                                <span>Subjects</span>
                            </li>
                        </NavLink>

                        {/* <NavLink to="/dashboard/classes">
                            <li>
                            <i class="fa-solid fa-school"></i>
                                <span>Classes</span>
                            </li>
                        </NavLink>

                        <NavLink to="/dashboard/lessons">
                            <li>
                                <i class="fa-solid fa-chalkboard"></i>
                                <span>Lessons</span>
                            </li>
                        </NavLink>

                        <NavLink to="/dashboard/attendances">
                            <li>
                                <i class="fa-solid fa-clipboard-user"></i>
                                <span>Attendances</span>
                            </li>
                        </NavLink> */}

                        <NavLink to="/dashboard/recognition">
                            <li>
                            <i class="fa-solid fa-magnifying-glass"></i>
                                <span>Recognition</span>
                            </li>
                        </NavLink>

                        <NavLink to="/dashboard/statistics">
                            <li>
                            <i class="fa-solid fa-chart-column"></i>
                                <span>Statistics</span>
                            </li>
                        </NavLink>
                    </ul>
                </div>

                <div className='sidebar__social'>
                    <h5>Follow us</h5>
                    <a href="https://www.facebook.com/Google"><i class="fa-brands fa-facebook fa-lg"></i></a>
                    <a href='https://www.instagram.com/google/'><i class="fa-brands fa-square-instagram fa-lg"></i></a>
                    <a href='https://twitter.com/Google'><i class="fa-brands fa-square-x-twitter fa-lg"></i></a>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
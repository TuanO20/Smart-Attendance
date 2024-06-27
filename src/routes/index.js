import Welcome from "../components/Welcome";
import DefaultDashBoard from "../layout/DefaultDashBoard";
import DefaultHome from "../layout/DefaultHome";
import Attendances from "../pages/Attendances";
import Lessons from "../pages/Lessons";
import Login from "../pages/Login";
import Recognition from "../pages/Recognition";
import Statistics from "../pages/Statistics";
import Students from "../pages/Students";
import Subjects from "../pages/Subjects";
import Teachers from "../pages/Teachers";
import Classes from "../pages/Classes";



export const routes = [
    {
        path: '/',
        element: <DefaultHome></DefaultHome>,
        children: [
            {
                index: true,
                element: <Welcome></Welcome>
            },
            {
                path: 'login',
                element: <Login></Login>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <DefaultDashBoard></DefaultDashBoard>,
        children: [
            {
                path: 'students',
                element: <Students></Students>
            },
            {
                path: 'teachers',
                element: <Teachers></Teachers>
            },
            {
                path: 'subjects',
                element: <Subjects></Subjects>
            },
            {
                path: 'classes',
                element: <Classes></Classes>
            },
            {
                path: 'attendances',
                element: <Attendances></Attendances>
            },
            {
                path: 'lessons',
                element: <Lessons></Lessons>
            },
            {
                path: 'statistics',
                element: <Statistics></Statistics>
            },
            {
                path: 'recognition',
                element: <Recognition></Recognition>
            }
        ]
    }
];
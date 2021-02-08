//Instructor Side menu
import React from "react";
import { NavLink} from 'react-router-dom';
import './sidemenu.css'
const SideMenuStudent=()=>{
return (
    <>
    <ul className="side-menu">
                
                <li className="menu">
                  <NavLink to="/student/dashboard"  activeClassName="active"> <i className="fa fa-home"></i> Upcoming Submission</NavLink>
                </li>
                <li className="menu">
                  <NavLink to="/student/assignment/past"  activeClassName="active"><i className="fa fa-print"></i> Submitted Submission</NavLink>
                </li>
                
                
            </ul>
    </>
)
}
export default SideMenuStudent
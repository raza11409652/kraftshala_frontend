//Instructor Side menu
import React from "react";
import { NavLink} from 'react-router-dom';
import './sidemenu.css'
const SideMenu=()=>{
return (
    <>
    <ul className="side-menu">
                
                <li className="menu">
                  <NavLink to="/instructor/dashboard"  activeClassName="active"> <i className="fa fa-home"></i> Dashboard</NavLink>
                </li>
                <li className="menu">
                  <NavLink to="/instructor/assignment"  activeClassName="active"><i className="fa fa-print"></i> Assignment</NavLink>
                </li>
                
                <li className="menu">
                  <NavLink to="/instructor/new/assignment"  activeClassName="active"> <i className="fa fa-credit-card"></i> New Assignment</NavLink>
                </li>
                
            </ul>
    </>
)
}
export default SideMenu
import { useContext, useEffect } from "react"
import Navbar from "../../component/navbar";
import SideMenu from "../../component/sidemenu";
import AuthContext from '../../context/auth.context'
/**
 * Instructor dash board
 */
const InstructorDashboard = ()=>{
    const {user, setUser} = useContext(AuthContext)
    // console.lo.g(user);
    useEffect(()=>{
        
    })
    return (
        <>
        <Navbar></Navbar>
        <div className="wrapper-home">
            <div className="left">
                <SideMenu></SideMenu>
            </div>
            <div className="right"></div>
        </div>
        </>
    )
}
export default InstructorDashboard
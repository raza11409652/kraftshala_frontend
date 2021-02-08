import { useContext, useEffect, useState } from "react"
import Navbar from "../../component/navbar"
import SideMenuStudent from "../../component/sidemenu.student"
import SingleAssignment from "../../component/single.assignment"
import UpcomingAssignment from "../../component/upcomgin.assignment"
import {getUpcomingAssignment} from '../../service/assignment.service'
import AuthContext from '../../context/auth.context'
const StudentDashBoard = ()=>{
    const token = localStorage.getItem('_token')
    // console.log(token);
    const [records , setRecords] = useState([])
    const {user , setUser} = useContext(AuthContext)
    useEffect(()=>{
        getUpcomingAssignment({token:token})
        .then(data=>{
            console.log(data);
            const _error = data.error
            if(!_error){
                setRecords(data.records)
            }
        }).catch(er=>{

        })
    },[token])
    return (
        <>
        <Navbar></Navbar>
        <div className="wrapper-home">
            <div className="left">
                <SideMenuStudent></SideMenuStudent>
            </div>
            <div className="right">
               <div className="container p-4">
                 <div className="alert alert-warning">Upcoming assignment</div>
                 {records===null?<>Loader ....</>:
                 records.length<1?<>No data found</>:records.map(data=>{
                    //  console.log(data);
                    // console.log(user.id);
                    // const solution  =data.solution
                    // console.log("Sol",solution);
                    // var flag =false 
                    // if(solution.length>1){
                    //      flag = solution.includes({"user":user.id})
                    //      console.log(flag); 
                    // }
                    
                    return UpcomingAssignment({item:data , user:user })
                })
                 }
               </div>
            </div>
        </div>
        </>
    )
}
export default StudentDashBoard
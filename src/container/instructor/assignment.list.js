import { useContext, useEffect, useState } from "react"
import Loader from "../../component/loader"
import Navbar from "../../component/navbar"
import SideMenu from "../../component/sidemenu"
import SingleAssignment from "../../component/single.assignment"
import AuthContext from '../../context/auth.context'
import {getAssignmentList} from '../../service/assignment.service'
const AssignmentList = ()=>{
    const {user, setUser} = useContext(AuthContext)
    const token = localStorage.getItem('_token');
    const [records , setRecords] = useState(null)
    useEffect(()=>{
        getAssignmentList({token:token}).then(data=>{
            console.log(data);
            if(data.error===false){
                setRecords(data.records)
            }

        }).catch(er=>{
            console.log(er);
        })

    },[token]);
    return (
        <>
        <Navbar></Navbar>
        <div className="wrapper-home">
            <div className="left">
                <SideMenu></SideMenu>
            </div>
            <div className="right ">
                <div className="p-4">
                <div className="alert alert-primary">
                    <h4>Assignment List</h4>
                    {/* <button className="btn btn">New Assignment</button> */}
                </div>
                {records===null?<>
                <Loader></Loader>
                </>:
                records===false?<>No records found</>:
                records.map(data=>{
                    console.log(data);
                    return (
                    <div key={data._id}>
                        <SingleAssignment item={data}></SingleAssignment>
                    </div>)
                })
                }
                </div>
            </div>
        </div>
        </>
    )
}
export default AssignmentList
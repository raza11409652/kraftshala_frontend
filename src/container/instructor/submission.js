import { useState } from "react"
import { useEffect } from "react"
import { NavLink, useParams } from "react-router-dom"
import Loader from "../../component/loader"
import Navbar from "../../component/navbar"
import { getSolution } from "../../service/assignment.service"
import pdfPng from '../../assets/images/pdf.png'
const SubmittedAssignment = ()=>{

    const param = useParams()
    const assignmentId = param.id
    console.log(assignmentId);
    const token = localStorage.getItem('_token')
    const [records , setRecords] = useState(null)
    const [assignment , setAssignment] =useState(null)
    useEffect(()=>{
        getSolution({token:token , id:assignmentId}).then(data=>{
            console.log(data);
            if(data.error===false){
                setAssignment(data.assignment)
                setRecords(data.records)
            }else{
                alert("Time out")
            }
        }).catch(err=>{
            // return
            console.log("ERR");

        });
    },[token]);
    return (
        <>
        <Navbar></Navbar>
        <div className="container">
            <NavLink to="/instructor/assignment">Back to home</NavLink>
            <div className="alert alert-info mt-4">
                List of submission
                
            </div>
            {assignment===null?<>Loading..</>:<>
                {assignment.name}
                <div className="file-pdf">
                           <p>Question</p>
                            <img src={pdfPng} alt="Image"/>
                            <a target="_blank" href={assignment.question}>Show File</a>
                        </div>
                </>}
                {records===null?<>
                <Loader></Loader>
                </>:records.map(item=>{
                    return (<>
                    <div className="card mt-2" key={item._id}>
                        <div className="card-header ">
                            {item.createdAt}
                        </div>
                        <div className="card-body">
                            <a className="btn btn-url" target="_blank" href={item.answerUrl}>View Answer</a>
                            {item.grade===null?<>
                                <a className="btn btn-url" href={"/instructor/submit/"+item._id}>Grade Marking</a>
                            </>:"GRADE"+item.grade+"/10"}
                        </div>
                    </div>
                    </>)
                })}
        </div>
        </>
    )
}

export default SubmittedAssignment
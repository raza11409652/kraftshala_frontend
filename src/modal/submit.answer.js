import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom"
import Navbar from "../component/navbar"
import { getAssignment , submitSolution } from "../service/assignment.service";
import pdfPng from '../assets/images/pdf.png'
import Uploader from "../component/uploader";
import { fileUpload } from "../service/file.service";
import showAlert from "../utils/show.alert";
import Loader from "../component/loader";
const SubmitAnswer = ()=>{

    const history  =useHistory()
    const params = useParams()
    const [data , setData] = useState(null)
    const [answer , setAnswer]  =useState(null)
    const [loading  ,setLoading] = useState(false) 
    // console.log(params);
    const assignmentId = params.id
    const token = localStorage.getItem('_token')
    const formdata = {
        answer:answer,
        assignment:assignmentId
    }
    useEffect(()=>{
        getAssignment({id:assignmentId , token:token}).then(data=>{
            console.log(data);
            if(data!==null){
                const _error = data.error
                if(!_error){
                    setData(data.record)
                }

            }
        }).catch(er=>{
            console.log(er);
        })
    },[token]);
    function hasWhiteSpace(s) {
        return /\s/g.test(s);
    }
    const fileUploaderhandler = (file)=>{
        let fileName = file[0].path ; 
        if(hasWhiteSpace(fileName)){
            // alert("No White space allowed")
            showAlert({msg:"File name should not contain white space"})
            return ;
        } 
        setLoading(true)
        // console.log(fileName);
        fileUpload({file:file , token:token}).then(data=>{
            if(!data){
                showAlert({msg:"File upload failed"})
            }
            // console.log(data);
            const _error = data.error 
            if(!_error){
                var fileurl = data.file
                // setQuestionUrl(fileurl)
                setAnswer(fileurl)
                setLoading(false)
                // submit()
               
            }

        }).catch(er=>{
            console.log(er);
        })
    }
    const submit = ()=>{
        submitSolution({formdata:formdata , token:token})
        .then(data=>{
            setLoading(false)
            // console.log(data);
            if(data.error===false){
                showAlert({msg:"Assginment submitted"})
                history.push('/student/assignment/past')
            }else{
                showAlert({msg:data.msg})
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    return (
        <>
        <Navbar></Navbar>
        <div className="container mt-4">
            <NavLink to="/student/dashboard">Back to home</NavLink>
            <div className="alert alert-primary mt-2">
                Submit your answer
            </div>
            {data===null?<>
            Loading...
            </>:<>
            <div className="card">
                <div className="card-header">
                    {data.name}
                    <span className="float-right">{data.deadline}</span>
                </div>
                <div className="card-body">

                       <div className="file-pdf">
                           <p>Question</p>
                            <img src={pdfPng} alt="Image"/>
                            <a target="_blank" href={data.question}>Show File</a>
                        </div>
                {/* {JSON.stringify(data)} */}
                </div>
                {answer===null?<>
                    <Uploader onChange={fileUploaderhandler}></Uploader>
                    </>:<>
                   <div className="p-3">
                   <div className="file-pdf">
                           <p>upload answer file</p>
                            <img src={pdfPng} alt="Image"/>
                            <a target="_blank" href={answer}>Show File</a>
                        </div>
                        <button className="mt-2 btn btn-danger" onClick={submit}>Submit confirm</button>
                   </div>

                    </>}

                {loading===false?<></>:<>
                <Loader></Loader>
                </>}
            </div>
            </>}
        </div>
        </>
    )
}
export default SubmitAnswer
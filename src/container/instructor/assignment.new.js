import { Checkbox, FormControl, FormControlLabel, Radio , RadioGroup } from "@material-ui/core"
import { useContext, useEffect, useState , } from "react"
import {  useHistory} from "react-router-dom";
import Calendar from "react-calendar"
// import Loader from "../../component/loader"
import Navbar from "../../component/navbar"
import SideMenu from "../../component/sidemenu"
// import SingleAssignment from "../../component/single.assignment"
import Uploader from "../../component/uploader"
import AuthContext from '../../context/auth.context'
import {createAssignmentNew} from '../../service/assignment.service'
import showAlert from "../../utils/show.alert"
import {fileUpload} from '../../service/file.service'
import pdfPng from '../../assets/images/pdf.png'
const AssignmentNew = ()=>{
    const history = useHistory()
    const {user, setUser} = useContext(AuthContext)
    const token = localStorage.getItem('_token');
    const [records , setRecords] = useState(null)
    const [subject , setSubject] = useState([])
    const [selectedSubject , setSelectedSubject] = useState(null)
    const [deadline , setDeadline] = useState(new Date())
    const [assignmentName , setAssignmentName] =useState(null)
    const [questionUrl , setQuestionUrl]=useState(null)
    const formData = {
        name:assignmentName , 
        question:questionUrl , 
        deadline:deadline ,
        subject:selectedSubject
    }
    useEffect(()=>{
        setSubject(user===null?[]:user.subject)
    },[token]);
    const handleSubjectChange = (event)=>{
        setSelectedSubject(event.target.value)
    }
    const createAssignment = ()=>{
        console.log(formData);
        if(formData.name ===null ||formData.name===undefined){
            showAlert({msg:"Name is required"})
            return;
        }
        if(formData.subject===null||formData.subject===undefined){
            showAlert({msg:"Subject is required"})
            return;
        }
        if(formData.question===null||formData.question===undefined){
            showAlert({msg:"Question should be uploaded first"})
            return
        }
        createAssignmentNew({formdata:formData , token:token})
        .then(data=>{

            // console.log(data);
            const _error = data.error
            const _msg = data.msg
            if(!_error){
                showAlert({msg:_msg})
                history.push('/instructor/assignment')

            }
        }).catch(er=>{
            showAlert({msg:"Server  time out"})
        })
    }
    function hasWhiteSpace(s) {
        return /\s/g.test(s);
    }
    const fileHandler = (file)=>{
        let fileName = file[0].path ; 
        if(hasWhiteSpace(fileName)){
            // alert("No White space allowed")
            showAlert({msg:"File name should not contain white space"})
            return ;
        } 
        // console.log(fileName);
        fileUpload({file:file , token:token}).then(data=>{
            if(!data){
                showAlert({msg:"File upload failed"})
            }
            // console.log(data);
            const _error = data.error 
            if(!_error){
                var fileurl = data.file
                setQuestionUrl(fileurl)
            }



        }).catch(er=>{
            console.log(er);
        })
    }
    const nameHanlder = (e)=>{
        setAssignmentName(e.target.value)
    }
    return (
        <>
        <Navbar></Navbar>
        <div className="wrapper-home">
            <div className="left">
                <SideMenu></SideMenu>
            </div>
            <div className="right ">
                <div className="p-4">
                <div className="alert alert-warning">
                    <h4>Assignment New</h4>
                    {/* <button className="btn btn">New Assignment</button> */}
                    
                </div>
                   <div className="form-assignment">
                   
                        {questionUrl!==null?<>
                        <div className="file-pdf">
                            <img src={pdfPng} alt="Image"/>
                            <a target="_blank" href={questionUrl}>Show File</a>
                        </div>
                        </>:<>
                            <Uploader onChange={fileHandler}></Uploader>
                        </>}
                        {/* <p className="text-danger float-right">*Only Pdf Allowed</p> */}
                        <div className="row">
                          <div className="col-lg-6">
                          <div className="form-group">
                              <label>Assignment Name</label>
                            <input className="form-control" 
                            onChange={nameHanlder}
                            placeholder="Enter Assignment name"/>
                           </div>
                          </div>
                          <div className="col-lg-6">
                               <div className="form-group">
                                <p>Select Subject</p>
                                <FormControl>
                                    <RadioGroup row name="subject" 
                                    onChange={handleSubjectChange}
                                    value={selectedSubject}>
                                        {subject.length<1?<></>:
                                        
                                        subject.map(data=>{
                                            return (
                                                <FormControlLabel label={data.topic} 
                                                control={<Radio value={data.topic}></Radio>}>
                                                </FormControlLabel>
                                            )
                                        })
                                        }
                                    </RadioGroup>
                                </FormControl>
                               </div>
                            </div>
                          <div className="col-lg-6">
                                <label>Select Deadline</label>
                                <Calendar minDate={new Date()} onChange={setDeadline} value={deadline}></Calendar>
                            </div>
                            
                        </div>
                        {/* <div> */}
                        <div className="form-group mt-2">
                            <button className="btn btn-primary" onClick={createAssignment}>Create</button>
                        </div>
                        
                        

                    </div>
                
                </div>
            </div>
        </div>
        </>
    )
}
export default AssignmentNew
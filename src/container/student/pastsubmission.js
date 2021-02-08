import { useEffect , useState } from "react"
import Loader from "../../component/loader"
import Navbar from "../../component/navbar"
import SideMenuStudent from "../../component/sidemenu.student"
import {getSubmitted} from '../../service/assignment.service'
const PastSubmission = ()=>{
    const token = localStorage.getItem('_token')
    const [records , setRecords] = useState(null)
    useEffect(()=>{
        getSubmitted({token:token}).then(data=>{
            console.log(data);
            if(data.error===false){
                setRecords(data.record)
            }
        }).catch(er=>{
            console.log(er);
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
                    {records===null?<>
                    <Loader></Loader>
                    </>:records.map(data=>{
                        // console.log(data);
                        const assignment = data.question[0];
                      return (<>
                    {/* {JSON.stringify(data)} */}
                    <div className="card mb-3">
                        <div className="card-header">{data.createdAt}</div>
                        <div className="card-body">
                            <p>
                            Assignment Evalution ::{data.grade ===null?<>Not evaluted</>:data.grade}
                            </p>
                            <a target="_blank" href={assignment.question}>Question</a>
                            <a target="_blank" className="btn btn-url" href={data.answerUrl}>Answer</a>
                        </div>
                    </div>
                      </>)  
                    })}
                </div>
            </div>
        </div>
        </>
    )
}
export default PastSubmission
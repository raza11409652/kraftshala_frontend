import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../../component/navbar"
import { getSolutionforStud } from "../../service/assignment.service"

const StudentAssignment = ()=>{
    const prams = useParams()
    const id = prams.id 
    const token = localStorage.getItem('_token')
    const [records ,setRecords] = useState(null)

    useEffect(()=>{

        getSolutionforStud({student:id}).then(data=>{
            console.log(data);
            if(data.error===false ){
                setRecords(data.data)

            }

        }).catch(err=>{
            console.log(err);
        })
    },[token])

    return(
        <>
        <Navbar>

        </Navbar>
        <div className="container">
        {records===null?<>
                    Loading..
                    </>:records.map(data=>{
                        // console.log(data);
                        const assignment = data.question[0];
                      return (<>
                    {/* {JSON.stringify(data)} */}
                    <div className="card mb-3">
                        <div className="card-header">{data.createdAt}</div>
                        <div className="card-body">
                            <p>
                            Assignment Evalution ::{data.grade ===null?<>Not evaluted
                            <a href={"/instructor/submit/"+data._id} className="btn btn-sm btn-url">Submit mark</a>
                            </>:data.grade}
                            </p>
                            <a target="_blank" href={assignment.question}>Question</a>
                            <a target="_blank" className="btn btn-url" href={data.answerUrl}>Answer</a>
                        </div>
                    </div>
                      </>)  
                    })}
        </div>
        </>
    )
}

export default StudentAssignment
import { useState } from "react"
import { useHistory } from "react-router-dom"

const UpcomingAssignment = ({item  , user})=>{
    var _questionUrl = item.question
    const solution = item.solution
// const [submiteed , setSubmitted] =useState(false)
    var submitted  =false ; 
    // console.log(solution);
    // var flag =solution.includes({"user":user.id})
    // console.log(flag);
    solution.forEach(elem =>{
        // console.log(elem.user);
        const userID = elem.user 
        if(userID==user.id){
            console.log("SAME");
            submitted=true;
        }
    })
   
   const history = useHistory()

    const open =()=>{
        const url = "/student/dashboard/"+item._id
        console.log(url);
        history.push(url)
    }
    return (
        <>
        {/* <SubmitAnswer show={show} handleClose={closeHandler}></SubmitAnswer> */}
        <div className="list-card">
        <h4>{item.name}</h4>
            <div className="p-2">
            Created On:  {item.createdAt}&nbsp;&nbsp;Deadline On: {item.deadline}
            
            </div>
            
            <p>
                <span className="chip">{item.subject}</span>
            </p>
            <div className="button-group">
                <a target="_blank" href={_questionUrl}> 
                
                View Question</a>
                {submitted===true?<></>:<><button onClick={open} className="text-black btn btn-sm btn-primary ml-2"> Submit Answer</button></>}
            </div>
            
        </div>
        </>
    )

}
export default UpcomingAssignment
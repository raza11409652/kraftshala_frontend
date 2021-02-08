import { NavLink } from "react-router-dom"

const SingleAssignment = ({item})=>{
    // console.log(item);
    var _questionUrl = item.question
    return (
        <>
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
                <a target="_blank" href={"/instructor/submission/"+item._id} className="btn btn-url ml-2">View Submission</a>
            </div>
            
        </div>
        </>
    )

}
export default SingleAssignment
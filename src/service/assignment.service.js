import axios from 'axios'
import {AssignmentList ,
     AssignmentNew,UpcomingAssignment ,SubmittedSolution,
      SolutionSubmit,GetSolution , SingleSol,solutionCheck ,GetStudentSolution} from '../config/server'
const getAssignmentList =async ({token})=>{
    
    return await axios.get(AssignmentList , {headers:{
        "Authorization":token
    }}).then(data=>{
        return data.data
    }).catch(er=>{
        return null
    })
}
const createAssignmentNew = async({formdata , token})=>{
    return await axios.post(AssignmentNew ,formdata, 
        {headers:{
        "Authorization":token}
    }).then(data=>{
        return data.data

    }).catch(er=>{
        return null
    })
}
const getUpcomingAssignment = async({token})=>{
    return await axios.get(UpcomingAssignment , {headers:{
        "Authorization":token
    }}).then(data=>{
        return data.data 
    }).catch(er=>{
        return null
    })
}
const getAssignment = async({id , token})=>{
    const url = AssignmentList +id
    // log
    return await axios.get(url  ,{headers:{"Authorization":token}})
    .then(data=>{
        return data.data
    }).catch(er=>{
        console.log(er);
        return null
    })

}
const submitSolution = async({formdata , token})=>{
    console.log(formdata);
    return await axios.post(SolutionSubmit , formdata , {
        headers:{"Authorization":token}
    }).then(data=>{
        return data.data
    }).catch(er=>{
        return null
    })

}
const getSubmitted = async({token})=>{
return await axios.get(SubmittedSolution , {headers:{"Authorization":token}})
.then(data=>{
    return data.data
}).catch(er=>{
    return null
});
}

const getSolution =async ({token , id})=>{
    var url = GetSolution +id
    return await axios.get(url , {headers:{"Authorization":token}})
    .then(data=>{
        return data.data
    }).catch(er=>{
        return null
    });
}
const getSingleSolution = async({token , id})=>{
    var url = SingleSol +id
    return await axios.get(url , {headers:{"Authorization":token}})
    .then(data=>{
        return data.data
    }).catch(er=>{
        return null
    });
}
const solutionChecking = async({token , formdata})=>{
    return await axios.post(solutionCheck , formdata , {headers:{
        "Authorization":token
    }}).then(data=>{
        console.log(data);
        return data.data
    }).catch(er=>{
        console.log(er);
        return null
    })

}
const getSolutionforStud=async({student})=>{
    var url = GetStudentSolution +student
    return await axios.get(url).then(data=>{
        return data.data
    }).catch(er=>{
        return null
    })

}
export  {getAssignmentList ,createAssignmentNew , 
    getUpcomingAssignment,getAssignment ,
    submitSolution,getSubmitted ,getSolution,getSingleSolution,solutionChecking,getSolutionforStud }
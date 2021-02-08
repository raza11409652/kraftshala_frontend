import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../../component/navbar"
import { getSingleSolution, solutionChecking } from "../../service/assignment.service"
import showAlert from "../../utils/show.alert"

const Markupload = ()=>{

    const param = useParams()
    const id = param.id
    const token = localStorage.getItem('_token')
    const [data , setData] = useState(null)
    const [number , setNumber] =useState(0)
    useEffect(()=>{
        // return r
        getSingleSolution({token:token , id:id}).then(data=>{
            console.log(data);
            if(data.error===false){
                setData(data.data)
            }

        }).catch(er=>{

        })
    },[token])
    const numberHandler = (e)=>{
        // retur
        setNumber(parseInt(e.target.value))
        
    }
    const formdata={
        grade:number,
        solution:id
    }
    const handleSubmit= ()=>{
        console.log(number);
        if(number<1 ||number>10){
            showAlert({msg:"Range 1 - 10 Allowed" })
        }
        console.log(formdata);
        solutionChecking({token:token , formdata:formdata})
        .then(data=>{
            console.log(data);
            if(data.error===false){
                showAlert({msg:"Marks updated"})
                window.close();
                return;
            }
            showAlert({msg:data.msg})

        }).catch(er=>{
            // return res.js
            alert("Timeout")
            console.log(er);
        })
    }

    return (
        <>
        <Navbar></Navbar>
        <div className="container">
            {data===null?<>Loadin...</>:<>
            <p className="mt-4 alert alert-warning">MARK UPLOAD</p>
            <a href={data.answerUrl} target="_blank">View solution</a>
            <p>USER <a>View user</a></p>
            <div className="form-group">
                <input type="number" onChange={numberHandler} min="1" max="10" className="form-control"></input>
            </div>
            <div className="form-group">
                <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
            <p>
                Min 1 , Max 10
            </p>
            </>}
        </div>
        </>
    )
}
export default Markupload
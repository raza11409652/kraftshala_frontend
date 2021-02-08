import { useContext, useEffect, useState } from "react"
import Navbar from "../../component/navbar";
import SideMenu from "../../component/sidemenu";
import AuthContext from '../../context/auth.context'
import { searchUser } from "../../service/auth.service";
/**
 * Instructor dash board
 */
const InstructorDashboard = ()=>{
    const {user, setUser} = useContext(AuthContext)
    // console.lo.g(user);
    const [_user , _setUser]  = useState(null)
    const token = localStorage.getItem('_token')
    useEffect(()=>{
        
    })
    const queryHandler = (e)=>{
        const value = e.target.value
        if(value===null ||value===undefined){
            return
        }

        searchUser({query:value  ,token:token}).then(data=>{
            // console.log(data);
            // const 
            if(data.error===false){
                const record  =data.data
                if(record.length<1){
                    // showA
                    //No user found
                    _setUser(null)
                    return
                }

                _setUser(record)



            }

        }).catch(er=>{
            // return n
            console.log("Timeout");
        })
    }
    return (
        <>
        <Navbar></Navbar>
        <div className="wrapper-home">
            <div className="left">
                <SideMenu></SideMenu>
            </div>
            <div className="right">

                <div className="container p-3">
                    <div className="form-group">
                        <label>SEARCH USER</label>
                        <input type="text" onChange={queryHandler} className="form-control"/>    
                    </div>
                    <div className="result">
                        {_user===null?<></>:_user.map(data=>{
                            return (
                                <>
                                <div className="card mb-1" key={data._id}>
                                    <div className="card-header">{data.name}</div>
                                    <div className="card-body">
                                        {/* <p>Name :{data.name}</p> */}
                                        <p>Email :{data.email}</p>
                                        {data.type==="STUDENT"?<>
                                        <a target="_blank" href={"/view/"+data._id} className="btn btn-url">View Assignment</a>
                                        </>:<>{data.type}</>}
                                    </div>
                                </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default InstructorDashboard
import { useState } from 'react'
import { NavLink , Redirect  , useHistory} from 'react-router-dom'
import Toastify from 'toastify-js'
import { loginservice } from "../../service/auth.service";
import Loader from '../../component/loader'
import auth from '../../utils/authcheck'
const Login = ({setToken})=>{
    const history = useHistory();
    const error = ({msg})=>{
        Toastify({
            text: msg,
            duration: 3000
            }).showToast();
    }
    const [email , setEmail] =useState(null)
    const [password ,setPassword]=useState(null)
    const [loader , setLoader] = useState(false)

    const formData ={
        email:email,
        password:password
    }

    const passwordHandler = (e)=>{

        setPassword(e.target.value)
    }
    const emailHandler = (e)=>{
        setEmail(e.target.value)
    }
    const loginInit = ()=>{
        // console.log(formData);
        if(formData.email===null||formData.email===undefined){
            error({msg:"Email is required"})
            return
        }
        if(formData.password===null||formData.password===undefined){
            error({msg:"Password is required"})
            return
        }
        setLoader(true)
        // Loginconsole.log(formData);
        loginservice({payload:formData}).then(data=>{
            console.log(data);
            const er = data.error
            setLoader(false)
            if(er===true){
                error({msg:data.msg})
                return
            }

            
            const _token = data.token
            const user = data.user
            const type = user.type
            localStorage.setItem('_token' , _token)
            if(type==="INSTRUCTOR"){
                auth.login(()=>{
                    history.push('/instructor/dashboard')
                })

            }else{
                //Student
                auth.login(()=>{
                    history.push('/student/dashboard')
                })
            }


        }).catch(er=>{
            setLoader(false)
            console.log(er);
            error({msg:"Time out error"})
        })

    }
    return (
    <>
      <div className="login-wrapper">
              <div className="login-form">
                  <h3 className="theme-color">Login</h3>
                  <div className="form-group">
                      <label>Email</label>
                      <input className="form-control" 
                      onChange={emailHandler}
                      placeholder="email@info.com">
                      </input>
                  </div>
                  <div className="form-group">
                      <label>Password</label>
                      <input className="form-control" 
                      onChange={passwordHandler}
                      placeholder="Password" type="password">
                      </input>
                  </div>
                  <div className="form-group">
                      {loader===true?<>
                      <Loader></Loader>
                      </>:<button className="btn btn-theme mr-2"  onClick={loginInit}>Login</button>}  
                     
                  </div>
                  <p>
                      New user click to  <NavLink to="/register">Register</NavLink>
                  </p>
              </div>
          </div> 
    </>
    )
}

export default  Login
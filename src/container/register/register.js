import { NavLink } from 'react-router-dom'
// import Chip from '@material-ui/core/Chip';
import Switch from '@material-ui/core/Switch';
import {useState} from 'react'
import Toastify from 'toastify-js'
import { Checkbox, FormControlLabel, InputLabel, MenuItem  , Select} from '@material-ui/core';
import Loader from "../../component/loader";
import {registerService} from '../../service/auth.service'
const Register  =()=>{
    const error = ({msg})=>{
        Toastify({
            text: msg,
            duration: 3000
            }).showToast();
    }
      const [state, setState] = useState({
        type: false,
      });
      const [subject ,setSubject] = useState({
          hindi:false ,
          english:false ,
          maths:false
      })
      const [name ,setName] = useState(null)
      const [email ,setEmail] = useState(null)
      const [password ,setPassword] = useState(null)
      const [loading ,setLoading] = useState(false)


      const handleChange = (event)=>{
        setState({ ...state, [event.target.name]: event.target.checked });
        if(state.type===false){
            setSubject({hindi:false ,english:false , maths:false})
        }

      }
      const handleSubjectSelection =(event)=>{
          setSubject({...subject , [event.target.name]:event.target.checked})

      }
      const formData ={
          name:name ,
          email:email,
          password:password,
          type:state.type===true?"INSTRUCTOR":"STUDENT",
          subject:[]
      }
      const registerInit = ()=>{
        // subject.hindi===true?formData.subject.push({"topic":"hindi"}):null 
        // subject.english===true?formData.subject.push({"topic":"english"}):null
        // subject.maths===true?formData.subject.push({"topic":"maths"}):null
        //   console.log(formData);
        if(subject.hindi===true){
            formData.subject.push({"topic":"hindi"})
        }
        if(subject.english===true){
            formData.subject.push({"topic":"english"})
        }
        if(subject.maths===true){
            formData.subject.push({"topic":"maths"})
        }
        if(formData.name===null||formData.name===undefined){
            error({msg:"Name is required"})
            return;
        }
        if(formData.email===null||formData.email===undefined){
            error({msg:"Email is required"})
            return
        }
        if(formData.password===null||formData.password===undefined){
            error({msg:"Password is required"})
            return
        }
        if(formData.type==="INSTRUCTOR"){
            if(subject.english===false&& subject.hindi===false&& subject.maths===false){
                error({msg:"Select atleast one subject"})
                return
            }
        }

        // console.log(formData);
        setLoading(true)
        registerService({payload:formData}).then(data=>{
            const er = data.error
            setLoading(false)
            if(er===true){
                error({msg:data.msg})
                return
            }
            error({msg:data.msg})
        }).catch(er=>{
            setLoading(false)
            console.log(er);
        })



      }
      const nameHandler = (e)=>{
          setName(e.target.value)
        //   console.log(name);
      }
      const emailHandler=(e)=>{
          setEmail(e.target.value)
      }
      const passwordHandler = (e)=>{
          setPassword(e.target.value)
      }
    return(
        <>
        <div className="login-wrapper">
              <div className="login-form">
                  <h3 className="theme-color">Register new account</h3>
                  <div className="form-group">
                      <label>Name</label>
                      <input className="form-control" 
                     onChange={nameHandler}
                      placeholder="MD KHALID RAZA KHAN">
                      </input>
                  </div>
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
                    Is instructor <div className="float-right">
                        <Switch checked={state.type} onChange={handleChange} name="type"></Switch></div>
                   </div>
                   {state.type===true?<>
                   <div className="form-group">
                       <p>Select Subject</p>
                       <FormControlLabel  control={<Checkbox 
                       onChange={handleSubjectSelection}
                       checked={subject.hindi}  name="hindi" />}
                       label="Hindi">    
                       </FormControlLabel>
                       <FormControlLabel  
                      onChange={handleSubjectSelection}
                       control={<Checkbox checked={subject.english}  name="english" />}
                       label="English">    
                       </FormControlLabel>
                       <FormControlLabel  
                       onChange={handleSubjectSelection}
                       control={<Checkbox checked={subject.maths}  name="maths" />}
                       label="Maths">    
                       </FormControlLabel>
                
                   </div>
                   </>:<></>}
                 
                  <div className="form-group">

                      {loading===true?<>
                      <Loader></Loader>
                      </>:<button className="btn btn-primary" onClick={registerInit}>Register</button>}  
                      
                  </div>
                  <p>Already have account <NavLink to="/">Login</NavLink> Now</p>
              </div>
          </div> 
        </>
    )
}
export default Register
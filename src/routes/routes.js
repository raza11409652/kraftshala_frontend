import { BrowserRouter, Route , Switch } from "react-router-dom";
import {Suspense} from 'react'
import Login from "../container/login/login";
import Register from "../container/register/register";
import StudentDashBoard from "../container/student/dashbaord";
import { ProtectedRoute } from "../utils/protected.routes";
import InstructorDashboard from "../container/instructor/dashboard";
import AssignmentList from "../container/instructor/assignment.list";
import AssignmentNew from "../container/instructor/assignment.new";
import PastSubmission from "../container/student/pastsubmission";
import SubmitAnswer from "../modal/submit.answer";
import SubmittedAssignment from "../container/instructor/submission";
import Markupload from "../container/instructor/mark.upload";
import StudentAssignment from "../container/instructor/student.view";

const Routes = ()=>{
   
    return(
    <Suspense fallback={(<div>Loading...</div>)}>
        <BrowserRouter>
         <Switch>
             <Route exact path="/register" component={Register}></Route>
             <Route exact path="/" component={Login}></Route> 
             <ProtectedRoute exact path="/view/:id" component={StudentAssignment}></ProtectedRoute>
             <ProtectedRoute exact path="/student/dashboard" component={StudentDashBoard}>
             
            </ProtectedRoute> 
            <ProtectedRoute exact path="/student/dashboard/:id" component={SubmitAnswer}>  
            </ProtectedRoute>  
            <ProtectedRoute exact path="/instructor/dashboard" component={InstructorDashboard}>

            </ProtectedRoute>
            <ProtectedRoute exact path="/instructor/submission/:id" component={SubmittedAssignment}>

            </ProtectedRoute>
            <ProtectedRoute exact path="/instructor/submit/:id" component={Markupload}>

            </ProtectedRoute>
            {/* instructor/submit/ */}
            <ProtectedRoute exact path="/instructor/assignment" component={AssignmentList}>

            </ProtectedRoute>
            <ProtectedRoute exact path="/instructor/new/assignment" component={AssignmentNew}>

            </ProtectedRoute>
            <ProtectedRoute exact path="/student/assignment/past" component={PastSubmission}>

            </ProtectedRoute>
            <Route  path="*" component={Error}></Route>
         </Switch>
        </BrowserRouter>
    </Suspense>
    )

}
export default Routes
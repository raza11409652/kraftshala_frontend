// const Ser
const SERVER = "http://localhost:7777/"
// var login = SERVER + "movie/list"
var Login = SERVER +"user/auth/login"
var Register = SERVER +"user/auth/register"
var SearchUser = SERVER +"user/auth/search/"
var AccessToken = SERVER +"user/auth/accesstoken"
var AssignmentList  =SERVER + "assignment/"
var FileUplaodUrl = SERVER +"file/upload"
var AssignmentNew = SERVER + "assignment/new"
var UpcomingAssignment = SERVER +"assignment/upcoming"
var SolutionSubmit = SERVER +"solution/submit"
var SubmittedSolution = SERVER +"assignment/submitted"
var GetSolution  = SERVER +"solution/"
var SingleSol = SERVER +"solution/single/"
var solutionCheck = SERVER+"solution/grade/"
var GetStudentSolution = SERVER +"assignment/student/"
// const USER_SERVER = '/api/users';
export  {Login , Register , AccessToken , AssignmentList ,
    FileUplaodUrl ,AssignmentNew,UpcomingAssignment ,SolutionSubmit,
    SubmittedSolution , GetSolution ,SingleSol,solutionCheck,SearchUser,GetStudentSolution }
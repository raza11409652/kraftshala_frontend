import { NavLink, useHistory } from "react-router-dom"

const Navbar = ()=>{
    const history = useHistory()
    const logout = ()=>{
        localStorage.setItem('_token' , null)
        history.push('/')

    }
    return (
        <>
        <nav className="navbar navbar-dar">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Tutor</a>
                <ul className="ml-auto navbar-nav">
                    <li className="nav-item">
                        <button onClick={logout} className="btn  btn-primary">Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
        </>
    )
}
export default Navbar
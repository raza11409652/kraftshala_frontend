import './App.css';
import './routes/routes'
import Routes from './routes/routes';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-calendar/dist/Calendar.css';
import "toastify-js/src/toastify.css"
import AuthContext from './context/auth.context'
import { useState } from 'react';
function App() {
  const [user, setUser] = useState(null) ;
  return (
  <> 
   <AuthContext.Provider value={{user , setUser}}>
     <Routes></Routes>
   </AuthContext.Provider>
  </>
  );
}

export default App;

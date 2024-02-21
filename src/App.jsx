import Home from "./Home"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./Login"
import Register from "./Register"
import Forgot from "./Forgot"
import Reset from "./Reset"
import Create from "./Create"
import View from "./View"
import Edit from "./Edit"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
     <ToastContainer  
				position="top-right"
				 autoClose={3500}
				 hideProgressBar={false}
				 newestOnTop={false}
				 closeOnClick
				 rtl={false}
				 pauseOnFocusLoss
				 draggable
				 pauseOnHover />
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/forgotpassword" element={<Forgot></Forgot>}></Route>
      <Route path="/reset/:token" element={<Reset></Reset>}></Route>
      <Route path="/create" element={<Create></Create>}></Route>
      <Route path="/view" element={<View></View>}></Route>
      <Route path="/edit/:id" element={<Edit></Edit>}></Route>
    </Routes>
    </BrowserRouter>
  )
  
}

export default App

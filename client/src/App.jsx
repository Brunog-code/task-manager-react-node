import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>

  );
}

export default App;

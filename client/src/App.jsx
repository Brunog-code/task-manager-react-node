import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        <Route path="/resetpassword" element={<ResetPassword />} />
         <Route path="/reset-password/:token" element={<NewPassword />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>

  );
}

export default App;

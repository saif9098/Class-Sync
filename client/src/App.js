import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import UpdateProfile from "./pages/UpdateProfile";
import Navbar from "./components/Layout/Nav/Navbar";
import "./styles/InnerPage.css"
import "./styles/AuthStyles.css"
import AdminRoute from "./components/routes/AdminRoute";
import ForgotPasssword from "./pages/ForgotPasssword";
import AddResume from "./pages/AddResume";
import AdminInfo from "./pages/AdminInfo";
import AddTeacher from "./pages/AddTeacher";
import YourTeachers from "./pages/YourTeachers";
import YourStudents from "./pages/YourStudents";
import ShareResources from "./pages/ShareResources";
import CommonRoute from "./components/routes/CommonRoute";
function App() {
  
  return (
    <>
      <div style={{ background: '#eef0fd' , minHeight:'100vh'}}>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password" 
          element={<ForgotPasssword />}
           />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <YourStudents/>
            </AdminRoute>
          }
        />
        <Route path="/admin/profile" element ={<AdminRoute><AdminInfo/></AdminRoute>}/>
        <Route path="/admin/share-resources" element ={<AdminRoute><ShareResources/></AdminRoute>}/>
    
      
      <Route
      path="/user/profile"
      element={
        <CommonRoute>
          <UpdateProfile />
        </CommonRoute>
      }
    />
     
      <Route
      path="/user/addresume"
      element={
        <PrivateRoute>
          <AddResume />
        </PrivateRoute>
      }
    />
      <Route
      path="/user/add-teacher"
      element={
        <PrivateRoute>
          <AddTeacher />
        </PrivateRoute>
      }
    />
      
      <Route
      path="/user/your-teacher/messages"
      element={
        <PrivateRoute>
          <YourTeachers />
        </PrivateRoute>
      }
    />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </>
  );
}

export default App;

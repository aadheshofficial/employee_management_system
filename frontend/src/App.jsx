import {BrowserRouter , Routes,Route,Navigate} from 'react-router-dom';
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import RoleBasedRoutes from './utils/RoleBasedRoutes.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard"></Navigate>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin"]}>
              <AdminDashboard/>
            </RoleBasedRoutes>
          </PrivateRoutes>

          }></Route>
        <Route path="/employee-dashboard" element={
          <PrivateRoutes>
          <RoleBasedRoutes requiredRole={["admin"]}>
            <EmployeeDashboard/>
          </RoleBasedRoutes>
        </PrivateRoutes>
        }></Route>

      </Routes>
    </BrowserRouter>

  )
}

export default App

import {BrowserRouter , Routes,Route,Navigate} from 'react-router-dom';
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import RoleBasedRoutes from './utils/RoleBasedRoutes.jsx';
import AdminSummary from './components/dashboard/AdminSummary.jsx';
import DepartmentList from './components/department/DepartmentList.jsx';
import AddDepartment from './components/department/AddDepartment.jsx';
import EditDepartment from './components/department/EditDepartment.jsx';
import List from './components/employee/List.jsx';
import Add from './components/employee/Add.jsx';

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

          }>
            <Route index element={<AdminSummary/>}></Route>
            <Route path="/admin-dashboard/departments" element={<DepartmentList/>}></Route>
            <Route path="/admin-dashboard/add-new-department" element={<AddDepartment/>}></Route>
            <Route path="/admin-dashboard/department/:id" element={<EditDepartment/>}></Route>

            <Route path="/admin-dashboard/employees" element={<List/>}></Route>
            <Route path="/admin-dashboard/employees/add-employee" element={<Add/>}></Route>

          </Route>
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

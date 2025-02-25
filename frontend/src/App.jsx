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
import View from './components/employee/View.jsx';
import Edit from './components/employee/Edit.jsx';
import AddSalary from './components/salary/AddSalary.jsx';
import ViewSalary from './components/salary/ViewSalary.jsx';
import UnAuthorized from './utils/UnAuthorized.jsx';
import Summery from './components/employee_dashboard/Summery.jsx';
import EmployeeProfile from './components/employee_dashboard/EmployeeProfile.jsx';
import EmployeeSalary from './components/employee_dashboard/EmployeeSalary.jsx';
import EmployeeSettings from './components/employee_dashboard/EmployeeSettings.jsx';
import ListLeave from './components/leave/ListLeave.jsx';
import ApplyLeave from './components/leave/ApplyLeave.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard"></Navigate>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path='/unauthorized' element={<UnAuthorized/>}></Route>
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
            <Route path="/admin-dashboard/employees/:id" element={<View/>}></Route>
            <Route path="/admin-dashboard/employees/edit/:id" element={<Edit/>}></Route>
            <Route path="/admin-dashboard/employees/add-employee" element={<Add/>}></Route>

            <Route path="/admin-dashboard/salary" element={<AddSalary/>}></Route>
            <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary/>}></Route>
          </Route>
        <Route path="/employee-dashboard" element={
          <PrivateRoutes>
          <RoleBasedRoutes requiredRole={["admin","employee"]}>
            <EmployeeDashboard/>
          </RoleBasedRoutes>
        </PrivateRoutes>
        }>
            <Route index element={<Summery/>}></Route>
            <Route path='/employee-dashboard/profile/:id' element={<EmployeeProfile/>}></Route>
            <Route path='/employee-dashboard/leave' element={<ListLeave/>}></Route>
            <Route path='/employee-dashboard/leave/apply-leave' element={<ApplyLeave/>}></Route>
            <Route path='/employee-dashboard/salary' element={<EmployeeSalary/>}></Route>
            <Route path='/employee-dashboard/settings' element={<EmployeeSettings/>}></Route>
        </Route>

      </Routes>
    </BrowserRouter>

  )
}

export default App

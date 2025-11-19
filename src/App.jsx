import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import DashboardUser from "./pages/DashboardUser";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import FacilitiesPage from "./pages/admin/FacilitiesPage";
import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* ROUTE ADMIN */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardAdmin />} />
              {/* <Route path="users" element={<Users />} /> */}
              <Route path="facilities" element={<FacilitiesPage />} />
            </Route>
          </Route>

          {/* <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/admin/facilities" element={<FacilitiesPage />} /> */}
          <Route path="/user/dashboard" element={<DashboardUser />} />
          <Route path="/form" element={<Form />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

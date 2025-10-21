import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MainLayout } from "src/layouts/MainLayout";
import { Dashboard } from "src/pages/Dashboard";
import { Home } from "src/pages/Home";
import { Login } from "src/pages/Login";
import { RoomDetails } from "src/pages/RoomDetails";
import { Signup } from "src/pages/Signup";
import "src/styles/globals.css";

export function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

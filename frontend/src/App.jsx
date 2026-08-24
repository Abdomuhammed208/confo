
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./styles/global.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import LoginPage from "./LoginPage";
import AdminDashboard from "./AdminDashboard";
function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  return (
    <>
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
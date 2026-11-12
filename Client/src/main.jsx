import { StrictMode } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import Login from './Login.jsx'
import AdminDashboard from './AdminDashboard.jsx'
import StylistDashboard from './StylistDashboard.jsx'
import ClientDashboard from './ClientDashboard.jsx'

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/stylist" element={<StylistDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)

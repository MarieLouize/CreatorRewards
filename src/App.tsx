import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/globals.css';
import LandingPage from './pages/LandingPage';
import JoinPage from './pages/JoinPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

import './App.css';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// function App() {
//   return (
//       <div>
//         <LoginPage/>
//       </div>
//   )
// }
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/dashboard" element={<DashboardPage />}/>
      </Routes>
    </Router>
  );

}

export default App

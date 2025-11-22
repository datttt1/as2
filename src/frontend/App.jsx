import './App.css';
import Login from './components/Login.jsx';
import ProductForm from './components/ProductForm.jsx';
import ProductList from './components/ProductList.jsx';
import ProductDetail from './components/ProductDetail.jsx';

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
        <Route path="/" element={<Login />}/>
        <Route path="/products" element={<ProductList/>}/>
        <Route path ="/products/form" element = {<ProductForm/>}/>
        <Route path = "/products/detail" element = {<ProductDetail/>}/>
        
      </Routes>
    </Router>
  );

}

export default App

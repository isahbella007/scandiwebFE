import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Add from './Pages/AddProduct/Add';
import Error from './Pages/Error/Error';
import Home from './Pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home/>}></Route>
        <Route path = "/add-product" element = {<Add/>}></Route>
        <Route path = "*" element = {<Error/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

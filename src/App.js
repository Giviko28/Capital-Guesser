import Home from './components/Home.jsx'
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home data={{Germany: 'Berlin', Georgia: 'Tbilisi', USA: 'Washington ', Netherlands: 'Amsterdam', Denmark: 'Copenhagen'}} />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import About from "./About";
import './App.css';
import Active from "./components/pages/Active";
import Lazy from "./components/pages/Lazy";
import PageWrapper from "./components/pages/PageWrapper";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PageWrapper body={<Lazy />}/>} />
        <Route path="lazy" element={<PageWrapper body={<Lazy />}/>} />
        <Route path="active" element={<PageWrapper body={<Active />}/>} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;

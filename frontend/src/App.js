import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Auth from "./pages/Auth";

function App() {
  return (
    <div className="container">
      <div className="row">
        <Router>
          <Routes>
            <Route path="" element={<Auth />} />
            <Route path="home" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

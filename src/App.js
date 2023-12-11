import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from "./Pages/Home"
import AssetCreation from "./Pages/AssetCreation"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assetcreation" element={<AssetCreation />} />
      </Routes>
    </Router>
  );
}

export default App;

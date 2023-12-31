import './App.css';
import './normalize.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AddDocument from './Pages/AddDocument';
import View from './Pages/ViewAll';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/document/add" exact element={<AddDocument />} />
          <Route path="/document/view" exact element={<View />} />
        </Routes>
    </Router>
  );
}

export default App;

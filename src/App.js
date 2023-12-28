import './App.css';
import './normalize.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AddDocument from './Pages/AddDocument';
import NavigationMenu from './Parts/NavigationMenu';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/document/add" exact element={<AddDocument />} />
        </Routes>
    </Router>
  );
}

export default App;

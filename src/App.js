import './App.css';
import './index.css';
import './normalize.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DocumentAddPage from './pages/DocumentAddPage';
import DocumentListPage from './pages/DocumentListPage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/document/add" exact element={<DocumentAddPage />} />
          <Route path="/document/view" exact element={<DocumentListPage />} />
        </Routes>
    </Router>
  );
}

export default App;

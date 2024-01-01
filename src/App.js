import './App.css';
import './index.css';
import './normalize.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import DocumentAddPage from './Pages/DocumentAddPage';
import DocumentListPage from './Pages/DocumentListPage';

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

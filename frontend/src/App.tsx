import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./component/HomePage";
import CommitPage from "./component/CommitPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:name" element={<CommitPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteSate from "./context/notes/NoteState";
import Alert from "./components/Alert";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import AlertState from "./context/alerts/AlertState";
function App() {
  return (
    <>
      <AlertState>
        <NoteSate>
          <BrowserRouter>
            <Navbar />
            <Alert message="Success" />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </NoteSate>
      </AlertState>
    </>
  );
}

export default App;

import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Search from './pages/Search';
import Upload from './pages/Upload';
import Item from "./pages/Item";
import Profile from "./pages/Profile";
import UserContact from "./pages/UserContact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import About from "./pages/About";


function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={< Home/>} />
          <Route path="/search" element={< Search/>} />
          <Route path="/sell" element={< Upload/>} />
          <Route path="/item/:id" element={< Item/>} />
          <Route path="/profile/:id" element={< Profile/>} />
          <Route path="/contact/:id" element={< UserContact/>} />
          <Route path="/login" element={< Login/>} />
          <Route path="/signup" element={< Signup/>} />
          <Route path="/about" element={< About/>} />
          <Route path="*" element={< NotFound/>} />
 
        </Routes>
      <Footer />
      </BrowserRouter>

    </>
  )
}

export default App

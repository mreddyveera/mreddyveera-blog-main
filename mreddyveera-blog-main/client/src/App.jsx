import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Dashboard from "./pages/Dashboard.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Projects from "./pages/Projects.jsx";
import About from "./pages/About.jsx";
import Header from './components/Header.jsx';
import Footer from "./components/FooterComp.jsx";
import PrivateRoute from './components/PrivateRoute.jsx';
function App() {
  return (
    <div>
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />}/>
            <Route element={<PrivateRoute/>}>
             <Route path="/dashboard" element={<Dashboard />}/>
             </Route>
            <Route path="/projects" element={<Projects />}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
    </div>
  )
}

export default App;
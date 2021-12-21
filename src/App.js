import './App.css';
import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Register';
import {Routes, Route, Link} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Nav/>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;

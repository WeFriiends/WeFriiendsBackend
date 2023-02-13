import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from './SignIn';
import SignUp from './SignUp';

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignUp />} />
            <Route
                path="/signin"
                element={<SignIn />}
            />
                
            
        </Routes>
    </BrowserRouter>
    )
}

export default App;

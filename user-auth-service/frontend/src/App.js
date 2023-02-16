import './App.css';

import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import { useEffect, useState } from 'react';

import SignIn from './SignIn';
import SignUp from './SignUp';
import axios from 'axios';

function App() {
    
    const [token, setToken] = useState(null);
    
    useEffect(() => {
        getToken();
    }, []);

    const getToken = async() => {
       
        const response = await axios.get("/api/auth/login/success", {
            headers: {
                'Content-Type': 'application/json;   charset=UTF-8',
                "Access-Control-Allow-Credentials": true,
            }
        });
        console.log("response ", response.data.token);
    }
    
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

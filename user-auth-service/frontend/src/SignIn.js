import axios from 'axios';
import { useState } from 'react';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitForm = (e) => {
        e.preventDefault();
        postForm();
    }
    
    const axiosConfig = {
        headers: { 
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    }
    const postForm = () => {
        axios.post(
            '/api/auth/signin', 
            {
                email: email,
                password: password,
            }, 
            axiosConfig 
        )
        .then((res) => {
            console.log('response received ', res.data.message)
        }).catch(err => {
            console.log('error ', err)
        })
    }
    return (
        <div style={{width: '600px', margin: 'auto'}}>
            <form onSubmit={submitForm}style={{display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
               }}>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input  
                        type="text" 
                        name="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default SignIn;
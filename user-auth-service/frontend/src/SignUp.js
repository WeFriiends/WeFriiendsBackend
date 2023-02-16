import axios from 'axios';
import { useState } from 'react';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

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
            '/api/auth/register', 
            {
                email: email,
                password: password,
                password2: password2 
            }, 
            axiosConfig 
        )
        .then((res) => {
            console.log('response received ', res)
        }).catch(err => {
            console.log('error received', err)
        })
    }
    
    const googleSignIn = () => {
        window.open("http://localhost:8080/api/auth/google");
       
    }

    const facebookSignIn = () => {
       
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
                <label>Confirm password:</label>
                <input 
                    type="text" 
                    name="password2" 
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                <input type="submit" value="Submit"/>
            </form>
                <div style={{marginTop: '20px'}}>
                    
                     <button onClick={googleSignIn}>Google</button>
                    <button onClick={facebookSignIn}>Facebook</button>
                </div>
        </div>
    );
}

export default SignUp;
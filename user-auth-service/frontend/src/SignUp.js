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
            "Access-Control-Allow-Origin": "http://localhost:3000",
        }
    }
    const headers= { 
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "http://localhost:3000",
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
            console.log('response received ', res.data.message)
        }).catch(err => {
            console.log('error ', err)
        })
    }

    const googleSignIn = () => {
        fetch('/api/auth/google', {headers})
        .then(response => response.json())
        .then(data => console.log(data));
        //  axios.get('/api/auth/google', axiosConfig)
        // .then(res => console.log(res))
        // .catch(err => console.log('in err', err))
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
                 
                   
                    <button>Facebook</button>
                </div>
        </div>
      );
}

export default SignUp;
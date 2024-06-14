import './Login.scss';
import image from '../../assets/images/login.png';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../../firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePass = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert(`Welcome ${userCredential.user.email}`);
            })

            .catch(err => alert('Your email and passwords do not match'));
    }

    const handleLoginGG = (e) => {
        e.preventDefault();

        signInWithPopup(auth, provider)
            .then( userCredential => {
                alert(`Welcome ${userCredential.user.displayName}`);
            })

            .catch(err => console.log(err));
    }
    return (
        <>
            <div className='container' style={{ paddingTop: "5%" }}>
                <div className='sub-container'>
                    <div className='image'>
                        <img src={image} alt="Login image"></img>
                    </div>

                    <div className="signIn">
                        <h2>Sign In</h2>
                        <form action="cuahang.html" id="signInForm" onSubmit={handleSubmit}>
                            <div className="data">
                                <input type="email" placeholder="Email" id="email" value={email} onChange={handleChangeEmail} /><br />
                                <input type="password" placeholder="Password" id="password" value={password} onChange={handleChangePass} />
                            </div>

                            <div className="forgotPass"><a href="#">Forgot Password?</a></div>
                            <button className='btn btn-success' type="submit">Sign In</button>

                            <div className='signin__google'>
                                <div>Or sign in with</div>
                                <button className='btn btn-primary' onClick={handleLoginGG}>
                                    <i class="fa-brands fa-google" ></i>
                                    Sign in with Google
                                </button>
                            </div>

                            <div className="register">Don't have an account? <a href="#"><b>Register</b></a></div>
                        </form>
                    </div>
                </div>
            </div>
    </>
);
}

export default Login;
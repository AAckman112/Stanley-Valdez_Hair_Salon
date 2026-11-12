import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "./Login.css"

function Login() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage('');

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                setMessage(data.message || 'Login failed. Please try again.');
                return;
            }

            switch ((data.role || '').toLowerCase()) {
                case 'admin':
                    navigate('/admin');
                    break;
                case 'stylist':
                    navigate('/stylist');
                    break;
                case 'client':
                    navigate('/client');
                    break;
                default:
                    setMessage('Your account has no recognized role.');
                    break;
            }
        } catch (error) {
            console.error(error);
            setMessage('Could not reach the server. Please try again.');
        }
    }

    return (
    <div class="page">
        <section class="left">
            <header>
                <a class="brand" href="#">Stanley Valdez<small>ATELIER</small></a>
                <a class="back" href="#">
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 6H1.5M5.5 2 1.5 6l4 4"/></svg>
                    Back to site
                </a>
            </header>
            
            <main>
                <form class="card" id="login-form" onSubmit={handleSubmit}>
                    <h1>Welcome back</h1>
                    <p class="sub">Sign in to manage your reservations, salon profile, and preferred stylist settings.</p>
                    <div class="field">
                        <label for="username">Username</label>
                        <input id="username" type="text" placeholder="Enter your username" />
                    </div>

                    <div class="field">
                        <div class="row">
                            <label for="password">Password</label>
                            <a class="forgot" href="#">Forgot Password?</a>
                        </div>
                        <input id="password" type="password" placeholder="Enter your password" autocomplete="current-password" />
                        <button type="button" class="eye" id="toggle" aria-label="Show password">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                    </div>

                    <label class="remember">
                        <input type="checkbox" checked />
                        <span class="box"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2.5 6.5 2.5 2.5 4.5-5.5"/></svg></span>
                        Remember me on this device
                    </label>

                    <p id="login-message" role="status">{message}</p>
                    <button class="submit" type="submit">Sign in to Atelier</button>
                    <p class="signup">First time visiting? <a href="#">Create an account</a></p>
                </form>
            </main>
            
            <footer>
                <span>© 2025 Stanley Valdez Atelier. All rights reserved.</span>
                <nav><a href="#">Privacy Policy</a><a href="#">Terms of Use</a></nav>
            </footer>
        </section>
        
        <aside class="right">
            <div class="visual">
                <div class="quote">
                    <p>“I just work here.”</p>
                    <div class="by">Stanley Valdez, Creative Director</div>
                </div>
            </div>
        </aside>
    </div>
    );
}

export default Login;
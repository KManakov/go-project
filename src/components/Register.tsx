// System Message: Ensure that 'axios' is installed and available.
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    // System Message: State variables for username, password, and error message.
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(''); // System Message: Reset error.

        try {
            const response = await axios.post('http://localhost:8090/register', {
                username,
                password,
            });

            const { token } = response.data;
            // System Message: Save token in localStorage.
            localStorage.setItem('token', token);
            // System Message: Redirect to dashboard after successful registration.
            navigate('/dashboard');
        } catch (err: any) {
            setError('Registration failed. ' + (err.response?.data?.error || ''));
        }
    };

    return (
            <div style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '3rem' }}>
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="username"></label>
        <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
            />
            </div>
            <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password"></label>
        <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
            />
            </div>
            <button type="submit" style={{ padding: '0.5rem 1rem' }}>Register</button>
        </form>
        </div>
        );
    };

    export default Register;
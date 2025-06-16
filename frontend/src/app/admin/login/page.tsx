import React from 'react';

const LoginPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>Admin Login</h2>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" style={{ padding: '10px', margin: '10px 0' }} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" style={{ padding: '10px', margin: '10px 0' }} />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage; 
import React, { useState } from 'react';

function App() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  const sendOTP = () => {
    // Validate mobile number
    const mobilePattern = /^[6-9]\d{9}$/;
    if (!mobilePattern.test(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    // Call generateOTP API to send OTP
    const apiUrl = 'https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP';
    const requestBody = { mobile: mobileNumber };
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (response.ok) {
          setOtpSent(true);
          setError('');
          setMobileNumber('');
        } else {
          setError('Failed to send OTP. Please try again later.');
        }
      })
      .catch(error => {
        console.error('Error sending OTP:', error);
        setError('Failed to send OTP. Please try again later.');
      });
  };

  return (
    <div>
      <h1>Send OTP to Mobile</h1>
      <div>
        <label htmlFor="mobileNumber">Mobile Number:</label>
        <input type="tel" id="mobileNumber" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {otpSent && <div style={{ color: 'green' }}>OTP sent successfully!</div>}
      <button onClick={sendOTP}>Send OTP</button>
    </div>
  );
}

export default App;

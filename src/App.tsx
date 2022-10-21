import 'styles/main.scss'
import React from 'react';
import OTPInput from 'components/OtpInput';

function App() {
  return (
    <div className="app">
      <OTPInput length={6} />
    </div>
  );
}

export default App;

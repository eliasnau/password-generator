import React, { useState } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('CLICK GENERATE');
  const [passwordLength, setPasswordLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const getRandomLower = () => {
    // Function to get a random lowercase character
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  };

  const getRandomUpper = () => {
    // Function to get a random uppercase character
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  };

  const getRandomNumber = () => {
    // Function to get a random number
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  };

  const getRandomSymbol = () => {
    // Function to get a random symbol
    const symbols = '~!@#$%^&*()_+{}":?><;.,';
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const generatePassword = () => {
    let generatedPassword = '';
    const types = [];
    if (includeUppercase) types.push(getRandomUpper);
    if (includeLowercase) types.push(getRandomLower);
    if (includeNumbers) types.push(getRandomNumber);
    if (includeSymbols) types.push(getRandomSymbol);

    if (types.length === 0) {
      return 'Please select at least one character type.';
    }

    for (let i = 0; i < passwordLength; i++) {
      const randomType = types[Math.floor(Math.random() * types.length)];
      generatedPassword += randomType();
    }

    return generatedPassword;
  };

  const handleGenerateClick = () => {
    const generatedPassword = generatePassword();
    setPassword(generatedPassword);
    setCopied(false);
  };

  const handleCopyClick = () => {
    if (password === 'CLICK GENERATE') return;

    const textarea = document.createElement('textarea');
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    setCopied(true);
  };

  return (
    <div className="container">
      <h2 className="title">Password Generator</h2>
      <div className="result">
        <div className="result__title field-title">Generated Password</div>
        <div className={`result__info ${copied ? 'left' : 'right'}`} onClick={handleCopyClick}>
          {copied ? 'copied' : 'click to copy'}
        </div>
        <div className="result__viewbox" id="result">
          {password}
        </div>
      </div>

      <div className="length range__slider" data-min="4" data-max="32">
        <div className="length__title field-title" data-length={passwordLength}>
          length:
        </div>
        <input
          id="slider"
          type="range"
          min="4"
          max="32"
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
        />
      </div>

      <div className="settings">
        <span className="settings__title field-title">settings</span>
        <div className="setting">
          <input
            type="checkbox"
            id="uppercase"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          <label htmlFor="uppercase">Include Uppercase</label>
        </div>
        <div className="setting">
          <input
            type="checkbox"
            id="lowercase"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          <label htmlFor="lowercase">Include Lowercase</label>
        </div>
        <div className="setting">
          <input
            type="checkbox"
            id="number"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          <label htmlFor="number">Include Numbers</label>
        </div>
        <div className="setting">
          <input
            type="checkbox"
            id="symbol"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          <label htmlFor="symbol">Include Symbols</label>
        </div>
      </div>

      <button className="btn generate" id="generate" onClick={handleGenerateClick}>
        Generate Password
      </button>
    </div>
  );
};

export default PasswordGenerator;

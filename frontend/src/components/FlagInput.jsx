import { useState } from 'react';

const FlagInput = ({ correctFlag }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() === correctFlag) {
      window.alert('✅ Congrets you get the correct flag!');
    } else {
      window.alert('❌ Incorrect, try again.');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        className="flag-input"
        type="text"
        placeholder="Flag"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      <style jsx>{`
        .flag-input {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          font-weight: 600;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: white;
          color: #222;
          outline: none;
          margin-right: 8px;
        }
      `}</style>
    </div>
  );
};

export default FlagInput;

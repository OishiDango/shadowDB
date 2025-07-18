import React, { useState } from 'react';

const HintBar = ({ message }) => {
  const [show, setShow] = useState(false);

  return (
    <div style={{ ...styles.container }}>
      <div style={styles.header} onClick={() => setShow(!show)}>
        💡 Hint {show ? '▲' : '▼'}
      </div>
      {show && <div style={styles.message}>{message}</div>}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '500px',
    margin: '20px auto',
    border: '1px solid #ccc',
    borderRadius: '6px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    fontFamily: 'monospace',
  },
  header: {
    padding: '10px',
    backgroundColor: '#e6f2ff',
    cursor: 'pointer',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  message: {
    padding: '10px',
    color: '#333',
    borderTop: '1px solid #ccc',
  },
};

export default HintBar;

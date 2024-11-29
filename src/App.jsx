import React from 'react';
import styles from './styles/App.module.css';

import PersonSelector from './components/PersonSelector';

function App() {
  return (
    <div className={styles.app}>
      <PersonSelector />
    </div>
  );
}

export default App;
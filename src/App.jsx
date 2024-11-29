import React from 'react';  
import Select from './components/Select.jsx';

import styles from './styles/App.module.css';

function App() {
  const [value, setValue] = React.useState(null);
  
  return (
    <main className={styles.app}>
      <Select.Root value={value} onValueChange={setValue}>
        <Select.Trigger>
          {value || "Select an option..."}
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="option1">Option 1</Select.Item>
          <Select.Item value="option2">Option 2</Select.Item>
          <Select.Item value="option3">Option 3</Select.Item>
        </Select.Content>
      </Select.Root>
    </main>
  );
}

export default App;

import SelectMonolith from './components/SelectMonolith';

import chase from './assets/chase.jpg';
import gabriel from './assets/gabriel.jpg';
import jurica from './assets/jurica.jpg';
import michael from './assets/michael.jpg';

import styles from './styles/App.module.css';

function App() {
  const people = [
    {
      id: 1,
      name: "Chase Fade",
      role: "Senior Developer",
      image: chase
    },
    {
      id: 2,
      name: "Gabriel Silverio",
      role: "Product Manager",
      image: gabriel
    },
    {
      id: 3,
      name: "Jurica Koletic",
      role: "Senior Developer",
      image: jurica
    },
    {
      id: 4,
      name: "Michael Dam",
      role: "UI/UX Designer",
      image: michael
    }
  ];

  return (
    <main className={styles.app}>
      <SelectMonolith items={people} />
    </main>
  );
}

export default App

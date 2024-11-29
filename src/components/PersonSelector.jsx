import React from 'react';
import Select from './Select';

import styles from '../styles/PersonSelector.module.css';

import chase from '../assets/chase.jpg';
import gabriel from '../assets/gabriel.jpg';
import jurica from '../assets/jurica.jpg';
import michael from '../assets/michael.jpg';

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

function PersonSelector() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedPerson, setSelectedPerson] = React.useState(null);

    const handleValueChange = (value) => {
        setSelectedPerson(people.find(person => person.id === value));
    }

    return (
        <Select.Root
            value={selectedPerson?.id}
            onValueChange={handleValueChange}
            open={isOpen}
            onOpenChange={setIsOpen}
            className={styles.personSelector}
        >
            <Select.Trigger className={styles.selectorTrigger}>
                {selectedPerson ? (
                    <div className={styles.personPreview}>
                        <img 
                            src={selectedPerson.image} 
                            alt={selectedPerson.name} 
                            className={styles.personAvatar}
                        />
                        <span>{selectedPerson.name}</span>
                    </div>
                ) : (
                    <span>Select a person</span>
                )}
                <span className={`${styles.triggerArrow} ${isOpen ? styles.expanded : ''}`}>▼</span>
            </Select.Trigger>
            <Select.Content className={styles.dropdownMenu}>
                {people.map(person => (
                    <Select.Item 
                        key={person.id} 
                        value={person.id} 
                        className={`${styles.personOption} ${selectedPerson?.id === person.id ? styles.selected : ''}`}
                    >
                        <img 
                            src={person.image} 
                            alt={person.name} 
                            className={styles.personOptionAvatar}
                        />
                        <div className={styles.personOptionInfo}>
                            <div>{person.name}</div>
                            <div>{person.role}</div>
                        </div>
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}

export default PersonSelector;
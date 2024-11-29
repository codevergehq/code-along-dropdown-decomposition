import React from 'react';
import styles from '../styles/SelectMonolith.module.css';

function SelectMonolith({ items }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const selectRef = React.useRef(null);

    // Click outside handler
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keyboard navigation
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;    

            switch (e.key) {
                case 'Escape':
                    setIsOpen(false);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    const currentIndex = items.findIndex(item => item.id === selectedItem?.id);
                    const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                    setSelectedItem(items[nextIndex]);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    const currIndex = items.findIndex(item => item.id === selectedItem?.id);
                    const prevIndex = currIndex > 0 ? currIndex - 1 : items.length - 1;
                    setSelectedItem(items[prevIndex]);
                    break;
                case 'Enter':
                    if (selectedItem) {
                        setIsOpen(false);
                    }
                    break;
                default:
                    break;
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, items, selectedItem]);

    return (
        <div className={styles.selectContainer} ref={selectRef}>
            {/* Trigger/Selected Item Display */}
            <div className={styles.selectTrigger} onClick={() => setIsOpen(!isOpen)}>
                {selectedItem ? (
                    <div className={styles.selectedItem}>
                        <img src={selectedItem.image} alt={selectedItem.name} />
                        <span>{selectedItem.name}</span>
                    </div>
                ) : (
                    <span>Select a person</span>
                )}
                <span className={`${styles.selectArrow} ${isOpen ? styles.open : ''}`}>▼</span>
            </div>

            {/* Select Menu */}
            {isOpen && (
                <div className={styles.selectMenu}>
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={`${styles.selectItem} ${selectedItem?.id === item.id ? styles.selected : ''}`}
                            onClick={() => {
                                setSelectedItem(item);
                                setIsOpen(false);
                            }}
                        >
                            <img src={item.image} alt={item.name} />
                            <div className={styles.itemDetails}>
                                <span>{item.name}</span>
                                <span>{item.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectMonolith;
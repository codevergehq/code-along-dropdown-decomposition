import React from 'react';

import '../styles/Select.css';

const SelectMonolith = ({ items }) => {
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
        <div className="select-container" ref={selectRef}>
            {/* Trigger/Selected Item Display */}
            <div className="select-trigger" onClick={() => setIsOpen(!isOpen)}>
                {selectedItem ? (
                    <div className="selected-item">
                        <img src={selectedItem.image} alt={selectedItem.name} />
                        <span>{selectedItem.name}</span>
                    </div>
                ) : (
                    <span>Select a person</span>
                )}
                <span className="select-arrow">▼</span>
            </div>

            {/* Select Menu */}
            {isOpen && (
                <div className="select-menu">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="select-item"
                            onClick={() => {
                                setSelectedItem(item);
                                setIsOpen(false);
                            }}
                        >
                            <img src={item.image} alt={item.name} />
                            <div className="item-details">
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
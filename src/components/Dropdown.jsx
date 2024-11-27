import React from 'react';

const Dropdown = ({ items }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const dropdownRef = React.useRef(null);

  // Click outside handler 
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
    <div 
      className="dropdown-container" 
      ref={dropdownRef}
      style={{
        position: 'relative',
        width: '300px',
      }}
    >
      {/* Trigger/Selected Item Display */}
      <div
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          border: '1px solid #ccc',
          padding: '12px',
          borderRadius: '4px',
          cursor: 'pointer',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {selectedItem ? (
          <div 
            className="selected-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <div 
              className="item-details"
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>{selectedItem.name}</span>
            </div>
          </div>
        ) : (
          <span>Select a person</span>
        )}
        <span 
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s ease',
          }}
        >
          ▼
        </span>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="dropdown-menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 1000,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="dropdown-item"
              onClick={() => {
                setSelectedItem(item);
                setIsOpen(false);
              }}
              style={{
                padding: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 
                  selectedItem?.id === item.id ? '#f0f0f0' : 'transparent',
                ':hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <div
                className="item-details"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                <span style={{ fontSize: '0.9em', color: '#666' }}>
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
import React from 'react';
import styles from '../styles/Select.module.css';

const reducer = (state, action) => {
    if (action.type === 'TOGGLE_SELECT') {
        return {
            value: state.value,
            isOpen: !state.isOpen
        }
    } else if (action.type === 'SELECT_VALUE') {
        return {
            value: action.value,
            isOpen: false
        }
    } else {
        throw new Error('Unknown action type');
    }
}

const SelectContext = React.createContext();

const SelectProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, { value: null, isOpen: false });

    const toggleSelect = () => dispatch({ type: 'TOGGLE_SELECT' });
    const selectValue = (value) => dispatch({ type: 'SELECT_VALUE', value });

    const value = { state, toggleSelect, selectValue };

    return <SelectContext.Provider value={value}>
        {children}
    </SelectContext.Provider>
}

function Select({
    value = null,
    onValueChange = (value) => {},
    open = null,
    onOpenChange = (open) => {},
    className = "",
    children,
  }) {
    return (
      <SelectProvider>
        <SelectInner
          value={value}
          onValueChange={onValueChange}
          open={open}
          onOpenChange={onOpenChange}
          className={className}
        >
          {children}
        </SelectInner>
      </SelectProvider>
    );
  }

function SelectInner({ value, onValueChange, open, onOpenChange, className, children }) {
    const classes = `${styles.selectContainer} ${className}`;

    const { state, selectValue, toggleSelect } = React.useContext(SelectContext);

    const currentValue = value || state.value;

    // Initial Render
    React.useEffect(() => {
        if (state.value) return;
        selectValue(currentValue);
    }, [currentValue, state.value]);

    React.useEffect(() => {
        if (state.isOpen === open || open === undefined) return;
        toggleSelect();
    }, [open]);

    // Update Parent
    React.useEffect(() => {
        if (state.value && state.value !== value) {
            onValueChange?.(state.value);
        }
    }, [state.value, value]);

    // Update Open State
    React.useEffect(() => {
        onOpenChange?.(state.isOpen);
    }, [state.isOpen]);

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

function SelectTrigger({ className = '', children }) {
    const classes = `${styles.selectTrigger} ${className}`;

    const { toggleSelect } = React.useContext(SelectContext);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); // Prevent scrolling when space is pressed
            toggleSelect();
        }
    };

    return (
        <button
            className={classes}
            onClick={toggleSelect}
            onKeyDown={handleKeyDown}
        >
            {children}
        </button>
    );
}

function SelectContent({ className = '', children }) {
    const classes = `${styles.selectContent} ${className}`;
    const { state, toggleSelect } = React.useContext(SelectContext);
    const contentRef = React.useRef(null);

    React.useEffect(() => {
        if (!state.isOpen) return;

        const handleClickOutside = (e) => {
            if (contentRef.current && !contentRef.current.contains(e.target)) {
                // Check if click was also not on the trigger
                const trigger = document.querySelector(styles.selectTrigger);
                if (!trigger?.contains(event.target)) {
                    toggleSelect();
                }
            }
        };

        const handleKeyDown = (e) => {
            const items = document.querySelectorAll('[role="option"]');
            if (items.length === 0) return;

            if (e.key === 'Escape') {
                toggleSelect();
                return;
            }

            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const currentIndex = Array.from(items).findIndex(item => item === document.activeElement);
                const nextIndex = e.key === 'ArrowDown' 
                    ? (currentIndex + 1) % items.length 
                    : (currentIndex - 1 + items.length) % items.length;
                items[nextIndex].focus();
            }
        };

        window.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [state.isOpen, toggleSelect]);

    if (!state.isOpen) return null;

    return <div ref={contentRef} className={classes}>{children}</div>;
}

function SelectItem({ value, className = '', children }) {
    const classes = `${className}`;
    const { selectValue } = React.useContext(SelectContext);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            selectValue(value);
        }
    };

    return (
        <div 
            className={classes}
            onClick={() => selectValue(value)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="option"
        >
            {children}
        </div>
    );
}

export default {
    Root: Select,
    Trigger: SelectTrigger,
    Content: SelectContent,
    Item: SelectItem
};


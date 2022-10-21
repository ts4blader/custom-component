import React, { useEffect, useRef } from 'react'

interface InputProps {
    focus: boolean;
    handleKeyDown: (e: React.KeyboardEvent) => void;
    onChange: (value: string) => void;
    onFocus: () => void;
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({
    focus, handleKeyDown, onChange, onFocus, placeholder = '-'
}) => {

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (focus) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [focus])

    return <div className='otpInput_input'>
        <input
            ref={inputRef}
            onKeyDown={handleKeyDown}
            onChange={({ target }) => {
                onChange(target.value);
            }}
            type="text"
            maxLength={1}
            placeholder={placeholder}
            onFocus={(e) => {
                e.target.select();
                onFocus();
            }}
        />
    </div>
}

export default Input
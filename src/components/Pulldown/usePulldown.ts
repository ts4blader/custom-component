import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useClickOutside from "hooks/useClickOutside";

export type UsePulldownType = {
    options: OptionType[];
    allowClear?: boolean;
    allowSearch?: boolean;
    initValue?: OptionType;
    initOpen?: boolean;
    onChange?: (options?: OptionType) => void;
    handleLoadMore?: () => void;
}

const usePulldown = ({
    initOpen = false, initValue, allowClear, allowSearch, options, onChange
}: UsePulldownType) => {

    const mainRef = useRef<HTMLDivElement>(null!);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [open, setOpen] = useState(initOpen);
    const [value, setValue] = useState(initValue?.value);
    const [searchTerm, setSearchTerm] = useState('');
    const [active, setActive] = useState(0);

    const handleToggle = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const resultList = useMemo(() => {
        if (allowSearch) {
            const result = options.filter(
                (item) => item.label.toLowerCase().includes(searchTerm.toLowerCase()),
            );

            return result;
        }
        return options;
    }, [searchTerm, options, allowSearch]);

    const selectedOption = useMemo(() => [...options, initValue].find(
        (item) => item?.value === value,
    ), [value, options, initValue]);

    const selectActiveItem = useCallback(() => {
        const validIndex = Math.max(Math.min(resultList.length - 1, active), 0);

        setValue(resultList[validIndex].value);
        setOpen(false);
        //* blur input
        inputRef.current?.blur();
        //* set search term
        setSearchTerm(resultList[validIndex].label || '');

        setActive(0);
    }, [resultList, active]);

    const handleSelect = useCallback(() => {
        selectActiveItem();
    }, [selectActiveItem]);

    const handleClear = useCallback(() => {
        if (allowClear) {
            setValue('');
            setSearchTerm('');
            if (onChange) onChange(undefined);

            inputRef.current?.focus();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFocus = useCallback(() => {
        setSearchTerm('');
        setOpen(true);
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setActive(0);
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        switch (e.code) {
            case 'ArrowDown':
                e.preventDefault();
                setActive(Math.min(active + 1, resultList.length - 1));
                break;

            case 'ArrowUp':
                e.preventDefault();
                setActive(Math.max(active - 1, 0));
                break;

            case 'Enter':
                e.preventDefault();
                selectActiveItem();
                break;

            default:
                break;
        }
    }, [active, resultList, selectActiveItem]);

    useClickOutside(mainRef, () => {
        if (open) setOpen(false);
        setSearchTerm(selectedOption?.label || '');
    });

    //* on change binding
    useEffect(() => {
        if (onChange && selectedOption) onChange(selectedOption);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOption]);


    return {
        open, setOpen, handleChange, handleClear, handleFocus, handleKeyDown,
        handleSelect, handleToggle, selectedOption, mainRef, inputRef,
        allowClear, allowSearch, searchTerm, setSearchTerm, resultList,
        active, setActive
    }

}

export default usePulldown
import React, {
    useState, useCallback, useRef, useMemo, useEffect,
} from 'react';

import iconCaret from 'assets/icons/ic_caret.png';
import iconClear from 'assets/icons/ic_clear.png';
import iconLoading from 'assets/icons/ic_loading.gif';
import useClickOutside from 'hooks/useClickOutside';
import useScrollInfinite from 'hooks/useInfinityScroll';

type OptionType = {
    label: string;
    value: string;
}

interface PullDownItemProps {
    active: boolean;
    onHover: () => void;
    onClick: () => void;
    label: string;
}

export interface PulldownProps {
    options: OptionType[];
    id?: string;
    label?: string;
    disabled?: boolean;
    placeholder?: string;
    icon?: string;
    error?: string;
    allowClear?: boolean;
    allowSearch?: boolean;
    initValue?: OptionType;
    loading?: boolean;
    initOpen?: boolean;
    onChange?: (options?: OptionType) => void;
    loadMore?: boolean;
    handleLoadMore?: () => void;
}

const PullDownItem: React.FC<PullDownItemProps> = ({
    active, onHover, onClick, label,
}) => {
    const mainRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        if (active) {
            mainRef.current.scrollIntoView({
                block: 'nearest',
                behavior: 'smooth',
            });
        }
    }, [active]);

    return (
        <div
            ref={mainRef}
            className='pulldown_item'
            onClick={onClick}
            onMouseMove={onHover}
            data-active={active}
        >
            {label}
        </div>
    );
};

const Pulldown: React.FC<PulldownProps> = ({
    initValue, options, placeholder, onChange, allowClear, icon, loading, initOpen, error,
    disabled, id, label, allowSearch, loadMore, handleLoadMore,
}) => {
    const mainRef = useRef<HTMLDivElement>(null!);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [open, setOpen] = useState((!disabled && initOpen) || false);
    const [value, setValue] = useState(initValue?.value);
    const [searchTerm, setSearchTerm] = useState('');
    const [active, setActive] = useState(0);

    const { setNode } = useScrollInfinite(handleLoadMore);

    const handleToggle = useCallback(() => {
        if (!disabled) {
            setOpen(!open);
        }
    }, [open, disabled]);

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
        setValue('');
        setSearchTerm('');
        if (onChange) onChange(undefined);

        inputRef.current?.focus();
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

    const PlainHeadText = useCallback(() => (
        placeholder && !selectedOption
            ? <div className="pulldown_placeholder">{placeholder}</div>
            : <div className="pulldown_text">{selectedOption?.label}</div>
    ), [placeholder, selectedOption]);

    useClickOutside(mainRef, () => {
        if (open) setOpen(false);
        setSearchTerm(selectedOption?.label || '');
    });

    //* on change binding
    useEffect(() => {
        if (onChange && selectedOption) onChange(selectedOption);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOption]);

    return (
        <div
            className='pulldown'
            data-open={open}
            data-loading={loading}
            data-disabled={disabled}
            data-error={error}
            ref={mainRef}
        >
            {label && (
                <label className="pulldown_label" htmlFor={id}>
                    {label}
                </label>
            )}

            <div className="pulldown_head">

                {loading
                    ? (
                        <div className="pulldown_loadingIcon">
                            <img src={iconLoading} alt="loading" />
                        </div>
                    )
                    : (
                        <div className="pulldown_icon">
                            <img src={icon} alt="no alt" />
                        </div>
                    )}

                {!allowSearch
                    ? (
                        <div className="pulldown_headline" onClick={handleToggle}>
                            <PlainHeadText />
                        </div>
                    )
                    : (
                        <input
                            className="pulldown_input"
                            ref={inputRef}
                            id={id}
                            disabled={disabled}
                            value={searchTerm}
                            onChange={handleChange}
                            type="text"
                            placeholder={placeholder && !selectedOption ? placeholder : selectedOption?.label}
                            onFocus={handleFocus}
                            onKeyDown={handleKeyDown}
                        />
                    )}

                {selectedOption && allowClear
                    ? (
                        <div className="pulldown_clearIcon" onClick={handleClear}>
                            <img src={iconClear} alt="clear icon" />
                        </div>
                    )
                    : (
                        <div className="pulldown_caretIcon" onClick={handleToggle}>
                            <img src={iconCaret} alt="caret icon" />
                        </div>
                    )}
            </div>

            {resultList.length > 0 && (
                <div className="pulldown_body">
                    {resultList.map((item, index) => (
                        <PullDownItem
                            key={item.value}
                            label={item.label || ''}
                            onClick={handleSelect}
                            onHover={() => setActive(index)}
                            active={index === active}
                        />
                    ))}
                    {loadMore && open
                        && (
                            <div className="pulldown_loadMore" ref={(node) => setNode(node)}>
                                <div className="pulldown_loadingIcon">
                                    <img src={iconLoading} alt="loading" />
                                </div>
                            </div>
                        )}
                </div>
            )}

            {error && <div className="pulldown_error">{error}</div>}
        </div>
    );
};

Pulldown.defaultProps = {
    placeholder: undefined,
    allowClear: false,
    allowSearch: false,
    icon: undefined,
    initValue: undefined,
    onChange: undefined,
    loading: false,
    initOpen: false,
    error: undefined,
};

export default Pulldown;

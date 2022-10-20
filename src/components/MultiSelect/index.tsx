import React, {
    useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import Item from './item';

import caret from 'assets/icons/ic_caret.png';
import clearIcon from 'assets/icons/ic_clear.png';
import loadingIcon from 'assets/icons/ic_loading.svg';
import useClickOutside from 'hooks/useClickOutside';

type OptionType = {
    label?: string;
    value?: string;
}

export interface MultiSelectProps {
    loading?: boolean;
    disabled?: boolean;
    loadMore?: boolean;
    handleLoadMore?: () => void;
    defaultValues?: OptionType[];
    placeholder?: string;
    caretIcon?: string;
    prefixIcon?: string;
    data?: OptionType[];
    allowClear?: boolean;
    allowSearch?: boolean;
    onChange?: (options: OptionType[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
    data, loading, disabled, handleLoadMore, allowClear, allowSearch,
    defaultValues, placeholder, prefixIcon, caretIcon, loadMore, onChange,
}) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const mainRef = useRef<HTMLDivElement | null>(null);

    const [selectedOption, setSelectedOption] = useState<OptionType[]>(defaultValues || []);
    const [open, setOpen] = useState(false);
    const [focus, setFocus] = useState(0);

    const [searchTerm, setSearchTerm] = useState('');

    const resultData = useMemo(() => {
        const searchText = searchTerm.toLowerCase();
        return data?.filter((item) => item.label?.toLowerCase().includes(searchText));
    },
        [data, searchTerm]);

    const handleClickOption = useCallback((option: OptionType) => {
        setSelectedOption(selectedOption.filter((item) => item.value !== option.value));
    }, [selectedOption]);

    const handleClear = useCallback(() => {
        setSelectedOption([]);
    }, []);

    const handleInputFocus = useCallback(() => {
        if (searchRef.current) {
            setFocus(0);
        }
    }, []);

    const handleOpen = useCallback(() => {
        if (!open && !allowSearch) {
            setFocus(-1);
        }
        setOpen(!open);
        if (allowSearch && !open) {
            searchRef.current?.focus();
        }
    }, [open, allowSearch]);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (focus !== 0) {
            setFocus(0);
        }
        setSearchTerm(e.target.value);
    }, [focus]);

    const handleChoose = useCallback((option: OptionType) => {
        const found = selectedOption.find((item) => item.value === option.value);

        if (!found) {
            setSelectedOption([...selectedOption, option]);
        } else {
            setSelectedOption(selectedOption.filter((item) => item.value !== found.value));
        }

        setOpen(false);
    }, [selectedOption]);

    // keyboard binding
    const handleDownKey = useCallback((e: React.KeyboardEvent) => {
        switch (e.code) {
            case 'ArrowDown':
                e.preventDefault();
                if (resultData) {
                    setFocus(Math.min(resultData?.length - 1, focus + 1));
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (resultData) {
                    setFocus(Math.max(0, focus - 1));
                }
                break;
            case 'Enter':
                e.preventDefault();
                if (resultData) {
                    handleChoose(resultData[focus]);
                }
                break;
            case 'Escape':
                e.preventDefault();
                if (open) {
                    setOpen(false);
                    searchRef.current?.blur();
                }
                break;
            default:
        }
    }, [resultData, focus, handleChoose, open]);

    useEffect(() => {
        if (onChange) onChange(selectedOption);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOption]);

    useEffect(() => {
        if (disabled || loading) {
            setOpen(false);
        }
    }, [disabled, loading]);

    useClickOutside(mainRef, () => {
        setOpen(false);
        searchRef.current?.blur();
    });

    return (
        <div
            ref={mainRef}
            className='multiSelect'
            data-open={open}
            data-disabled={disabled || loading}
        >

            <div
                className="multiSelect_headline"
                onClick={handleOpen}
            >
                {prefixIcon
                    && (
                        <div className="multiSelect_prefixIcon">
                            <img src={prefixIcon} alt="prefix icon" />
                        </div>
                    )}

                {placeholder && !(selectedOption.length > 0)
                    ? <div className="multiSelect_placeholder">{placeholder}</div>
                    : (
                        <div className="multiSelect_badgeList">
                            {selectedOption.map((item) => (
                                <div
                                    onClick={(e) => {
                                        handleClickOption(item);
                                        e.stopPropagation();
                                    }}
                                    className="multiSelect_badge"
                                >
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    )}

                {allowClear && selectedOption.length !== 0
                    && (
                        <div className="multiSelect_clear" onClick={handleClear}>
                            <img src={clearIcon} alt="cross" />
                        </div>
                    )}

                {loading ? (
                    <div className="multiSelect_loading">
                        <img src={loadingIcon} alt="loading" />
                    </div>
                ) : (
                    <div className="multiSelect_caret">
                        <img src={caretIcon} alt="caret" />
                    </div>
                )}
            </div>

            <div className="multiSelect_content">

                {allowSearch
                    && (
                        <div className="multiSelect_search">
                            <input
                                ref={searchRef}
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onFocus={handleInputFocus}
                                onKeyDown={handleDownKey}
                            />
                        </div>
                    )}

                {resultData && resultData.length > 0 ? (
                    <div className="multiSelect_optionList">
                        {resultData.map((item, index) => (
                            <Item
                                key={`optionList-${item.value}`}
                                focus={focus === index}
                                active={!!selectedOption.find((el) => el.value === item.value)}
                                handleClick={() => handleChoose(item)}
                                handleHover={() => setFocus(index)}
                            >
                                {item.label}
                            </Item>
                        ))}
                    </div>
                ) : (
                    <div className="multiSelect_noData">
                        No data
                    </div>
                )}

            </div>

        </div>
    );
};

MultiSelect.defaultProps = {
    data: undefined,
    loading: false,
    disabled: false,
    loadMore: false,
    handleLoadMore: undefined,
    defaultValues: undefined,
    placeholder: undefined,
    caretIcon: caret,
    prefixIcon: undefined,
    allowClear: false,
    allowSearch: false,
    onChange: undefined,
};

export default MultiSelect;

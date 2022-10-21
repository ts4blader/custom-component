import React, { useCallback } from 'react';

import iconCaret from 'assets/icons/ic_caret.png';
import iconClear from 'assets/icons/ic_clear.png';
import iconLoading from 'assets/icons/ic_loading.svg';
import PullDownItem from './item';
import useScrollInfinite from 'hooks/useInfinityScroll';
import usePulldown, { UsePulldownType } from './usePulldown';

export interface PulldownProps extends UsePulldownType {
    label?: string;
    id?: string;
    icon?: string;
    placeholder?: string;
    loadMore?: boolean;
    handleLoadMore?: () => void;
    loading?: boolean;
    disabled?: boolean;
    error?: boolean;
}


const Pulldown: React.FC<PulldownProps> = ({
    label, id, icon, loadMore,
    loading, disabled, error, placeholder, handleLoadMore, ...rest
}) => {

    const {
        handleChange, handleClear, handleFocus,
        handleKeyDown, handleSelect, handleToggle, selectedOption,
        open, inputRef, mainRef, allowClear, allowSearch, searchTerm,
        resultList, active, setActive
    } = usePulldown(rest);

    const PlainHeadText = useCallback(() => (
        placeholder && !selectedOption
            ? <div className="pulldown_placeholder">{placeholder}</div>
            : <div className="pulldown_text">{selectedOption?.label}</div>
    ), [placeholder, selectedOption]);

    const { setNode } = useScrollInfinite(handleLoadMore);

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

export default Pulldown;

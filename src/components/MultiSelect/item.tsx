import React, { useEffect, useRef } from 'react';

type ItemMultiSelectType = {
    focus: boolean;
    active?: boolean;
    handleClick?: () => void;
    handleHover?: () => void;
    children?: React.ReactNode
}

const Item: React.FC<ItemMultiSelectType> = ({
    focus, active, handleClick, children, handleHover,
}) => {

    const itemRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (focus) {
            itemRef.current?.scrollIntoView({
                block: 'nearest',
                behavior: 'smooth',
            })
        }
    }, [focus])

    return <div
        ref={itemRef}
        onClick={handleClick}
        onMouseMove={handleHover}
        className='multiSelect_option'
        data-focus={focus}
        data-active={active}
    >
        {children}
    </div>
};

export default Item;

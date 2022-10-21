import React, { useEffect, useRef } from 'react'

interface PullDownItemProps {
    active: boolean;
    onHover: () => void;
    onClick: () => void;
    label: string;
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

export default PullDownItem
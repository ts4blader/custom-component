import { useCallback, useEffect, useState } from "react"

export type UseOTPInputType = {
    initialActive?: number;
    length: number;
    onChange?: (value?: string) => void;
    onFinish?: (value?: string) => void;
    onlyNumber?: boolean;
}

const useOTPInput = ({
    initialActive = 0, length, onChange, onFinish, onlyNumber
}: UseOTPInputType) => {

    const [active, setActive] = useState(initialActive);
    const [value, setValue] = useState<string[]>(Array(length).fill(''))

    const setSafeActive = useCallback((nextActive: number) => {
        return setActive(Math.min(length - 1, Math.max(nextActive, 0)));
    }, [length])

    const setSafeValue = useCallback((currentValue: string, activePosition: number = active) => {
        const clone = [...value];
        clone[activePosition] = currentValue;
        setValue(clone)

        if (onChange) onChange(clone.join(''))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, value])

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowRight':
                e.preventDefault();
                setSafeActive(active + 1);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                setSafeActive(active - 1);
                break;
            case 'Delete':
            case 'Backspace':
                if (value[active] === '') {
                    e.preventDefault();
                    setSafeActive(active - 1)
                }
                break;
            default:
                if (e.key.match(/[^0-9]/g) && onlyNumber) {
                    e.preventDefault();
                }
                if (e.key.match(/[^0-9a-zA-Z]/g)) {
                    e.preventDefault();
                }
                break;
        }
    }, [setSafeActive, active, value, onlyNumber])

    const getOTP = useCallback(() => value.join(''), [value]);

    useEffect(() => {
        let otpCode = value.join('');
        if (onFinish && active === length - 1 && otpCode.length === length) {
            onFinish(otpCode);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, value, length])

    return {
        active, setSafeActive, setSafeValue, setActive, setValue,
        handleKeyDown, value, getOTP
    }
}

export default useOTPInput
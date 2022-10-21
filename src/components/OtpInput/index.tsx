import OPTIONS from 'assets/dataDummy/options';
import React from 'react'
import Input from './input';
import useOTPInput, { UseOTPInputType } from './useOTPInput';

export interface OTPInputProps extends UseOTPInputType {
    error?: string;
    disabled?: boolean;
    placeholder?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
    placeholder, error, disabled, ...rest
}) => {

    const { length } = rest;

    const { value: OTPArr, active, handleKeyDown, setSafeValue,
        setSafeActive
    } = useOTPInput(rest);

    return (
        <div
            data-error={!!error}
            data-disabled={disabled}
            className='otpInput'>
            {length > 0 &&
                <div className="otpInput_inner">
                    {OTPArr.map((e, i) => (
                        <Input
                            //todo remove with id 
                            key={OPTIONS[i].value}
                            placeholder={placeholder}
                            focus={i === active}
                            handleKeyDown={handleKeyDown}
                            onFocus={() => setSafeActive(i)}
                            onChange={(value) => {
                                setSafeValue(value);
                                if (value) setSafeActive(active + 1)
                            }}
                        />
                    ))}
                </div>
            }

            {error && <div className="otpInput_error"> {error} </div>}
        </div>
    )
}

export default OTPInput
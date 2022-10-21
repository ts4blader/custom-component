import { Story, Meta } from '@storybook/react';
import React from 'react';

import 'styles/main.scss'

import OTPInput, { OTPInputProps } from 'components/OtpInput';

export default {
    title: 'Components/OtpInput',
    component: OTPInput,
    argTypes: {},
    args: {
        length: 6,
        disabled: false,
        error: '',
        onlyNumber: false,
        placeholder: '-',
        onChange: (value) => console.log('change', value),
        onFinish: (value) => console.log('finish', value),
    },
} as Meta<OTPInputProps>;

export const normal: Story<OTPInputProps> = (args) => (
    <OTPInput {...args} />
);

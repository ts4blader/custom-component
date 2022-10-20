import { Story, Meta } from '@storybook/react';
import React from 'react';

import MultiSelect, { MultiSelectProps } from 'components/MultiSelect';
import OPTIONS from 'assets/dataDummy/options';
import 'styles/main.scss'

export default {
    title: 'Components/molecules/MultiSelect',
    component: MultiSelect,
    args: {
        disabled: false,
        allowClear: false,
        allowSearch: false,
        placeholder: 'Choose your answer',
        loading: false,
        data: OPTIONS,
    },
    argTypes: {},
} as Meta<MultiSelectProps>;

export const normal: Story<MultiSelectProps> = (args) => (
    <div style={{
        width: 400,
        height: 500,
    }}
    >
        <MultiSelect {...args} />
    </div>
);

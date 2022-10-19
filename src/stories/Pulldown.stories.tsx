import { Story, Meta } from '@storybook/react';
import React from 'react';

import 'styles/main.scss'
import Pulldown, { PulldownProps } from 'components/Pulldown';
import OPTIONS from 'assets/dataDummy/options'

import iconDebian from 'assets/icons/ic_debian.png';

export default {
    title: 'Components/molecules/Pulldown',
    component: Pulldown,
    argTypes: {},
    args: {
        options: OPTIONS,
        initValue: {
            value: 'init',
            label: 'init',
        },
        icon: iconDebian,
        placeholder: 'Put something in',
        disabled: false,
        allowClear: true,
        allowSearch: false,
        loadMore: true,
        loading: false,
        sort: 'desc',
        error: '',
        onChange: (value) => {
            console.log(value);
        },
        handleLoadMore: () => {
            console.log('Load more fired');
        },
    },
} as Meta<PulldownProps>;

export const normal: Story<PulldownProps> = (args) => (
    <div style={{ minHeight: '100vh', width: 400 }}>
        <Pulldown {...args} />
    </div>
);

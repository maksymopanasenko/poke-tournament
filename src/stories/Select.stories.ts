import type { Meta, StoryObj } from '@storybook/react';

import CustomSelect from '../components/CustomSelect/CustomSelect';

const meta: Meta<typeof CustomSelect> = {
    title: 'Select',
    component: CustomSelect,
    tags: ['autodocs'],
    argTypes: {
        options: {
            control: {type: 'boolean'}
        }
    }
}

export default meta;

type Story = StoryObj<typeof meta>

export const Base: Story = {
    args: {
        options: [
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
            { id: 3, name: 'Option 3' },
        ],
    }
}

export const Loading: Story = {
    args: {
        options: null,
    }
}


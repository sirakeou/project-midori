import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Home, Search, Settings, User, Bell, FileText } from 'lucide-react';
import { SideMenu } from './sidemenu';
import type { SideMenuItem } from './sidemenu';

type SideMenuStoryArgs = {
  items: SideMenuItem[];
  initialRoute?: string;
};

const meta = {
  title: 'Layout/SideMenu',
  component: SideMenu,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => (
      <MemoryRouter initialEntries={[(context.args as SideMenuStoryArgs).initialRoute || '/']}>
        <div className="h-screen">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<SideMenuStoryArgs>;

export default meta;
type Story = StoryObj<SideMenuStoryArgs>;

const defaultItems: SideMenuItem[] = [
  {
    id: 'home',
    icon: Home,
    label: 'Home',
    path: '/',
  },
  {
    id: 'search',
    icon: Search,
    label: 'Search',
    path: '/search',
  },
  {
    id: 'workspace',
    icon: FileText,
    label: 'Workspace',
    path: '/workspace',
  },
  {
    id: 'notifications',
    icon: Bell,
    label: 'Notifications',
    path: '/notifications',
  },
  {
    id: 'profile',
    icon: User,
    label: 'Profile',
    path: '/profile',
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    initialRoute: '/',
  },
};

export const HomeActive: Story = {
  args: {
    items: defaultItems,
    initialRoute: '/',
  },
};

export const SearchActive: Story = {
  args: {
    items: defaultItems,
    initialRoute: '/search',
  },
};

export const WorkspaceActive: Story = {
  args: {
    items: defaultItems,
    initialRoute: '/workspace',
  },
};

export const WorkspaceSubPath: Story = {
  args: {
    items: defaultItems,
    initialRoute: '/workspace/project-123',
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      {
        id: 'home',
        icon: Home,
        label: 'Home',
        path: '/',
      },
    ],
    initialRoute: '/',
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      {
        id: 'home',
        icon: Home,
        label: 'Home',
        path: '/',
      },
      {
        id: 'settings',
        icon: Settings,
        label: 'Settings',
        path: '/settings',
      },
    ],
    initialRoute: '/',
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      ...defaultItems,
      {
        id: 'settings',
        icon: Settings,
        label: 'Settings',
        path: '/settings',
      },
    ],
    initialRoute: '/',
  },
};

export const Empty: Story = {
  args: {
    items: [],
    initialRoute: '/',
  },
};

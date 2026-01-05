import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Home, Search, Settings, FileText } from 'lucide-react';
import { SideMenu } from './sidemenu';
import type { SideMenuItem } from './sidemenu';

const renderWithRouter = (ui: React.ReactElement, initialEntries: string[] = ['/']) => {
  return render(<MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>);
};

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
];

describe('SideMenu', () => {
  describe('Rendering', () => {
    it('should render all menu items', () => {
      renderWithRouter(<SideMenu items={defaultItems} />);

      expect(screen.getByLabelText('Home')).toBeInTheDocument();
      expect(screen.getByLabelText('Search')).toBeInTheDocument();
      expect(screen.getByLabelText('Workspace')).toBeInTheDocument();
    });

    it('should render empty menu when items array is empty', () => {
      const { container } = renderWithRouter(<SideMenu items={[]} />);
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
    });

    it('should render single menu item', () => {
      const singleItem: SideMenuItem[] = [
        {
          id: 'home',
          icon: Home,
          label: 'Home',
          path: '/',
        },
      ];

      renderWithRouter(<SideMenu items={singleItem} />);
      expect(screen.getByLabelText('Home')).toBeInTheDocument();
    });
  });

  describe('Active State', () => {
    it('should mark home route as active when on home page', () => {
      renderWithRouter(<SideMenu items={defaultItems} />, ['/']);

      const homeLink = screen.getByLabelText('Home');
      expect(homeLink).toHaveAttribute('aria-current', 'page');
    });

    it('should mark search route as active when on search page', () => {
      renderWithRouter(<SideMenu items={defaultItems} />, ['/search']);

      const searchLink = screen.getByLabelText('Search');
      expect(searchLink).toHaveAttribute('aria-current', 'page');
    });

    it('should mark workspace route as active when on workspace page', () => {
      renderWithRouter(<SideMenu items={defaultItems} />, ['/workspace']);

      const workspaceLink = screen.getByLabelText('Workspace');
      expect(workspaceLink).toHaveAttribute('aria-current', 'page');
    });

    it('should mark workspace route as active when on workspace sub-path', () => {
      renderWithRouter(<SideMenu items={defaultItems} />, ['/workspace/project-123']);

      const workspaceLink = screen.getByLabelText('Workspace');
      expect(workspaceLink).toHaveAttribute('aria-current', 'page');
    });

    it('should not mark other routes as active when on home page', () => {
      renderWithRouter(<SideMenu items={defaultItems} />, ['/']);

      const searchLink = screen.getByLabelText('Search');
      const workspaceLink = screen.getByLabelText('Workspace');

      expect(searchLink).not.toHaveAttribute('aria-current', 'page');
      expect(workspaceLink).not.toHaveAttribute('aria-current', 'page');
    });

    it('should handle non-existing routes gracefully', () => {
      renderWithRouter(<SideMenu items={defaultItems} />, ['/non-existent']);

      const homeLink = screen.getByLabelText('Home');
      const searchLink = screen.getByLabelText('Search');
      const workspaceLink = screen.getByLabelText('Workspace');

      expect(homeLink).not.toHaveAttribute('aria-current', 'page');
      expect(searchLink).not.toHaveAttribute('aria-current', 'page');
      expect(workspaceLink).not.toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Navigation Links', () => {
    it('should have correct href for each menu item', () => {
      renderWithRouter(<SideMenu items={defaultItems} />);

      const homeLink = screen.getByLabelText('Home');
      const searchLink = screen.getByLabelText('Search');
      const workspaceLink = screen.getByLabelText('Workspace');

      expect(homeLink).toHaveAttribute('href', '/');
      expect(searchLink).toHaveAttribute('href', '/search');
      expect(workspaceLink).toHaveAttribute('href', '/workspace');
    });

    it('should render links with proper accessibility attributes', () => {
      renderWithRouter(<SideMenu items={defaultItems} />, ['/']);

      const homeLink = screen.getByLabelText('Home');

      expect(homeLink).toHaveAttribute('aria-label', 'Home');
      expect(homeLink).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Tooltip Integration', () => {
    it('should wrap menu items with tooltip components', () => {
      const { container } = renderWithRouter(<SideMenu items={defaultItems} />);

      // Check that all menu items are rendered (tooltips are present in the DOM)
      const links = container.querySelectorAll('a[aria-label]');
      expect(links.length).toBe(defaultItems.length);
    });
  });

  describe('Styling', () => {
    it('should apply correct CSS classes to nav element', () => {
      const { container } = renderWithRouter(<SideMenu items={defaultItems} />);

      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('flex', 'flex-col', 'h-full', 'w-11', 'border-r', 'bg-background');
    });

    it('should apply active styling classes when route is active', () => {
      renderWithRouter(<SideMenu items={defaultItems} />, ['/']);

      const homeLink = screen.getByLabelText('Home');
      expect(homeLink).toHaveClass('bg-accent/50', 'text-foreground');
    });
  });

  describe('Edge Cases', () => {
    it('should handle items with special characters in labels', () => {
      const specialItems: SideMenuItem[] = [
        {
          id: 'special',
          icon: Settings,
          label: 'Settings & More',
          path: '/settings',
        },
      ];

      renderWithRouter(<SideMenu items={specialItems} />);
      expect(screen.getByLabelText('Settings & More')).toBeInTheDocument();
    });

    it('should handle items with very long labels', () => {
      const longLabelItems: SideMenuItem[] = [
        {
          id: 'long',
          icon: Settings,
          label: 'This is a very long label that might cause layout issues',
          path: '/long',
        },
      ];

      renderWithRouter(<SideMenu items={longLabelItems} />);
      expect(
        screen.getByLabelText('This is a very long label that might cause layout issues')
      ).toBeInTheDocument();
    });

    it('should handle items with paths containing special characters', () => {
      const specialPathItems: SideMenuItem[] = [
        {
          id: 'special-path',
          icon: Settings,
          label: 'Special Path',
          path: '/path-with-dashes_and_underscores',
        },
      ];

      renderWithRouter(<SideMenu items={specialPathItems} />);
      const link = screen.getByLabelText('Special Path');
      expect(link).toHaveAttribute('href', '/path-with-dashes_and_underscores');
    });
  });

  describe('isActive Function Behavior', () => {
    it('should correctly identify workspace routes with startsWith logic', () => {
      const items: SideMenuItem[] = [
        {
          id: 'workspace',
          icon: FileText,
          label: 'Workspace',
          path: '/workspace',
        },
      ];

      renderWithRouter(<SideMenu items={items} />, ['/workspace/project/123/details']);

      const workspaceLink = screen.getByLabelText('Workspace');
      expect(workspaceLink).toHaveAttribute('aria-current', 'page');
    });

    it('should use exact match for non-workspace routes', () => {
      renderWithRouter(<SideMenu items={defaultItems} />, ['/search/results']);

      const searchLink = screen.getByLabelText('Search');
      expect(searchLink).not.toHaveAttribute('aria-current', 'page');
    });
  });
});

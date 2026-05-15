import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Tile } from './Tile';
import { ThemeProvider } from '../context/ThemeContext';

describe('Tile', () => {
  it('renders children', () => {
    render(<Tile>Test content</Tile>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies dark class when mode is dark', () => {
    const { container } = render(
      <ThemeProvider mode="dark">
        <Tile>Content</Tile>
      </ThemeProvider>
    );
    expect(container.firstChild).toHaveClass('nothing-card');
  });

  it('applies light class when light prop is true', () => {
    const { container } = render(<Tile light>Content</Tile>);
    expect(container.firstChild).toHaveClass('nothing-card-light');
  });

  it('accepts custom className', () => {
    const { container } = render(<Tile className="custom-class">Content</Tile>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import { describe, it, expect } from 'vitest';

describe('Button Component', () => {
  it('should render children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should show loading spinner and disable button when isLoading is true', () => {
    render(<Button isLoading={true}>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    // In our button, we hide children when loading and show a spinner. 
    // Actually, we do show children, but we render an SVG.
    expect(button.querySelector('svg')).toBeInTheDocument();
  });
});

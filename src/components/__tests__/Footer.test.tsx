import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('should render footer with attribution', () => {
    render(<Footer />);
    expect(screen.getByText(/icon by/i)).toBeInTheDocument();
  });

  it('should have link to icons8', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /icons8/i });
    expect(link).toHaveAttribute('href', 'https://icons8.kr/');
    expect(link).toHaveAttribute('target', '_blank');
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from '../Header';

describe('Header', () => {
  it('should render header with title', () => {
    render(<Header />);
    expect(screen.getByText('음력 생일은 언제일까?')).toBeInTheDocument();
  });

  it('should render header image', () => {
    render(<Header />);
    const img = screen.getByAltText('음력 생일 계산기');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('width', '64');
  });
});

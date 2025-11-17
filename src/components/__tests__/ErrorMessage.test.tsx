import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('should render error message with emoji', () => {
    render(<ErrorMessage message="윤달이 아닌 것 같네요" />);
    expect(screen.getByText(/윤달이 아닌 것 같네요/)).toBeInTheDocument();
    expect(screen.getByText(/😱/)).toBeInTheDocument();
  });
});

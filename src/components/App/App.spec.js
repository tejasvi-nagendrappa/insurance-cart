import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App Tests', () => {
  it('App should render', () => {
    render(<App />);
    expect(screen.getByText('Insurance Shop')).toBeVisible();
  });
});

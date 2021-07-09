import { render, screen } from '@testing-library/react';
import InsuranceForm from './InsuranceForm';

describe('InsuranceForm Tests', () => {
  it('InsuranceForm should render with Cancel Button', () => {
    render(<InsuranceForm initialFormValues={{ type: 'bike' }} />);
    expect(screen.getByText('Cancel')).toBeVisible();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
    render(<App isAuthenticated={false} />);
    const appName = screen.getByText(/travelbudget/i);
    expect(appName).toBeInTheDocument();
});

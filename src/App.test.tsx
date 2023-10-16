import { render, screen } from '@testing-library/react';
import App from './App';

describe('when App is rendered', () => {
  beforeEach(() => {
    render(<App />);
  })

  test('logo image is in the document', () => {
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  test('Exercise 1 text is in the document', () => {
    expect(screen.getByText('Exercise 1')).toBeInTheDocument();
  });

  test('Exercise 2 text is in the document', () => {
    expect(screen.getByText('Exercise 2')).toBeInTheDocument();
  });
});

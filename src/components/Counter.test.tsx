import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('when Counter is rendered', () => {
  beforeEach(() => {
    render(<Counter />);
  })

  test('counter is in the document with initial value', () => {
    expect(screen.getByRole('counter')).toHaveValue(0);
  });

  test('clicking Increase button updates counter value', () => {
    act(() => userEvent.click(screen.getByText('Increase')));
    expect(screen.getByRole('counter')).toHaveValue(1);
  });

  test('clicking Decrease button updates counter value', () => {
    act(() => userEvent.click(screen.getByText('Decrease')));
    expect(screen.getByRole('counter')).toHaveValue(-1);
  });

  test('typing in the textbox updates counter value', () => {
    act(() => userEvent.type(screen.getByRole('counter'), '12345'));
    expect(screen.getByRole('counter')).toHaveValue(12345);
  });

  test('typing in the textbox then clicking buttons updates counter value', () => {
    act(() => {
      userEvent.type(screen.getByRole('counter'), '123');
      userEvent.click(screen.getByText(/Increase/i));
      userEvent.click(screen.getByText(/Increase/i));
      userEvent.click(screen.getByText(/Decrease/i));
    });
    expect(screen.getByRole('counter')).toHaveValue(124);
  });
});

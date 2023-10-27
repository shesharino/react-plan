import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('when Counter is rendered', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    render(<Counter />);
  })

  test('counter is in the document with initial value', () => {
    expect(screen.queryByRole('counter')).toHaveValue(0);
  });

  test('waiting for timeout updates counter value', () => {
    act(() => jest.runOnlyPendingTimers());
    expect(screen.queryByRole('counter')).toHaveValue(33);
  });

  test('clicking Increase button updates counter value', () => {
    act(() => userEvent.click(screen.queryByText('Increase')));
    expect(screen.queryByRole('counter')).toHaveValue(1);
  });

  test('clicking Decrease button updates counter value', () => {
    act(() => userEvent.click(screen.queryByText('Decrease')));
    expect(screen.queryByRole('counter')).toHaveValue(-1);
  });

  test('typing in the textbox updates counter value', () => {
    act(() => userEvent.type(screen.queryByRole('counter'), '12345'));
    expect(screen.queryByRole('counter')).toHaveValue(12345);
  });

  test('typing in the textbox then clicking buttons updates counter value', () => {
    act(() => {
      userEvent.type(screen.queryByRole('counter'), '123');
      userEvent.click(screen.queryByText('Increase'));
      userEvent.click(screen.queryByText('Increase'));
      userEvent.click(screen.queryByText('Decrease'));
    });
    expect(screen.queryByRole('counter')).toHaveValue(124);
  });
});

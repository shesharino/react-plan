import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import App from './App';

describe('when App is rendered', () => {
  beforeEach(() => {
    render(<App />);
  })

  test('initial elements are in the document', () => {
    expect(screen.queryByAltText('logo')).toBeInTheDocument();
    expect(screen.queryByText('Exercise 1')).toBeInTheDocument();
    expect(screen.queryByText('Exercise 2')).toBeInTheDocument();
    expect(screen.queryByText('Axios API')).toBeInTheDocument();
    expect(screen.queryByText('Fetch API')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  test('clicking Axios API button opens modal', () => {
    act(() => userEvent.click(screen.queryByText('Axios API')));
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });

  test('clicking close button on Axios modal closes it', async () => {
    act(() => userEvent.click(screen.queryByText('Axios API')));
    act(() => userEvent.click(screen.queryByLabelText('Close')));
    await act(async () => wait(1000));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  test('clicking Fetch API button opens modal', () => {
    act(() => userEvent.click(screen.queryByText('Fetch API')));
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });

  test('clicking close button on Fetch modal closes it', async () => {
    act(() => userEvent.click(screen.queryByText('Fetch API')));
    act(() => userEvent.click(screen.queryByLabelText('Close')));
    await act(async () => wait(1000));
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});

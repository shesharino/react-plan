import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList';

describe('when TodoList is rendered', () => {
  beforeEach(() => {
    render(<TodoList />);
  })

  test('empty form is in the document', () => {
    expect(screen.queryByPlaceholderText('New Title')).toHaveValue('');
    expect(screen.queryByPlaceholderText('New Description')).toHaveValue('');
    expect(screen.queryByRole('item-grid')).toBeEmptyDOMElement();
  });

  test('typing in the new form textboxes updates form values', () => {
    act(() => {
      userEvent.type(screen.queryByPlaceholderText('New Title'), 'TITLE');
      userEvent.type(screen.queryByPlaceholderText('New Description'), 'DESCRIPTION');
    });
    expect(screen.queryByPlaceholderText('New Title')).toHaveValue('TITLE');
    expect(screen.queryByPlaceholderText('New Description')).toHaveValue('DESCRIPTION');
  });

  test('clicking Add New button adds an item and sets edit form with values', () => {
    act(() => {
      userEvent.type(screen.queryByPlaceholderText('New Title'), 'TITLE');
      userEvent.type(screen.queryByPlaceholderText('New Description'), 'DESCRIPTION');
      userEvent.click(screen.queryByText('Add New'));
    });
    expect(screen.queryByRole('item-grid')).toContainElement(screen.queryByRole('item-cell'));
    expect(screen.queryByRole('item-grid')).toContainElement(screen.queryByText('TITLE'));
    expect(screen.queryByRole('item-grid')).toContainElement(screen.queryByText('DESCRIPTION'));
    expect(screen.queryByPlaceholderText('Edit Title')).toHaveValue('TITLE');
    expect(screen.queryByPlaceholderText('Edit Description')).toHaveValue('DESCRIPTION');
  });

  test('adding multiple items and clicking Edit sets edit form with that item\'s values', () => {
    act(() => {
      userEvent.type(screen.queryByPlaceholderText('New Title'), 'TITLE 1');
      userEvent.type(screen.queryByPlaceholderText('New Description'), 'DESCRIPTION 1');
      userEvent.click(screen.queryByText('Add New'));
    });
    act(() => userEvent.click(screen.queryByText('Add New')));
    act(() => {
      userEvent.type(screen.queryByPlaceholderText('Edit Title'), 'TITLE 2');
      userEvent.type(screen.queryByPlaceholderText('Edit Description'), 'DESCRIPTION 2');
      userEvent.click(screen.queryAllByText('Edit')[0])
    });
    expect(screen.queryAllByRole('item-cell')).toHaveLength(2);
    expect(screen.queryByPlaceholderText('Edit Title')).toHaveValue('TITLE 1');
    expect(screen.queryByPlaceholderText('Edit Description')).toHaveValue('DESCRIPTION 1');
  });

  test('deleting active item removes item from list and resets form', () => {
    act(() => {
      userEvent.type(screen.queryByPlaceholderText('New Title'), 'TITLE 1');
      userEvent.type(screen.queryByPlaceholderText('New Description'), 'DESCRIPTION 1');
      userEvent.click(screen.queryByText('Add New'));
    });
    act(() => userEvent.click(screen.queryByText('Add New')));
    act(() => {
      userEvent.type(screen.queryByPlaceholderText('Edit Title'), 'TITLE 2');
      userEvent.type(screen.queryByPlaceholderText('Edit Description'), 'DESCRIPTION 2');
      userEvent.click(screen.queryAllByText('Delete')[1])
    });
    expect(screen.queryAllByRole('item-cell')).toHaveLength(1);
    expect(screen.queryByPlaceholderText('New Title')).toHaveValue('');
    expect(screen.queryByPlaceholderText('New Description')).toHaveValue('');
    expect(screen.queryByRole('item-grid')).toContainElement(screen.queryByText('TITLE 1'));
    expect(screen.queryByRole('item-grid')).toContainElement(screen.queryByText('DESCRIPTION 1'));
  });
});

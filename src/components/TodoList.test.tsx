import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList';

describe('when TodoList is rendered', () => {
  beforeEach(() => {
    render(<TodoList />);
  })

  test('empty form is in the document', () => {
    expect(screen.getByPlaceholderText('New Title')).toHaveValue('');
    expect(screen.getByPlaceholderText('New Description')).toHaveValue('');
    expect(screen.getByRole('item-grid')).toBeEmptyDOMElement();
  });

  test('typing in the new form textboxes updates form values', () => {
    act(() => {
      userEvent.type(screen.getByPlaceholderText('New Title'), 'TITLE');
      userEvent.type(screen.getByPlaceholderText('New Description'), 'DESCRIPTION');
    });
    expect(screen.getByPlaceholderText('New Title')).toHaveValue('TITLE');
    expect(screen.getByPlaceholderText('New Description')).toHaveValue('DESCRIPTION');
  });

  test('clicking Add New button adds an item and sets edit form with values', () => {
    act(() => {
      userEvent.type(screen.getByPlaceholderText('New Title'), 'TITLE');
      userEvent.type(screen.getByPlaceholderText('New Description'), 'DESCRIPTION');
      userEvent.click(screen.getByText('Add New'));
    });
    expect(screen.getByRole('item-grid')).toContainElement(screen.getByRole('item-cell'));
    expect(screen.getByRole('item-grid')).toContainElement(screen.getByText('TITLE'));
    expect(screen.getByRole('item-grid')).toContainElement(screen.getByText('DESCRIPTION'));
    expect(screen.getByPlaceholderText('Edit Title')).toHaveValue('TITLE');
    expect(screen.getByPlaceholderText('Edit Description')).toHaveValue('DESCRIPTION');
  });

  test('adding multiple items and clicking Edit sets edit form with that item\'s values', () => {
    act(() => {
      userEvent.type(screen.getByPlaceholderText('New Title'), 'TITLE 1');
      userEvent.type(screen.getByPlaceholderText('New Description'), 'DESCRIPTION 1');
      userEvent.click(screen.getByText('Add New'));
    });
    act(() => userEvent.click(screen.getByText('Add New')));
    act(() => {
      userEvent.type(screen.getByPlaceholderText('Edit Title'), 'TITLE 2');
      userEvent.type(screen.getByPlaceholderText('Edit Description'), 'DESCRIPTION 2');
      userEvent.click(screen.getAllByText('Edit')[0])
    });
    expect(screen.getAllByRole('item-cell')).toHaveLength(2);
    expect(screen.getByPlaceholderText('Edit Title')).toHaveValue('TITLE 1');
    expect(screen.getByPlaceholderText('Edit Description')).toHaveValue('DESCRIPTION 1');
  });

  test('deleting active item removes item from list and resets form', () => {
    act(() => {
      userEvent.type(screen.getByPlaceholderText('New Title'), 'TITLE 1');
      userEvent.type(screen.getByPlaceholderText('New Description'), 'DESCRIPTION 1');
      userEvent.click(screen.getByText('Add New'));
    });
    act(() => userEvent.click(screen.getByText('Add New')));
    act(() => {
      userEvent.type(screen.getByPlaceholderText('Edit Title'), 'TITLE 2');
      userEvent.type(screen.getByPlaceholderText('Edit Description'), 'DESCRIPTION 2');
      userEvent.click(screen.getAllByText('Delete')[1])
    });
    expect(screen.getAllByRole('item-cell')).toHaveLength(1);
    expect(screen.getByPlaceholderText('New Title')).toHaveValue('');
    expect(screen.getByPlaceholderText('New Description')).toHaveValue('');
    expect(screen.getByRole('item-grid')).toContainElement(screen.getByText('TITLE 1'));
    expect(screen.getByRole('item-grid')).toContainElement(screen.getByText('DESCRIPTION 1'));
  });
});

import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App.jsx';

describe('App test suite', () => {
  it('Has a title', () => {
    render(<App />);
    expect(screen.getByText('Todo List'));

    const appHeading = screen.getByRole('heading');

    expect(appHeading.textContent).toEqual('Todo List');

    const addTodoInput = screen.getByRole('textbox');
    const addTodoButton = screen.getByRole('button');

    expect(addTodoInput.value).toEqual('');

    fireEvent.change(addTodoInput, { target: { value: 'Hello' } });
    expect(addTodoInput.value).toEqual('Hello');
    fireEvent.click(addTodoButton);
    fireEvent.change(addTodoInput, { target: { value: 'How' } });
    expect(addTodoButton.disabled).toBe(false);
    fireEvent.click(addTodoButton);
    fireEvent.change(addTodoInput, { target: { value: 'Are' } });
    fireEvent.click(addTodoButton);
    fireEvent.change(addTodoInput, { target: { value: 'You' } });
    fireEvent.click(addTodoButton);

    expect(addTodoInput.value).toEqual('');
    expect(addTodoButton.disabled).toBe(true);

    const listItems = screen.getAllByRole('listitem');

    expect(listItems.length).toEqual(4);
    expect(listItems[0].textContent).toEqual('Hello');
  });
});

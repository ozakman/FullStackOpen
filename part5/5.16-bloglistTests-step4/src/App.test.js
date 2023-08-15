/* eslint-disable */
import React from 'react';
import {render, waitForElement} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
jest.mock("./services/blogs");
import App from './App';

describe('<App />', () => {
  test('if user is not logged in, blogs are not rendered and not shown', async() => {
    const component = render(<App />)

    component.rerender(<App />)

    await waitForElement( 
      () => component.getByText('login')
    )
    const login = component.getByText('login')
    expect(login).toHaveTextContent('log in to application')
  })
})



















test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

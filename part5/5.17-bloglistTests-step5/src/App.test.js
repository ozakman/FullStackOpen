/* eslint-disable */
import React from 'react';
import {render, waitFor} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";
jest.mock("./services/blogs");
import App from './App';

describe('<App />', () => {
  test('if user is not logged in, blogs are not rendered and not shown', async() => {

    const component = render(<App />)
    component.debug()

    await waitFor(
      () => component.container.querySelector('.loginTitle')
    )
    const login = component.container.querySelector('.loginTitle')
    expect(login).toHaveTextContent('Log in to application')
  })


  test('if user is logged in, blogs are rendered and shown to the user', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    const component = render(<App user={user} />)

    await waitFor(
      () => component.container.querySelector('.blogsTitle')
    )
    const blogsheading = component.container.querySelector('.blogsTitle')
    expect(component.container).toHaveTextContent('Blogs')
    const blogs = component.container.querySelector('.blogsTitle')
    expect(blogs.length).toBe(2)
  })
})

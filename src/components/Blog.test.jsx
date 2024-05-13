import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Testing Title',
  author: 'Test Author',
  likes: 3,
  user: {
    name: 'Test User',
  },
  url: 'https://reacttestinglibrary.com/',
}

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} onLikeBlog={() => undefined}/>
    ).container
  })

  test('renders title and author', async () => {
    await screen.findAllByText('Testing Title by Test Author')
  })

  test('at start blog details (url, number of likes, user) are not displayed', () => {
    const div = container.querySelector('.blogDetails')
    expect(div).toBeNull()
  })

  test('after clicking the \'view details\' button, details are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view details')
    await user.click(button)

    await container.querySelector('.blogDetails')
  })
})
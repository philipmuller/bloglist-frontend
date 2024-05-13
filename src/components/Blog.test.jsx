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
  let likesCounter

  beforeEach(() => {
    likesCounter = 0
    container = render(
      <Blog blog={blog} onLikeBlog={() => {likesCounter += 1}}/>
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

  test('If the like button is clicked twice, the event handler the component received as props is called twice.', async () => {
    const user = userEvent.setup()
    const detailsDutton = screen.getByText('view details')
    await user.click(detailsDutton)
    //details section is now expanded

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    //like button is clicked twice, which should increase the likesCounter by 2

    expect(likesCounter).toBe(2)
  })

})
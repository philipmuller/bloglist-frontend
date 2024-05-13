import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

describe('<CreateBlog />', () => {
  test('provides the right information when creating new blog', async () => {
    const createBlogCallback = vi.fn()
    const user = userEvent.setup()

    const container = render(<CreateBlog onCreate={createBlogCallback} />).container

    const newBlogButton = screen.getByText('New blog entry')

    //Click the new blog button to show the form
    await user.click(newBlogButton)

    const createButton = screen.getByText('Create')
    const titleInput = container.querySelector('.titleInput')
    const authorInput = container.querySelector('.authorInput')
    const urlInput = container.querySelector('.urlInput')

    //Fill the form
    await user.type(titleInput, 'Test Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'https://reacttestinglibrary.com/')

    //Click the create button to submit the form
    await user.click(createButton)

    expect(createBlogCallback.mock.calls).toHaveLength(1)
    expect(createBlogCallback.mock.calls[0][0]).toEqual({
      title: 'Test Title',
      author: 'Test Author',
      url: 'https://reacttestinglibrary.com/'
    })
  })

})
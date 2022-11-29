import { render, screen } from '@testing-library/react'
import Posts from '.'
import postCardMock from '../PostCard/mock'

const props = {
  posts: [
    {
      ...postCardMock
    },
    {
      ...postCardMock,
      id: postCardMock.id + 1
    },
    {
      ...postCardMock,
      id: postCardMock.id + 2
    }
  ]
}

describe('<Post />', () => {
  it('should render posts', () => {
    render(<Posts {...props} />)

    expect(screen.getAllByRole('heading', { name: /sunt/i })).toHaveLength(3)
    expect(screen.getAllByRole('img', { name: /sunt/i })).toHaveLength(3)
    expect(screen.getAllByText(/quia/i)).toHaveLength(3)
  })

  it('match the snapshot', () => {
    const { container } = render(<Posts {...props} />)
    expect(container).toMatchSnapshot()
  })
})

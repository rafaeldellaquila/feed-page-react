import { render, screen } from '@testing-library/react'
import PostCard from '.'
import postCardMock from './mock'

describe('<PostCard/>', () => {
  it('should render the PostCard', () => {
    render(<PostCard {...postCardMock} />)

    expect(screen.getByRole('img', { name: postCardMock.title })).toHaveAttribute('src', postCardMock.cover)

    expect(screen.getByRole('heading', { name: postCardMock.title })).toBeInTheDocument()

    expect(screen.getByText(postCardMock.body)).toBeInTheDocument()
  })
  it('should match snapshot', () => {
    const { container } = render(<PostCard {...postCardMock} />)
    expect(container).toMatchSnapshot()
  })
})

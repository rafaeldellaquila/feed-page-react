import { render, screen } from '@testing-library/react'
import PostCard from '.'
import { postCardProps } from './mock'

describe('<PostCard/>', () => {
  it('should render the PostCard', () => {
    render(<PostCard {...postCardProps} />)

    expect(
      screen.getByRole('img', { name: postCardProps.title })
    ).toHaveAttribute('src', postCardProps.cover)

    expect(
      screen.getByRole('heading', { name: postCardProps.title })
    ).toBeInTheDocument()

    expect(screen.getByText(postCardProps.body)).toBeInTheDocument()
  })
  it('should match snapshot', () => {
    const { container } = render(<PostCard {...postCardProps} />)
    expect(container).toMatchSnapshot()
  })
})

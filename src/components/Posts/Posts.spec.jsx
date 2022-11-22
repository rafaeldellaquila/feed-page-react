import { render, screen } from '@testing-library/react'
import Posts from '.'
import { postCardProps } from '../PostCard/mock'

const props = {
  posts: [
    {
      ...postCardProps,
    },
    {
      ...postCardProps,
      id: postCardProps.id + 1,
    },
    {
      ...postCardProps,
      id: postCardProps.id + 2,
    },
  ],
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

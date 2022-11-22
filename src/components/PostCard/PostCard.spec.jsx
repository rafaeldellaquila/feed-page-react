import { render } from '@testing-library/react'
import PostCard from '.'
import { postCardProps } from './mock'

describe('<PostCard/>', () => {
  it('should render the PostCard', () => {
    render(<PostCard {...postCardProps} />)
  })
})

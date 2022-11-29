import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '.'

describe('<Button/>', () => {
  const fn = jest.fn()
  it('should render the button with text', () => {
    render(<Button text="load more" onClick={fn} />)

    expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument()
  })

  it('should call a function on click', () => {
    render(<Button text="load more" onClick={fn} />)

    userEvent.click(screen.getByRole('button', { name: /load more/i }))

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when true', () => {
    render(<Button text="load more" disabled={true} onClick={fn} />)
    expect(screen.getByRole('button', { name: /load more/i })).toBeDisabled()
  })

  it('should be disabled when false', () => {
    render(<Button text="load more" disabled={false} onClick={fn} />)
    expect(screen.getByRole('button', { name: /load more/i })).toBeEnabled()
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '.'

describe('<Button/>', () => {
  it('should render the button with text', () => {
    render(<Button text="load more" />)

    expect(
      screen.getByRole('button', { name: /load more/i })
    ).toBeInTheDocument()
  })

  it('should call a function on click', () => {
    const fn = jest.fn()
    render(<Button text="load more" onClick={fn} />)

    userEvent.click(screen.getByRole('button', { name: /load more/i }))

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when true', () => {
    render(<Button text="load more" disabled={true} />)
    expect(screen.getByRole('button', { name: /load more/i })).toBeDisabled()
  })

  it('should be disabled when false', () => {
    render(<Button text="load more" disabled={false} />)
    expect(screen.getByRole('button', { name: /load more/i })).toBeEnabled()
  })
})

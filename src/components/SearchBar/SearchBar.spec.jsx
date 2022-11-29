import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '.'

describe('<Post />', () => {
  const fn = jest.fn()
  it('should have a value of searchValue', () => {
    render(<SearchBar onChange={jest.fn()} searchValue={'lorem ipsum'} />)
    expect(screen.getByPlaceholderText(/Pesquise aqui.../i).value).toBe('lorem ipsum')
  })

  it('should call handleChange fn on each key  pressed', () => {
    render(<SearchBar onChange={fn} />)
    const input = screen.getByPlaceholderText(/Pesquise aqui.../i)

    userEvent.type(input, 'value')
    expect(input.value).toBe('value')
    expect(fn).toHaveBeenCalledTimes('value'.length)
  })
})

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import Home from '.'
import userEvent from '@testing-library/user-event'

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'facere',
          body: 'quia et suscipit\nsuscipit recusandae consequuntur',
          url: 'https://via.placeholder.com/600/92c952'
        },
        {
          userId: 2,
          id: 2,
          title: 'aut',
          body: 'quia et suscipit\nsuscipit recusandae consequuntur',
          url: 'https://via.placeholder.com/600/92c952'
        },
        {
          userId: 3,
          id: 3,
          title: 'sunt',
          body: 'quia et suscipit\nsuscipit recusandae consequuntur',
          url: 'https://via.placeholder.com/600/92c952'
        }
      ])
    )
  })
]
const server = setupServer(...handlers)

describe('<Home/>', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should render search, posts and load more buttons', async () => {
    render(<Home />)
    await waitForElementToBeRemoved(screen.getByText('Não foi encontrado nenhuma postagem'))
    expect.assertions(3)

    expect(screen.getByPlaceholderText(/Pesquise aqui.../i)).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(2)
    expect(screen.getByRole('button', { name: /load/i })).toBeInTheDocument()
  })

  it('should search for  posts', async () => {
    render(<Home />)
    await waitForElementToBeRemoved(screen.getByText('Não foi encontrado nenhuma postagem'))

    const search = screen.getByPlaceholderText(/Pesquise aqui.../i)
    expect(search).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'facere' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'aut' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'sunt' })).not.toBeInTheDocument()

    userEvent.type(search, 'facere')
    expect(screen.getByRole('heading', { name: 'facere' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'aut' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'sunt' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Search Value: facere' })).toBeInTheDocument()

    userEvent.clear(search)
    expect(screen.getByRole('heading', { name: 'facere' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'aut' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'sunt' })).not.toBeInTheDocument()

    userEvent.type(search, 'bla bla')
    expect(screen.getByText('Não foi encontrado nenhuma postagem')).toBeInTheDocument()
  })

  it('should be load new posts when button has clicked', async () => {
    render(<Home />)
    await waitForElementToBeRemoved(screen.getByText('Não foi encontrado nenhuma postagem'))

    const button = screen.getByRole('button', { name: /load/i })

    expect(button).toBeInTheDocument()

    userEvent.click(button)
    expect(screen.getByRole('heading', { name: 'sunt' })).toBeInTheDocument()
    expect(button).toBeDisabled()
  })
})

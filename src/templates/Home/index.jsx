import { useCallback, useEffect, useState } from 'react'

import './styles.css'

import Posts from '../../components/Posts'
import loadPosts from '../../utils/loadPosts'
import Button from '../../components/Button'
import SearchBar from '../../components/SearchBar'

export const Home = () => {
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(0)
  const [postsPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState('')

  const noMorePosts = page + postsPerPage >= allPosts.length

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase())
      })
    : posts

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts()
    setPosts(postsAndPhotos.slice(page, postsPerPage))
    setAllPosts(postsAndPhotos)
  }, [])

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)
    setPosts(posts)
    setPage(nextPage)
  }

  const handleSearchBar = (e) => {
    const { value } = e.target
    setSearchValue(value)
  }

  useEffect(() => {
    handleLoadPosts(0, postsPerPage)
  }, [handleLoadPosts, postsPerPage])

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <>
            <h1>Search Value: {searchValue}</h1>
          </>
        )}
        <SearchBar
          onChange={handleSearchBar}
          searchValue={searchValue}
          type="search"
        />
      </div>
      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
      {filteredPosts.length === 0 && <p>Não foi encontrado nenhuma postagem</p>}
      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load more"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  )
}

export default Home

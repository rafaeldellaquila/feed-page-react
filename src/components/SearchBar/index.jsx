import P from 'prop-types'
import './styles.css'
const SearchBar = ({ searchValue, onChange }) => {
  return (
    <input
      className="search-bar"
      onChange={onChange}
      value={searchValue}
      type="search"
      placeholder="Pesquise aqui..."
    />
  )
}

SearchBar.propTypes = {
  searchValue: P.string.isRequired,
  onChange: P.func.isRequired
}

export default SearchBar

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

export default SearchBar

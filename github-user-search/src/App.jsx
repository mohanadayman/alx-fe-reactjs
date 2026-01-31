import Search from './components/Search'

function App() {
  const handleSearch = (userData) => {
    console.log('User data:', userData)
  }

  return (
    <div className="app">
      <Search onSearch={handleSearch} />
    </div>
  )
}

export default App

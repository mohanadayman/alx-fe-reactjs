import { useState } from 'react'

function Search({ onSearch }) {
    const [username, setUsername] = useState('')

    const handleChange = (e) => setUsername(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()
        const trimmed = username.trim()
        if (!trimmed) return
        if (typeof onSearch === 'function') onSearch(trimmed)
        setUsername('')
    }

    return (
        <form onSubmit={handleSubmit} aria-label="github-user-search-form">
            <input
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={handleChange}
                aria-label="github-username"
            />
            <button type="submit">Search</button>
        </form>
    )
}

export default Search

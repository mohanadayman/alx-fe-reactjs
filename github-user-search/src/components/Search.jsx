import { useState } from 'react'
import { fetchUserData } from '../services/githubService'

function Search({ onSearch }) {
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [userData, setUserData] = useState(null)

    const handleChange = (e) => setUsername(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const trimmed = username.trim()
        if (!trimmed) return

        setLoading(true)
        setError(false)
        setUserData(null)

        try {
            const data = await fetchUserData(trimmed)
            setUserData(data)
            if (typeof onSearch === 'function') onSearch(data)
            setUsername('')
        } catch (err) {
            setError(true)
            setUserData(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
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

            {loading && <p>Loading...</p>}

            {error && <p>Looks like we cant find the user</p>}

            {userData && !loading && !error && (
                <div className="user-profile">
                    <img
                        src={userData.avatar_url}
                        alt={userData.name || userData.login}
                        className="avatar"
                    />
                    <h2>{userData.name || userData.login}</h2>
                    <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
                        View GitHub Profile
                    </a>
                </div>
            )}
        </div>
    )
}

export default Search

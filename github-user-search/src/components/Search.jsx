import { useState } from 'react'
import { searchUsers as fetchUserData } from '../services/githubService'

function Search({ onSearch }) {
    const [username, setUsername] = useState('')
    const [location, setLocation] = useState('')
    const [minRepos, setMinRepos] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!username.trim()) return

        setLoading(true)
        setError(false)
        setUsers([])
        setCurrentPage(1)

        try {
            const criteria = {
                username: username.trim(),
                location: location.trim(),
                minRepos: minRepos ? parseInt(minRepos) : null,
            }
            const data = await fetchUserData(criteria, 1)
            setUsers(data.items || [])
            setTotalCount(data.total_count || 0)
            if (typeof onSearch === 'function') onSearch(data)
        } catch (err) {
            setError(true)
            setUsers([])
        } finally {
            setLoading(false)
        }
    }

    const handleLoadMore = async () => {
        const nextPage = currentPage + 1
        setLoading(true)

        try {
            const criteria = {
                username: username.trim(),
                location: location.trim(),
                minRepos: minRepos ? parseInt(minRepos) : null,
            }
            const data = await fetchUserData(criteria, nextPage)
            setUsers([...users, ...(data.items || [])])
            setCurrentPage(nextPage)
        } catch (err) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-white text-center mb-2">GitHub User Search</h1>
                <p className="text-gray-400 text-center mb-8">Find GitHub users with advanced search filters</p>

                <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                aria-label="github-username"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Location (optional)
                            </label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="e.g., San Francisco"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                aria-label="user-location"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Min Repositories (optional)
                            </label>
                            <input
                                type="number"
                                value={minRepos}
                                onChange={(e) => setMinRepos(e.target.value)}
                                placeholder="e.g., 5"
                                min="0"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                aria-label="min-repositories"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                    >
                        Search
                    </button>
                </form>

                {loading && (
                    <div className="text-center py-8">
                        <p className="text-gray-400 text-lg">Loading...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-8">
                        <p className="text-red-200">Looks like we cant find the user</p>
                    </div>
                )}

                {users.length > 0 && !loading && (
                    <div>
                        <p className="text-gray-300 text-sm mb-4">
                            Found {totalCount} user{totalCount !== 1 ? 's' : ''}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {users.map((user) => (
                                <div key={user.id} className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 hover:border-blue-500 transition">
                                    <div className="flex items-start gap-4 mb-4">
                                        <img
                                            src={user.avatar_url}
                                            alt={user.login}
                                            className="w-20 h-20 rounded-full"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-white">{user.login}</h3>
                                            <p className="text-gray-400 text-sm">{user.name || 'No name provided'}</p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-700 rounded p-3 mb-4">
                                        {user.location && (
                                            <p className="text-gray-300 text-sm mb-2">
                                                <span className="text-gray-400">📍 Location:</span> {user.location}
                                            </p>
                                        )}
                                        <p className="text-gray-300 text-sm">
                                            <span className="text-gray-400">📦 Repositories:</span> {user.public_repos}
                                        </p>
                                        {user.bio && (
                                            <p className="text-gray-300 text-sm mt-2 italic">"{user.bio}"</p>
                                        )}
                                    </div>

                                    <a
                                        href={user.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                                    >
                                        View Profile
                                    </a>
                                </div>
                            ))}
                        </div>

                        {users.length < totalCount && (
                            <div className="text-center">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loading}
                                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 disabled:opacity-50"
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {!loading && users.length === 0 && !error && username && (
                    <div className="text-center py-8">
                        <p className="text-gray-400">No users found matching your criteria</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Search

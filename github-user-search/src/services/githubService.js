import axios from 'axios'

const GITHUB_API_BASE = 'https://api.github.com'

export const fetchUserData = async (username) => {
    try {
        const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const searchUsers = async (criteria, page = 1) => {
    try {
        const { username, location, minRepos } = criteria
        const queries = []

        if (username) queries.push(username)
        if (location) queries.push(`location:${location}`)
        if (minRepos) queries.push(`repos:>=${minRepos}`)

        const q = queries.join(' ')
        const params = {
            q,
            page,
            per_page: 10,
            sort: 'repositories',
            order: 'desc',
        }

        const response = await axios.get('https://api.github.com/search/users?q=' + q, { params })
        return response.data
    } catch (error) {
        throw error
    }
}

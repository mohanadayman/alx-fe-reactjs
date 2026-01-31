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

export const getApplications = (token) => {
  return request('/applications', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
const API_BASE_URL = 'http://localhost:5000/api'

// A single helper that every API call goes through — keeps error handling consistent
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }

  const response = await fetch(url, config)
  const data = await response.json()

  if (!response.ok) {
    // Throw so the calling code's try/catch can handle it
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

export const registerUser = (userData) => {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  })
}

export const loginUser = (credentials) => {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export const getMe = (token) => {
  return request('/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
export const createApplication = (applicationData, token) => {
  return request('/applications', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(applicationData),
  })
}

export const updateApplication = (id, applicationData, token) => {
  return request(`/applications/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(applicationData),
  })
}

export const deleteApplication = (id, token) => {
  return request(`/applications/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
}
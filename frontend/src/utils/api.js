/**
 * Centralized API Utility for Blueview
 * Handles all API requests with JWT authentication
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://blueview2-production.up.railway.app';

// Token management
export const getToken = () => localStorage.getItem('blueview_token');
export const setToken = (token) => localStorage.setItem('blueview_token', token);
export const removeToken = () => localStorage.removeItem('blueview_token');

// User data management
export const getStoredUser = () => {
  const user = localStorage.getItem('blueview_user');
  return user ? JSON.parse(user) : null;
};
export const setStoredUser = (user) => localStorage.setItem('blueview_user', JSON.stringify(user));
export const removeStoredUser = () => localStorage.removeItem('blueview_user');

// Clear all auth data
export const clearAuth = () => {
  removeToken();
  removeStoredUser();
};

/**
 * Main fetch wrapper with automatic JWT attachment
 */
const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Attach JWT token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle 401 unauthorized - token expired or invalid
  if (response.status === 401) {
    clearAuth();
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }

  // Handle other errors
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Request failed with status ${response.status}`);
  }

  // Return JSON response
  return response.json();
};

/**
 * Authentication APIs
 */
export const authAPI = {
  // Login with email and password
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Invalid credentials');
    }

    const data = await response.json();
    
    // Store token
    if (data.access_token) {
      setToken(data.access_token);
    }
    
    return data;
  },

  // Get current user profile
  getMe: async () => {
    return apiFetch('/api/auth/me');
  },

  // Logout
  logout: () => {
    clearAuth();
  },
};

/**
 * Projects APIs
 */
export const projectsAPI = {
  // Get all projects
  getAll: async () => {
    return apiFetch('/api/projects');
  },

  // Get single project
  getById: async (projectId) => {
    return apiFetch(`/api/projects/${projectId}`);
  },

  // Create new project
  create: async (projectData) => {
    return apiFetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  },

  // Update project
  update: async (projectId, projectData) => {
    return apiFetch(`/api/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  },

  // Delete project
  delete: async (projectId) => {
    return apiFetch(`/api/projects/${projectId}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Workers APIs
 */
export const workersAPI = {
  // Get all workers
  getAll: async () => {
    return apiFetch('/api/workers');
  },

  // Get single worker
  getById: async (workerId) => {
    return apiFetch(`/api/workers/${workerId}`);
  },

  // Create new worker
  create: async (workerData) => {
    return apiFetch('/api/workers', {
      method: 'POST',
      body: JSON.stringify(workerData),
    });
  },

  // Update worker
  update: async (workerId, workerData) => {
    return apiFetch(`/api/workers/${workerId}`, {
      method: 'PUT',
      body: JSON.stringify(workerData),
    });
  },

  // Delete worker
  delete: async (workerId) => {
    return apiFetch(`/api/workers/${workerId}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Check-ins APIs
 */
export const checkinsAPI = {
  // Get all checkins
  getAll: async () => {
    return apiFetch('/api/checkins');
  },

  // Get today's checkins for a project
  getTodayByProject: async (projectId) => {
    return apiFetch(`/api/checkins/project/${projectId}/today`);
  },

  // Get active checkins for a project
  getActiveByProject: async (projectId) => {
    return apiFetch(`/api/checkins/project/${projectId}/active`);
  },

  // Get checkin stats for a project
  getStats: async (projectId) => {
    return apiFetch(`/api/checkins/stats/${projectId}`);
  },

  // Create checkin
  create: async (checkinData) => {
    return apiFetch('/api/checkins', {
      method: 'POST',
      body: JSON.stringify(checkinData),
    });
  },

  // Checkout
  checkout: async (checkinId) => {
    return apiFetch(`/api/checkins/${checkinId}/checkout`, {
      method: 'POST',
    });
  },
};

/**
 * Daily Logs APIs
 */
export const dailyLogsAPI = {
  // Get all daily logs
  getAll: async () => {
    return apiFetch('/api/daily-logs');
  },

  // Get daily logs by project
  getByProject: async (projectId) => {
    return apiFetch(`/api/daily-logs/project/${projectId}`);
  },

  // Get single daily log
  getById: async (logId) => {
    return apiFetch(`/api/daily-logs/${logId}`);
  },

  // Get daily log by project and date
  getByProjectAndDate: async (projectId, date) => {
    return apiFetch(`/api/daily-logs/project/${projectId}/date/${date}`);
  },

  // Create daily log
  create: async (logData) => {
    return apiFetch('/api/daily-logs', {
      method: 'POST',
      body: JSON.stringify(logData),
    });
  },

  // Update daily log
  update: async (logId, logData) => {
    return apiFetch(`/api/daily-logs/${logId}`, {
      method: 'PUT',
      body: JSON.stringify(logData),
    });
  },

  // Submit daily log
  submit: async (logId) => {
    return apiFetch(`/api/daily-logs/${logId}/submit`, {
      method: 'POST',
    });
  },

  // Generate PDF for daily log
  getPdf: async (logId) => {
    const token = getToken();
    const response = await fetch(`${API_BASE_URL}/api/daily-logs/${logId}/pdf`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate PDF');
    }
    
    return response.blob();
  },
};

/**
 * Reports APIs
 */
export const reportsAPI = {
  // Get report for a project
  getByProject: async (projectId) => {
    return apiFetch(`/api/projects/${projectId}/send-report`);
  },
};

/**
 * Weather APIs
 */
export const weatherAPI = {
  // Get weather
  get: async () => {
    return apiFetch('/api/weather');
  },

  // Get weather by location
  getByLocation: async (lat, lon) => {
    return apiFetch(`/api/weather/by-location?lat=${lat}&lon=${lon}`);
  },
};

export default apiFetch;

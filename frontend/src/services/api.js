const API_BASE_URL = 'https://blueview2-production.up.railway.app/api';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  getToken() {
    return localStorage.getItem('blueview_token');
  }

  setToken(token) {
    localStorage.setItem('blueview_token', token);
  }

  clearToken() {
    localStorage.removeItem('blueview_token');
    localStorage.removeItem('blueview_user');
  }

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      this.clearToken();
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'API Error');
    }

    return data;
  }

  // Auth
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.token);
    localStorage.setItem('blueview_user', JSON.stringify(data.user));
    return data;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Projects
  async getProjects() {
    return this.request('/projects');
  }

  async createProject(project) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async deleteProject(projectId) {
    return this.request(`/projects/${projectId}`, {
      method: 'DELETE',
    });
  }

  async getProject(projectId) {
    return this.request(`/projects/${projectId}`);
  }

  // Workers
  async getWorkers() {
    return this.request('/workers');
  }

  async createWorker(worker) {
    return this.request('/workers', {
      method: 'POST',
      body: JSON.stringify(worker),
    });
  }

  async deleteWorker(workerId) {
    return this.request(`/workers/${workerId}`, {
      method: 'DELETE',
    });
  }

  // Check-ins
  async getCheckinsForProject(projectId, date) {
    return this.request(`/checkins/${projectId}/${date}`);
  }

  async getTodayCheckinsForProject(projectId) {
    return this.request(`/checkins/project/${projectId}/today`);
  }

  async getActiveCheckinsForProject(projectId) {
    return this.request(`/checkins/project/${projectId}/active`);
  }

  async createCheckin(checkin) {
    return this.request('/checkins', {
      method: 'POST',
      body: JSON.stringify(checkin),
    });
  }

  async checkout(checkinId) {
    return this.request(`/checkins/${checkinId}/checkout`, {
      method: 'POST',
    });
  }

  // Daily Logs
  async getDailyLogsForProject(projectId) {
    return this.request(`/daily-logs/project/${projectId}`);
  }

  async getDailyLogByDate(projectId, date) {
    return this.request(`/daily-logs/project/${projectId}/date/${date}`);
  }

  async createDailyLog(dailyLog) {
    return this.request('/daily-logs', {
      method: 'POST',
      body: JSON.stringify(dailyLog),
    });
  }

  async updateDailyLog(logId, updates) {
    return this.request(`/daily-logs/${logId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async submitDailyLog(logId) {
    return this.request(`/daily-logs/${logId}/submit`, {
      method: 'POST',
    });
  }

  async getDailyLogPdf(logId) {
    return this.request(`/daily-logs/${logId}/pdf`);
  }

  // Weather
  async getWeatherByLocation(location) {
    return this.request(`/weather/by-location?location=${encodeURIComponent(location)}`);
  }

  // Demo/Setup
  async getSampleReport() {
    return this.request('/demo/sample-report');
  }

  async createSampleData() {
    return this.request('/demo/create-sample-data', {
      method: 'POST',
    });
  }

  async getSetupStatus() {
    return this.request('/setup/status');
  }

  // Admin
  async getUsers() {
    return this.request('/admin/users');
  }

  async getSubcontractors() {
    return this.request('/admin/subcontractors');
  }

  // NFC Tags
  async getNfcTags() {
    return this.request('/nfc-tags');
  }

  // Health
  async healthCheck() {
    return this.request('/health');
  }
}

export const api = new ApiService();
export default api;

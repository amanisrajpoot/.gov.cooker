import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth token and redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Auth
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
    sendOTP: '/auth/otp/send',
    verifyOTP: '/auth/otp/verify',
    refresh: '/auth/refresh',
  },
  
  // Campaigns
  campaigns: {
    list: '/campaigns',
    create: '/campaigns',
    get: (id: string) => `/campaigns/${id}`,
    sign: (id: string) => `/campaigns/${id}/sign`,
    transparency: (id: string) => `/campaigns/${id}/transparency`,
  },
  
  // Issues
  issues: {
    list: '/issues',
    create: '/issues',
    get: (id: string) => `/issues/${id}`,
    reports: (id: string) => `/issues/${id}/reports`,
    timeline: (id: string) => `/issues/${id}/timeline`,
  },
  
  // Reports
  reports: {
    create: '/reports',
    upload: '/reports/upload',
    get: (id: string) => `/reports/${id}`,
  },
  
  // RTI
  rti: {
    draft: '/rti/draft',
    cases: '/rti/cases',
    create: '/rti/cases',
    reply: (id: string) => `/rti/cases/${id}/reply`,
  },
  
  // Whistleblower
  whistle: {
    cases: '/whistle/cases',
    create: '/whistle/cases',
    evidence: (id: string) => `/whistle/cases/${id}/evidence`,
    grant: (id: string) => `/whistle/cases/${id}/grant`,
  },
  
  // Open Data
  data: {
    tenders: '/tenders',
    assets: '/assets',
    budgets: '/budgets',
  },
  
  // Moderation
  moderation: {
    queue: '/mod/queue',
    decide: (id: string) => `/mod/${id}/decide`,
  },
} as const;

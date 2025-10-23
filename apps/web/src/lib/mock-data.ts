// Mock data for development when API is not available
export const mockCampaigns = [
  {
    id: '1',
    title: 'Fix Mumbai Roads',
    description: 'Campaign to fix potholes and improve road infrastructure in Mumbai',
    status: 'active',
    signature_count: 1250,
    verified_signature_count: 1100,
    anonymous_signature_count: 150,
    targets: [
      { name: 'Mumbai Municipal Corporation', role: 'Mayor' },
      { name: 'Public Works Department', role: 'Commissioner' }
    ],
    created_at: '2024-01-15T10:00:00Z',
    expires_at: '2024-03-15T10:00:00Z',
    location: 'Mumbai, Maharashtra',
    category: 'infrastructure',
    urgency: 'high',
    progress: 75
  },
  {
    id: '2',
    title: 'Clean Ganga River',
    description: 'Demand immediate action to clean and restore the Ganga river ecosystem',
    status: 'active',
    signature_count: 2500,
    verified_signature_count: 2200,
    anonymous_signature_count: 300,
    targets: [
      { name: 'Ministry of Jal Shakti', role: 'Minister' },
      { name: 'National Mission for Clean Ganga', role: 'Director' }
    ],
    created_at: '2024-01-10T08:00:00Z',
    expires_at: '2024-04-10T08:00:00Z',
    location: 'Uttar Pradesh, India',
    category: 'environment',
    urgency: 'critical',
    progress: 60
  },
  {
    id: '3',
    title: 'Digital Education for All',
    description: 'Ensure every child has access to digital education during and post-pandemic',
    status: 'active',
    signature_count: 1800,
    verified_signature_count: 1600,
    anonymous_signature_count: 200,
    targets: [
      { name: 'Ministry of Education', role: 'Minister' },
      { name: 'State Education Department', role: 'Secretary' }
    ],
    created_at: '2024-01-20T12:00:00Z',
    expires_at: '2024-05-20T12:00:00Z',
    location: 'Pan India',
    category: 'education',
    urgency: 'high',
    progress: 45
  }
];

export const mockIssues = [
  {
    id: '1',
    title: 'Corruption in Land Records',
    description: 'Systematic corruption in land record maintenance affecting thousands of farmers',
    status: 'investigating',
    severity: 'high',
    location: 'Rajasthan',
    created_at: '2024-01-15T10:00:00Z',
    reports_count: 45,
    verified_reports: 38
  },
  {
    id: '2',
    title: 'Delayed Pension Payments',
    description: 'Senior citizens not receiving pension payments on time',
    status: 'active',
    severity: 'critical',
    location: 'Kerala',
    created_at: '2024-01-12T08:00:00Z',
    reports_count: 120,
    verified_reports: 95
  }
];

export const mockStats = {
  totalUsers: 15420,
  totalCampaigns: 89,
  totalIssues: 234,
  totalSignatures: 45678,
  activeCampaigns: 45,
  resolvedIssues: 123,
  pendingReports: 67
};

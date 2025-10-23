import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Campaigns } from '../../components/Campaigns';
import { api } from '../../lib/api';

// Mock the API
jest.mock('../../lib/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

const mockApi = api as jest.Mocked<typeof api>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('Campaigns Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    mockApi.get.mockImplementation(() => 
      new Promise(() => {}) // Never resolves to keep loading state
    );

    render(<Campaigns />, { wrapper: createWrapper() });

    expect(screen.getByText('Active Campaigns')).toBeInTheDocument();
    expect(screen.getByText('Loading campaign...')).toBeInTheDocument();
  });

  it('renders campaigns list', async () => {
    const mockCampaigns = {
      campaigns: [
        {
          id: '1',
          title: 'Fix Mumbai Roads',
          description: 'Campaign to fix potholes in Mumbai',
          status: 'active',
          signature_count: 15000,
          verified_signature_count: 12000,
          anonymous_signature_count: 3000,
          targets: [{ name: 'BMC Commissioner', position: 'Commissioner' }],
          created_at: '2024-01-01T00:00:00Z',
          owner: { handle: 'citizen123' },
        },
        {
          id: '2',
          title: 'Clean Water for Delhi',
          description: 'Campaign for clean water supply',
          status: 'active',
          signature_count: 8500,
          verified_signature_count: 7000,
          anonymous_signature_count: 1500,
          targets: [{ name: 'Delhi Jal Board', position: 'Chairman' }],
          created_at: '2024-01-02T00:00:00Z',
          owner: { handle: 'delhiresident' },
        },
      ],
      total: 2,
      page: 1,
      limit: 12,
    };

    mockApi.get.mockResolvedValue({ data: mockCampaigns });

    render(<Campaigns />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Fix Mumbai Roads')).toBeInTheDocument();
      expect(screen.getByText('Clean Water for Delhi')).toBeInTheDocument();
    });

    expect(screen.getByText('15.0K signatures')).toBeInTheDocument();
    expect(screen.getByText('8.5K signatures')).toBeInTheDocument();
  });

  it('renders empty state when no campaigns', async () => {
    const mockEmptyResponse = {
      campaigns: [],
      total: 0,
      page: 1,
      limit: 12,
    };

    mockApi.get.mockResolvedValue({ data: mockEmptyResponse });

    render(<Campaigns />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('No campaigns found')).toBeInTheDocument();
    });

    expect(screen.getByText('Try adjusting your search or filters')).toBeInTheDocument();
    expect(screen.getByText('Create First Campaign')).toBeInTheDocument();
  });

  it('handles search functionality', async () => {
    const mockCampaigns = {
      campaigns: [
        {
          id: '1',
          title: 'Fix Mumbai Roads',
          description: 'Campaign to fix potholes in Mumbai',
          status: 'active',
          signature_count: 15000,
          verified_signature_count: 12000,
          anonymous_signature_count: 3000,
          targets: [],
          created_at: '2024-01-01T00:00:00Z',
          owner: { handle: 'citizen123' },
        },
      ],
      total: 1,
      page: 1,
      limit: 12,
    };

    mockApi.get.mockResolvedValue({ data: mockCampaigns });

    render(<Campaigns />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Fix Mumbai Roads')).toBeInTheDocument();
    });

    // Test search form submission
    const searchInput = screen.getByPlaceholderText('Search campaigns...');
    const searchButton = screen.getByText('Search');

    // Simulate search
    searchInput.setAttribute('value', 'Mumbai');
    searchButton.click();

    await waitFor(() => {
      expect(mockApi.get).toHaveBeenCalledWith('/campaigns', {
        params: expect.objectContaining({
          search: 'Mumbai',
        }),
      });
    });
  });

  it('handles filter changes', async () => {
    const mockCampaigns = {
      campaigns: [],
      total: 0,
      page: 1,
      limit: 12,
    };

    mockApi.get.mockResolvedValue({ data: mockCampaigns });

    render(<Campaigns />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('No campaigns found')).toBeInTheDocument();
    });

    // Test status filter
    const statusFilter = screen.getByDisplayValue('All Status');
    statusFilter.setAttribute('value', 'active');
    statusFilter.dispatchEvent(new Event('change'));

    await waitFor(() => {
      expect(mockApi.get).toHaveBeenCalledWith('/campaigns', {
        params: expect.objectContaining({
          status: 'active',
        }),
      });
    });
  });

  it('displays campaign status badges correctly', async () => {
    const mockCampaigns = {
      campaigns: [
        {
          id: '1',
          title: 'Active Campaign',
          description: 'This is active',
          status: 'active',
          signature_count: 1000,
          verified_signature_count: 800,
          anonymous_signature_count: 200,
          targets: [],
          created_at: '2024-01-01T00:00:00Z',
          owner: { handle: 'user1' },
        },
        {
          id: '2',
          title: 'Paused Campaign',
          description: 'This is paused',
          status: 'paused',
          signature_count: 500,
          verified_signature_count: 400,
          anonymous_signature_count: 100,
          targets: [],
          created_at: '2024-01-01T00:00:00Z',
          owner: { handle: 'user2' },
        },
      ],
      total: 2,
      page: 1,
      limit: 12,
    };

    mockApi.get.mockResolvedValue({ data: mockCampaigns });

    render(<Campaigns />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Active Campaign')).toBeInTheDocument();
      expect(screen.getByText('Paused Campaign')).toBeInTheDocument();
    });

    expect(screen.getByText('active')).toBeInTheDocument();
    expect(screen.getByText('paused')).toBeInTheDocument();
  });

  it('formats numbers correctly', async () => {
    const mockCampaigns = {
      campaigns: [
        {
          id: '1',
          title: 'High Signature Campaign',
          description: 'Campaign with many signatures',
          status: 'active',
          signature_count: 1500000,
          verified_signature_count: 1200000,
          anonymous_signature_count: 300000,
          targets: [],
          created_at: '2024-01-01T00:00:00Z',
          owner: { handle: 'user1' },
        },
      ],
      total: 1,
      page: 1,
      limit: 12,
    };

    mockApi.get.mockResolvedValue({ data: mockCampaigns });

    render(<Campaigns />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('1.5M signatures')).toBeInTheDocument();
    });
  });

  it('handles error state', async () => {
    mockApi.get.mockRejectedValue(new Error('Network error'));

    render(<Campaigns />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Failed to load campaigns')).toBeInTheDocument();
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });
  });
});

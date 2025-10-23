import { NextRequest, NextResponse } from 'next/server';

const mockCampaigns = [
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';

  // Filter campaigns based on search and status
  let filteredCampaigns = mockCampaigns;
  
  if (search) {
    filteredCampaigns = filteredCampaigns.filter(campaign =>
      campaign.title.toLowerCase().includes(search.toLowerCase()) ||
      campaign.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  if (status) {
    filteredCampaigns = filteredCampaigns.filter(campaign => campaign.status === status);
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, endIndex);

  return NextResponse.json({
    campaigns: paginatedCampaigns,
    total: filteredCampaigns.length,
    page,
    limit,
    totalPages: Math.ceil(filteredCampaigns.length / limit)
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Create new campaign
    const newCampaign = {
      id: Date.now().toString(),
      ...body,
      signature_count: 0,
      verified_signature_count: 0,
      anonymous_signature_count: 0,
      created_at: new Date().toISOString(),
      status: 'active'
    };

    return NextResponse.json(newCampaign, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
import { NextRequest, NextResponse } from 'next/server';

const mockIssues = [
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const search = searchParams.get('search') || '';
  const severity = searchParams.get('severity') || '';

  // Filter issues based on search and severity
  let filteredIssues = mockIssues;
  
  if (search) {
    filteredIssues = filteredIssues.filter(issue =>
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  if (severity) {
    filteredIssues = filteredIssues.filter(issue => issue.severity === severity);
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedIssues = filteredIssues.slice(startIndex, endIndex);

  return NextResponse.json({
    issues: paginatedIssues,
    total: filteredIssues.length,
    page,
    limit,
    totalPages: Math.ceil(filteredIssues.length / limit)
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Create new issue report
    const newIssue = {
      id: Date.now().toString(),
      ...body,
      status: 'pending',
      created_at: new Date().toISOString(),
      reports_count: 0,
      verified_reports: 0
    };

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

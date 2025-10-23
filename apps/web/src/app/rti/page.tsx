import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Link from 'next/link';
import {
  PlusIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export default function RTIPage() {
  const mockRTIRequests = [
    {
      id: '1',
      title: 'Road Construction Budget Details',
      department: 'Public Works Department',
      status: 'pending',
      submitted_date: '2024-01-15',
      expected_response: '2024-02-15',
      description: 'Request for detailed breakdown of road construction budget for Mumbai roads'
    },
    {
      id: '2',
      title: 'Municipal Corporation Meeting Minutes',
      department: 'Mumbai Municipal Corporation',
      status: 'responded',
      submitted_date: '2024-01-10',
      expected_response: '2024-02-10',
      description: 'Request for minutes of last 6 months municipal corporation meetings'
    },
    {
      id: '3',
      title: 'Water Supply Infrastructure Details',
      department: 'Water Supply Department',
      status: 'rejected',
      submitted_date: '2024-01-05',
      expected_response: '2024-02-05',
      description: 'Request for details about water supply infrastructure and maintenance records'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'responded':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-4 w-4" />;
      case 'responded':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'rejected':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      default:
        return <DocumentTextIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="py-8">
          <div className="container-mobile">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">RTI Requests</h1>
                <p className="text-gray-600">Right to Information requests to government departments</p>
              </div>
              <Button asChild className="flex items-center">
                <Link href="/rti/create" className="flex items-center">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  New RTI Request
                </Link>
              </Button>
            </div>

            {/* RTI Requests List */}
            <div className="space-y-6">
              {mockRTIRequests.map((request) => (
                <Card key={request.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                        <Badge className={getStatusColor(request.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(request.status)}
                            {request.status}
                          </div>
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{request.description}</p>
                      <div className="text-sm text-gray-500">
                        <strong>Department:</strong> {request.department}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild className="flex items-center">
                        <Link href={`/rti/${request.id}`} className="flex items-center">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <strong>Submitted:</strong> {new Date(request.submitted_date).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Expected Response:</strong> {new Date(request.expected_response).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Status:</strong> {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* RTI Information */}
            <Card className="p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About RTI (Right to Information)</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  The Right to Information Act, 2005 empowers citizens to request information from government departments. 
                  This helps promote transparency and accountability in government functioning.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">What you can request:</h4>
                    <ul className="space-y-1">
                      <li>• Government documents and records</li>
                      <li>• Meeting minutes and decisions</li>
                      <li>• Budget and expenditure details</li>
                      <li>• Policy documents and guidelines</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Response time:</h4>
                    <ul className="space-y-1">
                      <li>• Normal requests: 30 days</li>
                      <li>• Life & liberty cases: 48 hours</li>
                      <li>• Third party information: 40 days</li>
                      <li>• Appeals: 30-45 days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

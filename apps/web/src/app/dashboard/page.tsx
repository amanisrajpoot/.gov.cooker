import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';
import {
  ChartBarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  PlusIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const stats = [
    { name: 'Active Campaigns', value: '3', icon: ChartBarIcon, color: 'text-blue-600' },
    { name: 'RTI Requests', value: '2', icon: DocumentTextIcon, color: 'text-green-600' },
    { name: 'Issues Reported', value: '1', icon: ExclamationTriangleIcon, color: 'text-red-600' },
    { name: 'Signatures', value: '2,050', icon: UserGroupIcon, color: 'text-purple-600' },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'campaign',
      title: 'Fix Mumbai Roads',
      description: 'Campaign created successfully',
      time: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'rti',
      title: 'Road Construction Budget',
      description: 'RTI request submitted',
      time: '1 day ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'issue',
      title: 'Water Supply Problem',
      description: 'Issue reported and verified',
      time: '3 days ago',
      status: 'investigating'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="py-8">
          <div className="container-mobile">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your campaigns and requests.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <Card key={stat.name} className="p-6">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/activity">View All</Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          {activity.type === 'campaign' && <ChartBarIcon className="h-4 w-4 text-blue-600" />}
                          {activity.type === 'rti' && <DocumentTextIcon className="h-4 w-4 text-green-600" />}
                          {activity.type === 'issue' && <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          activity.status === 'active' ? 'bg-green-100 text-green-800' :
                          activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
                <div className="space-y-4">
                  <Button className="w-full flex items-center justify-center" asChild>
                    <Link href="/campaigns/create">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Start a Campaign
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full flex items-center justify-center" asChild>
                    <Link href="/issues/report">
                      <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                      Report an Issue
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full flex items-center justify-center" asChild>
                    <Link href="/rti/create">
                      <DocumentTextIcon className="h-4 w-4 mr-2" />
                      Submit RTI Request
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full flex items-center justify-center" asChild>
                    <Link href="/campaigns">
                      <EyeIcon className="h-4 w-4 mr-2" />
                      View All Campaigns
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  DocumentArrowDownIcon,
  ChartBarIcon,
  CalendarIcon,
  TagIcon
} from '@heroicons/react/24/outline';

export default function OpenDataPage() {
  const datasets = [
    {
      id: '1',
      title: 'Government Spending Data',
      description: 'Comprehensive dataset of government expenditures across departments',
      category: 'Finance',
      lastUpdated: '2024-01-15',
      downloads: 1250,
      format: 'CSV',
      size: '2.3 MB'
    },
    {
      id: '2',
      title: 'RTI Response Database',
      description: 'Database of RTI responses and government transparency metrics',
      category: 'Transparency',
      lastUpdated: '2024-01-12',
      downloads: 890,
      format: 'JSON',
      size: '1.8 MB'
    },
    {
      id: '3',
      title: 'Campaign Success Metrics',
      description: 'Data on campaign outcomes and citizen engagement',
      category: 'Civic Engagement',
      lastUpdated: '2024-01-10',
      downloads: 567,
      format: 'Excel',
      size: '3.1 MB'
    },
    {
      id: '4',
      title: 'Corruption Reports Archive',
      description: 'Anonymized reports of corruption and maladministration',
      category: 'Accountability',
      lastUpdated: '2024-01-08',
      downloads: 2340,
      format: 'PDF',
      size: '5.2 MB'
    }
  ];

  const categories = ['All', 'Finance', 'Transparency', 'Civic Engagement', 'Accountability'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <div className="py-8">
          <div className="container-mobile">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Open Data</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Access public datasets, government spending information, and transparency data 
                to promote accountability and civic engagement.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === 'All' ? 'default' : 'outline'}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Datasets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {datasets.map((dataset) => (
                <Card key={dataset.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {dataset.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {dataset.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <TagIcon className="h-3 w-3 mr-1" />
                        {dataset.category}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span>Updated {dataset.lastUpdated}</span>
                    </div>
                    <div className="flex items-center">
                      <ChartBarIcon className="h-4 w-4 mr-2" />
                      <span>{dataset.downloads} downloads</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {dataset.format} • {dataset.size}
                    </div>
                    <Button size="sm" className="flex items-center">
                      <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Data Usage Guidelines */}
            <Card className="p-8 mt-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Usage Guidelines</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Allowed Uses</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Research and analysis</li>
                    <li>• Journalistic investigations</li>
                    <li>• Academic studies</li>
                    <li>• Civic engagement projects</li>
                    <li>• Transparency initiatives</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Attribution</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Credit .gov.cooker as source</li>
                    <li>• Link back to original data</li>
                    <li>• Maintain data integrity</li>
                    <li>• Respect privacy guidelines</li>
                    <li>• Follow open data principles</li>
                  </ul>
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

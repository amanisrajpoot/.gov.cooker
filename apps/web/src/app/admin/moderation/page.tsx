'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';

interface ModerationItem {
  id: string;
  type: 'campaign' | 'issue' | 'report' | 'comment';
  title: string;
  description: string;
  author: string;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  created_at: string;
  flags: string[];
}

export default function ModerationPage() {
  const [items, setItems] = useState<ModerationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState<ModerationItem | null>(null);
  
  const { user } = useAuth();

  useEffect(() => {
    fetchModerationItems();
  }, []);

  const fetchModerationItems = async () => {
    try {
      const response = await fetch('/api/admin/moderation', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch moderation items');
      }

      const data = await response.json();
      setItems(data.items);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModerationAction = async (itemId: string, action: 'approve' | 'reject' | 'flag', reason?: string) => {
    try {
      const response = await fetch(`/api/admin/moderation/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({ action, reason }),
      });

      if (!response.ok) {
        throw new Error('Failed to perform moderation action');
      }

      // Update local state
      setItems(prev => prev.map(item => 
        item.id === itemId 
          ? { ...item, status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'flagged' }
          : item
      ));

      setSelectedItem(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
          <p className="mt-2 text-gray-600">You must be an admin to access this page.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading moderation queue...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Moderation</h1>
          <p className="mt-2 text-gray-600">Review and moderate platform content</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Moderation Queue */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Review</h2>
              
              {items.length > 0 ? (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={item.type === 'campaign' ? 'bg-green-100 text-green-800' : item.type === 'issue' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}>
                              {item.type}
                            </Badge>
                            <Badge className={item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                              {item.status}
                            </Badge>
                          </div>
                          <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          <p className="text-xs text-gray-500 mt-2">By {item.author} • {item.created_at}</p>
                          
                          {item.flags.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-red-600 font-medium">Flags:</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {item.flags.map((flag, index) => (
                                  <Badge key={index} className="bg-red-100 text-red-800 text-xs">
                                    {flag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-2 ml-4">
                          <Button
                            size="sm"
                            onClick={() => setSelectedItem(item)}
                            variant="outline"
                          >
                            Review
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No items pending review</p>
                </div>
              )}
            </Card>
          </div>

          {/* Moderation Actions */}
          <div>
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Moderation Guidelines</h2>
              
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Approve if:</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Content is factual and evidence-based</li>
                    <li>• Language is respectful and constructive</li>
                    <li>• No personal attacks or harassment</li>
                    <li>• Aligns with platform guidelines</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Reject if:</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Contains false or misleading information</li>
                    <li>• Uses inflammatory or offensive language</li>
                    <li>• Violates privacy or safety guidelines</li>
                    <li>• Spam or irrelevant content</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Moderation Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Review Content</h2>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedItem(null)}
                  >
                    Close
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Title:</h3>
                    <p className="text-gray-600">{selectedItem.title}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Description:</h3>
                    <p className="text-gray-600">{selectedItem.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Author:</h3>
                    <p className="text-gray-600">{selectedItem.author}</p>
                  </div>
                  
                  {selectedItem.flags.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900">Flags:</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedItem.flags.map((flag, index) => (
                          <Badge key={index} className="bg-red-100 text-red-800">
                            {flag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => handleModerationAction(selectedItem.id, 'reject', 'Violates guidelines')}
                    className="text-red-600 hover:text-red-700"
                  >
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleModerationAction(selectedItem.id, 'flag', 'Needs further review')}
                    className="text-yellow-600 hover:text-yellow-700"
                  >
                    Flag
                  </Button>
                  <Button
                    onClick={() => handleModerationAction(selectedItem.id, 'approve')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Approve
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

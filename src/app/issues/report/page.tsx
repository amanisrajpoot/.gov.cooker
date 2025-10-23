'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

export default function ReportIssuePage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: {
      address: '',
      coordinates: { lat: '', lng: '' },
    },
    department: '',
    evidence: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('department', formData.department);
      formDataToSend.append('location', JSON.stringify(formData.location));
      
      if (formData.evidence) {
        formDataToSend.append('evidence', formData.evidence);
      }

      const response = await fetch('/api/issues', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit issue report');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/issues');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit issue report');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('location.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [field]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        evidence: file,
      }));
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              coordinates: {
                lat: position.coords.latitude.toString(),
                lng: position.coords.longitude.toString(),
              },
            },
            address: 'Current location detected',
          }),
          );
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to get your location. Please enter it manually.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Issue Reported!</h1>
          <p className="text-gray-600 mb-4">
            Your issue has been submitted successfully. We'll track its progress and keep you updated.
          </p>
          <Button onClick={() => router.push('/issues')}>
            View All Issues
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Report an Issue</h1>
          <p className="mt-2 text-gray-600">
            Help us track problems in your area
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Issue Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Brief description of the issue"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Detailed Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Provide more details about the issue, when you noticed it, and its impact"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Location
              </label>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="block text-xs font-medium text-gray-600 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="location.address"
                    value={formData.location.address}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Street address, landmark, or area"
                  />
                </div>

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label htmlFor="lat" className="block text-xs font-medium text-gray-600 mb-1">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      id="lat"
                      name="location.coordinates.lat"
                      value={formData.location.coordinates.lat}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g., 12.9716"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="lng" className="block text-xs font-medium text-gray-600 mb-1">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      id="lng"
                      name="location.coordinates.lng"
                      value={formData.location.coordinates.lng}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="e.g., 77.5946"
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={getCurrentLocation}
                  className="w-full"
                >
                  📍 Use Current Location
                </Button>
              </div>
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Responsible Department
              </label>
              <select
                id="department"
                name="department"
                required
                value={formData.department}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select department</option>
                <option value="Municipal Corporation">Municipal Corporation</option>
                <option value="Public Works Department">Public Works Department</option>
                <option value="Electricity Board">Electricity Board</option>
                <option value="Water Board">Water Board</option>
                <option value="Traffic Police">Traffic Police</option>
                <option value="Health Department">Health Department</option>
                <option value="Education Department">Education Department</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="evidence" className="block text-sm font-medium text-gray-700">
                Evidence (Optional)
              </label>
              <input
                type="file"
                id="evidence"
                name="evidence"
                accept="image/*,video/*,.pdf"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="mt-1 text-xs text-gray-500">
                Upload photos, videos, or documents that support your report
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h3 className="text-sm font-medium text-yellow-900 mb-2">Reporting Guidelines</h3>
              <ul className="text-xs text-yellow-800 space-y-1">
                <li>• Be accurate and factual in your description</li>
                <li>• Include specific details about the location and time</li>
                <li>• Provide evidence when possible (photos, videos)</li>
                <li>• Avoid personal attacks or inflammatory language</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 'Submitting...' : 'Submit Report'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

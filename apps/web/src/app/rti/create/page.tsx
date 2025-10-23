'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

const departments = [
  { value: 'municipal', label: 'Municipal Corporation', template: 'municipal' },
  { value: 'police', label: 'Police Department', template: 'police' },
  { value: 'education', label: 'Education Department', template: 'education' },
  { value: 'health', label: 'Health Department', template: 'health' },
  { value: 'transport', label: 'Transport Department', template: 'transport' },
  { value: 'finance', label: 'Finance Department', template: 'finance' },
  { value: 'other', label: 'Other', template: 'generic' },
];

const templates = {
  municipal: {
    title: 'Municipal Corporation Information Request',
    questions: [
      'What is the total budget allocated for road maintenance in the current financial year?',
      'How many pothole complaints have been received in the last 6 months?',
      'What is the status of pending road repair works?',
      'Who are the contractors awarded road construction contracts in the last 2 years?',
    ],
  },
  police: {
    title: 'Police Department Information Request',
    questions: [
      'What is the total number of FIRs registered in the last 3 months?',
      'How many cases are pending investigation?',
      'What is the status of corruption complaints against police officers?',
      'What are the details of traffic violation fines collected?',
    ],
  },
  education: {
    title: 'Education Department Information Request',
    questions: [
      'What is the total budget allocated for school infrastructure development?',
      'How many schools lack basic facilities like toilets and drinking water?',
      'What is the status of teacher recruitment in government schools?',
      'What are the details of mid-day meal program implementation?',
    ],
  },
  health: {
    title: 'Health Department Information Request',
    questions: [
      'What is the total budget allocated for healthcare infrastructure?',
      'How many government hospitals lack essential medical equipment?',
      'What is the status of vaccination programs?',
      'What are the details of medical staff recruitment?',
    ],
  },
  transport: {
    title: 'Transport Department Information Request',
    questions: [
      'What is the total budget allocated for public transport infrastructure?',
      'How many buses are operational in the city?',
      'What is the status of metro rail projects?',
      'What are the details of transport contracts awarded?',
    ],
  },
  finance: {
    title: 'Finance Department Information Request',
    questions: [
      'What is the total budget allocation for the current financial year?',
      'How much has been spent on various development projects?',
      'What is the status of pending payments to contractors?',
      'What are the details of revenue collection?',
    ],
  },
  generic: {
    title: 'Information Request',
    questions: [
      'What is the total budget allocated for this department?',
      'What are the major projects undertaken in the last 2 years?',
      'What is the status of pending applications?',
      'What are the details of contracts awarded?',
    ],
  },
};

export default function CreateRTIPage() {
  const [formData, setFormData] = useState({
    department: '',
    customDepartment: '',
    questions: [] as string[],
    customQuestion: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { user } = useAuth();
  const router = useRouter();

  const selectedTemplate = templates[formData.department as keyof typeof templates] || templates.generic;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.questions.length === 0) {
      setError('Please add at least one question');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/rti', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          department: formData.department === 'other' ? formData.customDepartment : formData.department,
          questions: formData.questions,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create RTI request');
      }

      const rti = await response.json();
      setSuccess(true);
      setTimeout(() => {
        router.push(`/rti/${rti.id}`);
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to create RTI request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const department = e.target.value;
    setFormData(prev => ({
      ...prev,
      department,
      questions: [], // Reset questions when department changes
    }));
  };

  const addQuestion = (question: string) => {
    if (question.trim() && !formData.questions.includes(question.trim())) {
      setFormData(prev => ({
        ...prev,
        questions: [...prev.questions, question.trim()],
      }));
    }
  };

  const removeQuestion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const addCustomQuestion = () => {
    if (formData.customQuestion.trim()) {
      addQuestion(formData.customQuestion);
      setFormData(prev => ({
        ...prev,
        customQuestion: '',
      }));
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">RTI Request Created!</h1>
          <p className="text-gray-600 mb-4">
            Your RTI request has been submitted successfully. You'll receive updates on its progress.
          </p>
          <Button onClick={() => router.push('/rti')}>
            View RTI Requests
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create RTI Request</h1>
          <p className="mt-2 text-gray-600">
            Request information from government departments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Request Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleDepartmentChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select department</option>
                  {departments.map(dept => (
                    <option key={dept.value} value={dept.value}>
                      {dept.label}
                    </option>
                  ))}
                </select>
              </div>

              {formData.department === 'other' && (
                <div>
                  <label htmlFor="customDepartment" className="block text-sm font-medium text-gray-700">
                    Department Name
                  </label>
                  <input
                    type="text"
                    id="customDepartment"
                    name="customDepartment"
                    required
                    value={formData.customDepartment}
                    onChange={(e) => setFormData(prev => ({ ...prev, customDepartment: e.target.value }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter department name"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Questions to Ask
                </label>
                
                {formData.questions.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {formData.questions.map((question, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <span className="text-sm text-gray-700">{question}</span>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => removeQuestion(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <input
                    type="text"
                    value={formData.customQuestion}
                    onChange={(e) => setFormData(prev => ({ ...prev, customQuestion: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Add a custom question"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addCustomQuestion}
                    className="w-full"
                  >
                    Add Question
                  </Button>
                </div>
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
                  disabled={isLoading || formData.questions.length === 0}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? 'Creating...' : 'Create RTI Request'}
                </Button>
              </div>
            </form>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Suggested Questions</h2>
            
            {formData.department && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  {selectedTemplate.title}
                </h3>
                <div className="space-y-2">
                  {selectedTemplate.questions.map((question, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                      <span className="text-sm text-gray-700">{question}</span>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addQuestion(question)}
                        className="text-blue-600 hover:text-blue-700"
                        disabled={formData.questions.includes(question)}
                      >
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!formData.department && (
              <div className="text-center text-gray-500">
                <p>Select a department to see suggested questions</p>
              </div>
            )}

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h3 className="text-sm font-medium text-yellow-900 mb-2">RTI Guidelines</h3>
              <ul className="text-xs text-yellow-800 space-y-1">
                <li>• Be specific and clear in your questions</li>
                <li>• Ask for factual information, not opinions</li>
                <li>• Include time periods when relevant</li>
                <li>• Avoid asking for personal information</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

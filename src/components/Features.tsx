export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Platform Features
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to fight corruption and hold officials accountable
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-6 text-lg font-medium text-gray-900">Transparent Petitions</h3>
            <p className="mt-2 text-base text-gray-500">
              Create and sign petitions with full transparency and verifiable signatures.
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="mt-6 text-lg font-medium text-gray-900">Secure Reporting</h3>
            <p className="mt-2 text-base text-gray-500">
              Report corruption safely with client-side encryption and whistleblower protection.
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="mt-6 text-lg font-medium text-gray-900">RTI Automation</h3>
            <p className="mt-2 text-base text-gray-500">
              Automatically draft and track Right to Information requests.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

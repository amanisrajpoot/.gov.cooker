export function Stats() {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-white">1,234</div>
            <div className="text-blue-200">Active Campaigns</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">56,789</div>
            <div className="text-blue-200">Total Signatures</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">234</div>
            <div className="text-blue-200">Issues Resolved</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">89</div>
            <div className="text-blue-200">RTI Requests</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to make a difference?
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          Join thousands of citizens fighting corruption and demanding accountability.
        </p>
        <div className="mt-8">
          <a
            href="/campaigns"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 transition-colors"
          >
            Start a Campaign
          </a>
          <a
            href="/issues/report"
            className="ml-4 inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-gray-900 transition-colors"
          >
            Report an Issue
          </a>
        </div>
      </div>
    </section>
  );
}

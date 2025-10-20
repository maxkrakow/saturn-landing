import { getDemoInsurer } from '@/lib/demo-data';
import { Phone } from 'lucide-react';

const features = [
  {
    name: 'Implementation & Integration',
    description: 'Drop-in APIs and webhooks connect Saturn to your LOS, servicing, and CRM in hours. We read and write back to your systems of record.',
    icon: (
      <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3l3 3m-3-3L7 6m6 4H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-6a2 2 0 00-2-2z" />
        </svg>
      </div>
    ),
  },
  {
    name: 'Smart Document Ingestion',
    description: 'Ingest ACORDs, binders, endorsements, and certificates from email, portals, and uploads. Normalize, extract, and route automatically.',
    icon: (
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
    ),
  },
  {
    name: 'Accuracy & Validation',
    description: 'Validate limits, clauses, dates, names, locations, interests, and endorsements against your rules for high confidence results.',
    icon: (
      <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    ),
  },
  {
    name: 'Automated Outreach & Communication',
    description: 'AI orchestrates email, SMS, and voice with brokers and borrowers, tracks replies, and follows up until fully compliant.',
    icon: (
      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
    ),
  },
  {
    name: 'Compliance Tracking',
    description: 'See each loan’s required coverages, dates, and status with alerts and exception workflows across your portfolio.',
    icon: (
      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
    ),
  },
  {
    name: 'Write‑Back & Audit',
    description: 'When compliance is achieved, Saturn updates your existing systems and maintains a complete, exportable audit trail.',
    icon: (
      <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      </div>
    ),
  },
]

export function Features() {
  return (
    <div id="features" className="relative bg-white py-16 sm:py-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Policy Notice - top left */}
        <div className="absolute top-[10%] left-[10%] flex flex-col items-center">
          <div className="inline-flex items-center border border-pink-300 rounded-lg px-3 py-2 bg-pink-50 transform -rotate-[25deg]">
            <div className="bg-pink-600 text-white px-2 py-1 rounded text-xs font-medium mr-3">
              PDF
            </div>
            <span className="text-sm font-medium text-gray-900 mr-3">Policy_123123</span>
            <div className="flex items-center space-x-1">
              <div className="flex space-x-0.5">
                {[1,2,3,4,5].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i <= 3 ? 'bg-pink-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600 ml-1">3/5 Compliant</span>
            </div>
          </div>
        </div>

        {/* Compliant - top right */}
        <div className="absolute top-[10%] right-[10%] flex flex-col items-center">
          <div className="inline-flex items-center border border-green-300 rounded-lg px-3 py-2 bg-green-50 transform rotate-25">
            <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium mr-3">
              PDF
            </div>
            <span className="text-sm font-medium text-gray-900 mr-3">Policy_4782_Certificate</span>
            <div className="flex items-center space-x-1">
              <div className="flex space-x-0.5">
                {[1,2,3,4,5].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i <= 5 ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600 ml-1">5/5 Checks</span>
            </div>
          </div>
        </div>



        {/* Email Sent to Borrower - top left (second row) */}
        <div className="absolute top-[30%] left-[10%] flex flex-col items-center">
          <div className="inline-flex items-center border border-purple-300 rounded-lg px-3 py-2 bg-purple-50 transform rotate-[25deg]">
            <div className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium mr-3">
              @
            </div>
            <span className="text-sm font-medium text-gray-900 mr-3">alex@pinnacle.com</span>
            <div className="flex items-center space-x-1">
              <div className="flex space-x-0.5">
                {[1,2,3].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i <= 2 ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600 ml-1">2/3 Sent</span>
            </div>
          </div>
        </div>

        {/* Phone Call to Broker - top right (second row) */}
        <div className="absolute top-[30%] right-[10%] flex flex-col items-center">
          <div className="inline-flex items-center border border-indigo-300 rounded-lg px-3 py-2 bg-indigo-50 transform -rotate-[35deg]">
            <div className="bg-indigo-600 text-white px-2 py-1 rounded text-xs font-medium mr-3 flex items-center justify-center">
              <Phone className="w-3 h-3" />
            </div>
            <span className="text-sm font-medium text-gray-900 mr-3">Called Broker</span>
            <div className="flex items-center space-x-1">
              <div className="flex items-center justify-center h-4 w-4 mr-2">
                <img 
                  src={getDemoInsurer('Progressive')?.logoUrl} 
                  alt="Progressive" 
                  className="w-3 h-3 rounded object-contain flex-shrink-0"
                />
              </div>
              <div className="flex space-x-0.5">
                {[1,2,3].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i <= 1 ? 'bg-indigo-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600 ml-1">1/3 Calls</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <p className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl sm:text-balance">
            Complete insurance compliance automation
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            Integrate Saturn into your existing systems, ingest documents, ensure accuracy, and automate all
            communication with brokers and borrowers—following up until fully compliant and writing updates back
            to your systems of record.
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10 overflow-hidden">
            <img 
              src="/dashboard-screenshot.png" 
              alt="Saturn Dashboard showing compliance tracking, borrower breakdown, and policy management"
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
          <div aria-hidden="true" className="relative">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="flex gap-4">
              <div className="flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <dt className="font-semibold text-gray-900">
                  {feature.name}
                </dt>
                <dd className="mt-1">{feature.description}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

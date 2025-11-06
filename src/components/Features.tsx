import React from 'react'
import Image from 'next/image'
import { getDemoInsurer } from '@/lib/demo-data'
import { Phone } from 'lucide-react'

const features = [
  {
    name: 'Implementation & Integration',
    description:
      'Drop-in APIs and webhooks connect Saturn to your LOS, servicing, and CRM in hours. We read and write back to your systems of record.',
    icon: (
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600">
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3l3 3m-3-3L7 6m6 4H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-6a2 2 0 00-2-2z"
          />
        </svg>
      </div>
    ),
  },
  {
    name: 'Smart Document Ingestion',
    description:
      'Ingest ACORDs, binders, endorsements, and certificates from email, portals, and uploads. Normalize, extract, and route automatically.',
    icon: (
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
    ),
  },
  {
    name: 'Accuracy & Validation',
    description:
      'Validate limits, clauses, dates, names, locations, interests, and endorsements against your rules for high confidence results.',
    icon: (
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-600">
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    ),
  },
  {
    name: 'Automated Outreach & Communication',
    description:
      'AI orchestrates email, SMS, and voice with brokers and borrowers, tracks replies, and follows up until fully compliant.',
    icon: (
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600">
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
    ),
  },
  {
    name: 'Compliance Tracking',
    description:
      'See each loan’s required coverages, dates, and status with alerts and exception workflows across your portfolio.',
    icon: (
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600">
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </div>
    ),
  },
  {
    name: 'Write‑Back & Audit',
    description:
      'When compliance is achieved, Saturn updates your existing systems and maintains a complete, exportable audit trail.',
    icon: (
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-600">
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      </div>
    ),
  },
]

export function Features() {
  return (
    <div id="features" className="relative overflow-hidden bg-white py-8 sm:py-16 lg:py-20">
      {/* Background decorative elements - hidden on mobile */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
        {/* Policy Notice - top left */}
        <div className="absolute left-[10%] top-[10%] flex flex-col items-center">
          <div className="inline-flex -rotate-[25deg] transform items-center rounded-lg border border-pink-300 bg-pink-50 px-3 py-2">
            <div className="mr-3 rounded bg-pink-600 px-2 py-1 text-xs font-medium text-white">PDF</div>
            <span className="mr-3 text-sm font-medium text-gray-900">Policy_123123</span>
            <div className="flex items-center space-x-1">
              <div className="flex space-x-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`h-2 w-2 rounded-full ${i <= 3 ? 'bg-pink-500' : 'bg-gray-300'}`} />
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-600">3/5 Compliant</span>
            </div>
          </div>
        </div>

        {/* Compliant - top right */}
        <div className="absolute right-[10%] top-[10%] flex flex-col items-center">
          <div className="rotate-25 inline-flex transform items-center rounded-lg border border-green-300 bg-green-50 px-3 py-2">
            <div className="mr-3 rounded bg-green-600 px-2 py-1 text-xs font-medium text-white">PDF</div>
            <span className="mr-3 text-sm font-medium text-gray-900">Policy_4782_Certificate</span>
            <div className="flex items-center space-x-1">
              <div className="flex space-x-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`h-2 w-2 rounded-full ${i <= 5 ? 'bg-green-500' : 'bg-gray-300'}`} />
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-600">5/5 Checks</span>
            </div>
          </div>
        </div>

        {/* Email Sent to Borrower - top left (second row) */}
        <div className="absolute left-[10%] top-[30%] flex flex-col items-center">
          <div className="inline-flex rotate-[25deg] transform items-center rounded-lg border border-purple-300 bg-purple-50 px-3 py-2">
            <div className="mr-3 rounded bg-purple-600 px-2 py-1 text-xs font-medium text-white">@</div>
            <span className="mr-3 text-sm font-medium text-gray-900">alex@pinnacle.com</span>
            <div className="flex items-center space-x-1">
              <div className="flex space-x-0.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`h-2 w-2 rounded-full ${i <= 2 ? 'bg-purple-500' : 'bg-gray-300'}`} />
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-600">2/3 Sent</span>
            </div>
          </div>
        </div>

        {/* Phone Call to Broker - top right (second row) */}
        <div className="absolute right-[10%] top-[30%] flex flex-col items-center">
          <div className="inline-flex -rotate-[35deg] transform items-center rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-2">
            <div className="mr-3 flex items-center justify-center rounded bg-indigo-600 px-2 py-1 text-xs font-medium text-white">
              <Phone className="h-3 w-3" />
            </div>
            <span className="mr-3 text-sm font-medium text-gray-900">Called Broker</span>
            <div className="flex items-center space-x-1">
              <div className="mr-2 flex h-4 w-4 items-center justify-center">
                <img
                  src={getDemoInsurer('Progressive')?.logoUrl}
                  alt="Progressive"
                  className="h-3 w-3 flex-shrink-0 rounded object-contain"
                />
              </div>
              <div className="flex space-x-0.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`h-2 w-2 rounded-full ${i <= 1 ? 'bg-indigo-500' : 'bg-gray-300'}`} />
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-600">1/3 Calls</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <p className="text-pretty text-2xl font-semibold tracking-tight text-gray-900 sm:text-balance sm:text-4xl lg:text-5xl">
            Complete insurance compliance automation
          </p>
          <p className="mt-4 text-base text-gray-600 sm:text-lg/8">
            Integrate Saturn into your existing systems, ingest documents, ensure accuracy, and automate all
            communication with brokers and borrowers—following up until fully compliant and writing updates back to your
            systems of record.
          </p>
        </div>
      </div>
        <div className="relative overflow-hidden pt-8 sm:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-[-8%] overflow-hidden rounded-xl shadow-2xl ring-1 ring-gray-900/10 sm:mb-[-12%]">
            <Image
              src="/dashboard-screenshot.png"
              alt="Saturn Dashboard showing compliance tracking, borrower breakdown, and policy management"
              width={1920}
              height={1080}
              className="h-auto max-h-64 w-full object-cover sm:max-h-96"
              priority
            />
          </div>
          <div aria-hidden="true" className="relative">
            <div className="absolute -inset-x-10 bottom-0 bg-gradient-to-t from-white pt-[5%] sm:-inset-x-20 sm:pt-[7%]" />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:mt-16 sm:px-6 md:mt-20 lg:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-4 gap-y-8 text-sm text-gray-600 sm:grid-cols-2 sm:text-base/7 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg sm:h-12 sm:w-12"
                  style={{
                    backgroundColor: feature.icon.props.className.includes('bg-indigo-600')
                      ? '#4f46e5'
                      : feature.icon.props.className.includes('bg-blue-600')
                        ? '#2563eb'
                        : feature.icon.props.className.includes('bg-orange-600')
                          ? '#ea580c'
                          : feature.icon.props.className.includes('bg-purple-600')
                            ? '#9333ea'
                            : feature.icon.props.className.includes('bg-green-600')
                              ? '#16a34a'
                              : feature.icon.props.className.includes('bg-teal-600')
                                ? '#0d9488'
                                : '#4f46e5',
                  }}
                >
                  {React.cloneElement(feature.icon, {
                    className: 'w-5 h-5 sm:w-6 sm:h-6 text-white',
                  })}
                </div>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-900 sm:text-base">{feature.name}</dt>
                <dd className="mt-1 text-xs sm:text-sm">{feature.description}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

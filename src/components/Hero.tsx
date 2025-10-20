'use client'

import React, { Fragment, useState } from 'react'
import { DemoButton } from '@/components/DemoButton'
import { Container } from '@/components/Container'
import { ChatBubbleLeftEllipsisIcon, TagIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { Home, Waves, Car, BadgeCheckIcon, XIcon, Mail, FileText, Phone, User, XCircle, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getDemoInsurer } from '@/lib/demo-data'
import { motion, AnimatePresence } from 'framer-motion'

const activity = [
  {
    id: 1,
    type: 'planned',
    person: { name: 'System', href: '#' },
    assigned: { name: 'John Doe', href: '#' },
    summary: 'Planned follow-up on John Doe in 2 days',
    date: '2h ago',
  },
  {
    id: 2,
    type: 'comment',
    person: { name: 'Eduardo Benz', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'I double checked these policy items and they were indeed wrong. Please schedule a call in 2 days to follow up on this.',
    date: '2h ago',
  },
  {
    id: 3,
    type: 'email',
    person: { name: 'System', href: '#' },
    assigned: { name: 'John Doe', href: '#' },
    emailContent: 'Hi John,\n\nThanks for uploading the file. The policy you uploaded had a "$1,000,000" coverage amount instead of "$1,500,000".\n\nCould you please provide an updated certificate of insurance with these changes at your earliest convenience? As a reminder General Liability policy for ABC Manufacturing LLC (Policy #GL-2024-001) is set to expire on January 1, 2025 so it must be before then.\n\nBest regards,\nBankwell Insurance Automation',
    summary: 'Emailed agent with details on what the issues were, asking him to upload an updated certificate.',
    status: 'Received With Errors',
    date: '2h ago',
  },
  {
    id: 4,
    type: 'upload',
    person: { name: 'John Doe', href: '#' },
    policyNumber: '#4782',
    fileName: 'Policy_4782_Certificate',
    checks: '3/5',
    date: '2h ago',
  },
  {
    id: 5,
    type: 'call',
    person: { name: 'System', href: '#' },
    assigned: { name: 'John Doe', href: '#' },
    summary: 'Agent confirmed he received an email with the portal link, and he confirmed he uploaded the policy confirmation.',
    status: 'Upcoming (30 days to expiry)',
    date: '6h ago',
  },
  {
    id: 6,
    type: 'comment',
    person: { name: 'Jason Meyers', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'We need to get the updated policy because the one currently on file is expired. @AI call the agent about his policy #4782.',
    date: '2d ago',
  },
]

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

// Notification data for cycling animation
const notifications = [
  {
    id: "reminder",
    title: "Reminder",
    desc: "Broker ping sent",
    icon: "M4 7h16M4 12h16M4 17h10",
    status: "completed"
  },
  {
    id: "renewal", 
    title: "Renewal",
    desc: "COI received",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    status: "completed"
  },
  {
    id: "ocr",
    title: "OCR Check", 
    desc: "Endorsements validated",
    icon: "M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    status: "completed"
  },
  {
    id: "dashboard",
    title: "Dashboard",
    desc: "Marked compliant", 
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    status: "completed"
  }
]

function AnimatedNotificationCard() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'filling' | 'checked'>('idle')

  React.useEffect(() => {
    const cycleNotifications = () => {
      setPhase('filling')
      setTimeout(() => setPhase('checked'), 1200)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length)
        setPhase('idle')
      }, 2000)
    }

    const interval = setInterval(cycleNotifications, 3000)
    return () => clearInterval(interval)
  }, [])

  const current = notifications[currentIndex]

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-sky-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d={current.icon} />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">{current.title}</div>
              <div className="text-xs text-slate-600">{current.desc}</div>
            </div>
          </div>

          {/* Status area: progress bar -> checkmark */}
          <div className="w-20 flex justify-end">
            {phase !== "checked" ? (
              <div className="h-2 w-16 overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  className="h-full origin-left rounded-full bg-sky-500"
                  initial={{ scaleX: 0 }}
                  animate={phase === "filling" ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              </div>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-emerald-600"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Success status bar */}
      <AnimatePresence>
        {phase === "checked" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 rounded-lg bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700"
          >
            Updated and compliant
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Hero() {
  const [activeTab, setActiveTab] = useState('overview')
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" width="100%" height="100%" strokeWidth={0} />
      </svg>
      <div
        aria-hidden="true"
        className="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
          className="aspect-1108/632 w-277 bg-gradient-to-r from-blue-400 to-blue-600 opacity-20"
        />
      </div>
          <Container className="pt-16 pb-6 sm:pt-24 sm:pb-8 lg:pt-32 lg:py-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 items-center mt-8 lg:mt-16">
            {/* Left side - Content */}
            <div className="order-1 lg:order-1">
              <div className="mb-6">
                <a href="#" className="inline-flex space-x-6">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600 ring-1 ring-blue-600/20">
                    What's new
                  </span>
                  <span className="inline-flex items-center space-x-2 text-sm font-medium text-gray-600">
                    <span>AI-powered compliance automation</span>
                    <span>→</span>
                  </span>
                </a>
              </div>
              
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                <div className="text-center">
                  <div>Insurance Compliance on</div>
                  <div className="relative inline-block">
                    <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent font-bold">
                      Autopilot
                    </span>
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></span>
                  </div>
                </div>
              </h1>
              
              <p className="mt-3 text-base text-gray-600">
                Saturn tracks policy requirements per loan, ingests and validates insurance certificates, 
                and runs AI-driven outreach to brokers and borrowers until compliant—while preserving a full audit trail.
              </p>
              
                  {/* CTA Section with Button */}
                  <div className="mt-4">
                    <DemoButton className="w-full py-3 text-sm">
                      Request a demo
                    </DemoButton>
                  </div>
              
              {/* Benefits list */}
              <div className="mt-4 space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">99.8% compliance rate</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">85% time saved</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">10K+ documents processed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">50+ active lenders</span>
                </div>
              </div>
            </div>
            
            {/* Right side - Dashboard with Tabs */}
            <div className="order-2 lg:order-2">
              <div className="relative">
                <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-2xl border border-gray-200 p-4 lg:p-6">
                  
                  {/* Activity Tab Content */}
                  {activeTab === 'activity' && (
                    <div className="max-h-64 lg:max-h-96 overflow-y-auto">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                        <div className="flex items-center space-x-2">
                          <div className="relative w-8 h-8">
                            <svg className="w-8 h-8" viewBox="0 0 36 36">
                              <path
                                className="text-gray-200"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                className="text-blue-600"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray="50, 100"
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-semibold text-blue-600">2/4</span>
                    </div>
                    </div>
                          <Badge variant="green" icon={BadgeCheckIcon}>
                            Compliant
                          </Badge>
                    </div>
                  </div>
                  
                      {/* Activity feed using the new Tailwind design */}
                      <div className="flow-root">
                        <ul role="list" className="-mb-8">
                          {activity.map((activityItem, activityItemIdx) => (
                            <li key={activityItem.id}>
                              <div className="relative pb-8">
                                {activityItemIdx !== activity.length - 1 ? (
                                  <span
                                    aria-hidden="true"
                                    className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                                  />
                                ) : null}
                                <div className="relative flex items-start space-x-3">
                                  {activityItem.type === 'planned' ? (
                                    <>
                                      <div>
                                        <div className="relative px-1">
                                          <div className="flex size-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white border-2 border-dashed border-blue-300">
                                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="min-w-0 flex-1 py-1.5">
                                        <div className="text-sm text-gray-500">
                                          <span className="font-medium text-gray-900">{activityItem.summary}</span>{' '}
                                          <span className="whitespace-nowrap">{activityItem.date}</span>
                                        </div>
                                        <div className="mt-2 flex space-x-2">
                                          <button className="inline-flex items-center gap-x-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 border border-blue-300">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            Planned Action
                                          </button>
                                          <button className="inline-flex items-center gap-x-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 border border-gray-300">
                                            <Mail className="w-3 h-3" />
                                            @ Email
                                          </button>
                                          <button className="inline-flex items-center gap-x-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 border border-gray-300">
                                            <Phone className="w-3 h-3" />
                                            Phone Call
                                          </button>
                                        </div>
                                      </div>
                                    </>
                                  ) : activityItem.type === 'comment' ? (
                                    <>
                                      <div className="relative">
                                        <img
                                          alt=""
                                          src={activityItem.imageUrl}
                                          className="flex size-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white outline -outline-offset-1 outline-black/5"
                                        />

                                        <span className="absolute -right-1 -bottom-0.5 rounded-tl bg-white px-0.5 py-px">
                                          <ChatBubbleLeftEllipsisIcon aria-hidden="true" className="size-5 text-gray-400" />
                                        </span>
                                      </div>
                                      <div className="min-w-0 flex-1">
                                        <div>
                                          <div className="text-sm">
                                            <a href={activityItem.person.href} className="font-medium text-gray-900">
                                              {activityItem.person.name}
                                            </a>
                                          </div>
                                          <p className="mt-0.5 text-sm text-gray-500">Commented {activityItem.date}</p>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-700">
                                          <p>
                                            {activityItem.comment?.includes('policy #4782') ? (
                                              <>
                                                We need to get the updated policy because the one currently on file is expired. @AI call the agent about his{' '}
                                                <div className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium bg-gray-50 border border-blue-200">
                                                  <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                  </svg>
                                                  <span className="text-gray-700">Policy</span>
                                                  <a href="#" className="text-blue-600 underline">
                                                    #4782
                                                  </a>
                                                </div>
                                                .
                                              </>
                                            ) : (
                                              activityItem.comment
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    </>
                                  ) : activityItem.type === 'assignment' ? (
                                    <>
                                      <div>
                                        <div className="relative px-1">
                                          <div className="flex size-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                                            <UserCircleIcon aria-hidden="true" className="size-5 text-gray-500" />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="min-w-0 flex-1 py-1.5">
                                        <div className="text-sm text-gray-500">
                                          <a href={activityItem.person.href} className="font-medium text-gray-900">
                                            {activityItem.person.name}
                                          </a>{' '}
                                          assigned{' '}
                                          <a href={activityItem.assigned?.href || '#'} className="font-medium text-gray-900">
                                            {activityItem.assigned?.name}
                                          </a>{' '}
                                          <span className="whitespace-nowrap">{activityItem.date}</span>
                                        </div>
                                      </div>
                                    </>
                                  ) : activityItem.type === 'email' ? (
                                    <>
                                      <div>
                                        <div className="relative px-1">
                                          <div className="flex size-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white border-2 border-dashed border-blue-300">
                                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="min-w-0 flex-1 py-1.5">
                                        <div className="text-sm text-gray-500">
                                          Emailed{' '}
                                          <a href={activityItem.assigned?.href || '#'} className="font-medium text-gray-900">
                                            {activityItem.assigned?.name}
                                          </a>{' '}
                                          <span className="whitespace-nowrap">{activityItem.date}</span>
                                        </div>
                                        <div className="mt-2 flex items-center space-x-2">
                                          <button className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-300">
                                            <Mail className="size-3" />
                                            @ Email
                                          </button>
                                          <Badge variant="red" icon={XIcon}>
                                            {activityItem.status}
                                          </Badge>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-700">
                                          <p>{activityItem.summary}</p>
                                        </div>
                                        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                          <div className="text-sm text-gray-600 whitespace-pre-line">
                                            {activityItem.emailContent}
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ) : activityItem.type === 'upload' ? (
                                    <>
                                      <div>
                                        <div className="relative px-1">
                                          <div className="flex size-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                                            <FileText aria-hidden="true" className="size-5 text-gray-500" />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="min-w-0 flex-1 py-1.5">
                                        <div className="text-sm text-gray-500">
                                          <a href={activityItem.person.href} className="font-medium text-gray-900">
                                            {activityItem.person.name}
                                          </a>{' '}
                                          uploaded a new file for{' '}
                                          <div className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium bg-gray-50 border border-blue-200">
                                            <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            <span className="text-gray-700">Policy</span>
                                            <a href="#" className="text-blue-600 underline">
                                              {activityItem.policyNumber}
                                            </a>
                                          </div>{' '}
                                          <span className="whitespace-nowrap">{activityItem.date}</span>
                                        </div>
                                        <div className="mt-2">
                                          <div className="inline-flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
                                            <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium mr-3">
                                              PDF
                                            </div>
                                            <span className="text-sm font-medium text-gray-900 mr-3">{activityItem.fileName}</span>
                                            <div className="flex items-center space-x-1">
                                              <div className="flex space-x-0.5">
                                                {[1,2,3,4,5].map((i) => (
                                                  <div
                                                    key={i}
                                                    className={`w-2 h-2 rounded-full ${
                                                      i <= 3 ? 'bg-red-500' : 'bg-gray-300'
                                                    }`}
                                                  />
                                                ))}
                                              </div>
                                              <span className="text-xs text-gray-600 ml-1">{activityItem.checks} Checks</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  ) : activityItem.type === 'call' ? (
                                    <>
                                      <div>
                                        <div className="relative px-1">
                                          <div className="flex size-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white border-2 border-dashed border-blue-300">
                                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="min-w-0 flex-1 py-1.5">
                                        <div className="text-sm text-gray-500">
                                          Called{' '}
                                          <a href={activityItem.assigned?.href || '#'} className="font-medium text-gray-900">
                                            {activityItem.assigned?.name}
                                          </a>{' '}
                                          <span className="whitespace-nowrap">{activityItem.date}</span>
                                        </div>
                                        <div className="mt-2 flex items-center space-x-2">
                                          <button className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-300">
                                            <Phone className="size-3" />
                                            Phone Call
                                          </button>
                                          <Badge variant="gray" icon={User}>
                                            {activityItem.status}
                                          </Badge>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-700">
                                          <p>{activityItem.summary}</p>
                                        </div>
                                      </div>
                                    </>
                                  ) : null}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Overview Tab Content */}
                  {activeTab === 'overview' && (
                    <div className="max-h-64 lg:max-h-96 overflow-y-auto">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-semibold text-gray-900">Tech Innovations LLC</h3>
                        <div className="flex items-center space-x-2">
                          <div className="relative w-8 h-8">
                            <svg className="w-8 h-8" viewBox="0 0 36 36">
                              <path
                                className="text-gray-200"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                className="text-blue-600"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray="50, 100"
                                d="M18 2.0845
                                  a 15.9155 15.9155 0 0 1 0 31.831
                                  a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-semibold text-blue-600">2/4</span>
                            </div>
                          </div>
                          <Badge variant="green" icon={BadgeCheckIcon}>
                            Compliant
                          </Badge>
                        </div>
                      </div>

                      {/* Recent Activity */}
                      <div className="mb-3">
                        <h4 className="text-xs font-semibold text-gray-900 mb-2">Recent Activity</h4>
                        <AnimatedNotificationCard />
                      </div>

                      {/* Contacts section */}
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-900 mb-2">Contacts</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {/* Alex Thompson - Borrower */}
                          <div className="p-2 border border-gray-200 rounded text-xs">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span className="font-medium text-gray-900">Alex Thompson</span>
                              <Badge variant="green" icon={User}>Borrower</Badge>
                            </div>
                            <div className="text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Phone className="w-3 h-3" />
                                <span>+1 (321) 987 6543</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Mail className="w-3 h-3" />
                                <span>alex@pinnacle.com</span>
                      </div>
                    </div>
                  </div>
                  
                          {/* John Doe - Insurance Agent */}
                          <div className="p-2 border border-gray-200 rounded text-xs">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                              <span className="font-medium text-gray-900">John Doe</span>
                              <Badge variant="orange" icon={User}>Insurance Agent</Badge>
                            </div>
                            <div className="text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Phone className="w-3 h-3" />
                                <span>+1 (321) 987 6543</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Mail className="w-3 h-3" />
                                <span>j.doe@pinnacle.com</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Policies section */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-gray-900">Policies</h4>
                          <div className="flex space-x-1">
                            <button className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">Filter</button>
                            <button className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">Export</button>
                          </div>
                        </div>

                        {/* Policies table */}
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          {/* Table header */}
                          <div className="bg-gray-50 px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-200">
                            <div className="grid grid-cols-5 gap-4" style={{gridTemplateColumns: '1fr 1fr 1fr 1.5fr 2fr'}}>
                              <div>Policy ID</div>
                              <div>Policy Type</div>
                              <div>Carrier</div>
                              <div>Status</div>
                              <div>Document</div>
                            </div>
                          </div>

                          {/* Policy #2782 - Non-Compliant */}
                          <div className="px-4 py-3 border-b border-gray-200 bg-red-50 hover:bg-red-100">
                            <div className="grid grid-cols-5 gap-4 items-center text-sm" style={{gridTemplateColumns: '1fr 1fr 1fr 1.5fr 2fr'}}>
                              <div className="font-medium text-gray-900">#2782</div>
                              <div className="flex items-center space-x-1">
                                <Home className="w-4 h-4 text-gray-600" />
                                <span>Property</span>
                              </div>
                              <div className="flex items-center justify-center h-8 w-8">
                                <img 
                                  src={getDemoInsurer('Progressive')?.logoUrl} 
                                  alt="Progressive" 
                                  className="w-6 h-6 rounded object-contain flex-shrink-0"
                                />
                              </div>
                              <div className="flex items-center justify-center">
                                <Badge variant="red" icon={XIcon}>
                                  Non-Compliant
                                </Badge>
                              </div>
                              <div>
                                <div className="inline-flex items-center border border-red-500 rounded px-2 py-1 text-xs font-medium">
                                  <div className="bg-red-600 text-white px-1 py-0.5 rounded mr-2">PDF</div>
                                  <span className="text-gray-900">Policy_123123</span>
                                  <XCircle className="w-3 h-3 ml-2 text-red-500" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Policy #4782 - Compliant */}
                          <div className="px-4 py-3 border-b border-gray-200 bg-green-50 hover:bg-green-100">
                            <div className="grid grid-cols-5 gap-4 items-center text-sm" style={{gridTemplateColumns: '1fr 1fr 1fr 1.5fr 2fr'}}>
                              <div className="font-medium text-gray-900">#4782</div>
                              <div className="flex items-center space-x-1">
                                <Waves className="w-4 h-4 text-gray-600" />
                                <span>Flood</span>
                              </div>
                              <div className="flex items-center justify-center h-8 w-8">
                                <img 
                                  src={getDemoInsurer('Progressive')?.logoUrl} 
                                  alt="Progressive" 
                                  className="w-6 h-6 rounded object-contain flex-shrink-0"
                                />
                              </div>
                              <div className="flex items-center justify-center">
                                <Badge variant="green" icon={BadgeCheckIcon}>
                                  Compliant
                                </Badge>
                              </div>
                              <div>
                                <div className="inline-flex items-center border border-green-500 rounded px-2 py-1 text-xs font-medium">
                                  <div className="bg-green-600 text-white px-1 py-0.5 rounded mr-2">PDF</div>
                                  <span className="text-gray-900">Policy_123123</span>
                                  <CheckCircle className="w-3 h-3 ml-2 text-green-500" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Policy #7901 - Non-Compliant */}
                          <div className="px-4 py-3 border-b border-gray-200 bg-red-50 hover:bg-red-100">
                            <div className="grid grid-cols-5 gap-4 items-center text-sm" style={{gridTemplateColumns: '1fr 1fr 1fr 1.5fr 2fr'}}>
                              <div className="font-medium text-gray-900">#7901</div>
                              <div className="flex items-center space-x-1">
                                <Car className="w-4 h-4 text-gray-600" />
                                <span>Auto</span>
                              </div>
                              <div className="flex items-center justify-center h-8 w-8">
                                <img 
                                  src={getDemoInsurer('AllState')?.logoUrl} 
                                  alt="AllState" 
                                  className="w-6 h-6 rounded object-contain flex-shrink-0"
                                />
                              </div>
                              <div className="flex items-center justify-center">
                                <Badge variant="red" icon={XIcon}>
                                  Non-Compliant
                                </Badge>
                              </div>
                              <div>
                                <div className="inline-flex items-center border border-red-500 rounded px-2 py-1 text-xs font-medium">
                                  <div className="bg-red-600 text-white px-1 py-0.5 rounded mr-2">PDF</div>
                                  <span className="text-gray-900">Policy_123123</span>
                                  <XCircle className="w-3 h-3 ml-2 text-red-500" />
                                </div>
                              </div>
                      </div>
                    </div>

                          {/* Policy #9522 - Compliant */}
                          <div className="px-4 py-3 bg-green-50 hover:bg-green-100">
                            <div className="grid grid-cols-5 gap-4 items-center text-sm" style={{gridTemplateColumns: '1fr 1fr 1fr 1.5fr 2fr'}}>
                              <div className="font-medium text-gray-900">#9522</div>
                              <div className="flex items-center space-x-1">
                                <Home className="w-4 h-4 text-gray-600" />
                                <span>Property</span>
                              </div>
                              <div className="flex items-center justify-center h-8 w-8">
                                <img 
                                  src={getDemoInsurer('StateFarm')?.logoUrl} 
                                  alt="StateFarm" 
                                  className="w-6 h-6 rounded object-contain flex-shrink-0"
                                />
                              </div>
                              <div className="flex items-center justify-center">
                                <Badge variant="green" icon={BadgeCheckIcon}>
                                  Compliant
                                </Badge>
                              </div>
                              <div>
                                <div className="inline-flex items-center border border-green-500 rounded px-2 py-1 text-xs font-medium">
                                  <div className="bg-green-600 text-white px-1 py-0.5 rounded mr-2">PDF</div>
                                  <span className="text-gray-900">Policy_123123</span>
                                  <CheckCircle className="w-3 h-3 ml-2 text-green-500" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

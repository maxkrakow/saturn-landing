'use client'

import React, { Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  BadgeCheckIcon,
  XIcon,
  AlertTriangleIcon,
  MessageCircle,
  UserCircle,
  Tag,
  CircleDashedIcon,
  FileQuestionMarkIcon,
  InboxIcon,
  ShieldOffIcon,
  SirenIcon,
  XCircleIcon,
} from 'lucide-react'

type SceneId = 'renewal' | 'ocr' | 'dashboard'

export type PolicyStatus =
  | 'UPCOMING'
  | 'REQUESTED'
  | 'RECEIVED'
  | 'COMPLIANT'
  | 'NON_COMPLIANT'
  | 'CANCELLED'
  | 'FORCE_PLACED'

type StatusConfig = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  className: string
}

const statusConfig: Record<PolicyStatus, StatusConfig> = {
  UPCOMING: {
    label: 'Upcoming',
    icon: CircleDashedIcon,
    className: 'border-slate-200 bg-slate-100 text-slate-900',
  },
  REQUESTED: {
    label: 'Requested',
    icon: FileQuestionMarkIcon,
    className: 'border-blue-300 bg-blue-100 text-blue-900',
  },
  RECEIVED: {
    label: 'Received',
    icon: InboxIcon,
    className: 'border-sky-300 bg-sky-100 text-sky-900',
  },
  COMPLIANT: {
    label: 'Compliant',
    icon: BadgeCheckIcon,
    className: 'border-green-300 bg-green-100 text-green-900',
  },
  NON_COMPLIANT: {
    label: 'Non-Compliant',
    icon: XCircleIcon,
    className: 'border-red-300 bg-red-100 text-red-900',
  },
  CANCELLED: {
    label: 'Cancelled',
    icon: ShieldOffIcon,
    className: 'border-orange-300 bg-orange-100 text-orange-900',
  },
  FORCE_PLACED: {
    label: 'Force-Placed',
    icon: SirenIcon,
    className: 'border-purple-300 bg-purple-100 text-purple-900',
  },
}

export function PolicyStatusBadge({ status, className }: { status: PolicyStatus; className?: string }) {
  const { icon: Icon, label, className: statusClassName } = statusConfig[status]

  return (
    <div
      className={cn(
        'flex h-8 w-fit items-center gap-1.5 rounded-md border px-2.5 py-1 font-medium',
        statusClassName,
        className
      )}
    >
      <Icon className="size-4" />
      {label}
    </div>
  )
}

export default function RightPanel({ active, resetKey = 0 }: { active: SceneId; resetKey?: number }) {
  return (
    <div className="relative mx-auto h-[400px] w-full max-w-[600px] rounded-3xl border border-gray-200 bg-white p-4 shadow-xl lg:h-[600px] lg:w-[600px]">
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          {active === 'renewal' && <RenewalScene key={`renewal-${resetKey || 0}`} />}
          {active === 'ocr' && <OcrScene key={`ocr-${resetKey || 0}`} />}
          {active === 'dashboard' && <DashboardScene key={`dashboard-${resetKey || 0}`} />}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ---------- SCENE 1: RENEWALS (AI conversation + automation) ---------- */
function RenewalScene() {
  const [messages, setMessages] = React.useState<
    Array<{
      id: string
      type: 'ai' | 'user' | 'system'
      text: string
      timestamp: string
      avatar?: string
      name?: string
      badges?: Array<{ text: string; variant: string; icon?: any }>
    }>
  >([])
  const [hasStarted, setHasStarted] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Intersection Observer to detect when component is visible
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true)
          }
        })
      },
      {
        threshold: 0.1, // Trigger when 10% of the component is visible
        rootMargin: '0px 0px -50px 0px', // Start slightly before fully visible
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [hasStarted])

  React.useEffect(() => {
    if (!hasStarted) return

    const messageSequence = [
      {
        id: 'msg-1',
        type: 'system' as const,
        text: 'Policy #GL-2024-001 for Tech Innovations LLC is set to expire in 10 days (01/15/2025).',
        timestamp: '2h ago',
        label: 'Policy set to expire',
        badges: [
          { text: 'Policy #GL-2024-001', variant: 'blue', icon: XIcon },
          { text: '10 days to expiry', variant: 'orange', icon: XIcon },
        ],
      },
      {
        id: 'msg-2',
        type: 'system' as const,
        text: 'Called John Doe about the policy expiry. He asked for the portal link to upload the updated certificate.',
        timestamp: '2h ago',
        label: 'Called John Doe',
        badges: [
          { text: 'Phone Call', variant: 'gray', icon: XIcon },
          { text: 'Notes', variant: 'blue', icon: XIcon },
        ],
      },
      {
        id: 'msg-3',
        type: 'ai' as const,
        text: 'Sent agent a link to the portal to upload the updated certificate',
        timestamp: '1h ago',
        name: 'AI Assistant',
        label: 'Emailed John Doe',
        badges: [
          { text: '@ Email', variant: 'blue', icon: XIcon },
          { text: 'Portal Link', variant: 'blue', icon: XIcon },
        ],
        emailContent:
          "Hi John,\n\nHere's the portal link for you to upload your updated certificate:\n\nhttps://portal.bankwell.com/upload/GL-2024-001\n\nJust click the link, upload your file, and we'll take care of the rest!\n\nThanks,\nBankwell Insurance Automation",
      },
      {
        id: 'msg-4',
        type: 'system' as const,
        text: 'John Doe uploaded a new file for policy #4782',
        timestamp: '1h ago',
        label: 'Document uploaded from John Doe',
        badges: [
          { text: 'PDF Policy_4782_Certificate', variant: 'red', icon: XIcon },
          { text: '3/5 Checks', variant: 'red', icon: XIcon },
        ],
      },
      {
        id: 'msg-5',
        type: 'system' as const,
        text: 'Emailed agent with details on what the issues were, asking him to upload an updated certificate',
        timestamp: '1h ago',
        label: 'Emailed John Doe',
        badges: [
          { text: '@ Email', variant: 'blue', icon: XIcon },
          { text: 'Received With Errors', variant: 'red', icon: XIcon },
        ],
        emailContent:
          'Hi John,\n\nThanks for uploading the file. The policy you uploaded had a "$1,000,000" coverage amount instead of "$1,500,000".\n\nCould you please provide an updated certificate of insurance with these changes at your earliest convenience? As a reminder General Liability policy for ABC Manufacturing LLC (Policy #GL-2024-001) is set to expire on January 1, 2025 so it must be before then.\n\nBest regards,\nBankwell Insurance Automation',
      },
      {
        id: 'msg-6',
        type: 'system' as const,
        text: 'John Doe uploaded a new file for policy #4782',
        timestamp: '30m ago',
        label: 'Document uploaded from John Doe',
        badges: [
          {
            text: 'PDF Policy_4782_Certificate_v2',
            variant: 'green',
            icon: XIcon,
          },
          { text: '5/5 Checks', variant: 'green', icon: XIcon },
        ],
      },
      {
        id: 'msg-7',
        type: 'ai' as const,
        text: 'Policy is compliant. Emailing agent to let him know.',
        timestamp: '15m ago',
        name: 'AI Assistant',
        label: 'AI Assistant',
        badges: [{ text: '@ Email', variant: 'blue', icon: XIcon }],
        emailContent:
          'Hi John,\n\nPerfect! Everything looks good now. Thanks for the quick turnaround!\n\nYour policy is now fully compliant and ready to go.\n\nBest regards,\nBankwell Insurance Automation',
      },
      {
        id: 'msg-8',
        type: 'ai' as const,
        text: 'Policy marked as compliant in system. Renewal process complete.',
        timestamp: '10m ago',
        name: 'AI Assistant',
        label: 'AI Assistant',
        badges: [{ text: 'Compliant', variant: 'green', icon: BadgeCheckIcon }],
      },
    ]

    // Start with first message immediately
    setMessages([messageSequence[0]])

    let currentIndex = 1
    const interval = setInterval(() => {
      if (currentIndex < messageSequence.length) {
        setMessages((prev) => [...prev, messageSequence[currentIndex]])
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 1750) // 14 seconds / 8 messages = 1.75 seconds per message

    return () => clearInterval(interval)
  }, [hasStarted])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 h-full p-4"
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Renewal Automation</h3>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-600">Live</span>
          </div>
        </div>

        {/* Activity Feed */}
        <div ref={messagesEndRef} className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            {messages && messages.length > 0 ? (
              messages.map((message) => {
                if (!message) return null
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.1,
                    }}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      {message.type === 'ai' ? (
                        <>
                          <div className="flex size-8 items-center justify-center rounded-full bg-purple-500">
                            <span className="text-xs font-bold text-white">AI</span>
                          </div>
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900">
                                {(message as any).label || message.name}
                              </span>
                              <span className="text-xs text-gray-500">{message.timestamp}</span>
                            </div>
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3, duration: 0.4 }}
                              className="mb-3 text-sm text-gray-700"
                              dangerouslySetInnerHTML={{
                                __html: message.text.replace(/portal/g, '<u>portal</u>'),
                              }}
                            />
                            {(message as any).emailContent && (
                              <div className="mb-3 max-w-[400px] rounded-lg border border-gray-200 bg-gray-50 p-3">
                                <pre className="whitespace-pre-wrap font-sans text-xs text-gray-600">
                                  {(message as any).emailContent}
                                </pre>
                              </div>
                            )}
                            {message.badges && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.3 }}
                                className="flex flex-wrap gap-2"
                              >
                                {message.badges.map((badge, index) => (
                                  <Badge key={index} variant={badge.variant as any} icon={badge.icon}>
                                    {badge.text}
                                  </Badge>
                                ))}
                              </motion.div>
                            )}
                          </div>
                        </>
                      ) : message.type === 'user' ? (
                        <>
                          <div className="flex size-8 items-center justify-center rounded-full bg-gray-400">
                            <span className="text-xs font-bold text-white">{message.avatar || 'U'}</span>
                          </div>
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900">{message.name}</span>
                              <span className="text-xs text-gray-500">Commented {message.timestamp}</span>
                            </div>
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3, duration: 0.4 }}
                              className="text-sm text-gray-700"
                            >
                              {message.text}
                            </motion.p>
                          </div>
                        </>
                      ) : message.type === 'system' ? (
                        <>
                          <div
                            className={`flex size-8 items-center justify-center rounded-full ${
                              (message as any).label === 'Policy set to expire'
                                ? 'bg-orange-500'
                                : (message as any).label === 'Called John Doe'
                                  ? 'bg-green-500'
                                  : (message as any).label === 'Document uploaded from John Doe'
                                    ? 'bg-blue-500'
                                    : 'bg-purple-500'
                            }`}
                          >
                            {(message as any).label === 'Policy set to expire' ? (
                              <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (message as any).label === 'Called John Doe' ? (
                              <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                              </svg>
                            ) : (message as any).label === 'Document uploaded from John Doe' ? (
                              <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900">
                                {(message as any).label || 'System'}
                              </span>
                              <span className="text-xs text-gray-500">{message.timestamp}</span>
                            </div>
                            <p className="mb-3 text-sm text-gray-700">{message.text}</p>
                            {(message as any).emailContent && (
                              <div className="mb-3 max-w-[400px] rounded-lg border border-gray-200 bg-gray-50 p-3">
                                <pre className="whitespace-pre-wrap font-sans text-xs text-gray-600">
                                  {(message as any).emailContent}
                                </pre>
                              </div>
                            )}
                            {message.badges && (
                              <div className="flex flex-wrap gap-2">
                                {message.badges.map((badge, index) => (
                                  <Badge key={index} variant={badge.variant as any} icon={badge.icon}>
                                    {badge.text}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </>
                      ) : null}
                    </div>
                  </motion.div>
                )
              })
            ) : (
              <div className="py-8 text-center text-gray-500">No messages yet...</div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ---------- SCENE 2: OCR (ACORD form with scanning) ---------- */
function OcrScene() {
  const [scanComplete, setScanComplete] = React.useState(false)
  const [showError, setShowError] = React.useState(false)
  const [scannedFields, setScannedFields] = React.useState<Set<string>>(new Set())
  const formRef = React.useRef<HTMLDivElement>(null)
  const [scannerPosition, setScannerPosition] = React.useState(100)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setScanComplete(true)
    }, 5000)
    const errorTimer = setTimeout(() => {
      setShowError(true)
    }, 2000)
    return () => {
      clearTimeout(timer)
      clearTimeout(errorTimer)
    }
  }, [])

  // Update scanner position and fill fields as it passes
  React.useEffect(() => {
    if (!scanComplete && formRef.current) {
      const interval = setInterval(() => {
        setScannerPosition((prev) => {
          const newPos = prev + 4
          if (newPos >= 750) {
            setScanComplete(true)
            return 750
          }

          // Fill fields as scanner passes them
          if (newPos > 100 && !scannedFields.has('producer')) {
            setScannedFields((prev) => new Set([...prev, 'producer']))
          }
          if (newPos > 180 && !scannedFields.has('insured')) {
            setScannedFields((prev) => new Set([...prev, 'insured']))
          }
          if (newPos > 260 && !scannedFields.has('policy')) {
            setScannedFields((prev) => new Set([...prev, 'policy']))
          }
          if (newPos > 340 && !scannedFields.has('dates')) {
            setScannedFields((prev) => new Set([...prev, 'dates']))
          }
          if (newPos > 420 && !scannedFields.has('limits')) {
            setScannedFields((prev) => new Set([...prev, 'limits']))
          }
          if (newPos > 500 && !scannedFields.has('coverage')) {
            setScannedFields((prev) => new Set([...prev, 'coverage']))
          }
          if (newPos > 580 && !scannedFields.has('additional')) {
            setScannedFields((prev) => new Set([...prev, 'additional']))
          }
          if (newPos > 660 && !scannedFields.has('waiver')) {
            setScannedFields((prev) => new Set([...prev, 'waiver']))
          }
          if (newPos > 700 && !scannedFields.has('holder')) {
            setScannedFields((prev) => new Set([...prev, 'holder']))
          }
          if (newPos > 720 && !scannedFields.has('endorsements')) {
            setScannedFields((prev) => new Set([...prev, 'endorsements']))
          }

          // Keep scanner in the middle of the visible area
          if (formRef.current) {
            const containerHeight = formRef.current.clientHeight
            const middlePosition = containerHeight / 2
            const targetScroll = Math.max(0, newPos - middlePosition)
            formRef.current.scrollTop = Math.min(targetScroll, formRef.current.scrollHeight - containerHeight)
          }

          return newPos
        })
      }, 30)

      return () => clearInterval(interval)
    }
  }, [scanComplete, scannedFields])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 h-full p-4"
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Document OCR</h3>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
            <span className="text-xs text-gray-600">{scanComplete ? 'Complete' : 'Scanning'}</span>
          </div>
        </div>

        {/* ACORD Form */}
        <div
          ref={formRef}
          className="relative mb-4 overflow-y-auto rounded-lg border border-gray-200 bg-white p-4"
          style={{ height: '380px' }}
        >
          {/* Header */}
          <div className="mb-4 border-b pb-3 text-center">
            <div className="text-sm font-bold text-gray-800">CERTIFICATE OF LIABILITY INSURANCE</div>
            <div className="text-xs text-gray-600">ACORD 25 (2016/03)</div>
          </div>

          {/* Form Structure */}
          <div className="space-y-3 text-xs">
            {/* Producer Section */}
            <div className="rounded border border-gray-300 p-3">
              <div className="mb-2 font-medium text-gray-600">Producer:</div>
              <div
                className={`h-5 rounded ${scannedFields.has('producer') ? 'bg-blue-50 px-2 py-1 text-blue-900' : 'bg-gray-200'}`}
              >
                {scannedFields.has('producer') && 'ABC Insurance Agency'}
              </div>
            </div>

            {/* Insured Section */}
            <div className="rounded border border-gray-300 p-3">
              <div className="mb-2 font-medium text-gray-600">Insured:</div>
              <div
                className={`h-5 rounded ${scannedFields.has('insured') ? 'bg-blue-50 px-2 py-1 text-blue-900' : 'bg-gray-200'}`}
              >
                {scannedFields.has('insured') && 'Tech Innovations LLC'}
              </div>
            </div>

            {/* Policy Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded border border-gray-300 p-3">
                <div className="mb-2 font-medium text-gray-600">Policy #:</div>
                <div
                  className={`h-5 rounded ${scannedFields.has('policy') ? 'bg-blue-50 px-2 py-1 text-blue-900' : 'bg-gray-200'}`}
                >
                  {scannedFields.has('policy') && 'GL-2024-001'}
                </div>
              </div>
              <div className="rounded border border-gray-300 p-3">
                <div className="mb-2 font-medium text-gray-600">Effective Date:</div>
                <div
                  className={`h-5 rounded ${scannedFields.has('dates') ? 'bg-blue-50 px-2 py-1 text-blue-900' : 'bg-gray-200'}`}
                >
                  {scannedFields.has('dates') && '01/15/2024'}
                </div>
              </div>
              <div className="rounded border border-gray-300 p-3">
                <div className="mb-2 font-medium text-gray-600">Expiration Date:</div>
                <div
                  className={`h-5 rounded ${scannedFields.has('dates') ? 'bg-blue-50 px-2 py-1 text-blue-900' : 'bg-gray-200'}`}
                >
                  {scannedFields.has('dates') && '01/15/2025'}
                </div>
              </div>
              <div className="rounded border border-gray-300 p-3">
                <div className="mb-2 font-medium text-gray-600">Limits:</div>
                <div
                  className={`h-5 rounded ${scannedFields.has('limits') ? 'bg-blue-50 px-2 py-1 text-blue-900' : 'bg-gray-200'}`}
                >
                  {scannedFields.has('limits') && '$2M/$4M'}
                </div>
              </div>
            </div>

            {/* Coverage Section */}
            <div className="rounded border border-gray-300 p-3">
              <div className="mb-2 font-medium text-gray-600">Coverage Type:</div>
              <div
                className={`h-5 rounded ${scannedFields.has('coverage') ? 'bg-blue-50 px-2 py-1 text-blue-900' : 'bg-gray-200'}`}
              >
                {scannedFields.has('coverage') && 'General Liability'}
              </div>
            </div>

            {/* Additional Insured */}
            <div className="rounded border border-gray-300 p-3">
              <div className="mb-2 font-medium text-gray-600">Additional Insured:</div>
              <div
                className={`h-5 rounded ${scannedFields.has('additional') ? 'bg-red-50 px-2 py-1 text-red-900' : 'bg-gray-200'}`}
              >
                {scannedFields.has('additional') && 'MISSING - REQUIRED'}
              </div>
            </div>

            {/* Additional Form Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded border border-gray-300 p-3">
                <div className="mb-2 font-medium text-gray-600">Waiver of Subrogation:</div>
                <div
                  className={`h-5 rounded ${scannedFields.has('waiver') ? 'bg-blue-50 px-2 py-1 text-blue-900' : 'bg-gray-200'}`}
                >
                  {scannedFields.has('waiver') && 'Yes'}
                </div>
              </div>
              <div className="rounded border border-gray-300 p-3">
                <div className="mb-2 font-medium text-gray-600">Certificate Holder:</div>
                <div
                  className={`h-5 rounded ${scannedFields.has('holder') ? 'bg-blue-50 px-2 py-1 text-blue-900' : 'bg-gray-200'}`}
                >
                  {scannedFields.has('holder') && 'Saturn Financial'}
                </div>
              </div>
            </div>

            {/* Endorsements Section */}
            <div className="rounded border border-gray-300 p-3">
              <div className="mb-2 font-medium text-gray-600">Endorsements:</div>
              <div className="space-y-2">
                <div
                  className={`h-4 rounded ${scannedFields.has('endorsements') ? 'bg-blue-50 px-2 py-1 text-blue-900' : 'bg-gray-200'}`}
                >
                  {scannedFields.has('endorsements') && 'CG 20 10 04 13'}
                </div>
                <div
                  className={`h-4 rounded ${scannedFields.has('endorsements') ? 'bg-blue-50 px-2 py-1 text-blue-900' : 'bg-gray-200'}`}
                >
                  {scannedFields.has('endorsements') && 'CG 20 37 04 13'}
                </div>
                <div
                  className={`h-4 rounded ${scannedFields.has('endorsements') ? 'bg-blue-50 px-2 py-1 text-blue-900' : 'bg-gray-200'}`}
                >
                  {scannedFields.has('endorsements') && 'CG 20 26 04 13'}
                </div>
              </div>
            </div>
          </div>

          {/* Scanning beam */}
          {!scanComplete && (
            <div
              className="absolute left-0 z-20 h-1 w-full bg-blue-500 opacity-80 shadow-lg"
              style={{ top: `${scannerPosition}px` }}
            />
          )}
        </div>

        {/* Error Alert */}
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.3 }}
            className="rounded-lg border border-red-200 bg-red-50 p-3"
          >
            <div className="flex items-center gap-2">
              <AlertTriangleIcon className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">Missing Required Information</span>
            </div>
            <p className="mt-1 text-xs text-red-700">
              Additional Insured endorsement is missing. Please contact the broker to provide updated certificate.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

/* ---------- SCENE 3: DASHBOARD (enhanced analytics) ---------- */
function DashboardScene() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 h-full p-4"
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Portfolio Overview</h3>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-600">Live</span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <KPICard title="Active Loans" value="247" change="+12%" trend="up" delay={0} />
          <KPICard title="Compliant" value="98.2%" change="+0.3%" trend="up" delay={0.1} />
          <KPICard title="At Risk" value="8" change="-2" trend="down" delay={0.2} />
          <KPICard title="Escalations" value="3" change="+1" trend="up" delay={0.3} />
        </div>

        {/* Chart Area */}
        <div className="mb-4 min-h-0 flex-1 rounded-lg bg-gray-50 p-4">
          <div className="mb-3 text-sm font-medium text-gray-700">Compliance Trends (30 days)</div>
          <div className="flex h-20 items-end gap-1">
            {[65, 72, 68, 75, 78, 82, 85, 88, 91, 89, 93, 95].map((height, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t bg-blue-500 shadow-sm"
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.05 }}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-3 text-sm font-medium text-gray-700">Recent Activity</div>
          <div className="space-y-2">
            <ActivityItem text="Policy GL-2024-001 renewed" time="2m ago" status="success" delay={0.8} />
            <ActivityItem text="Missing endorsement flagged" time="5m ago" status="warning" delay={0.9} />
            <ActivityItem text="Broker contacted for ABC Corp" time="12m ago" status="info" delay={1.0} />
            <ActivityItem text="SLA breach warning for Tech Corp" time="15m ago" status="warning" delay={1.1} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ---------- Building blocks ---------- */
function Notification({
  icon,
  title,
  desc,
  status,
  delay,
}: {
  icon: string
  title: string
  desc: string
  status: 'success' | 'pending'
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-center gap-3 rounded-lg bg-white/10 p-3"
    >
      <div className="text-lg">{icon}</div>
      <div className="flex-1">
        <div className="text-sm font-medium text-white">{title}</div>
        <div className="text-xs text-white/70">{desc}</div>
      </div>
      <div className={`h-2 w-2 rounded-full ${status === 'success' ? 'bg-green-400' : 'bg-yellow-400'}`} />
    </motion.div>
  )
}

function FormField({
  label,
  value,
  highlight,
  missing,
}: {
  label: string
  value: string
  highlight?: boolean
  missing?: boolean
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="font-medium text-gray-600">{label}:</span>
      <div
        className={`rounded px-2 py-1 text-xs ${
          missing
            ? 'border border-red-200 bg-red-100 text-red-800'
            : highlight
              ? 'border border-green-200 bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
        }`}
      >
        {value || 'Missing'}
      </div>
    </div>
  )
}

function AIMessage({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-start gap-2"
    >
      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
        AI
      </div>
      <div className="max-w-[200px] rounded-lg bg-blue-50 px-2 py-1 text-xs leading-tight text-gray-800">{text}</div>
    </motion.div>
  )
}

function UserMessage({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-start justify-end gap-2"
    >
      <div className="max-w-[200px] rounded-lg bg-blue-500 px-2 py-1 text-xs leading-tight text-white">{text}</div>
      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-500 text-xs font-bold text-white">
        U
      </div>
    </motion.div>
  )
}

function AutomationStep({
  icon,
  title,
  desc,
  status,
  delay,
}: {
  icon: string
  title: string
  desc: string
  status: 'completed' | 'scheduled' | 'armed'
  delay: number
}) {
  const statusVariants = {
    completed: 'green' as const,
    scheduled: 'orange' as const,
    armed: 'blue' as const,
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-center gap-3 rounded-lg bg-gray-100 p-3"
    >
      <div className="text-lg">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-gray-900">{title}</div>
        <div className="truncate text-xs text-gray-600">{desc}</div>
      </div>
      <Badge
        variant={statusVariants[status]}
        icon={status === 'completed' ? BadgeCheckIcon : status === 'scheduled' ? AlertTriangleIcon : XIcon}
      >
        {status}
      </Badge>
    </motion.div>
  )
}

function ActivityItem({
  text,
  time,
  status,
  delay,
}: {
  text: string
  time: string
  status: 'success' | 'warning' | 'info'
  delay: number
}) {
  const statusVariants = {
    success: 'green' as const,
    warning: 'orange' as const,
    info: 'blue' as const,
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-center justify-between text-sm"
    >
      <div className="flex items-center gap-2">
        <Badge
          variant={statusVariants[status]}
          icon={status === 'success' ? BadgeCheckIcon : status === 'warning' ? AlertTriangleIcon : XIcon}
        >
          {text}
        </Badge>
      </div>
      <div className="text-xs text-gray-500">{time}</div>
    </motion.div>
  )
}

function KPICard({
  title,
  value,
  change,
  trend,
  delay,
}: {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="rounded-lg bg-gray-50 p-2"
    >
      <div className="mb-1 text-xs text-gray-600">{title}</div>
      <div className="mb-1 text-lg font-bold text-gray-900">{value}</div>
      <div className={`flex items-center gap-1 text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        <span>{trend === 'up' ? '↗' : '↘'}</span>
        {change}
      </div>
    </motion.div>
  )
}

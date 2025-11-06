import { Container } from '@/components/Container'
import Image from 'next/image'
import logoImage from '@/images/logos/logo.png'

export function Footer() {
  return (
    <footer className="bg-blue-900 pb-16 pt-24">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Product Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-sm text-blue-200 transition-colors hover:text-white">
                  Document Processing
                </a>
              </li>
              <li>
                <a href="#features" className="text-sm text-blue-200 transition-colors hover:text-white">
                  Compliance Tracking
                </a>
              </li>
              <li>
                <a href="#features" className="text-sm text-blue-200 transition-colors hover:text-white">
                  AI Outreach
                </a>
              </li>
              <li>
                <a href="#features" className="text-sm text-blue-200 transition-colors hover:text-white">
                  Audit Trail
                </a>
              </li>
              <li>
                <a href="#features" className="text-sm text-blue-200 transition-colors hover:text-white">
                  Validation Engine
                </a>
              </li>
            </ul>
          </div>

          {/* Features Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Features</h3>
            <ul className="space-y-3">
              <li>
                <a href="#showcase" className="text-sm text-blue-200 transition-colors hover:text-white">
                  Renewal Automation
                </a>
              </li>
              <li>
                <a href="#showcase" className="text-sm text-blue-200 transition-colors hover:text-white">
                  Document OCR
                </a>
              </li>
              <li>
                <a href="#showcase" className="text-sm text-blue-200 transition-colors hover:text-white">
                  Portfolio Overview
                </a>
              </li>
              <li>
                <a href="#showcase" className="text-sm text-blue-200 transition-colors hover:text-white">
                  Implementation
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <a href="#solutions" className="text-sm text-blue-200 transition-colors hover:text-white">
                  Insurance Compliance
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-sm text-blue-200 transition-colors hover:text-white">
                  Loan Servicing
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-sm text-blue-200 transition-colors hover:text-white">
                  Policy Management
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-sm text-blue-200 transition-colors hover:text-white">
                  Automated Workflows
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#company" className="text-sm text-blue-200 transition-colors hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#company" className="text-sm text-blue-200 transition-colors hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-blue-200 transition-colors hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#company" className="text-sm text-blue-200 transition-colors hover:text-white">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-blue-800 pt-8 md:flex-row">
          <div className="relative mb-4 flex h-8 w-32 items-center justify-center md:mb-0">
            <Image src={logoImage} alt="Saturn Logo" width={128} height={32} className="object-contain" />
          </div>
          <p className="text-sm text-blue-200">
            Copyright &copy; {new Date().getFullYear()} Saturn, Inc. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

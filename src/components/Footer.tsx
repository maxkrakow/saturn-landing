import { Container } from '@/components/Container'
import Image from 'next/image'
import logoImage from '@/images/logos/logo.png'

export function Footer() {
  return (
    <footer className="bg-blue-900 pt-24 pb-16">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Product Column */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-blue-200 hover:text-white text-sm transition-colors">Document Processing</a></li>
              <li><a href="#features" className="text-blue-200 hover:text-white text-sm transition-colors">Compliance Tracking</a></li>
              <li><a href="#features" className="text-blue-200 hover:text-white text-sm transition-colors">AI Outreach</a></li>
              <li><a href="#features" className="text-blue-200 hover:text-white text-sm transition-colors">Audit Trail</a></li>
              <li><a href="#features" className="text-blue-200 hover:text-white text-sm transition-colors">Validation Engine</a></li>
            </ul>
          </div>

          {/* Features Column */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Features</h3>
            <ul className="space-y-3">
              <li><a href="#showcase" className="text-blue-200 hover:text-white text-sm transition-colors">Renewal Automation</a></li>
              <li><a href="#showcase" className="text-blue-200 hover:text-white text-sm transition-colors">Document OCR</a></li>
              <li><a href="#showcase" className="text-blue-200 hover:text-white text-sm transition-colors">Portfolio Overview</a></li>
              <li><a href="#showcase" className="text-blue-200 hover:text-white text-sm transition-colors">Implementation</a></li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Solutions</h3>
            <ul className="space-y-3">
              <li><a href="#solutions" className="text-blue-200 hover:text-white text-sm transition-colors">Insurance Compliance</a></li>
              <li><a href="#solutions" className="text-blue-200 hover:text-white text-sm transition-colors">Loan Servicing</a></li>
              <li><a href="#solutions" className="text-blue-200 hover:text-white text-sm transition-colors">Policy Management</a></li>
              <li><a href="#solutions" className="text-blue-200 hover:text-white text-sm transition-colors">Automated Workflows</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#company" className="text-blue-200 hover:text-white text-sm transition-colors">About</a></li>
              <li><a href="#company" className="text-blue-200 hover:text-white text-sm transition-colors">Careers</a></li>
              <li><a href="#contact" className="text-blue-200 hover:text-white text-sm transition-colors">Contact</a></li>
              <li><a href="#company" className="text-blue-200 hover:text-white text-sm transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-blue-800 flex flex-col md:flex-row items-center justify-between">
          <div className="relative w-32 h-8 flex items-center justify-center mb-4 md:mb-0">
            <Image
              src={logoImage}
              alt="Saturn Logo"
              width={128}
              height={32}
              className="object-contain"
            />
          </div>
          <p className="text-blue-200 text-sm">
            Copyright &copy; {new Date().getFullYear()} Saturn, Inc. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

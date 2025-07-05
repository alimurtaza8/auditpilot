'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowUpRight } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const demoLink = "https://link.businesscompliance.ai/widget/bookings/gladysmarketing/consultationcall-cf8ace7c-af20-4a3a-a9bb-819e84589690-8cee7b71-bedb-434d-9062-4a3066eb9673";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-8">
        <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Schedule a Demo</DialogTitle>
            <DialogDescription>
                Ready to see AuditPilot™ in action? Schedule your personalized demo today.
            </DialogDescription>
        </DialogHeader>
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <h3 className="font-semibold text-lg text-slate-800">Quick Demo Booking</h3>
            <p className="mt-2 text-slate-600 max-w-sm mx-auto">
                Click the button below to access our calendar and schedule your
                personalized AuditPilot™ demo.
            </p>
            <a href={demoLink} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block w-full">
                <Button className="w-full bg-gray-800 hover:bg-gray-900 text-base py-6">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Demo Now
                    <ArrowUpRight className="w-5 h-5 ml-2" />
                </Button>
            </a>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
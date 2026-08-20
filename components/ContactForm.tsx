'use client'

import { useState, type FormEvent } from 'react'
import { Send, Mail, Linkedin, Github, ExternalLink, MessageCircle } from 'lucide-react'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      {/* Formulaire */}
      <div>
        {submitted ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8">
            <p className="text-lg font-semibold text-emerald-700">Merci ! Votre message a bien été envoyé.</p>
            <p className="mt-2 text-sm text-emerald-600">Je vous répondrai dans les meilleurs délais.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-neutral-700">Nom</label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                className="w-full min-w-0 rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-neutral-700">Email</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                className="w-full min-w-0 rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
            <div>
              <label htmlFor="subject" className="mb-2 block text-sm font-medium text-neutral-700">Sujet</label>
              <input
                id="subject"
                type="text"
                required
                className="w-full min-w-0 rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-neutral-700">Message</label>
              <textarea
                id="message"
                rows={5}
                required
                className="w-full min-w-0 resize-none rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
            <button
              type="submit"
              className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/20"
            >
              <Send size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              Envoyer
            </button>
          </form>
        )}
      </div>

      {/* Liens directs */}
      <div className="space-y-4">
        <h3 className="mb-6 text-lg font-semibold">Autres moyens de contact</h3>
        {[
          { icon: Mail, label: 'Email', value: 'rodrigueassogba963@gmail.com', href: 'mailto:rodrigueassogba963@gmail.com' },
          { icon: Linkedin, label: 'LinkedIn', value: '/in/olalékan-rodrigue-assogba-741945281', href: 'https://www.linkedin.com/in/olalékan-rodrigue-assogba-741945281?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
          { icon: Github, label: 'GitHub', value: '@olalekanrodrigue-ops', href: 'https://github.com/olalekanrodrigue-ops' },
          { icon: MessageCircle, label: 'WhatsApp', value: '+229 01 45 89 50 13', href: 'https://wa.me/2290145895013' },
          { icon: ExternalLink, label: 'CV', value: 'Consulter mon CV en ligne', href: '/cv/index.html' },
        ].map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="group flex items-center gap-4 rounded-2xl border border-neutral-200 p-5 transition-all duration-300 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-900/5 hover:-translate-y-0.5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 transition-colors group-hover:bg-blue-50">
              <Icon size={18} className="text-neutral-500 transition-colors group-hover:text-blue-600" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-neutral-900">{label}</p>
              <p className="truncate text-sm text-neutral-500">{value}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

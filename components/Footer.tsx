import Link from 'next/link'
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 text-white">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-sm font-semibold tracking-tight">Rodrigue Olalékan ASSOGBA</p>
            <p className="mt-3 text-sm text-neutral-400">
              Finance × Data × Digital
            </p>
            <p className="mt-4 text-xs leading-relaxed text-neutral-500">
              Je conçois et développe des solutions numériques à l&apos;intersection de la finance, de la donnée et des technologies.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-500">Navigation</p>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'À propos' },
                { href: '/projects', label: 'Projets' },
                { href: '/skills', label: 'Compétences' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-neutral-400 transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-neutral-500">Réseaux</p>
            <ul className="space-y-3">
              <li>
                <a href="https://github.com/olalekanrodrigue-ops" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors">
                  <Github size={14} /> GitHub <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/rodrigue-assogba" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors">
                  <Linkedin size={14} /> LinkedIn <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href="mailto:rodrigue@assogba.dev" className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors">
                  <Mail size={14} /> Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-8 text-center">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Rodrigue Olalékan ASSOGBA. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { CheckCircle2, ImagePlus, Send, Upload } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const MAX_PROJECT_PHOTOS = 2
const BUCKET = 'review-uploads'

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function uploadImage(file: File, folder: string) {
  if (!supabase) throw new Error('La connexion Supabase n’est pas configurée.')
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `${folder}/${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    contentType: file.type,
    upsert: false,
  })
  if (error) throw error
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}

export function ReviewForm() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [content, setContent] = useState('')
  const [project, setProject] = useState('')
  const [consent, setConsent] = useState(false)
  const [clientPhoto, setClientPhoto] = useState<File | null>(null)
  const [projectPhotos, setProjectPhotos] = useState<File[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function handleProjectPhotos(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).slice(0, MAX_PROJECT_PHOTOS)
    setProjectPhotos(files)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')

    if (!supabase) {
      setStatus('error')
      setErrorMessage('Le formulaire n’est pas encore connecté à Supabase.')
      return
    }

    if (!consent) {
      setStatus('error')
      setErrorMessage('Veuillez confirmer votre accord pour l’affichage public de votre avis et de vos photos.')
      return
    }

    if (projectPhotos.length > MAX_PROJECT_PHOTOS) {
      setStatus('error')
      setErrorMessage('Vous pouvez ajouter deux photos maximum des réalisations.')
      return
    }

    const files = [clientPhoto, ...projectPhotos].filter(Boolean) as File[]
    if (files.some((file) => file.size > 5 * 1024 * 1024)) {
      setStatus('error')
      setErrorMessage('Chaque image doit peser moins de 5 Mo.')
      return
    }

    setStatus('sending')

    try {
      const reviewSlug = `${slugify(name)}-${Date.now()}`
      const folder = reviewSlug
      const clientPhotoUrl = clientPhoto ? await uploadImage(clientPhoto, folder) : null
      const projectPhotoUrls = await Promise.all(projectPhotos.map((file) => uploadImage(file, folder)))

      const { error } = await supabase.from('reviews').insert({
        slug: reviewSlug,
        name: name.trim(),
        company: company.trim() || null,
        role: null,
        content: content.trim(),
        project: project.trim(),
        consent: true,
        client_photo_url: clientPhotoUrl,
        project_photo_urls: projectPhotoUrls,
      })

      if (error) throw error
      setStatus('success')
      setName('')
      setCompany('')
      setContent('')
      setProject('')
      setConsent(false)
      setClientPhoto(null)
      setProjectPhotos([])
    } catch (error) {
      console.error(error)
      setStatus('error')
      setErrorMessage('Impossible d’enregistrer votre avis pour le moment. Veuillez réessayer.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center sm:p-12">
        <CheckCircle2 className="mx-auto text-emerald-600" size={42} strokeWidth={1.5} />
        <h2 className="mt-5 text-2xl font-bold text-emerald-900">Merci pour votre témoignage.</h2>
        <p className="mx-auto mt-3 max-w-lg text-emerald-700">Votre avis et vos images sont maintenant publiés sur le portfolio.</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-7 rounded-full bg-emerald-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-800">Ajouter un autre avis</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-xl shadow-neutral-900/5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-neutral-700">Nom complet *<input value={name} onChange={(event) => setName(event.target.value)} required minLength={2} maxLength={120} className="mt-2 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 font-normal outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10" /></label>
        <label className="block text-sm font-medium text-neutral-700">Entreprise ou fonction<input value={company} onChange={(event) => setCompany(event.target.value)} maxLength={160} className="mt-2 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 font-normal outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10" /></label>
      </div>
      <label className="block text-sm font-medium text-neutral-700">Projet concerné *<input value={project} onChange={(event) => setProject(event.target.value)} required maxLength={160} placeholder="Ex. Portfolio professionnel, site e-commerce…" className="mt-2 w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 font-normal outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10" /></label>
      <label className="block text-sm font-medium text-neutral-700">Votre avis *<textarea value={content} onChange={(event) => setContent(event.target.value)} required minLength={10} maxLength={2000} rows={6} className="mt-2 w-full resize-y rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 font-normal leading-relaxed outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10" /></label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex cursor-pointer flex-col rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-5 text-sm font-medium text-neutral-700 transition hover:border-blue-400 hover:bg-blue-50/40">
          <span className="flex items-center gap-2"><Upload size={17} className="text-blue-600" /> Votre photo</span>
          <span className="mt-2 text-xs font-normal text-neutral-500">JPG, PNG ou WebP — facultatif</span>
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setClientPhoto(event.target.files?.[0] ?? null)} className="mt-4 text-xs" />
          {clientPhoto && <span className="mt-2 truncate text-xs text-blue-700">{clientPhoto.name}</span>}
        </label>
        <label className="flex cursor-pointer flex-col rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-5 text-sm font-medium text-neutral-700 transition hover:border-blue-400 hover:bg-blue-50/40">
          <span className="flex items-center gap-2"><ImagePlus size={17} className="text-blue-600" /> Photos des réalisations</span>
          <span className="mt-2 text-xs font-normal text-neutral-500">Deux photos maximum — facultatif</span>
          <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleProjectPhotos} className="mt-4 text-xs" />
          {projectPhotos.length > 0 && <span className="mt-2 text-xs text-blue-700">{projectPhotos.length} photo{projectPhotos.length > 1 ? 's' : ''} sélectionnée{projectPhotos.length > 1 ? 's' : ''}</span>}
        </label>
      </div>

      <label className="flex items-start gap-3 rounded-2xl bg-blue-50/70 p-4 text-sm text-neutral-700"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="mt-1 h-4 w-4 accent-blue-600" /> <span>J’autorise l’affichage public de mon avis, de mon nom et des photos envoyées sur le portfolio ASSOGBA.tech.</span></label>

      {status === 'error' && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>}

      <button type="submit" disabled={status === 'sending'} className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-blue-600 disabled:cursor-wait disabled:opacity-60"><Send size={16} />{status === 'sending' ? 'Publication en cours…' : 'Publier mon avis'}</button>
    </form>
  )
}

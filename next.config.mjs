import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // remarkPlugins / rehypePlugins à ajouter ici si besoin
    // (ex: rehype-slug pour les ancres de titres, remark-gfm pour les tableaux)
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)

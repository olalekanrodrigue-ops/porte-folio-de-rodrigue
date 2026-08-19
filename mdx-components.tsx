import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl" {...props} />
    ),
    h2: (props) => (
      <h2 className="mt-12 mb-4 text-2xl font-bold tracking-tight" {...props} />
    ),
    h3: (props) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight" {...props} />
    ),
    h4: (props) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold" {...props} />
    ),
    p: (props) => <p className="mb-4 leading-relaxed text-neutral-700" {...props} />,
    strong: (props) => <strong className="font-semibold text-neutral-900" {...props} />,
    em: (props) => <em className="italic" {...props} />,
    ul: (props) => <ul className="mb-4 list-disc pl-6 space-y-1.5" {...props} />,
    ol: (props) => <ol className="mb-4 list-decimal pl-6 space-y-1.5" {...props} />,
    li: (props) => <li className="leading-relaxed text-neutral-700" {...props} />,
    blockquote: (props) => (
      <blockquote className="my-6 border-l-4 border-blue-600 pl-6 italic text-neutral-600" {...props} />
    ),
    a: (props) => (
      <a className="underline underline-offset-2 break-all text-blue-600 hover:text-blue-800 transition-colors" {...props} />
    ),
    code: (props) => (
      <code className="whitespace-nowrap rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-neutral-800" {...props} />
    ),
    pre: (props) => (
      <pre className="my-6 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-100" {...props} />
    ),
    table: (props) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm" {...props} />
      </div>
    ),
    thead: (props) => <thead className="border-b border-neutral-200" {...props} />,
    tbody: (props) => <tbody className="divide-y divide-neutral-100" {...props} />,
    tr: (props) => <tr className="text-left" {...props} />,
    th: (props) => <th className="py-2 pr-4 font-semibold text-neutral-900" {...props} />,
    td: (props) => <td className="py-2 pr-4 text-neutral-600" {...props} />,
    hr: () => <hr className="my-8 border-neutral-200" />,
    img: (props) => (
      <img className="my-6 max-w-full rounded-lg" {...props} alt={props.alt || ''} />
    ),
    ...components,
  }
}

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(async () => {
  const plugins = [react(), tailwindcss()]

  try {
    // @ts-expect-error Local dev helper has no published type declarations.
    const m = await import('./.vite-source-tags.js')
    plugins.push(m.sourceTags())
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Optional source tags plugin unavailable.', error)
    }
  }

  return {
    plugins,
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      globals: true,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (!id.includes('node_modules')) return

            if (id.includes('framer-motion') || id.includes('motion-dom')) return 'motion-vendor'
            if (id.includes('@supabase')) return 'supabase-vendor'
          },
        },
      },
    },
  }
})

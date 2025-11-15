Check your codebase for performance bottlenecks and opportunities for optimization.

1. Measure current performance:
   - For web apps, run [Lighthouse](https://developers.google.com/web/tools/lighthouse/) (`npx lighthouse http://localhost:3000 --view`) or open Chrome DevTools (F12 → Lighthouse) and run a performance audit.
   - For React/Next.js apps, use React DevTools Profiler (see [docs](https://react.dev/learn/profile-a-react-app-for-performance)).
   - For Node.js/server, run with `NODE_ENV=production` and use `clinic.js doctor -- node server.js` or similar profiling tools.

2. Analyze results:
   - Review the generated report.
   - Focus on slow JavaScript execution, large bundles, layout shifts (CLS), long Time to Interactive (TTI), unoptimized images, and redundant re-renders.

3. Address performance issues:
   - Optimize expensive computations and components; memoize as needed (`useMemo`, `useCallback`).
   - Avoid unnecessary renders; use React.memo and correct dependency arrays.
   - Lazy-load non-critical components with dynamic import/code splitting.
   - Use `content-visibility: auto` or list virtualization for dense/long lists.
   - Compress and optimize images; serve modern formats (WebP, AVIF).
   - Remove unused code, dependencies, and CSS.
   - Use server-side rendering (SSR), static generation (SSG), and cache data aggressively.
   - Minimize render-blocking resources; preload critical assets.
   - Avoid layout thrashing; batch DOM reads/writes.
   - Minimize network requests and leverage HTTP caching.

4. Re-test:
   - Run the chosen performance audit again and compare results.
   - Repeat steps 2–4 until acceptable scores and user experience are achieved.

5. CI/CD Integration (recommended):
   - Add Lighthouse CI: `npx lhci autorun` in your workflows for regression tracking.
   - Monitor Core Web Vitals in production (e.g., Vercel Analytics, Google Search Console).

Pro Tips:
- Always test with production builds (`next build && next start`) for accurate results.
- Emulate slow network/CPU with DevTools to uncover real-world bottlenecks.
- For Next.js: avoid dynamic route rendering when static generation is possible.
- Verify that all image dimensions are specified to prevent layout shift (CLS).
- Use tabular numbers for data display (see globals.css for `font-variant-numeric`).

References:
- https://web.dev/optimize-performance/
- https://nextjs.org/docs/advanced-features/measuring-performance
- https://react.dev/reference/react/useMemo#optimizing-performance


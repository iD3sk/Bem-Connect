import { apiFetch } from '@/lib/api';

/**
 * Fetches the health-check status from the Express backend.
 * Uses { cache: 'no-store' } so it always gets fresh data (SSR, not static).
 */
async function getHealthStatus() {
  try {
    const data = await apiFetch('/health');
    return data;
  } catch {
    return null;
  }
}

export default async function Home() {
  const health = await getHealthStatus();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center gap-8 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
          BEM Connect
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Next.js Frontend &harr; Express Backend
        </p>

        {/* Backend Health Status Card */}
        <div className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
            Backend Health Check
          </h2>

          {health ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
                <span className="text-zinc-700 dark:text-zinc-300">
                  Status: <strong>{health.status}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block w-3 h-3 rounded-full ${
                    health.database === 'connected'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                />
                <span className="text-zinc-700 dark:text-zinc-300">
                  Database: <strong>{health.database}</strong>
                </span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
                Checked at: {health.timestamp}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
              <span className="text-zinc-700 dark:text-zinc-300">
                Backend is <strong>unreachable</strong>. Make sure Express is
                running on port 5000.
              </span>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-400 dark:text-zinc-600">
          This page is server-rendered by Next.js and fetches data from{' '}
          <code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400">
            {process.env.NEXT_PUBLIC_API_URL}/health
          </code>
        </p>
      </main>
    </div>
  );
}

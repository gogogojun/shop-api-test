export async function apiGet<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  const base = process.env.NEXT_PUBLIC_API_BASE || "";
  const url = new URL(path, base);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    });
  }
  const res = await fetch(url.toString(), { cache: "no-store" }); // 항상 최신
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API ${res.status} ${res.statusText}: ${body}`);
  }
  return (await res.json()) as T;
}
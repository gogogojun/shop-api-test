import Image from "next/image"
import Link from "next/link"

type Product = { id: number; name: string; price: number | string; imageUrl?: string }
type Page<T> = { content: T[] }

async function apiGet<T>(path: string, params?: Record<string, string | number>) {
  const base = process.env.NEXT_PUBLIC_API_BASE || ""
  const url = new URL(path, base)
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)))
  const res = await fetch(url.toString(), { cache: "no-store" })
  if (!res.ok) throw new Error(await res.text())
  return (await res.json()) as T
}

async function fetchProductsByCategoryId(id: string) {
  const page = await apiGet<Page<Product>>("/api/products", { categoryId: id, page: 0, size: 30 })
  return page.content
}

export default async function CategoryPage(
  { params }: { params: Promise<{ id: string }> }
) {
  // ✅ params는 Promise라서 먼저 await
  const { id } = await params

  // ✅ 이후부터는 id 변수만 사용 (params.id 쓰지 말기)
  const products = await fetchProductsByCategoryId(id)

  return (
    <main className="container py-8">
      <h1 className="text-2xl font-bold mb-6">카테고리 #{id}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} className="group block border border-gray-800 rounded-xl overflow-hidden">
            <div className="relative aspect-square">
              <Image src={p.imageUrl || "/placeholder.svg"} alt={p.name} fill className="object-cover" />
            </div>
            <div className="p-3">
              <div className="font-semibold">{p.name}</div>
              <div className="text-gray-300">{Number(p.price).toLocaleString()}원</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

import Image from "next/image"

type Product = { id:number; name:string; price:number|string; imageUrl?:string; description?:string }

async function apiGet<T>(path: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE || ""
  const res = await fetch(new URL(path, base), { cache: "no-store" })
  if (!res.ok) throw new Error(await res.text())
  return (await res.json()) as T
}

async function fetchProduct(id: string) {
  return await apiGet<Product>(`/api/products/${id}`)
}

export default async function ProductDetail(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const p = await fetchProduct(id)

  return (
    <main className="container py-8 grid md:grid-cols-2 gap-8">
      <div className="relative aspect-square border border-gray-800 rounded-2xl overflow-hidden">
        <Image src={p.imageUrl || "/placeholder.svg"} alt={p.name} fill className="object-cover" />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-3">{p.name}</h1>
        <div className="text-xl text-gray-300 mb-6">{Number(p.price).toLocaleString()}원</div>
        {p.description && <p className="text-gray-400">{p.description}</p>}
      </div>
    </main>
  )
}

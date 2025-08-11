import Image from "next/image"
import Link from "next/link"
import { apiGet } from "@/lib/api"

type Product = { id: number; name: string; price: number | string; imageUrl?: string }
type Page<T> = { content: T[] }

export async function ProductGrid() {
  const page = await apiGet<Page<Product>>("/api/products", { page: 0, size: 12 })
  const products = page.content

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">추천 상품</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="group block border border-gray-800 rounded-xl overflow-hidden"
            >
              <div className="relative aspect-square">
                <Image
                  src={p.imageUrl || "/placeholder.svg"}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <div className="font-semibold">{p.name}</div>
                <div className="text-gray-300">{Number(p.price).toLocaleString()}원</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"
import { apiGet } from "@/lib/api"

type Category = { id: number; name: string; imageUrl?: string; description?: string }

export async function CategorySection() {
  const categories = await apiGet<Category[]>("/api/categories")

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">카테고리</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.id}`}
              className="group relative rounded-2xl overflow-hidden border border-gray-800 p-6"
            >
              <div className="text-lg font-semibold">{c.name}</div>
              {c.description && <p className="text-sm text-gray-400">{c.description}</p>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client';

import Link from 'next/link';
import Image from 'next/image';

// Mock data
const newsItems = [
    {
        id: 1,
        title: "Henderson helps England into World Cup",
        excerpt: "Ultrices nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus.",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop",
        category: "Gossip",
        date: "June 20, 2026",
        categoryColor: "bg-brand-red",
    },
    {
        id: 2,
        title: "Henderson helps England into World Cup",
        excerpt: "Ultrices nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus.",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop",
        category: "Transfers",
        date: "June 20, 2026",
        categoryColor: "bg-brand-red",
    },
    {
        id: 3,
        title: "Henderson helps England into World Cup",
        excerpt: "Ultrices nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus.",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1000&auto=format&fit=crop",
        category: "European",
        date: "June 20, 2026",
        categoryColor: "bg-brand-red",
    },
];

export function NewsGrid() {
    return (
        <section className="py-12 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                {/* Section Header */}
                <div className="bg-brand-black text-white px-4 py-2 flex items-center justify-between mb-6">
                    <h2 className="font-bold uppercase tracking-wider text-sm">Top News</h2>
                    <div className="hidden md:flex gap-4 text-xs font-medium">
                        <Link href="#" className="bg-brand-red px-2 py-1">All Posts</Link>
                        <Link href="#" className="hover:text-brand-gold px-2 py-1">Scores & Fixtures</Link>
                        <Link href="#" className="hover:text-brand-gold px-2 py-1">Transfers</Link>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsItems.map((item) => (
                        <article key={item.id} className="bg-white group shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className={`absolute top-4 left-4 ${item.categoryColor} text-white text-xs font-bold px-2 py-1 uppercase`}>
                                    {item.category}
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs text-gray-500">{item.date}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-brand-red transition-colors">
                                    <Link href={`/news/${item.id}`}>
                                        {item.title}
                                    </Link>
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-3">
                                    {item.excerpt}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

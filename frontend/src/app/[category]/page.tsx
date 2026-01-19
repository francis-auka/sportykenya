import Link from 'next/link';
import Image from 'next/image';


// Mock data
const articles = [
    {
        id: 1,
        title: "Henderson helps England into World Cup",
        excerpt: "Ultrices nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus.",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop",
        category: "Football",
        date: "June 20, 2026",
    },
    {
        id: 2,
        title: "Kipchoge breaks another record",
        excerpt: "The legendary marathon runner has done it again in Berlin.",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop",
        category: "Athletics",
        date: "June 19, 2026",
    },
    {
        id: 3,
        title: "Harambee Stars preparation for AFCON",
        excerpt: "The national team is in high spirits ahead of the tournament.",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1000&auto=format&fit=crop",
        category: "Football",
        date: "June 18, 2026",
    },
];

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category).replace(/-/g, ' ');

    // Capitalize for display
    const title = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-brand-black border-l-4 border-brand-red pl-4">
                        {title} News
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((item) => (
                        <article key={item.id} className="bg-white group shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-brand-red text-xs font-bold uppercase">
                                        {item.category}
                                    </span>
                                    <span className="text-xs text-gray-500">{item.date}</span>
                                </div>
                                <h2 className="text-xl font-bold mb-3 leading-tight group-hover:text-brand-red transition-colors">
                                    <Link href={`/news/${item.id}`}>
                                        {item.title}
                                    </Link>
                                </h2>
                                <p className="text-gray-600 text-sm line-clamp-3">
                                    {item.excerpt}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}

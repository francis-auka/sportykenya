import Image from 'next/image';
import { notFound } from 'next/navigation';

// Mock data function - replace with Sanity fetch later
async function getArticle(slug: string) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (slug === 'not-found') return null;

    return {
        title: "Wales and the World Cup: Ben Woodburn",
        category: "FA Cup",
        date: "June 17, 2026",
        author: "SportyKenya Team",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070&auto=format&fit=crop",
        content: [
            "Liverpool have opened talks with Stoke City over a £13m deal for Xherdan Shaqiri.",
            "The Switzerland international has a release clause in his contract following the Potters' relegation to the Championship.",
            "Jurgen Klopp has been looking to add depth to his attacking options and has identified the 26-year-old as a target.",
            "Shaqiri joined Stoke from Inter Milan in 2015 and has scored 15 goals in 84 Premier League appearances.",
        ],
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        notFound();
    }

    return (
        <article className="bg-white min-h-screen pb-12">
            {/* Hero Image */}
            <div className="relative h-[400px] lg:h-[500px] w-full">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 lg:p-12 max-w-7xl mx-auto">
                    <span className="bg-brand-red text-white text-sm font-bold px-3 py-1 uppercase mb-4 inline-block">
                        {article.category}
                    </span>
                    <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight max-w-4xl">
                        {article.title}
                    </h1>
                    <div className="flex items-center text-gray-300 text-sm gap-4">
                        <span>By <span className="text-white font-semibold">{article.author}</span></span>
                        <span>•</span>
                        <span>{article.date}</span>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="prose prose-lg prose-red max-w-none">
                    {article.content.map((paragraph, index) => (
                        <p key={index} className="text-gray-800 leading-relaxed mb-6">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </article>
    );
}

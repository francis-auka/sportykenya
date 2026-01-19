import Link from 'next/link';
import Image from 'next/image';

// Mock data
const featuredStory = {
    id: 1,
    title: "Wales and the World Cup: Ben Woodburn",
    category: "FA Cup",
    date: "June 17, 2026",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070&auto=format&fit=crop", // Football stadium
    excerpt: "Liverpool open talks for £13m Shaqiri",
};

const subStories = [
    {
        id: 2,
        title: "Liverpool open talks for £13m Shaqiri",
        date: "June 12, 2026",
        category: "Transfers",
    },
    {
        id: 3,
        title: "Wales and the World Cup: Ben Woodburn",
        date: "June 17, 2026",
        category: "World Cup",
        highlight: true,
    },
    {
        id: 4,
        title: "Madrid eye big-name Ronaldo replacements",
        date: "June 14, 2026",
        category: "La Liga",
    },
];

export function HeroSection() {
    return (
        <section className="bg-brand-black text-white">
            <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3">
                {/* Main Featured Story */}
                <div className="lg:col-span-2 relative min-h-[400px] flex items-end p-8">
                    <Image
                        src={featuredStory.image}
                        alt={featuredStory.title}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="relative z-10 max-w-2xl">
                        <span className="bg-brand-red text-white text-xs font-bold px-2 py-1 uppercase mb-2 inline-block">
                            {featuredStory.category}
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-2 leading-tight">
                            <Link href={`/news/${featuredStory.id}`} className="hover:text-brand-gold transition-colors">
                                {featuredStory.title}
                            </Link>
                        </h2>
                        <p className="text-gray-300 text-sm">{featuredStory.date}</p>
                    </div>
                </div>

                {/* Side Stories */}
                <div className="bg-gray-900 flex flex-col">
                    {subStories.map((story) => (
                        <div
                            key={story.id}
                            className={`flex-1 p-6 border-b border-gray-800 last:border-0 flex flex-col justify-center ${story.highlight ? 'bg-brand-red' : 'hover:bg-gray-800'} transition-colors`}
                        >
                            <div className="text-xs text-gray-400 mb-1 flex justify-between">
                                <span>{story.category}</span>
                                <span>{story.date}</span>
                            </div>
                            <h3 className="text-xl font-bold leading-snug">
                                <Link href={`/news/${story.id}`} className="hover:text-gray-300">
                                    {story.title}
                                </Link>
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

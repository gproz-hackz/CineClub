import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Fetch data from Backend
async function getMovie(year: string, slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/${year}/${slug}`, {
    next: { revalidate: 3600 } // ISR: Revalidate every hour
  });
  if (!res.ok) return null;
  return res.json();
}

// 1. Dynamic SEO Metadata
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const movie = await getMovie(params.year, params.slug);
  if (!movie) return {};
  
  return {
    title: `${movie.title} (${movie.year}) - Download Free`,
    description: movie.synopsis,
    openGraph: {
      images: [movie.posterPath],
    },
  };
}

// 2. Page Component
export default async function MoviePage({ params }: any) {
  const movie = await getMovie(params.year, params.slug);
  
  if (!movie) notFound();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="relative aspect-[2/3]">
          <img 
            src={movie.posterPath} 
            alt={movie.title} 
            className="rounded-xl shadow-2xl object-cover"
          />
        </div>

        {/* Info */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <div className="flex gap-2 text-gray-400">
            <span>{movie.year}</span> • <span>{movie.genres.join(', ')}</span>
          </div>
          
          <p className="text-lg leading-relaxed text-gray-300">
            {movie.synopsis || "No synopsis available."}
          </p>

          {/* Download Section (Protected logic handled by button component) */}
          <div className="bg-gray-800 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-semibold mb-4 text-green-400">Downloads</h3>
            <div className="space-y-3">
              {movie.downloads.map((link: any, idx: number) => (
                <a 
                  key={idx} 
                  href={link.url}
                  className="block w-full text-center py-3 bg-blue-600 hover:bg-blue-700 rounded transition"
                >
                  Download {link.quality}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

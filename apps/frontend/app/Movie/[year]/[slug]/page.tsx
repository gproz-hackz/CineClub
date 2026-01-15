'use client'; // 👈 Must be a client component now

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';

export default function MoviePage({ params }: any) {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from your LIVE backend URL, not localhost
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/${params.year}/${params.slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch(() => notFound());
  }, [params.year, params.slug]);

  if (loading) return <div className="text-white p-10">Loading movie details...</div>;
  if (!movie) return null;

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
       {/* UI Code remains the same as before */}
       <h1 className="text-5xl font-bold">{movie.title}</h1>
       {/* ... */}
    </main>
  );
}

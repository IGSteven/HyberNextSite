import Link from 'next/link';

export default function PartnerNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-6">Partner Not Found</h1>
      <p className="text-lg mb-8">
        Sorry, the partner you're looking for doesn't exist or may have been removed.
      </p>
      <Link 
        href="/partners"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition-colors duration-300"
      >
        Return to Partners
      </Link>
    </div>
  );
}
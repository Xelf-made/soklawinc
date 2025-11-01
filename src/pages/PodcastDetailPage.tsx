import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Home, ChevronRight, ArrowLeft, ArrowRight, Headphones } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getPodcastBySlug, getNextPodcast } from '../data/podcastsData';

const PodcastDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const podcast = slug ? getPodcastBySlug(slug) : undefined;
  const nextPodcast = slug ? getNextPodcast(slug) : undefined;

  if (!podcast) {
    return (
      <div className="min-h-screen bg-[#f9f7f1]">
        <Navbar />
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Podcast Episode Not Found
            </h1>
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Return to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f7f1]">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </button>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-500">Podcasts</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium truncate">{podcast.title}</span>
          </nav>

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 mb-12 text-white">
            <div className="flex items-start gap-6 mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Headphones className="h-10 w-10" />
              </div>
              <div>
                <p className="text-blue-100 mb-2">
                  Season {podcast.season} • Episode {podcast.episodeNumber}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {podcast.heroTitle}
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 max-w-4xl">
                  {podcast.heroSummary}
                </p>
              </div>
            </div>
          </div>

          {/* Episode Info */}
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-10 mb-8">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase">Host</p>
                <p className="text-xl font-semibold text-gray-900">{podcast.host}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase">Duration</p>
                <p className="text-xl font-semibold text-gray-900">{podcast.duration}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase">Published</p>
                <p className="text-xl font-semibold text-gray-900">
                  {new Date(podcast.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {podcast.guests && podcast.guests.length > 0 && (
              <div className="border-t pt-6">
                <p className="text-gray-600 text-sm font-medium uppercase mb-3">
                  Guests
                </p>
                <div className="flex flex-wrap gap-2">
                  {podcast.guests.map((guest, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {guest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Episode Content */}
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-10 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Episode Summary</h2>
            <div className="prose prose-lg max-w-none">
              {podcast.content.split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Key Topics */}
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-10 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Topics Discussed</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {podcast.keyTopics.map((topic, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full"></div>
                  <p className="text-gray-800 font-medium">{topic}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </button>

            {nextPodcast && (
              <button
                onClick={() => navigate(`/podcasts/${nextPodcast.slug}`)}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <span>Next Episode: {nextPodcast.title}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PodcastDetailPage;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Home, ChevronRight, ArrowLeft, ArrowRight, FileText, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getResourceBySlug, getNextResource } from '../data/resourcesData';

const ResourceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const resource = slug ? getResourceBySlug(slug) : undefined;
  const nextResource = slug ? getNextResource(slug) : undefined;

  if (!resource) {
    return (
      <div className="min-h-screen bg-[#f9f7f1]">
        <Navbar />
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Resource Not Found
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

  const resourceTypeLabel = {
    guide: 'Guide',
    whitepaper: 'White Paper',
    toolkit: 'Toolkit',
    report: 'Report',
  }[resource.resourceType];

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
            <span className="text-gray-500">Resources</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium truncate">{resource.title}</span>
          </nav>

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 mb-12 text-white">
            <div className="flex items-start gap-6 mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <FileText className="h-10 w-10" />
              </div>
              <div>
                <p className="text-blue-100 mb-2">{resourceTypeLabel}</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {resource.heroTitle}
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 max-w-4xl">
                  {resource.heroSummary}
                </p>
              </div>
            </div>
          </div>

          {/* Resource Info */}
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-10 mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase">Type</p>
                <p className="text-xl font-semibold text-gray-900">{resourceTypeLabel}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase">Author</p>
                <p className="text-xl font-semibold text-gray-900">{resource.author}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium uppercase">Published</p>
                <p className="text-xl font-semibold text-gray-900">
                  {new Date(resource.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Resource Content */}
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-10 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
            <div className="prose prose-lg max-w-none">
              {resource.content.split('\n\n').map((section, index) => {
                const lines = section.split('\n');
                if (lines[0].startsWith('##')) {
                  return (
                    <div key={index}>
                      <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                        {lines[0].replace('##', '').trim()}
                      </h3>
                      {lines.slice(1).map((line, lineIndex) => (
                        <p
                          key={lineIndex}
                          className="text-gray-700 leading-relaxed mb-3"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  );
                } else if (lines[0].startsWith('###')) {
                  return (
                    <div key={index}>
                      <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                        {lines[0].replace('###', '').trim()}
                      </h4>
                      {lines.slice(1).map((line, lineIndex) => (
                        <p
                          key={lineIndex}
                          className="text-gray-700 leading-relaxed mb-2"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  );
                } else if (lines[0].startsWith('-')) {
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 mb-4">
                      {lines.map((line, lineIndex) => (
                        <li
                          key={lineIndex}
                          className="text-gray-700 leading-relaxed"
                        >
                          {line.replace('-', '').trim()}
                        </li>
                      ))}
                    </ul>
                  );
                } else {
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                      {section}
                    </p>
                  );
                }
              })}
            </div>
          </div>

          {/* Key Points */}
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-10 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Points</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {resource.keyPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-800">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Topics */}
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-10 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Topics</h2>
            <div className="flex flex-wrap gap-3">
              {resource.relatedTopics.map((topic, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Download Section */}
          {resource.downloadUrl && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 md:p-10 mb-12">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Download This Resource
                  </h3>
                  <p className="text-gray-600">
                    Get the complete document for offline reading and reference
                  </p>
                </div>
                <a
                  href={resource.downloadUrl}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Download className="h-5 w-5" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </button>

            {nextResource && (
              <button
                onClick={() => navigate(`/resources/${nextResource.slug}`)}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <span>Next: {nextResource.title}</span>
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

export default ResourceDetailPage;

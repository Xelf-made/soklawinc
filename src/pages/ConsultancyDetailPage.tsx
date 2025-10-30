import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Home, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getConsultancyBySlug, getNextConsultancy } from '../data/consultancyData';

const ConsultancyDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const area = slug ? getConsultancyBySlug(slug) : undefined;
  const nextArea = slug ? getNextConsultancy(slug) : undefined;

  if (!area) {
    return (
      <div className="min-h-screen bg-[#f9f7f1]">
        <Navbar />
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Consultancy Area Not Found
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
            <span className="text-gray-500">Consultancy</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{area.title}</span>
          </nav>

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 mb-12 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {area.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl">
              {area.heroSummary}
            </p>
          </div>

          {/* About This Area */}
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-10 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              About This Area
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {area.aboutDescription}
            </p>
          </div>

          {/* Key Activities */}
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-10 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Key Activities & Services
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {area.keyActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-800 font-medium">{activity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects & Highlights */}
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-10 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Projects & Highlights
            </h2>
            <div className="space-y-6">
              {area.projectsHighlights.map((project, index) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-600 pl-6 py-2"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {project.description}
                  </p>
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

            {nextArea && (
              <button
                onClick={() => navigate(`/consultancy/${nextArea.slug}`)}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <span>Next: {nextArea.title}</span>
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

export default ConsultancyDetailPage;

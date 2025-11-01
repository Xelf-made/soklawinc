export interface Podcast {
  id: string;
  title: string;
  slug: string;
  description: string;
  heroTitle: string;
  heroSummary: string;
  date: string;
  duration: string;
  host: string;
  guests?: string[];
  content: string;
  keyTopics: string[];
  episodeNumber: number;
  season: number;
  nextEpisode?: string;
}

export const podcastsData: Podcast[] = [
  {
    id: 'podcast-1',
    title: 'Digital Rights in Africa',
    slug: 'digital-rights-in-africa',
    description: 'Exploring the intersection of technology, privacy, and human rights across African nations.',
    heroTitle: 'Digital Rights in Africa',
    heroSummary: 'A comprehensive discussion on protecting digital freedoms and establishing robust privacy frameworks in the digital age.',
    date: '2025-11-15',
    duration: '42 minutes',
    host: 'Jane Karanja',
    guests: ['Prof. David Kipchoge', 'Dr. Amara Okonkwo'],
    episodeNumber: 1,
    season: 1,
    content: `In this inaugural episode of our Legal Frontiers podcast, we explore the critical issues surrounding digital rights in Africa. Our guests, leading experts in technology law and policy, discuss the challenges faced by African nations in regulating technology while protecting individual freedoms.

Key discussion points include:
- The gap between technology innovation and legal frameworks
- Privacy rights in the context of surveillance and data collection
- The role of governments in regulating digital platforms
- Grassroots activism and digital rights advocacy
- International standards and local context

This episode provides valuable insights into how African countries can develop comprehensive digital rights policies that protect citizens while fostering technological innovation.`,
    keyTopics: [
      'Digital Privacy',
      'Tech Regulation',
      'Data Protection',
      'Platform Accountability',
      'Surveillance Rights',
    ],
    nextEpisode: 'podcast-2',
  },
  {
    id: 'podcast-2',
    title: 'Health Rights & Access to Justice',
    slug: 'health-rights-access-to-justice',
    description: 'Understanding the legal frameworks that protect health rights and ensure equitable access to healthcare.',
    heroTitle: 'Health Rights & Access to Justice',
    heroSummary: 'Examining how legal systems can ensure everyone has access to quality healthcare and can seek justice when rights are violated.',
    date: '2025-11-22',
    duration: '38 minutes',
    host: 'Jane Karanja',
    guests: ['Dr. Catherine Mwangi', 'Hon. James Kipchoge'],
    episodeNumber: 2,
    season: 1,
    content: `Episode 2 delves into the complex relationship between health, rights, and justice. We discuss how legal systems can be leveraged to ensure equitable access to healthcare and protect patients' rights.

Topics covered:
- Constitutional protections for health rights
- Access to justice for healthcare violations
- The role of health courts and specialized tribunals
- Patient confidentiality and medical ethics
- Reproductive rights and bodily autonomy
- Healthcare access for marginalized communities

Our expert guests share real-world examples of how strategic litigation and policy advocacy have improved health outcomes and protected vulnerable populations.`,
    keyTopics: [
      'Health Rights',
      'Access to Justice',
      'Patient Rights',
      'Medical Ethics',
      'Healthcare Policy',
    ],
    nextEpisode: 'podcast-3',
  },
  {
    id: 'podcast-3',
    title: 'AI Governance & Ethical Frameworks',
    slug: 'ai-governance-ethical-frameworks',
    description: 'The legal and ethical considerations of artificial intelligence deployment and regulation.',
    heroTitle: 'AI Governance & Ethical Frameworks',
    heroSummary: 'Navigating the complex landscape of AI regulation while ensuring innovation and protecting fundamental rights.',
    date: '2025-11-29',
    duration: '45 minutes',
    host: 'Jane Karanja',
    guests: ['Dr. Priya Sharma', 'Tech Policy Analyst Marcus Chen'],
    episodeNumber: 3,
    season: 1,
    content: `Our third episode addresses one of the most pressing legal issues of our time: artificial intelligence governance. As AI systems increasingly influence critical decisions affecting people's lives, we examine how legal frameworks can ensure accountability and protect rights.

Discussion areas:
- Current AI governance approaches globally
- Algorithmic transparency and explainability
- Accountability mechanisms for AI systems
- Bias detection and mitigation
- AI in criminal justice and hiring
- Intellectual property and AI-generated content
- The role of international cooperation

This episode provides practical insights for policymakers, legal professionals, and technology companies navigating the AI regulatory landscape.`,
    keyTopics: [
      'AI Regulation',
      'Algorithmic Accountability',
      'Ethical AI',
      'Tech Governance',
      'Rights Protection',
    ],
    nextEpisode: 'podcast-1',
  },
];

export const getPodcastBySlug = (slug: string): Podcast | undefined => {
  return podcastsData.find((podcast) => podcast.slug === slug);
};

export const getNextPodcast = (currentSlug: string): Podcast | undefined => {
  const current = getPodcastBySlug(currentSlug);
  if (current && current.nextEpisode) {
    return getPodcastBySlug(current.nextEpisode);
  }
  return undefined;
};

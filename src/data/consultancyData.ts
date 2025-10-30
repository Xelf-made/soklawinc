export interface ConsultancyArea {
  id: string;
  title: string;
  slug: string;
  heroTitle: string;
  heroSummary: string;
  aboutDescription: string;
  keyActivities: string[];
  projectsHighlights: {
    title: string;
    description: string;
  }[];
  nextArea?: string;
}

export const consultancyAreas: ConsultancyArea[] = [
  {
    id: 'health-human-rights',
    title: 'Health & Human Rights',
    slug: 'health-human-rights',
    heroTitle: 'Health & Human Rights Consultancy',
    heroSummary:
      'Advancing health equity and human rights through expert legal consultation and policy development.',
    aboutDescription:
      'Our Health & Human Rights consultancy bridges the gap between healthcare systems, legal frameworks, and fundamental human rights. We work with governments, NGOs, and healthcare organizations to ensure that health policies protect the most vulnerable while promoting equitable access to quality healthcare services.',
    keyActivities: [
      'Health policy development and review',
      'Human rights impact assessments in healthcare',
      'Legal frameworks for patient rights and medical ethics',
      'Universal health coverage policy design',
      'Reproductive health rights advocacy',
      'Mental health law reform',
      'Health data privacy and patient confidentiality',
      'Healthcare access for marginalized communities',
    ],
    projectsHighlights: [
      {
        title: 'National Health Rights Framework',
        description:
          'Developed comprehensive health rights legislation for the Ministry of Health, ensuring constitutional protection of healthcare access.',
      },
      {
        title: 'Mental Health Law Reform',
        description:
          'Led consultative process for modernizing mental health legislation, emphasizing patient autonomy and community-based care.',
      },
      {
        title: 'Reproductive Rights Policy',
        description:
          'Advised on reproductive health policy framework balancing cultural considerations with international human rights standards.',
      },
    ],
    nextArea: 'ai-policy-digital-rights',
  },
  {
    id: 'ai-policy-digital-rights',
    title: 'AI Policy & Digital Rights',
    slug: 'ai-policy-digital-rights',
    heroTitle: 'AI Policy & Digital Rights Consultancy',
    heroSummary:
      'Shaping responsible AI governance and protecting digital rights in the evolving technological landscape.',
    aboutDescription:
      'Our AI Policy & Digital Rights consultancy addresses the complex intersection of artificial intelligence, technology regulation, and fundamental digital freedoms. We help organizations and governments develop forward-thinking policies that foster innovation while protecting individual rights, ensuring ethical AI deployment, and establishing accountability frameworks for emerging technologies.',
    keyActivities: [
      'AI governance and regulatory framework development',
      'Algorithmic accountability and transparency standards',
      'Digital rights protection and advocacy',
      'Content moderation policy and free expression balance',
      'Automated decision-making impact assessments',
      'AI ethics guidelines and implementation',
      'Platform liability and intermediary responsibility',
      'Digital identity and biometric technology regulation',
    ],
    projectsHighlights: [
      {
        title: 'National AI Strategy',
        description:
          'Co-developed national AI strategy emphasizing ethical deployment, innovation support, and risk mitigation frameworks.',
      },
      {
        title: 'Digital Rights Charter',
        description:
          'Drafted comprehensive digital rights charter establishing principles for online freedom of expression and privacy protection.',
      },
      {
        title: 'Algorithmic Transparency Framework',
        description:
          'Created regulatory framework requiring transparency and accountability in automated decision-making systems affecting public services.',
      },
    ],
    nextArea: 'data-policy-governance',
  },
  {
    id: 'data-policy-governance',
    title: 'Data Policy & Governance',
    slug: 'data-policy-governance',
    heroTitle: 'Data Policy & Governance Consultancy',
    heroSummary:
      'Building robust data governance frameworks that protect privacy while enabling innovation and economic growth.',
    aboutDescription:
      'Our Data Policy & Governance consultancy specializes in developing comprehensive frameworks for data management, protection, and utilization. We assist governments, private sector organizations, and international bodies in navigating the complex landscape of data regulation, ensuring compliance with international standards while addressing local contexts and promoting responsible data stewardship.',
    keyActivities: [
      'Data protection legislation drafting and review',
      'Privacy impact assessments and compliance auditing',
      'Cross-border data transfer frameworks',
      'Open data policy and implementation',
      'Data sharing agreements and governance structures',
      'Personal data protection authority establishment',
      'Data breach response protocols',
      'Sectoral data governance (health, finance, education)',
    ],
    projectsHighlights: [
      {
        title: 'Data Protection Act Implementation',
        description:
          'Supported full implementation of national data protection legislation, including establishment of regulatory authority and enforcement mechanisms.',
      },
      {
        title: 'Cross-Border Data Framework',
        description:
          'Negotiated regional data transfer framework enabling secure cross-border data flows while maintaining high protection standards.',
      },
      {
        title: 'Open Government Data Initiative',
        description:
          'Designed open data policy framework promoting transparency and civic engagement while protecting sensitive information.',
      },
    ],
    nextArea: 'health-human-rights',
  },
];

export const getConsultancyBySlug = (slug: string): ConsultancyArea | undefined => {
  return consultancyAreas.find((area) => area.slug === slug);
};

export const getNextConsultancy = (currentSlug: string): ConsultancyArea | undefined => {
  const current = getConsultancyBySlug(currentSlug);
  if (current && current.nextArea) {
    return getConsultancyBySlug(current.nextArea);
  }
  return undefined;
};

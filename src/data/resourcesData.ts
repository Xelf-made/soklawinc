export interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  heroTitle: string;
  heroSummary: string;
  date: string;
  resourceType: 'guide' | 'whitepaper' | 'toolkit' | 'report';
  author: string;
  content: string;
  keyPoints: string[];
  downloadUrl?: string;
  relatedTopics: string[];
  nextResource?: string;
}

export const resourcesData: Resource[] = [
  {
    id: 'resource-1',
    title: 'Data Protection Compliance Guide',
    slug: 'data-protection-compliance-guide',
    description: 'A comprehensive guide to implementing data protection measures in compliance with international standards.',
    heroTitle: 'Data Protection Compliance Guide',
    heroSummary: 'Essential guidance for organizations implementing robust data protection and privacy frameworks.',
    date: '2025-11-01',
    resourceType: 'guide',
    author: 'Data Governance Team',
    content: `This comprehensive guide provides practical guidance for organizations seeking to implement effective data protection measures. Whether you're a government agency, private company, or civil society organization, this resource covers the essential elements of compliant data governance.

## Contents

### 1. Foundational Principles
- Privacy by design
- Data minimization
- Purpose limitation
- Storage limitation
- Transparency and accountability

### 2. Implementation Framework
- Conducting data audits
- Mapping data flows
- Identifying data processors
- Establishing data retention policies
- Creating breach response protocols

### 3. Key Compliance Areas
- Consent management
- Data subject rights
- Cross-border transfers
- Vendor management
- Employee training

### 4. Sectoral Considerations
- Healthcare data
- Financial information
- Education records
- Government data

### 5. Technology Solutions
- Encryption standards
- Access controls
- Audit logging
- Anonymization techniques

This guide is designed to be adaptable to different regulatory environments and organizational contexts.`,
    keyPoints: [
      'Privacy by design principles',
      'Data minimization strategies',
      'Consent management systems',
      'Breach response protocols',
      'Employee training requirements',
      'Vendor management frameworks',
      'Cross-border transfer mechanisms',
      'Rights fulfillment procedures',
    ],
    relatedTopics: [
      'Data Governance',
      'Privacy Regulation',
      'Compliance',
      'Information Security',
    ],
    nextResource: 'resource-2',
  },
  {
    id: 'resource-2',
    title: 'Digital Rights Toolkit for Civil Society',
    slug: 'digital-rights-toolkit-civil-society',
    description: 'A practical toolkit for civil society organizations advocating for digital rights and online freedoms.',
    heroTitle: 'Digital Rights Toolkit for Civil Society',
    heroSummary: 'Equipping civil society organizations with tools and strategies to advocate for digital freedoms.',
    date: '2025-10-15',
    resourceType: 'toolkit',
    author: 'Digital Rights Team',
    content: `This toolkit is designed to empower civil society organizations to advocate for and protect digital rights. It provides practical resources, case studies, and strategies for engaging with governments, platforms, and communities.

## Toolkit Contents

### Section 1: Understanding Digital Rights
- Freedom of expression online
- Privacy and data protection
- Freedom of assembly and association
- Access to information
- Digital security and safety

### Section 2: Advocacy Strategies
- Policy engagement frameworks
- Stakeholder mapping
- Campaign planning
- Media advocacy
- Grassroots mobilization

### Section 3: Litigation & Legal Strategies
- Strategic case selection
- Evidence gathering
- Expert witness preparation
- International mechanisms
- Enforcement strategies

### Section 4: Technical Tools
- Digital security guides
- Encryption tutorials
- Safe communication platforms
- Online research methodologies

### Section 5: Case Studies
- Successful digital rights campaigns
- Landmark litigation cases
- Policy victories
- Community organizing models

### Section 6: Resources & Networks
- International digital rights organizations
- Funding opportunities
- Technical assistance
- Peer networks

This toolkit is regularly updated with new strategies, tools, and successful practices from the global digital rights community.`,
    keyPoints: [
      'Digital rights advocacy strategies',
      'Policy engagement frameworks',
      'Strategic litigation approaches',
      'Technical security tools',
      'International mechanisms',
      'Campaign planning templates',
      'Stakeholder engagement models',
      'Impact measurement frameworks',
    ],
    relatedTopics: [
      'Digital Rights',
      'Advocacy',
      'Civil Society',
      'Online Freedom',
    ],
    nextResource: 'resource-3',
  },
  {
    id: 'resource-3',
    title: 'Health Law & Policy Framework',
    slug: 'health-law-policy-framework',
    description: 'A comprehensive framework for developing health laws and policies that protect rights and promote equity.',
    heroTitle: 'Health Law & Policy Framework',
    heroSummary: 'Guidance for developing comprehensive health laws that protect rights and ensure equitable access.',
    date: '2025-10-01',
    resourceType: 'whitepaper',
    author: 'Health & Human Rights Team',
    content: `This white paper presents a comprehensive framework for developing and reforming health laws and policies. It synthesizes international best practices, legal principles, and practical considerations for creating health systems that are rights-based, equitable, and effective.

## Framework Overview

### Part 1: Legal Foundations
- Constitutional health rights
- International human rights obligations
- Duties of states in health provision
- Individual rights and responsibilities

### Part 2: Health System Architecture
- Universal health coverage frameworks
- Financing mechanisms
- Service delivery models
- Quality and safety standards
- Accessibility requirements

### Part 3: Special Populations
- Vulnerable and marginalized groups
- Indigenous health rights
- Persons with disabilities
- Refugee and migrant health
- Gender-responsive health law

### Part 4: Key Health Law Areas
- Reproductive and maternal health
- Mental health and psychosocial support
- Communicable disease control
- Non-communicable disease prevention
- Emergency preparedness

### Part 5: Accountability & Enforcement
- Judicial remedies
- Administrative mechanisms
- Ombudsman functions
- Health courts
- Civil society oversight

### Part 6: Implementation Guidance
- Legislative drafting considerations
- Stakeholder engagement
- Capacity building
- Monitoring and evaluation
- Sustainability measures

This framework is designed to be adapted to different national contexts while maintaining core rights protections.`,
    keyPoints: [
      'Rights-based health law approach',
      'Universal health coverage principles',
      'Equity and accessibility standards',
      'Quality assurance mechanisms',
      'Accountability frameworks',
      'Vulnerable population protections',
      'Emergency response systems',
      'International compliance standards',
    ],
    relatedTopics: [
      'Health Rights',
      'Health Policy',
      'Human Rights',
      'Healthcare Systems',
    ],
    nextResource: 'resource-1',
  },
];

export const getResourceBySlug = (slug: string): Resource | undefined => {
  return resourcesData.find((resource) => resource.slug === slug);
};

export const getNextResource = (currentSlug: string): Resource | undefined => {
  const current = getResourceBySlug(currentSlug);
  if (current && current.nextResource) {
    return getResourceBySlug(current.nextResource);
  }
  return undefined;
};

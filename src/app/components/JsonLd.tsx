import { Person, WithContext } from 'schema-dts';

export default function JsonLd() {
  const personData: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Punyaphat Surakiatkamjorn',
    url: 'https://punyaphat-portfolio.vercel.app',
    jobTitle: 'Full-Stack Engineer & UI Designer',
    description: 'A full-stack software engineer with a primary focus on front-end development',
    image: 'https://punyaphat-portfolio.vercel.app/profile-image.jpg',
    sameAs: ['https://www.linkedin.com/in/punyaphat', 'https://github.com/punyaphat'],
    knowsAbout: [
      'Web Development',
      'UI Design',
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'React Native',
      'MongoDB',
      'Elysia',
    ],
    worksFor: [
      {
        '@type': 'Organization',
        name: 'Playtorium',
        description: 'Software Development Company',
      },
      {
        '@type': 'Organization',
        name: 'AZAI',
        description: 'Software Development Company',
      },
      {
        '@type': 'Organization',
        name: 'SOpet',
        description: 'Software Development Company',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
    />
  );
}

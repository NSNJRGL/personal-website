import React from 'react';

// Import existing react-icons
import {
  SiAmazonaws, SiBabel, SiGit, SiMongodb, SiNextdotjs as SiNextDotJs,
  SiNodedotjs as SiNodeDotJs, SiPostgresql, SiReact, SiTailwindcss, SiTypescript,
  SiJavascript, SiWebpack, SiWebstorm, SiYarn, SiRubyonrails, SiMysql,
  SiJquery, SiRedux, SiExpress,
  // --- Add newly found icons ---
  SiAngular, SiReactivex, SiMui, SiBootstrap, SiAntdesign, SiFigma, SiSwagger,
  SiJest, SiPostman, SiEslint, SiGraphql, SiDocker, SiNginx, SiApache, // Using SiApache for Apache
  SiAmazons3, SiAmazonrds, SiAmazonec2, SiDigitalocean, SiAmazondynamodb, SiRuby,
  SiPython, 
  // Add more here if you find them
} from "react-icons/si";

import { FaJava } from "react-icons/fa";

// Import the Heroicon for fallback
import { CodeBracketIcon } from '@heroicons/react/24/outline';

// Skill interface (no change)
interface Skill {
  name: string;
  icon?: React.ElementType;
  category: 'language' | 'technology' | 'tool' | 'system';
}

// IconBadge component (no change)
interface IconBadgeProps {
  skill: Skill;
}
const IconBadge: React.FC<IconBadgeProps> = ({ skill }) => {
  const IconComponent = skill.icon;
  return (
    <div className="flex flex-col items-center justify-start text-center pt-3 pb-3 pr-3 group w-20 h-20">
      <div className="mb-2 h-8 flex items-center justify-center">
        {IconComponent ? (
          <IconComponent className="h-7 w-7 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
        ) : (
          <CodeBracketIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
        )}
      </div>
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
        {skill.name}
      </span>
    </div>
  );
};

// --- Updated Main Section Component ---
const TechStackSection: React.FC = () => {
  // --- Updated skills array with more icons assigned ---
  const skills: Skill[] = [
    // Languages (Ruby, Python, Java often lack specific Si icons)
    { name: 'JavaScript', icon: SiJavascript, category: 'language' },
    { name: 'TypeScript', icon: SiTypescript, category: 'language' },
    { name: 'Ruby', icon: SiRuby, category: 'language' }, // Fallback
    { name: 'Python', icon: SiPython, category: 'language' }, // Fallback
    { name: 'Java', icon: FaJava, category: 'language' },   // Fallback

    // Technologies
    { name: 'React.js', icon: SiReact, category: 'technology' },
    { name: 'Next.js', icon: SiNextDotJs, category: 'technology' },
    { name: 'React Native', icon: SiReact, category: 'technology' }, // Re-using React icon
    { name: 'Node.js', icon: SiNodeDotJs, category: 'technology' },
    { name: 'Express.js', icon: SiExpress, category: 'technology' },
    { name: 'Ruby On Rails', icon: SiRubyonrails, category: 'technology' },
    { name: 'Angular', icon: SiAngular, category: 'technology' },
    { name: 'AngularJS', icon: SiAngular, category: 'technology' }, // Re-using Angular icon

    // Tools
    { name: 'Redux', icon: SiRedux, category: 'tool' },
    { name: 'Redux-Thunk', category: 'tool' },         // Fallback
    { name: 'Redux-Saga', category: 'tool' },          // Fallback
    { name: 'RXJS', icon: SiReactivex, category: 'tool' },
    { name: 'jQuery', icon: SiJquery, category: 'tool' },
    { name: 'Material-UI', icon: SiMui, category: 'tool' },
    { name: 'Bootstrap', icon: SiBootstrap, category: 'tool' },
    { name: 'TailwindCSS', icon: SiTailwindcss, category: 'tool' },
    { name: 'Ant', icon: SiAntdesign, category: 'tool' },
    { name: 'Git', icon: SiGit, category: 'tool' },
    { name: 'Figma', icon: SiFigma, category: 'tool' },
    { name: 'Swagger', icon: SiSwagger, category: 'tool' },
    { name: 'Capistrano', category: 'tool' },         // Fallback
    { name: 'Jest', icon: SiJest, category: 'tool' },
    { name: 'Postman', icon: SiPostman, category: 'tool' },
    { name: 'ESLint', icon: SiEslint, category: 'tool' },
    { name: 'REST', category: 'tool' },               // Fallback (Conceptual)
    { name: 'Babel', icon: SiBabel, category: 'tool' },
    { name: 'GraphQL', icon: SiGraphql, category: 'tool' },
    { name: 'Cursor', category: 'tool' },             // Fallback
    { name: 'Model Context Protocol', category: 'tool' }, // Fallback
    { name: 'Webpack', icon: SiWebpack, category: 'tool' },
    { name: 'WebStorm', icon: SiWebstorm, category: 'tool' },
    { name: 'Yarn', icon: SiYarn, category: 'tool' },

    // Systems
    { name: 'MySQL', icon: SiMysql, category: 'system' },
    { name: 'PostgreSQL', icon: SiPostgresql, category: 'system' },
    { name: 'DynamoDB', icon: SiAmazondynamodb, category: 'system' },
    { name: 'Docker', icon: SiDocker, category: 'system' },
    { name: 'NGINX', icon: SiNginx, category: 'system' },
    { name: 'Apache', icon: SiApache, category: 'system' },
    { name: 'AWS', icon: SiAmazonaws, category: 'system' }, // General AWS
    { name: 'AWS S3', icon: SiAmazons3, category: 'system' },
    { name: 'AWS RDS', icon: SiAmazonrds, category: 'system' },
    { name: 'EC2', icon: SiAmazonec2, category: 'system' },
    { name: 'DigitalOcean', icon: SiDigitalocean, category: 'system' },
    { name: 'MongoDB', icon: SiMongodb, category: 'system' }, // Added MongoDB icon
  ];

  // Helper function (no change)
  const getSkillsByCategory = (category: Skill['category']) => {
    return skills.filter((skill) => skill.category === category);
  };

  // Section rendering (no change)
  return (
    <section className="">
      <div className="max-w-5xl mx-auto">
        <p className="text-lg text-left mb-10 sm:mb-12 leading-relaxed">
          I leverage a variety of tools and technologies to build robust and scalable applications. Here are some of my favorites:
        </p>
        {['language', 'technology', 'tool', 'system'].map((category) => {
          const categorySkills = getSkillsByCategory(category as Skill['category']);
          if (categorySkills.length === 0) return null;
          const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
            const categoryEmoji = {
                  language: '🗣️',
                  technology: '💡',
                  tool: '🔧',
                  system: '☁️'
            }[category] || '⚙️';
          return (
            <div key={category} className="mb-10 sm:mb-12">
              <h3 className="font-semibold text-xl mb-6 text-gray-900 dark:text-white flex">
                <span className="text-2xl mr-3">{categoryEmoji}</span> {categoryTitle}
              </h3>
              <div className="flex flex-wrap gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-6">
                {categorySkills.map((skill) => (
                  <IconBadge key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TechStackSection;
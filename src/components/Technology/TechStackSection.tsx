import type { ElementType } from "react";
import {
  SiAmazonaws,
  SiAmazondynamodb,
  SiAmazonec2,
  SiAmazonrds,
  SiAmazons3,
  SiAngular,
  SiAntdesign,
  SiApache,
  SiBabel,
  SiDigitalocean,
  SiDocker,
  SiEslint,
  SiExpress,
  SiFigma,
  SiGit,
  SiGraphql,
  SiJavascript,
  SiJest,
  SiJquery,
  SiMui,
  SiMysql,
  SiNextdotjs as SiNextDotJs,
  SiNginx,
  SiNodedotjs as SiNodeDotJs,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiReactivex,
  SiRedux,
  SiRuby,
  SiRubyonrails,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { CodeBracketIcon } from "@heroicons/react/24/outline";
import { getV1SkillSections } from "src/lib/portfolioV1";

type SkillBadge = {
  name: string;
  icon?: ElementType;
};

const iconBySkillName: Partial<Record<string, ElementType>> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Ruby: SiRuby,
  Python: SiPython,
  Java: FaJava,
  "React.js": SiReact,
  "Next.js": SiNextDotJs,
  "React Native": SiReact,
  Angular: SiAngular,
  AngularJS: SiAngular,
  TailwindCSS: SiTailwindcss,
  "Material-UI": SiMui,
  "Ant Design": SiAntdesign,
  jQuery: SiJquery,
  "Node.js": SiNodeDotJs,
  Express: SiExpress,
  "Ruby on Rails": SiRubyonrails,
  GraphQL: SiGraphql,
  Redux: SiRedux,
  RXJS: SiReactivex,
  Jest: SiJest,
  Postman: SiPostman,
  ESLint: SiEslint,
  Docker: SiDocker,
  NGINX: SiNginx,
  Apache: SiApache,
  Git: SiGit,
  Figma: SiFigma,
  "AWS S3": SiAmazons3,
  "AWS RDS": SiAmazonrds,
  EC2: SiAmazonec2,
  DigitalOcean: SiDigitalocean,
  Terraform: SiAmazonaws,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  DynamoDB: SiAmazondynamodb,
  Babel: SiBabel,
  Swagger: SiSwagger,
};

const skillSections = getV1SkillSections();

const IconBadge = ({ skill }: { skill: SkillBadge }) => {
  const IconComponent = skill.icon;

  return (
    <div className="flex h-20 w-20 flex-col items-center justify-start pb-3 pr-3 pt-3 text-center group">
      <div className="mb-2 flex h-8 items-center justify-center">
        {IconComponent ? (
          <IconComponent className="h-7 w-7 text-gray-600 transition-colors duration-200 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400" />
        ) : (
          <CodeBracketIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
        )}
      </div>
      <span className="text-xs font-medium text-gray-700 transition-colors duration-200 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400">
        {skill.name}
      </span>
    </div>
  );
};

const TechStackSection = () => {
  return (
    <section>
      <div className="mx-auto max-w-5xl">
        <p className="mb-10 text-left text-lg leading-relaxed sm:mb-12">
          I leverage a variety of tools and technologies to build robust and scalable applications.
          Here are some of my favorites:
        </p>

        {skillSections.map((section) => (
          <div key={section.id} className="mb-10 sm:mb-12">
            <h3 className="flex text-xl font-semibold text-gray-900 dark:text-white mb-6">
              <span className="mr-3 text-2xl">{section.emoji}</span>
              {section.title}
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-6">
              {section.skills.map((skillName) => (
                <IconBadge
                  key={skillName}
                  skill={{ name: skillName, icon: iconBySkillName[skillName] }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStackSection;

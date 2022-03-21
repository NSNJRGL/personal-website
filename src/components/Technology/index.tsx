import {
  SiAmazonaws,
  SiBabel,
  SiGit,
  SiMongodb,
  SiNextdotjs as SiNextDotJs,
  SiNodedotjs as SiNodeDotJs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiWebpack,
  SiWebstorm,
  SiYarn,
  SiRubyonrails,
  SiMysql,
  SiJquery,
  SiRedux,
  SiExpress,
} from "react-icons/si";
import { ListItem } from "src/components/ListItem";

export function Technology() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <ListItem icon={SiReact} text="React.js" />
      <ListItem icon={SiRedux} text="Redux" />
      <ListItem icon={SiNextDotJs} text="Next.js" />
      <ListItem icon={SiReact} text="React Native" />
      <ListItem icon={SiTypescript} text="TypeScript" />
      <ListItem icon={SiJavascript} text="JavaScript" />
      <ListItem icon={SiJquery} text="jQuery" />
      <ListItem icon={SiNodeDotJs} text="Node.js" />
      <ListItem icon={SiExpress} text="Express.js" />
      <ListItem icon={SiRubyonrails} text="Ruby On Rails" />
      <ListItem icon={SiMysql} text="MySQL" />
      <ListItem icon={SiPostgresql} text="Postgres" />
      <ListItem icon={SiAmazonaws} text="AWS" />
      <ListItem icon={SiWebstorm} text="WebStorm" />
      <ListItem icon={SiWebpack} text="Webpack" />
      <ListItem icon={SiBabel} text="Babel" />
      <ListItem icon={SiYarn} text="Yarn" />
      <ListItem icon={SiTailwindcss} text="TailwindCSS" />
      <ListItem icon={SiGit} text="Git" />
      <ListItem icon={SiMongodb} text="Mongo" />
    </div>
  );
}

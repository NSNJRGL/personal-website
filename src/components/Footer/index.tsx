import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillInstagram,
  AiTwotoneMail,
} from "react-icons/ai";
import AnimatedDiv from "../AnimatedDiv";

export function Footer() {
  const links = [
    {
      href: "https://github.com/NSNJRGL",
      icon: AiFillGithub,
      label: "GitHub",
      openInNewTab: true,
    },
    {
      href: "https://www.linkedin.com/in/nasanjargal-b/",
      icon: AiFillLinkedin,
      label: "LinkedIn",
      openInNewTab: true,
    },
    {
      href: "https://www.instagram.com/nasanjargal_b/",
      icon: AiFillInstagram,
      label: "Instagram",
      openInNewTab: true,
    },
    {
      href: "mailto:nbinderiyaa@gmail.com",
      icon: AiTwotoneMail,
      label: "Email",
      openInNewTab: false,
    },
  ];

  return (
    <AnimatedDiv>
      <div className="flex justify-center space-x-4 pt-8">
        {links.map(({ href, icon: Icon, label, openInNewTab }) => (
          <a
            key={href}
            href={href}
            aria-label={label}
            target={openInNewTab ? "_blank" : undefined}
            rel={openInNewTab ? "noopener noreferrer" : undefined}
          >
            <Icon className="h-6 w-6" />
          </a>
        ))}
      </div>

      <div className="pt-4">
        <h6 className="text-center font-extralight text-sm sm:text-base">
          ©Nasanjargal {new Date().getFullYear()}
        </h6>
        <h6 className="text-center font-extralight text-sm sm:text-base">
          👨 Made with ❤️
        </h6>
      </div>
    </AnimatedDiv>
  );
}

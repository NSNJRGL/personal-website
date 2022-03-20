import Link from "next/link";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillInstagram,
  AiTwotoneMail,
} from "react-icons/ai";
import AnimatedDiv from "../AnimatedDiv";

export function Footer() {
  return (
    <AnimatedDiv>
      <div className="flex justify-center space-x-4 pt-8">
        <Link href="https://github.com/NSNJRGL">
          <a target="_blank" rel="noreferrer">
            <AiFillGithub className="h-6 w-6" />
          </a>
        </Link>

        <Link href="https://www.linkedin.com/in/nasanjargal-b/">
          <a target="_blank" rel="noreferrer">
            <AiFillLinkedin className="h-6 w-6" />
          </a>
        </Link>

        <Link href="https://www.instagram.com/nasanjargal_b/">
          <a target="_blank" rel="noreferrer">
            <AiFillInstagram className="h-6 w-6" />
          </a>
        </Link>

        <Link href="mailto:nbinderiyaa@gmail.com">
          <a target="_blank" rel="noreferrer">
            <AiTwotoneMail className="h-6 w-6" />
          </a>
        </Link>
      </div>

      <div className="pt-4">
        <h6 className="text-center font-extralight text-sm sm:text-base">
          ©Nasanjargal {new Date().getFullYear()}
        </h6>
        <h6 className="text-center font-extralight text-sm sm:text-base">
          👨‍💻 with 💚 in 🇲🇳
        </h6>
      </div>
    </AnimatedDiv>
  );
}

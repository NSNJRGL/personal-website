import Link from "next/link";
import { useLoaded } from "src/hooks/useLoaded";
import ToggleButton from "../ToggleButton";
import AnimatedDiv from "../AnimatedDiv";

export const NavLink = (props: {
  href: string;
  title: string;
  closeMenu?: () => void;
}) => {
  return (
    <li className="link" onClick={() => props.closeMenu && props.closeMenu()}>
      <Link href={props.href}>{props.title}</Link>
    </li>
  );
};

const NavBar = () => {
  const loaded = useLoaded();

  return (
    <>
      {loaded && (
        <AnimatedDiv
          direction="top-to-bottom"
          className="hidden sm:flex flex-row content-center mx-auto justify-between max-w-3xl"
        >
          <nav className="flex-1">
            <ul className="flex space-x-4">
              <NavLink href="/" title="/home" />
              <NavLink href="/about" title="/about" />
            </ul>
          </nav>
          <ToggleButton />
        </AnimatedDiv>
      )}
    </>
  );
};

export default NavBar;

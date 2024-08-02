import { Navbar } from "flowbite-react";

const HeadNavbar = () => {
  return (
    <Navbar fluid={true} rounded={true} className="header">
      <Navbar.Brand href="https://flowbite.com/">
        <img
          src="/cropped-blog-badge.png"
          className="mr-2 p-1 h-6 sm:h-9 logo"
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Harfenist
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>
        <Navbar.Link href="/blog">Blog</Navbar.Link>
        <Navbar.Link href="/services">Services</Navbar.Link>
        <Navbar.Link href="/contact">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default HeadNavbar;

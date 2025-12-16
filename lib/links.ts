export interface NavItem {
  title: string
  href: string
  disabled?: boolean
}

export const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Gallery",
    href: "/gallery",
  },
  // {
  //   route: "Catering",
  //   href: "/catering",
  // },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  // {
  //   route: "Sign In",
  //   path: "",
  // },
]

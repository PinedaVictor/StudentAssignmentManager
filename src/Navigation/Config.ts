import HomeIcon from "@material-ui/icons/Home";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ClassIcon from "@material-ui/icons/Class";

export const NavItems = [
  {
    title: "Home",
    icon: HomeIcon,
    path: "/",
  },
  {
    title: "Courses",
    icon: ClassIcon,
    path: "/Courses",
  },
  {
    title: "Homework",
    icon: LibraryBooksIcon,
    path: "/Homework",
  },
  {
    title: "TODO",
    icon: PlaylistAddCheckIcon,
    path: "/TODO",
  },
];

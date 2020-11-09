import HomeIcon from "@material-ui/icons/Home";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ClassIcon from "@material-ui/icons/Class";
import {
  Home,
  // Assignments,
  Homework,
  Courses,
  TodoList,
} from "../Components/student-tools";

export const NavItems = [
  {
    title: "Home",
    icon: HomeIcon,
    Component: Home,
  },
  {
    title: "Courses",
    icon: ClassIcon,
    Component: Courses,
  },
  {
    title: "Homework",
    icon: LibraryBooksIcon,
    Component: Homework,
  },
  {
    title: "TODO",
    icon: PlaylistAddCheckIcon,
    Component: TodoList,
  },
];

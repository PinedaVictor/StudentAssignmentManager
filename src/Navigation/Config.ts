import HomeIcon from "@material-ui/icons/Home";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ClassIcon from "@material-ui/icons/Class";
import TimerIcon from "@material-ui/icons/Timer";
import AssignmentIcon from '@material-ui/icons/Assignment';

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
    title: "Exams",
    icon: TimerIcon,
    path: "/Exam",
  },
  {
    title: "Projects",
    icon: AssignmentIcon,
    path: "/Project",
  },
  {
    title: "TODO",
    icon: PlaylistAddCheckIcon,
    path: "/TODO",
  },
];

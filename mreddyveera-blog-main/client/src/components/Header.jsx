import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownHeader,
  DropdownDivider,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { FaMoon,FaSun } from "react-icons/fa";
import { useSelector,useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js";
function Header() {
  const path = useLocation().pathname;
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const {theme}=useSelector((state)=>state.theme);

  return (
    <Navbar className="border-b-2 border-gray-200 bg-white dark:bg-gray-900 px-4">
      {/* Logo / Brand */}
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-3 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
          Manikanta
        </span>{" "}
        Blog
      </Link>

      {/* Search bar */}
      <div className="flex justify-center">
        <form className="hidden lg:block">
          <TextInput type="text" placeholder="Search..." icon={HiSearch} />
        </form>
        <Button className="w-15 h-8 lg:hidden" color="gray" pill>
          <HiSearch />
        </Button>
      </div>

      <NavbarToggle />

      <NavbarCollapse>
        <NavbarLink
          href="/"
          active={path === "/"}
          className="text-gray-700 dark:text-gray-300 hover:text-indigo-600"
        >
          Home
        </NavbarLink>
        <NavbarLink
          href="/about"
          active={path === "/about"}
          className="text-gray-700 dark:text-gray-300 hover:text-indigo-600"
        >
          About
        </NavbarLink>
        <NavbarLink
          href="/projects"
          active={path === "/projects"}
          className="text-gray-700 dark:text-gray-300 hover:text-indigo-600"
        >
          Projects
        </NavbarLink>
        <NavbarLink
          href="/dashboard"
          active={path === "/dashboard"}
          className="text-gray-700 dark:text-gray-300 hover:text-indigo-600"
        >
          Dashboard
        </NavbarLink>
      </NavbarCollapse>

      <div className="flex items-center gap-3">
        {/* Dark Mode Button */}
        <Button color="gray" pill onClick={()=>dispatch(toggleTheme())}>
          {theme==="light"?<FaSun/>:<FaMoon/>}
        </Button>

        {/* User Dropdown */}
        {currentUser ? (
          <div className="relative">
  <Dropdown
    arrowIcon={false}
    inline
    label={
      <Avatar
        alt="user"
        img={currentUser?.photoURL || currentUser?.googlePhotoUrl}
        rounded
      />
    }
  >
    <DropdownHeader>
      <span className="block text-sm">{currentUser?.displayName || currentUser?.name}</span>
      <span className="block text-sm font-medium truncate">
        {currentUser?.email}
      </span>
    </DropdownHeader>

    <DropdownItem>
  <Link to="/dashboard?tab=profile" className="block w-full">
    Profile
  </Link>
</DropdownItem>


    <DropdownDivider />

    <DropdownItem
      onClick={() => {
        console.log("Logout clicked");
      }}
    >
      Sign out
    </DropdownItem>
  </Dropdown>
</div>

        ) : (
          <Link to="/signin">
            <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </Navbar>
  );
}

export default Header;

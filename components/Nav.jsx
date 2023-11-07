"use client";
import Link from "next/link";
//prettier-ignore
import { BiUser,BiSearch,BiUserPlus,BiLogInCircle,BiHelpCircle,BiMessageRounded,} from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Nav = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [Dropdown, setDropdown] = useState(false);
  const handleClickBody = (event) => {
    if (Dropdown && !event.target.closest(".dropdown")) setDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickBody);
    return () => document.removeEventListener("click", handleClickBody);
  }, [Dropdown]);

  return (
    <div className="flex justify-center">
      <div className="navbar ">
        <div className="p-2 text-2xl font-semibold caret-transparent">
          <Link href="/" className="havns text-2xl">
            Havns
          </Link>
        </div>
        <div className="flex relative search_box rounded-full  ">
          <input
            type="text"
            className="search_input max-[768px]:w-full"
            placeholder="Search Destinations"
          />
          <button className="search_btn" onClick={() => {}}>
            <BiSearch />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/protected/become-host">
            <button className="text-md font-medium host rounded-full p-3 border border-gray-300 hover:bg-gray-100 ease-out duration-300 max-[426px]:p-2">
              Become a host
              <span>Now</span>
            </button>
          </Link>
          <button
            className={`border border-gray-300 rounded-full overflow-hidden w-[2.8rem] h-[2.8rem] ${
              session?.user ? "p-0" : "p-[0.8rem]"
            } user ease-out duration-300 max-[426px]:p-0`}
            onClick={() => setDropdown((d) => !d)}
          >
            <span className="inline-block align-middle text-xl w-[2.8rem] h-[2.8rem]">
              {session?.user ? (
                session?.user.image ? (
                  <img
                    src={session?.user.image}
                    alt="User Avatar"
                    className="rounded-full"
                  />
                ) : (
                  <span className="text-white bg-[#ef4444] text-xl font-medium w-[2.8rem] h-[2.8rem] flex items-center justify-center rounded-full caret-transparent profile">
                    {session.user.email.toUpperCase().toString()[0]}
                  </span>
                )
              ) : (
                <BiUser />
              )}
            </span>
          </button>
        </div>
        <AnimatePresence>
          {Dropdown && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="dropdown -z-50 flex flex-col text-base bg-white absolute top-20 right-2 py-2 rounded-xl "
            >
              {session?.user ? (
                <>
                  <Dropdownitem
                    icon={<BiMessageRounded />}
                    onClick={() => {
                      router.push("/protected/messeges");
                      setDropdown(false);
                    }}
                    option="Messages"
                  />
                  <Dropdownitem
                    icon={<AiOutlineHeart />}
                    onClick={() => {
                      router.push("/protected/wishlist");
                      setDropdown(false);
                    }}
                    option="Wishlists"
                  />
                  <Dropdownitem
                    icon={<BiUser />}
                    onClick={() => {
                      router.push("/protected/account");
                      setDropdown(false);
                    }}
                    option="Account"
                  />
                  <Dropdownitem
                    icon={<IoMdLogOut />}
                    onClick={signOut}
                    option="Logout"
                  />
                </>
              ) : (
                <>
                  <Dropdownitem
                    icon={<BiLogInCircle />}
                    onClick={() => {
                      router.push("/signin");
                      setDropdown(false);
                    }}
                    option="Log in"
                    style="font-semibold"
                  />
                  <Dropdownitem
                    icon={<BiUserPlus />}
                    onClick={() => {
                      router.push("/signup");
                      setDropdown(false);
                    }}
                    option="Sign Up"
                  />
                  <Dropdownitem
                    icon={<BiHelpCircle />}
                    onClick={() => {
                      router.push("/help");
                      setDropdown(false);
                    }}
                    option="Help"
                  />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Dropdownitem = (props) => {
  return (
    <button
      className="flex items-center gap-4 p-2 pr-20 hover:bg-gray-50"
      onClick={props.onClick}
    >
      <span className="text-lg">{props.icon}</span>
      <span className={props.style}>{props.option}</span>
    </button>
  );
};

export default Nav;

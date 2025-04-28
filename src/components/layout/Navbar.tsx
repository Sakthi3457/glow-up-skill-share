
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@/data/mockData";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!currentUser;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-swap-purple rounded-md">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-swap-purple via-swap-blue to-swap-pink bg-clip-text text-transparent">
              SkillSwap
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-swap-purple">
                  Dashboard
                </Link>
                <Link to="/messages" className="text-gray-600 hover:text-swap-purple">
                  Messages
                </Link>
                <div className="relative ml-4">
                  <Link to="/profile" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8 transition-transform hover:scale-110">
                      <AvatarImage 
                        src={currentUser.profileImage} 
                        alt={currentUser.name} 
                      />
                      <AvatarFallback className="bg-swap-blue text-white">
                        {currentUser.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to="/auth?mode=login">
                  <Button variant="outline" className="border-swap-purple text-swap-purple hover:bg-swap-purple/10">
                    Log In
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button className="bg-swap-purple hover:bg-swap-purple/90">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-swap-purple"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-swap-purple hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/messages"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-swap-purple hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Messages
              </Link>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-swap-purple hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/auth?mode=login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-swap-purple hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Log In
              </Link>
              <Link
                to="/auth?mode=signup"
                className="block px-3 py-2 rounded-md text-base font-medium text-swap-purple hover:bg-gray-50 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

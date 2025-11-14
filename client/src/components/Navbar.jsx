import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useClerk , UserButton} from '@clerk/clerk-react';
import { useAppContext } from '../context/AppContext.jsX';
// define bookIcon 08/03
const BookIcon = () => (
     <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)
//  we use prebuilt UI to build up navigation bar
const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/rooms' },
        { name: 'Experience', path: '/' },
        { name: 'About', path: '/' },
    ];

    // const ref = React.useRef(null)

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {openSignIn} = useClerk();
    // const {user} = useUser();
    // const navigate = useNavigate();
    const location = useLocation();
    // AFTER CONNECT with backend
    const {user, navigate, isOwner, setShowHotelReg} = useAppContext()

    useEffect(() => {
        // 10.20 when not at home page, setIsScrolled true -> text color and bg color changed
        //  when not at home, we'd like to keep the banner style same as isScrolled.
        const isHome = location.pathname ==='/';
        if (!isHome) {
            setIsScrolled(true);
            return;
        }else{
            setIsScrolled(false);
        }

        setIsScrolled(prev => location.pathname !=='/' ? true : prev);

        const handleScroll = () => {
            // setIsScrolled(ref.current.scrollTop > 10);
            setIsScrolled(window.scrollY > 10);
            
        };
        // ref.current.addEventListener("scroll", handleScroll);
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    return (
        // <div ref={ref} className="h-88 md:h-64 overflow-y-scroll">
            <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

                {/* Logo */}
                <Link to='/'>
                    <img src={assets.logo} alt="logo" className={`h-9 ${isScrolled && "invert opacity-80"}`} />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                            {link.name}
                            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                        </a>
                    ))}
                    {/* when user is logged in, display the button dashboard */}
                    { user && (
                        <button onClick = {() => isOwner? navigate('/owner'):setShowHotelReg(true)} className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`}>
                            { isOwner ? 'Dashboard': 'List Your Hotel'}
                        </button> )
                    } 
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">
                    {/* <svg className={`h-6 w-6 text-white transition-all duration-500 ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg> */}
                    <img src={assets.searchIcon} alt="search" className={`${isScrolled && 'invert'} h-7 transition-all duration-500`} />
                    {/*  08/03 add if user  */}
                    {/* to add user profile picture after logging in */}
                    {user ? 
                    // added user button my-bookings 08/03/2025
                    (<UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label = "My Bookings" labelIcon = {<BookIcon/>} 
                            onClick={() =>  navigate('/my-bookings')}/>
                        </UserButton.MenuItems>
                    </UserButton>) 
                    : 
                    (<button onClick = {openSignIn} className='bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500'>
                        Login
                    </button>)
                    }
                    
                </div>

                {/* Mobile Menu Button */}
                {/* 8/14
                1. set user button at mobile menu
                2. when user logged in show dashboard, when user logged off, show log in button
                */}
                {/* 08/14 add {user && } to make sure when user logged in the UserButton button becomes available*/}

               
                <div className="flex items-center gap-3 md:hidden">
                {/* 1. set user button at mobile menu */}

                     {user && <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label = "My Bookings" labelIcon = {<BookIcon/>} 
                            onClick={() =>  navigate('/my-bookings')}/>
                        </UserButton.MenuItems>
                    </UserButton>}

                    <img onClick ={() => setIsMenuOpen(!isMenuOpen)}  src={assets.menuIcon} alt="" className={`${isScrolled && "invert"} h-4`}   />
                </div>

                {/* Mobile Menu */}
                
                <div className={`fixed top-0 left-0 w-full h-screen text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium bg-white text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                     <img src={assets.closeIcon} alt="close-menu" className="h-6.5"  />
                    </button>

                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                        </a>
                    ))}
                    {/* 08/14 add {user && } to make sure when user logged in the dashboard button becomes available*/}

                    {user && <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all"
                    onClick = {()  =>  isOwner ? navigate('/owner') : setShowHotelReg(true)}>
                     { isOwner ? 'Dashboard': 'List Your Hotel'}
                    </button>}

                    {! user &&
                    <button  onClick = {openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                        Login
                    </button>}
                </div>
            </nav>
    );
}
export default Navbar;
// log
// added user button my-bookings 08/03/2025, 
// define const bookIcon

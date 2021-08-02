import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as FcIcons from 'react-icons/fc';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import * as CgIcons from 'react-icons/cg';

export const SidebarData= [
    {
        title: 'Home',
        path:'/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'About Us',
        path:'/aboutus',
        icon: <FcIcons.FcAbout />,
        cName: 'nav-text'
    },
    {
        title: 'Contracts',
        path:'/contract',
        icon: <FaIcons.FaFileContract />,
        cName: 'nav-text'
    },
    {
        title: 'PriceBoard',
        path:'/priceboard',
        icon: <BsIcons.BsClipboardData/>,
        cName: 'nav-text'
    },
    {
        title: 'Bids',
        path:'/bids',
        icon: <RiIcons.RiAuctionLine />,
        cName: 'nav-text'
    },
    {
        title: 'Products',
        path:'/',
        icon: <FaIcons.FaProductHunt />,
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path:'/profile',
        icon: <CgIcons.CgProfile />,
        cName: 'nav-text'
    },
    
    {
        title: 'Notifications',
        path:'/notifications',
        icon: <RiIcons.RiNotification3Line/>,
        cName: 'nav-text'
    },
    {
        title: 'Logout',
        path:'/',
        icon: <AiIcons.AiOutlineLogout />,
        cName: 'nav-text'
    }
]
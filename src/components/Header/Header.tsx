import * as React from 'react'
import './Header.styl'
import logo from '../../assets/images/Infosys2.png'
import { Outlet } from 'react-router-dom'
export default function Header() {
    return (
        <div className='flex'>
            <div className='header title'>
                {/* <img src={logo} className='headerLogo' /> */}
                INFYFLIX
            </div>
            <div className='childPages'>
                <Outlet />
            </div>
        </div>
    )
}
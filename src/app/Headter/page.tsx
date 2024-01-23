import { NextPage } from 'next'
import Link from 'next/link'


const Header = () => {
  return (
    <div className='flex justify-between items-center w-screen h-12 px-8 bg-mauve text-white'>
      {/* title */}
      <div>
        <Link href={"/"}>宇宙語り美少女AI</Link>
      </div>

      {/* etc */}
      <ul className='flex justify-around w-40'>
        <li>
          <Link href={"/About"}>About</Link>
        </li>
        <li>
          <Link href={"/Contact"}>Contact</Link>
        </li>
      </ul>
    </div>
  )
}

export default Header

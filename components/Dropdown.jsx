import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Image from 'next/image'

export default function Dropdown() {
  return (
    <Menu>
      <MenuButton>
        <Image
            src = {"/menu.svg"}
            alt="menu"
            width = {20} 
            height = {20}
            className="object-contain"/>
      </MenuButton>
      <MenuItems anchor="bottom">
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100">
            Share
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100">
            Edit
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100">
            Archive
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100">
            Star
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-[focus]:bg-blue-100">
            Delete
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
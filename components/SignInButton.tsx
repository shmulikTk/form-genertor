'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { MenubarAvatar, MenubarMenu, MenubarTriggerAvatar, MenubarItem, MenubarShortcut, MenubarContent, MenubarSeparator } from './ui/menubar'


const SignInButton = () => {
  const { data: session } = useSession()

  return (
    <>
      {session ? (
        <>
            <div className='text-sm dark:border-stone-600'>
                hello {session?.user?.name}
            </div>
            <MenubarAvatar>
                <MenubarMenu>
                    <MenubarTriggerAvatar>
                        <Avatar>
                            <AvatarImage src={session.user?.image as string} />
                            <AvatarFallback>{(session.user?.name as string).split(" ").map((n)=>n[0]).join("")}</AvatarFallback>
                        </Avatar>
                    </MenubarTriggerAvatar>
                    <MenubarContent>
                        <MenubarItem onClick={() => signOut()}>
                            sign out
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </MenubarAvatar>
        </>
      ) : (
        <button
          className='rounded-md border border-stone-300 px-3 py-1 text-sm dark:border-stone-600'
          onClick={() => signIn()}
        >
          Sign In
        </button>
      )}
    </>
  )
}

export default SignInButton

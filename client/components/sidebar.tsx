"use client";

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Montserrat_Alternates } from 'next/font/google';
import Link from 'next/link';
import React from 'react'
import { LayoutList, ListChecks, ListTodo, UserSquare2 } from 'lucide-react';
import ProfileCounter from './profile-counter';

const monsterrat = Montserrat_Alternates({ weight: "600", subsets: ["latin"] })

const routes = [
    {
        label: "To-Do's",
        icon: ListTodo,
        href: '/',
        color: "text-sky-500"
    },
    {
        label: "Completed Tasks",
        icon: ListChecks,
        href: '/completed-tasks',
        color: "text-emerald-500"
    },
    {
        label: "Incomplete Tasks",
        icon: LayoutList,
        href: '/incomplete-tasks',
        color: "text-violet-500"
    },
    {
        label: "Profile",
        icon: UserSquare2,
        href: '/profile',
        color: "text-pink-700"
    }
]

const Sidebar = () => {
  const pathName = usePathname();
  return (
      <main className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
          <div className='px-3 py-2 flex-1'>
              <Link href='/dashboard' className='flex items-center pl-3 mb-14'>
                <div className="relative mr-4 flex h-8 w-8 items-center justify-center rounded-full border">
                    <span>NT</span>
                </div>
                <h1 className={cn('text-2xl font-bold', monsterrat.className)}>
                    NexTask
                </h1>
              </Link>
              <div className='space-y-1'>
                  {routes.map((route) => {
                      return (
                        <Link href={route.href} key={route.label} className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition', pathName === route.href ? "text-white bg-white/20" : "text-zinc-400")}>
                            <div className='flex items-center flex-1'>
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                <span>{route.label}</span>
                            </div>
                        </Link>
                      )
                  })}
              </div>
          </div>
          <ProfileCounter />
    </main>
  )
}

export default Sidebar
import NavBar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import React from 'react'

const Dashboardlayout = async ({ children }: { children: React.ReactNode }) => {
  
  return (
      <main className='h-full relative'>
          {/* Sidebar Component */}
        <section className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-zinc-900'>
        <Sidebar />
          </section>
          {/* Main Screen */}
          <section className='md:pl-72'>
              <NavBar />
              {children}
          </section>
    </main>
  )
}

export default Dashboardlayout
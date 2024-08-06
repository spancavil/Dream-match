"use client"
import { AppContextProvider } from '@/context/appContext'
import React from 'react'

const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <AppContextProvider>
        {children}
    </AppContextProvider>
  )
}

export default Providers
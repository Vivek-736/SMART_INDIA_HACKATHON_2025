import React from 'react'
import { UserButton } from '@clerk/nextjs'

const DashboardPage = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <UserButton />
        </div>
    )
}

export default DashboardPage

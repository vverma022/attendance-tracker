import { GraduationCap, UserCog } from 'lucide-react'
import { Button } from '@/components/ui/button'

import React from 'react'

const Header = () => {
  return (
    <div>
<header className="bg-white dark:bg-gray-800 shadow">
<div className="container mx-auto px-4 py-4 flex justify-start">
  <div className="flex items-start space-x-2">
    <GraduationCap className="h-8 w-8 text-primary" />
    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">EduTrack</h1>
  </div>
</div>
</header>
    </div>
  )
}

export default Header

import HomePageClient from '@/app/components/HomePageClient'
import { getAllBooks } from '@/app/services/Api'
import React from 'react'

async function page() {
    const response = await getAllBooks()

  return (
    <div>
      <HomePageClient initialBooks={response.books} />  
    </div>
  )
}

export default page

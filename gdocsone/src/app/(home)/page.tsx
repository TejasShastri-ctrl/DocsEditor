'use client'

import { usePaginatedQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

import Link from 'next/link'
import React from 'react'

import { Navbar } from './navbar'
import { TempGallery } from './template-gallery'
import { DocumentsTable } from './documents-table'
import { useSearchParam } from '@/hooks/use-search-params'

const Home = () => {

  const[search] = useSearchParam(); //created this hook, go over it again

  const {results, status, loadMore} = usePaginatedQuery(api.documents.get, {search}, {initialNumItems: 5});

  if (results === undefined) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <div className='fixed py-2 left-0 w-full bg-white z-50'>
        <Navbar />
      </div>
      <div className='mt-16'>
        <TempGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
      {/* Using shadCN table component to display docs */}

    </div>
  )
}

export default Home;
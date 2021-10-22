import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useUsers } from '../actions/users'

const Header = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')

  const router = useRouter()
  const { query, pathname } = router;

  const { users, isLoading } = useUsers(page + 1, limit)


  useEffect(() => {
    if(query.page) {
      let p = Number(query.page) >= 1 ? query.page : 1;
      setPage(Number(p))
    }

    if(query.limit) {
      let l = Number(query.limit) >= 10 ? query.limit : 10;
      setLimit(Number(l))
    }
  },[query.page, query.limit])

  const handlePagination = (pageIndex) => {
    if(pathname !== "/") return;
    let p = pageIndex >= 1 ? pageIndex : 1;
    router.replace(`?page=${p}&limit=${limit}`)
  }

  const handlePerPage = (limitNumber) => {
    if(pathname !== "/") return;
    router.replace(`?page=${1}&limit=${limitNumber}`)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if(pathname !== "/") return;
    router.replace(`?search=${search}`)
    setSearch('')
  }


  return (
    <header>
      <div className="nav wrap">
        <div className="logo">
          <h1>
            {
              pathname !== '/'
              ? <div onClick={() => router.back()}
              style={{cursor: 'pointer'}}> 
                SWR
              </div>
              :<Link href={`/?page=${1}&limit=${limit}`} replace 
              shallow={true}>
                <a>SWR</a>
              </Link>
            }
            
          </h1>
        </div>

        <form onSubmit={handleSearch}>
          <input type="text" required placeholder='Enter your search'
          value={search} onChange={e => setSearch(e.target.value)}
          disabled={pathname !== '/'} />

          <button disabled={(pathname !== '/' )|| isLoading}>
            Search
          </button>
        </form>

        <div className="row">
          <button className='prev' aria-label='prev'
          onClick={() => handlePagination(page - 1)}
          disabled={(pathname !== '/') || isLoading || (page === 1)}>
            <i className='fas fa-chevron-left' />
          </button>
          <span>{page}</span>
          <button className='next' aria-label='next'
          onClick={() => handlePagination(page + 1)}
          disabled={(pathname !== '/') || isLoading || (!users.length)}>
            <i className='fas fa-chevron-right' />
          </button>
        </div>

        <div>
          <label htmlFor="per-page">Per Page:</label>
          <select id="per-page" value={limit}
          onChange={e => handlePerPage(e.target.value)}
          disabled={(pathname !== '/') || isLoading}>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>

      </div>
    </header>
  )
}

export default Header

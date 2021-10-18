import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <div className="nav wrap">
        <div className="logo">
          <h1>
            <Link href="/">
              <a>SWR</a>
            </Link>
          </h1>
        </div>

        <form>
          <input type="text" required placeholder='Enter your search' />
          <button>Search</button>
        </form>

        <div className="row">
          <button className='prev' aria-label='prev'>
            <i className='fas fa-chevron-left' />
          </button>
          <span>1</span>
          <button className='next' aria-label='next'>
            <i className='fas fa-chevron-right' />
          </button>
        </div>

        <div>
          <label htmlFor="per-page">Per Page:</label>
          <select id="per-page">
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

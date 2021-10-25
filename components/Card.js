import React, { useContext } from 'react'
import Link from 'next/link'

import { DataContext } from '../store/GlobalState'

import getQueryUrl from '../utils/getQueryUrl'
import { useUsers } from '../actions/users'
import axios from 'axios'

const Card = ({user}) => {
  const { setUserState } = useContext(DataContext)
  const { router, page, limit, search } = getQueryUrl()
  const { users, mutate } = useUsers(page, limit, search)

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure delete?")){
      const newUsers = users.filter(item => item.id !== id)
      mutate(newUsers, false)
      await axios.delete(`/users/${id}`)
      mutate()
    }
  }

  return (
    <div className='card'>
      <Link href={`/users/${user?.id}`}>
        <a> 
          <h2>{user?.name}</h2>
          <img loading='lazy' src={user?.avatar} alt="avatar" />
        </a>
      </Link>
      {
        (router.pathname === "/") &&
        <div className='menu'>
          <i className='fas fa-pencil-alt'
          onClick={() => setUserState(user)} />
          <i className='fas fa-trash'
          onClick={() => handleDelete(user.id)} />
        </div>
      }
    </div>
  )
}

export default Card

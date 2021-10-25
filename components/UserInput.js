import React, { useContext } from 'react'
import axios from 'axios'

import { DataContext } from '../store/GlobalState'
import getQueryUrl from '../utils/getQueryUrl'
import { useUsers } from '../actions/users'

const UserInput = () => {
  const { userState, setUserState } = useContext(DataContext)
  const { id, name, avatar, createdAt } = userState;

  const { router, page, limit, search } = getQueryUrl()
  const { users, mutate } = useUsers(page, limit, search)

  const handleInput = (e) => {
    const {name, value} = e.target;
    setUserState({...userState, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = {
      name,
      avatar,
      createdAt: id ? createdAt : new Date()
    }
    
    if(id){
      const newUsers = users.map(user => (
        user.id === id ? {...newUser, id} : user
      ))
      mutate(newUsers, false)
      await axios.put(`/users/${id}`, newUser)
    }else{
      router.replace(`/?page=1&limit${limit}`)
      const res = await axios.post('/users', newUser)
      mutate([res.data, ...users], false)
    }

    setUserState({
      id: '',
      name: '',
      avatar: '',
      createdAt: ''
    })
   
    mutate()
  }

  return (
    <form className="user_input wrap" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="name">Name</label>
        <input type="text" name='name' required
        value={name} onChange={handleInput} />
      </div>

      <div className="input-group">
        <label htmlFor="avatar">Avatar</label>
        <input type="text" name='avatar' required
        value={avatar} onChange={handleInput} />
      </div>

      <button type="submit">
        { id ? 'Update' : 'Add' }
      </button>
    </form>
  )
}

export default UserInput

import React from 'react'
import Card from './Card'

const Page = ({users}) => {
  return (
    <div className='card_container'>
      {
        users?.map(user => (
          <Card key={user.id} user={user} />
        ))
      }
    </div>
  )
}

export default Page

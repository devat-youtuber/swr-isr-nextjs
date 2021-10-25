import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Loading from '../../components/Loading'
import Card from '../../components/Card'

import { useUser } from '../../actions/users'

const User = ({initUser, id}) => {
  const [data, setData] = useState(initUser)
  const [isSwr, setIsSWR] = useState(false)

  const { user, isLoading, isError } = useUser(id)

  useEffect(() => {
    if(user){
      setData(user)
      setIsSWR(true)
    }
  },[user])


  if(isSwr && isError) return <h2>{isError}</h2>;

  if(isSwr && isLoading) return <Loading />;

  return (
    <div>
     { data && <Card user={data} /> }
    </div>
  )
}

export async function getStaticPaths() {
  let url = `/users?_sort=createdAt&_order=desc`
  const res = await axios.get(url)
  const users = res.data;

  const paths = users.map((user) => ({
    params: { id: user.id },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const url = `/users/${params.id}`
  const res = await axios.get(url)
  return {
    props: {
      initUser: res.data,
      id: params.id
    },
    revalidate: 10,
  };
}

export default User

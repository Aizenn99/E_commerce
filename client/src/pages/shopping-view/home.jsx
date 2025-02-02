import { Button } from '@/components/ui/button'
import { logoutUser } from '@/store/auth-slice'
import React from 'react'
import { useDispatch } from 'react-redux'

const ShoppingHome = () => {
  const dispatch = useDispatch()

  function handleLogout(){
    dispatch(logoutUser())
  }

  return (
    <div >
    <Button onClick={handleLogout} >Logout</Button>
    </div>
  )
}

export default ShoppingHome
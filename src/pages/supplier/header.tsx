import { Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate();

  const items = [
    {
      label: 'Quotes',
      key: 'quote',
    },
    {
      label: 'Create New Quote',
      key: 'new-quote',
    },
    {
      label: 'Logout',
      key: 'logout',
    },
  ]

  const handleClick = (data: any) => {
    if (data.key === 'logout') {
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      navigate('/');
    } 
    else if (data.key === 'quote') {
      navigate('/supplier-quotes')
    } 
    else if (data.key === 'new-quote') {
      navigate('/supplier-create-quote')
    }
    
  }

  return (
    <Menu onClick={handleClick} mode='horizontal' items={items}></Menu>
  )
}

export default Header
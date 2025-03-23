import { Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate();

  const items = [
    {
      label: 'Products',
      key: 'products',
    },
    {
      label: 'Create New Product',
      key: 'new-product',
    },
    {
      label: 'Create User',
      key: 'create-user',
    },
    {
      label: 'Quotations',
      key: 'quotes',
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
    } else if (data.key === 'products') {
      navigate('/admin-products')
    } 
    else if (data.key === 'new-product') {
      navigate('/admin-create-product')
    }
    else if (data.key === 'create-user') {
      navigate('/admin-create-user')
    }
    else if (data.key === 'quotes') {
      navigate('/admin-quotes')
    }
    
  }

  return (
    <Menu onClick={handleClick} mode='horizontal' items={items}></Menu>
  )
}

export default Header
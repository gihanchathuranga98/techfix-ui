import React, { useEffect, useState } from 'react'
import Header from './header'
import { Card, Table } from 'antd'
import axios from 'axios';

const Products = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/products')
            .then(data => {
                setProducts(data.data);
            })
            .catch(err => {
                alert('Error loading products')
            })
    }, [])

    const columns = [
        {
            title: '#ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName'
        },
        {
            title: 'Price (LKR)',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Available Qty',
            dataIndex: 'availableQty',
            key: 'availableQty'
        },
        {
            title: 'Discount (LKR)',
            dataIndex: 'discount',
            key: 'discount'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
    ]

    return (
        <>
            <Header />
            <Card title={'All Products'} size='small' style={{margin: 10, marginTop: 50}}>
                <Table dataSource={products} columns={columns} />
            </Card>
        </>
    )
}

export default Products
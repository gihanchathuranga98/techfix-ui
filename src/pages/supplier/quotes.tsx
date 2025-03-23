import { Button, Card, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import Header from './header'
import { QuoteStatus } from '../../enums/quote-status.enum';
import axios from 'axios';

const Quotes = () => {

    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        loadQuotes();
    }, [])

    const loadQuotes = () => {
        axios.get('http://localhost:4000/api/quotes')
            .then(data => {
                setQuotes(data.data);
            })
            .catch(err => {
                alert('Error loading quotes')
            })
    }

    const columns = [
        {
            title: '#ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Show Items',
            dataIndex: 'id',
            key: 'id',
            render: (value: number, data: any) => {
                return <Button onClick={() => {}} type='primary'>Show Items</Button>
            }
        },
        {
            title: 'Quote Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Supplier',
            dataIndex: 'supplierName',
            key: 'supplierName'
        },
        {
            title: 'Discount (LKR)',
            dataIndex: 'discount',
            key: 'discount'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (value: QuoteStatus) => {
                if (value === QuoteStatus.PENDING) {
                    return 'PENDING'
                }
                else if (value === QuoteStatus.APPROVED) {
                    return 'APPROVED';
                } else {
                    return 'REJECTED'
                }
            }
        }
    ]

    return (
        <>
            <Header />
            <Card title={'All Products'} size='small' style={{ margin: 10, marginTop: 50 }}>
                <Table dataSource={quotes} columns={columns} />
            </Card>
        </>
    )
}

export default Quotes
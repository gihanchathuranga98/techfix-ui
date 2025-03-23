import React, { useEffect, useState } from 'react'
import Header from './header'
import { Button, Card, Modal, Table } from 'antd'
import axios from 'axios';
import { QuoteStatus } from '../../enums/quote-status.enum';

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
                return <Button onClick={() => { showItems(data.items) }} type='primary'>Show Items</Button>
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
        },
        {
            title: 'Options',
            dataIndex: 'id',
            key: 'id',
            render: (value: number, data: any) => {
                return <>
                    <Button disabled={data.status !== QuoteStatus.PENDING} onClick={() => { changeQuoteStatus(QuoteStatus.APPROVED, value) }} style={{ marginRight: 5 }} type='primary'>Approve</Button>
                    <Button disabled={data.status !== QuoteStatus.PENDING} onClick={() => { changeQuoteStatus(QuoteStatus.REJECTED, value) }} type='primary' danger>Reject</Button>
                </>
            }
        }
    ]

    const showItems = (data: any) => {
        Modal.confirm({
            content: <><h1>some content</h1></>,
            centered: true
        })
    }

    const changeQuoteStatus = (status: QuoteStatus, id: number) => {
        if (status === QuoteStatus.APPROVED) {
            axios.post('http://localhost:4000/api/approve-quote', { id })
                .then(data => {
                    loadQuotes();
                })
                .catch(error => {
                    alert('Error while approving')
                })
        } else {
            axios.post('http://localhost:4000/api/reject-quote', { id })
                .then(data => {
                    loadQuotes();
                })
                .catch(error => {
                    alert('Error while rejecting')
                })
        }

    }

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
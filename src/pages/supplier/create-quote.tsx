import { Button, Card, Col, Form, Input, Row, Select, Table } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react'
import Header from './header';
import axios from 'axios';

const CreateQuote = () => {

    const [items, setItems] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/products')
            .then(data => {
                setProducts(data.data);
            })
            .catch(err => {
                alert('Unable to load product details');
            })
    }, [])

    const itemColumn = [
        {
            title: 'Item Name',
            dataIndex: 'itemId',
            key: 'itemId',
            render: (value: number) => {
                return products.find(p => p.id === value).productName
            }
        },
        {
            title: 'Unit Price',
            dataIndex: 'unitPrice',
            key: 'unitPrice'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity'
        }
    ]

    const [quoteForm] = useForm();
    const [itemForm] = useForm();

    const handleCreateQuotation = () => {
        const {title, discount} = quoteForm.getFieldsValue();
        axios.post('http://localhost:4000/api/create-quote', {supplierId: localStorage.getItem('userId'), items: items, title, discount})
        .then()
        .catch(error => {
            alert('Unable to create quotes')
        })
        .finally(() => {
            quoteForm.resetFields();
            setItems([]);
        })
    }

    const handleItemAdd = (data: any) => {
        
        setItems(prevItems => [...prevItems, data]);
        itemForm.resetFields();
    }

    return (
        <>
            <Header />
            <Row gutter={[5, 5]} style={{ marginTop: 100 }}>
                <Col span={6} offset={0}>
                    <Card size={'small'} title={'Create New Quote'}>
                        <Form form={quoteForm} layout='vertical'>
                            <Form.Item name={'title'} label={'Quote Title'}>
                                <Input />
                            </Form.Item>
                            <Form.Item label={'Discount'} name={'discount'}>
                                <Input />
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col span={18} >
                    <Card size='small' title={'Add Items'}>
                        <Form onFinish={handleItemAdd} form={itemForm} layout='vertical'>
                            <Row gutter={[5, 0]}>
                                <Col span={6}>
                                    <Form.Item name={'itemId'} label={'Item Name'}>
                                        <Select options={products.map(p => ({ value: p.id, label: p.productName }))} />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label={'Unit Price'} name={'unitPrice'}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label={'Quantity'} name={'quantity'}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Button style={{ marginBottom: 20 }} type='primary' htmlType='submit'>Add Item</Button>
                        </Form>
                        <Table dataSource={items} columns={itemColumn}/>

                        <Button style={{ marginTop: 40 }} type='primary' onClick={handleCreateQuotation}>Create New Quotation</Button>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CreateQuote
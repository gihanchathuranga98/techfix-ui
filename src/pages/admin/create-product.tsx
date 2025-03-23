import React from 'react'
import Header from './header'
import { Button, Card, Col, Form, Input, Row, Select } from 'antd'
import { UserTypesEnum } from '../../enums/user-types.enum'
import { useForm } from 'antd/es/form/Form'
import axios from 'axios'

const CreateProducts = () => {

    const [form] = useForm();

    const handleSubmit = (data: any) => {
        axios.post('http://localhost:4000/api/create-product', data)
        .then(data => {
            alert('Success');
            form.resetFields();
        })
        .catch(error => {
            alert('Error while creating the product')
        })
    }

    return (
        <>
            <Header />
            <Row style={{ marginTop: 100 }}>
                <Col span={8} offset={8}>
                    <Card title={'Create New Product'} size='small'>
                        <Form layout='vertical' form={form} onFinish={handleSubmit}>
                            <Form.Item name={'name'} label={'Product Name'}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={'price'} label={'Product Price'}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={'availableQty'} label={'Quantity'}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={'description'} label={'Description'}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={'discount'} label={'Discount'}>
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType='submit' type='primary'>Create Product</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CreateProducts
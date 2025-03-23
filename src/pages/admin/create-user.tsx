import { Button, Card, Col, Form, Input, Row, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React from 'react'
import { UserTypesEnum } from '../../enums/user-types.enum';
import axios from 'axios';
import Header from './header';

const CreateUser = () => {

    const [form] = useForm();

    const handleUserSubmit = (data: any) => {
        axios.post('http://localhost:4000/api/create-user', data)
            .then(data => {
                alert('Success')
                form.resetFields();
            })
            .catch(error => {
                alert('User Creation Failed')
            });
    }

    return (
        <>
            <Header />
            <Row style={{ marginTop: 100 }}>
                <Col span={8} offset={8}>
                    <Card title={'Create User'} size='small'>
                        <Form layout='vertical' form={form} onFinish={handleUserSubmit}>
                            <Form.Item name={'name'} label={'Name'}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={'email'} label={'Email'}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={'password'} label={'Password'}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={'type'} label={'User Type'}>
                                <Select options={[{ label: 'ADMIN', value: UserTypesEnum.ADMIN }, { label: 'SUPPLIER', value: UserTypesEnum.SUPPLIER }]} />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType='submit' type='primary'>Create User</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default CreateUser
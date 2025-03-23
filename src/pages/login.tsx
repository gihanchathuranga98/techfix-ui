import { Button, Card, Col, Form, Input, Row } from 'antd'
import { useForm } from 'antd/es/form/Form'
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { UserTypesEnum } from '../enums/user-types.enum';

const Login = () => {

    const [form] = useForm();
    const navigate = useNavigate();

    const handleLogin = (data: any) => {
        axios.post('http://localhost:4000/api/login', data)
        .then((data) => {
            localStorage.setItem('userId', data.data.id);
            localStorage.setItem('role', data.data.type);

            const role = data.data.type as UserTypesEnum;

            if(role === UserTypesEnum.ADMIN){
                navigate('/admin-products');
            }else{
                navigate('/supplier-quote')
            }
        })
        .catch(() => {
            alert('Username or password is wrong');
        })
    }

    return (
        <Row>
            <Col span={6} offset={10}>
                <Card title={'Login'} size='small' style={{marginTop: 150}}>
                    <Form onFinish={handleLogin} form={form} layout='vertical'>
                        <Form.Item name={'email'} label={'Email'} rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name={'pwd'} label={'Password'} rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit' type='primary'>Login</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default Login
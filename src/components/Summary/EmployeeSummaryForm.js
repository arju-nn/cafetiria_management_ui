// src/components/Summary/EmployeeSummaryForm.js
import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd';

const { RangePicker } = DatePicker;

const EmployeeSummaryForm = ({ onFinish }) => {
    return (
        <div style={{ marginBottom: '3rem' }}>
            <Form onFinish={onFinish} layout="inline">
                <Form.Item 
                    name="employeeId" 
                    rules={[{ required: true, message: 'Please input the Employee ID!' }]}
                >
                    <Input type="number" placeholder="Employee ID" />
                </Form.Item>
                <Form.Item 
                    name="dateRange" 
                    rules={[{ required: true, message: 'Please select the date range!' }]}
                >
                    <RangePicker />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Get Summary
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EmployeeSummaryForm;

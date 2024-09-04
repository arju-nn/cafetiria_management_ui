// src/components/EmployeeSummary.js
import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import { fetchEmployeeSummary } from 'services/SummaryService';

const { Title } = Typography;

const EmployeeSummary = ({ employeeId, dateRange }) => {
    const [summary, setSummary] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const loadSummaryData = async () => {
            try {
                const summaryData = await fetchEmployeeSummary(employeeId, dateRange);
                const aggregatedData = aggregateData(summaryData);

                setSummary(summaryData);
                calculateTotals(summaryData);

                // setSummary(aggregatedData);
                // calculateTotals(aggregatedData);
            } catch (error) {
                console.error('API call failed:', error.message);
            }
        };

        if (employeeId && dateRange) {
            loadSummaryData();
        }
    }, [employeeId, dateRange]);

    const aggregateData = (data) => {
        const aggregated = data.reduce((acc, item) => {
            const key = `${item.userId}-${item.itemId}`; // Unique key based on userId and itemId

            if (!acc[key]) {
                acc[key] = {
                    userId: item.userId,
                    itemId: item.itemId,
                    itemName: item.itemName,
                    price: item.price,
                    quantity: parseFloat(item.quantity), // Initialize quantity
                };
            } else {
                acc[key].quantity += parseFloat(item.quantity); // Aggregate quantity
            }

            return acc;
        }, {});

        return Object.values(aggregated); // Convert the aggregated data object back to an array
    };

    const calculateTotals = (data) => {
        let totalItems = 0;
        let totalPrice = 0;
        data.forEach((item) => {
            totalItems += item.quantity;
            totalPrice += item.quantity * item.price;
        });
        setTotalItems(totalItems);
        setTotalPrice(totalPrice);
    };

    const columns = [
        {
            title: 'Item Name',
            dataIndex: 'itemName',
            key: 'itemName',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Order Date', // Updated the title from 'Ordered Date' to 'Date'
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => new Date(text).toLocaleDateString(), // Format the date as 'MM/DD/YYYY'
        },
        {
            title: 'Total',
            key: 'total',
            render: (text, record) => record.quantity * record.price,
        },
    ];

    return (
        <div>
            <Table dataSource={summary} columns={columns} rowKey={(record) => `${record.orderId}-${record.itemId}`} />
            <Title level={4}>Total Items Consumed: {totalItems}</Title>
            <Title level={4}>Total Price: {totalPrice} Rs</Title>
        </div>
    );
};

export default EmployeeSummary;

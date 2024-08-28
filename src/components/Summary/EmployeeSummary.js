import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import axios from "axios/axios";

const { Title } = Typography;

const EmployeeSummary = ({ employeeId, dateRange }) => {
    const [summary, setSummary] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchSummaryData = async () => {
            try {
                var token = JSON.parse(localStorage.getItem("token")); // Get the token from local storage
                if (!token) {
                    console.error('No token found in local storage');
                    return;
                }

                // Assume dateRange is an array with two moments: [startDate, endDate]
                const [startDate, endDate] = dateRange;

                // Check if dateRange and dates are valid
                if (!startDate || !endDate) {
                    console.error('Invalid dateRange:', dateRange);
                    return;
                }

                // Format dates as needed, e.g., 'YYYY-MM-DD'
                const formattedStartDate = startDate.format('YYYY-MM-DD');
                const formattedEndDate = endDate.format('YYYY-MM-DD');

                const response = await axios.get(`/api/orders/reports/${employeeId}/items`, {
                    params: {
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const summaryData = response.data; // Assign the fetched data
                const aggregatedData = aggregateData(summaryData);

                setSummary(summaryData);
                calculateTotals(summaryData);

                // setSummary(aggregatedData);
                // calculateTotals(aggregatedData);
            } catch (error) {
                console.error('API call failed:', error.response ? error.response.data : error.message);
                // Handle the error (e.g., show a message to the user)
            }
        };

        if (employeeId && dateRange) {
            fetchSummaryData(); // Call the async function
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
                    quantity: parseFloat(item.quantity) // Initialize quantity
                };
            } else {
                acc[key].quantity += parseFloat(item.quantity); // Aggregate quantity
            }

            return acc;
        }, {});

        // Convert the aggregated data object back to an array
        return Object.values(aggregated);
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

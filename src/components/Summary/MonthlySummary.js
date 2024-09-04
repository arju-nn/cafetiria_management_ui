// src/components/MonthlySummary.js
import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import { fetchMonthlySummary } from 'services/MonthlySummaryService';

const { Title } = Typography;

const MonthlySummary = ({ dateRange }) => {
    const [summary, setSummary] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const loadSummaryData = async () => {
            try {
                const summaryData = await fetchMonthlySummary(dateRange);
                const aggregatedData = aggregateData(summaryData);

                setSummary(aggregatedData);
                calculateTotals(aggregatedData);
            } catch (error) {
                console.error('API call failed:', error.message);
            }
        };

        if (dateRange) {
            loadSummaryData();
        }
    }, [dateRange]);

    // Aggregate data by item name
    const aggregateData = (data) => {
        const aggregated = data.reduce((acc, item) => {
            const key = item.item_name; // Use item name as the key for aggregation

            if (!acc[key]) {
                acc[key] = {
                    itemName: item.item_name,
                    price: parseFloat(item.price),
                    quantity: parseFloat(item.quantity), // Initialize quantity
                };
            } else {
                acc[key].quantity += parseFloat(item.quantity); // Aggregate quantity
                acc[key].price = parseFloat(item.price); // Keep the price of the item (assuming it's constant for each item)
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
            title: 'Total Price',
            key: 'totalPrice',
            render: (text, record) => (record.quantity * record.price).toFixed(2),
        },
    ];

    return (
        <div>
            <Table
                dataSource={summary}
                columns={columns}
                rowKey={(record) => record.itemName}
            />
            <Title level={4}>Total Items Consumed: {totalItems}</Title>
            <Title level={4}>Total Price: {totalPrice.toFixed(2)} Rs</Title>
        </div>
    );
};

export default MonthlySummary;

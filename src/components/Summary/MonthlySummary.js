import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import axios from 'axios/axios';

const { Title } = Typography;

const MonthlySummary = ({ dateRange }) => {
  const [summary, setSummary] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')); // Get the token from local storage
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

        // Fetch data for all employees without filtering by employeeId
        const response = await axios.get(`/api/orders/reports/monthly`, {
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

        setSummary(aggregatedData);
        calculateTotals(aggregatedData);
      } catch (error) {
        console.error('API call failed:', error.response ? error.response.data : error.message);
        // Handle the error (e.g., show a message to the user)
      }
    };

    if (dateRange) {
      fetchSummaryData(); // Call the async function
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

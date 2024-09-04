// src/services/reportService.js
import axios from "axios/axios";

export const fetchMonthlySummary = async (dateRange) => {
    try {
        const token = JSON.parse(localStorage.getItem('token')); // Get the token from local storage
        if (!token) {
            throw new Error('No token found in local storage');
        }

        // Assume dateRange is an array with two moments: [startDate, endDate]
        const [startDate, endDate] = dateRange;

        // Check if dateRange and dates are valid
        if (!startDate || !endDate) {
            throw new Error('Invalid dateRange');
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

        return response.data; // Return the fetched data
    } catch (error) {
        // Propagate the error to the calling function
        throw new Error(error.response ? error.response.data : error.message);
    }
};

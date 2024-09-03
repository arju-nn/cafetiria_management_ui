// src/pages/MonthlySummaryPage.js
import React, { useState } from 'react';
import { Card } from 'antd';
import EmployeeSummaryForm from '../components/Summary/EmployeeSummaryForm';
import EmployeeSummary from '../components/Summary/EmployeeSummary';
import MonthlySummaryForm from 'components/Summary/MonthlySummaryForm';
import MonthlySummary from 'components/Summary/MonthlySummary';

const MonthlySummaryPage = () => {
    const [employeeId, setEmployeeId] = useState(null);
    const [dateRange, setDateRange] = useState(null);

    const handleFinish = ({ employeeId, dateRange }) => {
        setEmployeeId(employeeId);
        setDateRange(dateRange);
    };

    return (
        <Card title="Monthly Summary">
            <MonthlySummaryForm onFinish={handleFinish} />
            {dateRange && <MonthlySummary dateRange={dateRange} />}
        </Card>
    );
};

export default MonthlySummaryPage;

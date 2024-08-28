// src/pages/SummaryPage.js
import React, { useState } from 'react';
import { Card } from 'antd';
import EmployeeSummaryForm from '../components/Summary/EmployeeSummaryForm';
import EmployeeSummary from '../components/Summary/EmployeeSummary';

const SummaryPage = () => {
    const [employeeId, setEmployeeId] = useState(null);
    const [dateRange, setDateRange] = useState(null);

    const handleFinish = ({ employeeId, dateRange }) => {
        setEmployeeId(employeeId);
        setDateRange(dateRange);
    };

    return (
        <Card title="Employee Summary">
            <EmployeeSummaryForm onFinish={handleFinish} />
            {employeeId && dateRange && <EmployeeSummary employeeId={employeeId} dateRange={dateRange} />}
        </Card>
    );
};

export default SummaryPage;

import { useEffect, useState } from 'react';
import moment from 'moment';
import { Button, List, ListItemText, Box, ListItemButton } from '@mui/material';
import axios from 'axios';
import Statistics from './Statistics';
import TransactionGrid from './TransactionGrid/TransactionGrid';

const minYear = 2020;
const maxYear = moment().year();

const SummaryDetails = (props) => {

    const [selectedYear, setSelectedYear] = useState(maxYear);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [monthData, setMonthData] = useState([]);
    const [currentModal, setCurrentModal] = useState(false);

    useEffect(() => {
        const data = axios.get('http://localhost:3000/summary/', { params: { year: selectedYear }, headers: { Authorization: `Bearer ` + props.token }, withCredentials: true })
            .then(response => {
                const summaryData = response.data;
                let gatheredData = [];
                summaryData.forEach(summary => {
                    const numericalDate = new Date(summary.date);
                    const shortDate = moment(numericalDate).format("MMM");
                    gatheredData.push({
                        id: summary._id,
                        month: shortDate,
                        categories: summary.categories
                    })
                });
                setMonthData(gatheredData);
            })
            .catch(error => {
                console.log(error);
            })
    }, [selectedYear]);

    const decrementYear = () => {
        if (selectedYear <= minYear) return;
        setSelectedYear(selectedYear - 1);
    }

    const incrementYear = () => {
        if (selectedYear >= maxYear) return;
        setSelectedYear(selectedYear + 1);
    }

    const renderModal = (summary, month) => {
        if (Object.keys(summary).length > 0) {
            setCurrentModal(<Statistics />);
            setSelectedMonth(month);
        }
        else {
            setCurrentModal(<TransactionGrid />);
            setSelectedMonth(null);
        }
    }

    return (
        <>
            <h1>Summary</h1>
            <Button onClick={() => decrementYear()}>-</Button>
            {selectedYear}
            <Button onClick={() => incrementYear()}>+</Button>
            <Box sx={{ display: 'flex' }}>
                <List sx={{ flexGrow: 1 }}>
                    {moment.monthsShort().map((month) => {
                        let summary = {};
                        const foundSummary = monthData.some(data => {
                            if (data.month === month) {
                                summary = data;
                                return true;
                            }
                            return false;
                        });
                        return (
                            <ListItemButton key={month} summary={summary} selected={month === selectedMonth} onClick={() => renderModal(summary, month)} divider>
                                <ListItemText primary={month} secondary={foundSummary ? "Complete" : "No summary found"} />
                            </ListItemButton>
                        )
                    })}
                </List>
                {currentModal ? 
                    <Box sx={{ flexGrow: 5 }}>
                        <Button variant="outlined" onClick={() => setCurrentModal(false)}>x</Button>
                        {currentModal}
                    </Box> 
                    : null
                }
            </Box>
        </>
    )
}

export default SummaryDetails;
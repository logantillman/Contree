import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { List, ListItem, ListItemText } from '@mui/material';

const Categorize = () => {
    return (
        <>
            <h1>Categorize</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    views={['year']}
                />
            </LocalizationProvider>
            <List>
                {moment.monthsShort().map((month) => (
                    <ListItem key={month} divider>
                        <ListItemText primary={month} />
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default Categorize;
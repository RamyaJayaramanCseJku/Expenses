import React,{useState} from 'react';
import { TextField, MenuItem, Input, AppBar, Typography,FormControl  } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import "./expenses-entry-form.css"
const EntryForm = () => {
	const currencies = [
		{
			value: 'EUR',
			label: '€',
		},
	];
	const expenseSpentAtStore = [{
		value: "Spar"
	},
	{
		value: "Billa"
	},
	{
		value: "Action"
	},
	{
		value: "Tedi"
	},
	{
		value: "H&M"
	},
	{
		value: "C&A"
	},
	{
		value: "New Yorker"
	},
	{
		value: "MTC"
	},
	{
		value: "Josco"
	}
	]
	const expenseCategory = [
		{
			value: 'Groceries',

		},
		{
			value: 'Food',

		},
		{
			value: 'Travel',

		},
		{
			value: 'Gift',

		},
		{
			value: 'Toiletries',

		},
		{
			value: 'Electrical and electronics',

		},
		{
			value: 'Furnitures',

		},
		{
			value: 'Plants',

		},
		{
			value: 'Savings',

		},
		{
			value: 'Subscriptions',

		},
		{
			value: 'Rent',

		},
		{
			value: 'Heating',

		},
		{
			value: 'Electricity',

		},
		{
			value: 'Internet',

		},
		{
			value: 'Phone bill',
		},
		{
			value: 'India transfer',
		},
	];
	const users = [{
		value: "Ramya Jayaraman"
	},
	{
		value: "Muthukumar Neelamegam"
	}];
	const handleDateChange = (date, dateType) =>{
		setFormData({ ...formData, [dateType]: date.$d });
	
	  }
	const [formData, setFormData] = useState({
		fullName: '',
		amount: 0,
		date:dayjs(new Date()),
		expenseSpentAtStore:"",
		expenseCategory:"",
		moneyBorrowedFrom:"",
		moneyLentTo:"",
	  });
	
	  const handleChange = (e) => {
		console.log(e.target.name)
		setFormData({ ...formData, [e.target.name]: e.target.value });
	  };
	
	  const handleSubmit = async(e) => {
		e.preventDefault();
		console.log('Form submitted:', formData);
		const Sheet_Url="  https://script.google.com/macros/s/AKfycbxJ4XWfbno40hPQwnt1mCeqqLjONXgtL_eTnfFXwVA/dev"
    try {
      await fetch(Sheet_Url, {
        method: 'POST',
        body: formData,
        muteHttpExceptions: true,
      });

      setFormData({
		fullName: '',
		amount: 0,
		date:"",
		expenseSpentAtStore:"",
		expenseCategory:"",
		moneyBorrowedFrom:"",
		moneyLentTo:"",
      });
    } catch (error) {
      console.log(error);
    }
	  };
	
	return (
		<div className='expenses-page-container'>
			<div className='app-bar-container'>
				<AppBar position="static">
					<Typography variant="h6" component="div" sx={{ textAlign: 'left', flexGrow: 1 }}>
						Expenses Form
					</Typography>
				</AppBar>
			</div>
			<div className='entry-form-container'>
				<form onSubmit={handleSubmit}>
				<TextField disabled  label="Currency" defaultValue={"€"}fullWidth>  </TextField>
				<br/>
				<Input variant="standard" label="Amount" name="amount"value={parseInt(formData.amount)} placeholder="Amount" type="number" fullWidth onChange={handleChange}></Input>

				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DemoContainer components={['DatePicker']}>
						<DatePicker label="Date" name="date"value={formData.date} onChange={(newValue)=>
                          handleDateChange(newValue,"date")}/>
					</DemoContainer>
				</LocalizationProvider>
				<TextField select variant="standard" label="Expense Spent At Store" defaultValue="" helperText="Please select store where expense is spent" fullWidth onChange={handleChange} name="expenseSpentAtStore"value={formData.expenseSpentAtStore}>
					{expenseSpentAtStore.map((category) => (
						<MenuItem key={category.value} name="expenseSpentAtStore"value={category.value} onChange={handleChange}>
							{category.value}
						</MenuItem>))}
				</TextField>
				<TextField select variant="standard" label="Expense Category" defaultValue="" helperText="Please select your expense category" fullWidth onChange={handleChange}name="expenseCategory"value={formData.expenseCategory}>
					{expenseCategory.map((category) => (
						<MenuItem key={category.value} name="expenseCategory"value={category.value} onChange={handleChange}>
							{category.value}
						</MenuItem>))}
				</TextField>
				<TextField select variant="standard" label="Paid By" helperText="Amount Paid By" name="fullName"fullWidth defaultValue="" onChange={handleChange}value={formData.fullName}>
					{users.map((option) => (
						<MenuItem key={option.value} name="fullName"value={option.value} defaultValue="" onChange={handleChange}>
							{option.value}
						</MenuItem>
					))}
				</TextField>
				<TextField select variant="standard" label="Money Borrowed From" name="moneyBorrowedFrom"helperText="Money Borrowed From" fullWidth defaultValue="" onChange={handleChange}>
					{users.map((option) => (
						<MenuItem key={option.value} name="moneyBorrowedFrom"value={option.value} onChange={handleChange}>
							{option.value}
						</MenuItem>
					))}  
					</TextField>
				<TextField select  variant="standard" name="moneyLentTo"label="Money Given To" helperText="Money Given To" fullWidth defaultValue="" onChange={handleChange}>
					{users.map((option) => (
						<MenuItem key={option.value} name="moneyLentTo"value={option.value} onChange={handleChange}>
							{option.value}
						</MenuItem>
					))}  
					</TextField>
					<button type="submit">Submit</button>
					</form>
			</div>
		</div>

	)
}
export default EntryForm;

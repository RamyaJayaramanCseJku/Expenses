import React,{useState} from 'react';
import { TextField, MenuItem, Input, AppBar, Typography,FormControl  } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import "./expenses-entry-form.css"
const EntryForm = () => {
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
	},
	{
		value: "Sharing"
	}
];
	const handleDateChange = (date, dateType) =>{
		setFormData({ ...formData, [dateType]: date });
	
	  }
	const [formData, setFormData] = useState({
		date:dayjs(),
		place:"",
		spendingtInfo:"",
		expenseCategory:"",
		amount: 0,
		amountPaidBy: '',
		moneyBorrowedFrom:"",
		moneyLentTo:"",
	  });
	
	  const handleChange = (e) => {
		console.log(e.target.name)
		setFormData({ ...formData, [e.target.name]: e.target.value });
	  };
	
	  const handleSubmit = async(e) => {
		e.preventDefault();
		console.log('Form submitted:', JSON.stringify(formData),formData);
		const Sheet_Url="https://script.google.com/macros/s/AKfycbw0o_zkqJ4xEbc3lcRte6NkppSNzouOgLBnK66EMXKrF8sD260ZOB8nchx31brlQA4e/exec"
    try {
      const response=await fetch(Sheet_Url, {
        method: 'POST',
        body: JSON.stringify(formData),
        muteHttpExceptions: true,
		contentType: "application/json",
		mode:"no-cors"
      });
	  if (response !== ""){
		let json = await response.json();
		console.log('Success:', JSON.stringify(json));
	  } 
      setFormData({
		date:dayjs(),
		place:"",
		spendingtInfo:"",
		expenseCategory:"",
		amount: 0,
		amountPaidBy: '',
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
				<TextField variant="standard" label="Place" helperText="Please enter location" fullWidth onChange={handleChange}name="place"value={formData.place}></TextField>
				<TextField select variant="standard" label="Expense Spent At Store" helperText="Please select store where expense is spent" fullWidth onChange={handleChange} 
				name="spendingtInfo"value={formData.expenseSpentAtStore}>
					{expenseSpentAtStore.map((category) => (
						<MenuItem key={category.value} value={category.value} onChange={handleChange}>
							{category.value}
						</MenuItem>))}
				</TextField>
				<TextField select variant="standard" label="Expense Category" helperText="Please select your expense category" fullWidth onChange={handleChange}
				name="expenseCategory"value={formData.expenseCategory}>
					{expenseCategory.map((category) => (
						<MenuItem key={category.value} value={category.value} onChange={handleChange}>
							{category.value}
						</MenuItem>))}
				</TextField>
				<TextField select variant="standard" label="Paid By" helperText="Amount Paid By" fullWidth onChange={handleChange}
				name="amountPaidBy" value={formData.fullName}>
					{users.map((option) => (
						<MenuItem key={option.value} value={option.value} onChange={handleChange}>
							{option.value}
						</MenuItem>
					))}
				</TextField>
				<TextField select variant="standard" label="Money Borrowed From" helperText="Money Borrowed From" fullWidth  onChange={handleChange}
				name="moneyBorrowedFrom" value={formData.moneyBorrowedFrom} >
					{users.map((option) => (
						<MenuItem key={option.value} value={option.value} onChange={handleChange}>
							{option.value}
						</MenuItem>
					))}  
					</TextField>
				<TextField select  variant="standard" label="Money Given To" helperText="Money Given To" fullWidth  onChange={handleChange}
				name="moneyLentTo" value={formData.moneyLentTo}>
					{users.map((option) => (
						<MenuItem key={option.value} value={option.value} onChange={handleChange}>
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

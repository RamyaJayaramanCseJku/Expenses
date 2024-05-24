import React,{useState} from 'react';
import { TextField, MenuItem, Input, AppBar, Typography  } from '@mui/material';
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
		console.log(date)
		if(!date){
			setDateError(true)
		}
		else{
			setDateError(false)
			setFormData({ ...formData, [dateType]: date });
		}
	  }
	const [formData, setFormData] = useState({
		date:dayjs(),
		place:"",
		spendingInfo:"",
		expenseCategory:"",
		amount: 0,
		amountPaidBy: '',
		moneyBorrowedFrom:"",
		moneyLentTo:"",
	  });
	  const [placeError, setPlaceError] = useState(false);
	  const [spendingInfoError, setSpendingInfoError] = useState(false);
	  const [expenseCategoryError, setExpenseCategoryError] = useState(false);
	  const [amountError, setAmountError] = useState(false);
	  const [amountPaidByError, setAmountPaidByError] = useState(false);
	  const [dateError, setDateError] = useState(false);
	  const handleChange = (e) => {
		console.log(e.target.name,e.target.value==="0"?true:false)
		if(e.target.name==="place"&&!e.target.value){
			setPlaceError(true)
		}
		else{setPlaceError(false)}
		if(e.target.name==="expenseCategory"&&!e.target.value){
			setExpenseCategoryError(true)
		}
		else{setExpenseCategoryError(false)}
		if(e.target.name==="spendingInfo"&&!e.target.value){
			setSpendingInfoError(true)
		}
		else{setSpendingInfoError(false)}
		if(e.target.name==="amount"&&e.target.value==="0"){
			setAmountError(true)
		}
		else{setAmountError(false)}
		if(e.target.name==="amountPaidBy"&&!e.target.value){
			setAmountPaidByError(true)
		}
		else{setAmountPaidByError(false)}
		setFormData({ ...formData, [e.target.name]: e.target.value });
	  };
	
	  const handleSubmit = async(e) => {
		e.preventDefault();
		const data=new FormData();
		data.append("date",dayjs(formData.date).format("DD.MM.YYYY"));
		data.append("place",formData.place);
		data.append("spendingInfo",formData.spendingInfo);
		data.append("expenseCategory",formData.expenseCategory);
		data.append("amount",formData.amount);
		data.append("amountPaidBy",formData.amountPaidBy);
		data.append("moneyBorrowedFrom",formData.moneyBorrowedFrom);
		data.append("moneyLentTo",formData.moneyLentTo);
	
		console.log('Form submitted:',formData);
		const Sheet_Url="https://script.google.com/macros/s/AKfycbxFgWCFPz7eSOi-4Rrh5oafsb0dXK3zdNePVUQp0g8VIPmfhM7MPMgifGkkV1KqE8cW/exec"
    try {
      const response=await fetch(Sheet_Url, {
        method: 'POST',
        body: data,
        muteHttpExceptions: true,
		contentType: "application/json",
		mode:"no-cors"
      });
	  if (response !== ""){
		console.log(response)
		
		console.log('Success:');
	  } 
      setFormData({
		date:"",
		place:"",
		spendingInfo:"",
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
				<TextField disabled  label="Currency" defaultValue={"€"} fullWidth>  </TextField>
				<br/>
				<TextField variant="standard" label="Amount" name="amount"value={parseInt(formData.amount)} 
				placeholder="Amount" type="number"  onChange={handleChange}
				required
				fullWidth
				InputProps={{
					inputProps: { min: 1 }
				  }}
				error={amountError}
      			helperText={amountError ? "Please enter amount greater than 0" : ""}
				></TextField>

				<LocalizationProvider dateAdapter={AdapterDayjs} required>
					<DemoContainer components={['DatePicker']} required>
						<DatePicker label="Date" name="date"value={formData.date} onChange={(newValue)=>
                          handleDateChange(newValue,"date")}  required
						  error={dateError}
      			helperText={dateError ? "Please enter a valid date" : ""}
						  />
					</DemoContainer>
				</LocalizationProvider>
				<TextField variant="standard" label="Place" required fullWidth
				error={placeError} helperText={placeError?"Please enter location":""} 
				 onChange={handleChange}name="place"value={formData.place}></TextField>
				<TextField select variant="standard" label="Expense Spent At Store" required
				error={spendingInfoError}helperText={spendingInfoError?"Please select store where expense is spent":""} fullWidth onChange={handleChange} 
				name="spendingInfo"value={formData.spendingInfo}>
					{expenseSpentAtStore.map((category) => (
						<MenuItem key={category.value} value={category.value} onChange={handleChange}>
							{category.value}
						</MenuItem>))}
				</TextField>
				<TextField select variant="standard" label="Expense Category" error={expenseCategoryError}helperText={expenseCategoryError?"Please select your expense category":""} fullWidth onChange={handleChange}
				name="expenseCategory"value={formData.expenseCategory} required>
					{expenseCategory.map((category) => (
						<MenuItem key={category.value} value={category.value} onChange={handleChange}>
							{category.value}
						</MenuItem>))}
				</TextField>
				<TextField select variant="standard" label="Paid By" required error={amountPaidByError}helperText={amountPaidByError?"Amount Paid By":""} fullWidth onChange={handleChange}
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

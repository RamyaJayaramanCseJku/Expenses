import React,{useState,useEffect} from 'react';
import { TextField,IconButton, Snackbar,MenuItem, Autocomplete, AppBar, Typography, Button  } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import "./expenses-entry-form.css";
import { expenseSpentAtStore,expenseCategory,users } from '../utils/customInput';
const EntryForm = () => {
	const [open, setOpen] = React.useState(false);

	const [options, setOptions] = React.useState(expenseSpentAtStore);
	const [category, setCategory] = React.useState(expenseCategory);
 // Retrieve options from localStorage or use initialOptions if not present
 useEffect(() => {
    const savedOptions = JSON.parse(localStorage.getItem('expenseSpentAtStore')) || expenseSpentAtStore;
    setOptions(savedOptions);
  }, []);

  
	const DisplayMessage=()=>{
		return( <Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={handleClose}
			message="Expense has been added successfully !!!"
			action={action}
		  />)
	}
	const handleClose = (event, reason) => {
		console.log(event,reason)
		if (reason === 'clickaway') {
		  return;
		}
	
		setOpen(false);
	  };
	  const action = (
		<React.Fragment>
		  <IconButton
			size="small"
			aria-label="close"
			color="inherit"
			onClick={handleClose}
		  >
			<CloseIcon fontSize="small" />
		  </IconButton>
		</React.Fragment>
	  );
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
		if(e){

		
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
	}
	  };
	
	  const handleSubmit = async(e) => {
		e.preventDefault();
		const data=new FormData();
		data.append("date",formData.date.format("YYYY-MM-DD"));
		data.append("place",formData.place);
		data.append("spendingInfo",formData.spendingInfo);
		data.append("expenseCategory",formData.expenseCategory);
		data.append("amount",formData.amount);
		data.append("amountPaidBy",formData.amountPaidBy);
		data.append("moneyBorrowedFrom",formData.moneyBorrowedFrom);
		data.append("moneyLentTo",formData.moneyLentTo);
	
		console.log('Form submitted:',formData);
		const Sheet_Url="https://script.google.com/macros/s/AKfycby-G9BSN2tSJw0nTvxBy9-NFHtAtCmRHQUdy4Uigc2JqOdh4tQ4Bt2UCRZBEASLUx5F/exec"
    try {
      const response=await fetch(Sheet_Url, {
        method: 'POST',
        body: data,
      });
	  if(response.status===200){
		setOpen(true);
		console.log('Success:');
	  }; 
      setFormData({
		date:dayjs(),
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
					<Typography variant="h6" component="div" className="app-bar-header">
						Expenses Entry Form
					</Typography>
				</AppBar>
			</div>
			<div className='entry-form-container'>
				<form onSubmit={handleSubmit}>
				<TextField disabled  label="Currency" defaultValue={"€"} fullWidth>  </TextField>
				<br/>
				<TextField variant="standard" label="Amount" name="amount"value={parseInt(formData.amount??"")} 
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
				 onChange={handleChange}name="place"value={formData.place??""}></TextField>
				
				<Autocomplete
  					disablePortal
  					options={options}
					noOptionsText="Enter to create a new option"
					getOptionLabel={(options) => options.value}
					value={options.find((option) => option.value === formData.spendingInfo) || null}
					name="spendingInfo"
					onInputChange={handleChange}
  					renderInput={(params) => 
					<TextField {...params} name="spendingInfo" label="Expense Spent At Store"
					 variant="standard" required 
					 fullWidth onChange={handleChange} 
					 value={formData.spendingInfo??""}
					 onKeyDown={(e) => {
						if (
						  e.key === "Enter" &&
						  options.findIndex((o) => o.value === formData.spendingInfo) === -1
						) {
						  setOptions((o) => [...o,{ value: formData.spendingInfo }]);
						  setFormData({ ...formData, [e.target.name]: e.target.value });
						}
					  }}
					 />}
				/>
				<Autocomplete
  					disablePortal
  					options={category}
					noOptionsText="Enter to create a new option"
					getOptionLabel={(options) => options.value}
					value={category.find((option) => option.value === formData.expenseCategory) || null}
					name="expenseCategory"
					onInputChange={handleChange}
  					renderInput={(params) => 
				<TextField {...params}  variant="standard" label="Expense Category" 
				error={expenseCategoryError}
				helperText={expenseCategoryError?"Please select your expense category":""} 
				fullWidth 
				onChange={handleChange}
				value={formData.expenseCategory??""}
				name="expenseCategory"
				 required
				 onKeyDown={(e) => {
					if (
					  e.key === "Enter" &&
					  category.findIndex((o) => o.value === formData.expenseCategory) === -1
					) {
					  setCategory((o) => [...o,{ value: formData.expenseCategory }]);
					  setFormData({ ...formData, [e.target.name]: e.target.value });
					}
				  }}
				 />}
					/>
				
				<TextField select variant="standard" label="Paid By" required error={amountPaidByError}helperText={amountPaidByError?"Amount Paid By":""} fullWidth onChange={handleChange}
				name="amountPaidBy" value={formData.amountPaidBy??""}>
					{users.map((option) => (
						<MenuItem key={option.value} value={option.value} onChange={handleChange}>
							{option.value}
						</MenuItem>
					))}
				</TextField>
				<TextField select variant="standard" label="Money Borrowed From" helperText="Money Borrowed From" fullWidth  onChange={handleChange}
				name="moneyBorrowedFrom" value={formData.moneyBorrowedFrom??""} >
					{users.map((option) => (
						<MenuItem key={option.value} value={option.value} onChange={handleChange}>
							{option.value}
						</MenuItem>
					))}  
					</TextField>
				<TextField select  variant="standard" label="Money Given To" helperText="Money Given To" fullWidth  onChange={handleChange}
				name="moneyLentTo" value={formData.moneyLentTo??""}>
					{users.map((option) => (
						<MenuItem key={option.value} value={option.value} onChange={handleChange}>
							{option.value}
						</MenuItem>
					))}  
					</TextField>
					<div className='submit-button-container'>
					<Button className="submit-button"type="submit" variant="contained" endIcon={<SendIcon />}>Submit</Button>
					
					</div>
					</form>
			</div>
			<DisplayMessage/>
		</div>

	)
}
export default EntryForm;

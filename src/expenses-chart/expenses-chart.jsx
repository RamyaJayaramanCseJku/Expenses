import React, { useEffect, useState } from 'react';
import {  Typography  } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import "./expenses-chart.css";
import axios from "axios";


const data = [
  { id: 0, value: 10, label: 'series A' },
  { id: 1, value: 15, label: 'series B' },
  { id: 2, value: 20, label: 'series C' },
];

export default function PieActiveArc() {
  const [csvData, setCsvData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartLegends, setChartLegends] = useState([]);
  const[result,setResult]=useState([])
  console.log(csvData,chartData);
  useEffect(()=>{
    fetchCSVData();
  },[]);
  useEffect(()=>{
    const csvprops=csvData?.map((i,index)=>
      ({
        id:index+1,
        value:parseInt(i['amount']),
        label:i.expenseCategory
      }));
      setChartData(csvprops);
  },[csvData]);
  useEffect(()=>{
    const labels=[...new Set(chartData?.map(c=>c.label))]
    setChartLegends(labels);
  },[chartData]);
  useEffect(()=>{
    const f=chartLegends?.map((i)=>sumCategoryValues(i));
setResult(f);
  },[chartLegends]);
  const sumCategoryValues = (category)=>{
    console.log(category,result)
    const filterByCategory=chartData?.filter((x)=>x.label===category);
    console.log(filterByCategory)
    const result1=filterByCategory?.reduce(
    (accumulator, {value}) => accumulator + value,
    0,
  );
  const finalObject={id:category,value:result1,label:category}
  return finalObject;
  
}
  const fetchCSVData = () => {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQS1YcXMQEYIis3yjkMF3h1B1ZQERHXrCdhDRWAH2XV5sYybr02UoBdjH6NHOkiwVGpYbG90bvjOaoz/pub?output=csv'; // Replace with your Google Sheets CSV file URL
    axios.get(csvUrl)
        .then((response) => {
          const parsedCsvData = parseCSV(response.data);
          setCsvData(parsedCsvData);
        })
        .catch((error) => {
          console.error('Error fetching CSV data:', error);
        });
        return csvData;
}
  const parseCSV=(csvText) =>{
  const rows = csvText.split(/\r?\n/); // Split CSV text into rows, handling '\r' characters
  const headers = rows[0].split(','); // Extract headers (assumes the first row is the header row)
  const data = []; // Initialize an array to store parsed data
  for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split(','); // Split the row, handling '\r' characters
      const rowObject = {};
      for (let j = 0; j < headers.length; j++) {
          rowObject[headers[j]] = rowData[j];
      }
      data.push(rowObject);
  }
  return data;
}
return (
  <><Typography>Expenses in Euro By Category</Typography>
  <div className='expenses-chart-container'>

    {chartData?.length > 0 && <PieChart
      colors={['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red', 'pink', 'purple', 'black']}
      series={[
        {
          data: result,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -20, color: 'gray' },
        },
      ]}
      height={300}
      width={1000} />}
  </div>
  </>
  );
}
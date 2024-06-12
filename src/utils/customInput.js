export const expenseSpentAtStore = [
    {
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
export const expenseCategory = [
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
export const users = [{
    value: "Ramya Jayaraman"
},
{
    value: "Muthukumar Neelamegam"
},
{
    value: "Sharing"
}
];
export function AddInput(array,newValue){
    console.log(array)
    array?.push({value:newValue})
console.log(array)
    return array;
}

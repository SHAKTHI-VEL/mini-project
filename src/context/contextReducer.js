//dummy data
const transactions=[
    
  {id:1},
  {id:2}

]

const contextReducer=(state,action)=>{
let transactions;
switch (action.type) {
case 'DELETE_TRANSACTION':
   transactions=state.filter((t)=>t.id!==action.payload);

   sessionStorage.setItem('transactions', JSON.stringify(transactions));
   
   return transactions;
   
   case 'ADD_TRANSACTION':
       transactions=[action.payload,...state];
       sessionStorage.setItem('transactions', JSON.stringify(transactions));
      return transactions;

      

default:
 return state;
}
}

export default contextReducer
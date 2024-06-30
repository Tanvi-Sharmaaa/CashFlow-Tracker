import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [name, setName] = useState('')
  const[datetime,setDatetime] = useState('')
  const[description,setDescription] = useState('')
  const [transactions,setTransactions] = useState([])

  useEffect(() => {
    
    getTransaction().then(transactions => {
      setTransactions(transactions)
    })
    
  })

  async function getTransaction(){
    const url=import.meta.env.VITE_API_URL+'/transactions';
    const response = await fetch(url);
    const json = await response.json();
    return json;

  }

  function addNewTransaction(ev){
    ev.preventDefault();//to prevent default params
    const url=import.meta.env.VITE_API_URL+'/transaction';
    //console.log(url);

    const price = name.split(' ')[0];
    fetch(url,{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({
        price,
        name:name.substring(price.length+1),
        description,
        datetime
      })
    }).then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    }).then(json => {
      setName('')
      setDatetime('')
      setDescription('')
      console.log('result',json);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:',error);
    })
  }

  let balance=0;
  for(const transaction of transactions){
    balance=balance+transaction.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance= balance.split('.')[0]


  return (
    <>
      <main>
        <h1>₹{balance}<span>.{fraction}</span></h1>
        <form onSubmit={addNewTransaction}>
          <div className="basic">
            <input type="text"
                   value={name} 
                   onChange={e => setName(e.target.value)}
                   placeholder={'(+/-)Price Item'} />
            <input type="datetime-local"
                   value={datetime}
                   onChange={e => setDatetime(e.target.value)}
                   className="date" />
          </div>
          <div className="description">
            <input type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                   placeholder={'description'} />
          </div>
          <button type="submit">Add new transaction</button>
          {/* {transactions.length} */}
        </form>

        <div className="transactions">
          {transactions.length > 0 && transactions.map(transaction => (
            <div>
              <div className="transaction">
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="description">{transaction.description}</div>
                </div>
                <div className="right">
                  <div className={"price " + (transaction.price<0 ? 'red' : 'green')}>
                    {transaction.price}
                  </div>
                  <div className="datetime">{transaction.datetime}</div>
                </div>
              </div>
            </div>
          ))}
          

        </div>
      </main>
    </>
  )
}

export default App

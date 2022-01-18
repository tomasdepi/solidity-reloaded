import './App.css';
import lottery from './lottery';
import web3 from './web3';
import {  useEffect, useState } from 'react';

function App() {

  const [owner, setOwner] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState(0);
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchOwner() {
      const owner = await lottery.methods.owner().call();
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);
      
      setOwner(owner);
      setPlayers(players);
      setBalance(balance);
    }
    fetchOwner();
  }, []);

  const onEnter = async (event) => {
    event.preventDefault();

    setMessage('Waiting transaction......');

    const accounts = await web3.eth.getAccounts();
    await lottery.methods.enter().send( {from: accounts[0], value: web3.utils.toWei(value, 'ether')} )

    setMessage('You have entered into the Lottery');
  }

  const pickWinner = async () => {
    setMessage('Waiting transaction......');
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.pickWinner().send( {from: accounts[0]} );
    setMessage('A Winner has been picked!!!!');
  }

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {owner}
      </p>
      <p>
        There are currently {players.length}
      </p>
      <p>
      Competing for {balance} Wei
      </p>
      <hr/>
      <form onSubmit={event => onEnter(event)}>
        <h4>Try you Luck!!!</h4>
        <div>
          <label>Input</label>
          <input value={value} onChange={e => setValue(e.target.value)}/>
        </div>
        <button>Enter</button>
      </form>
      <hr/>
      <h4>Ready to Pick a Winner?</h4>
      <button onClick={event => pickWinner()}>Pick a Winner!</button>
      <hr/>
      <h1>{message}</h1>
    </div>
  );
}

export default App;

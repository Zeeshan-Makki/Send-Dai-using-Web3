import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './data';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState('');

  const [add,setAdd] = React.useState('');
  const [amount,setAmount] = React.useState('');

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }));

  function addzero () {
    if (add === (null)) {
      return console.log("OK")
    }
  }
  
  function IconLabelButtons () {
    const classes = useStyles();
  }
  const toWei = (n) => {
    return web3.utils.toWei(n, 'ether');
  };

  const fromWei = (n) => {
    return web3.utils.fromWei(n, 'ether');
  };


  const handleChange = e => {
    setAdd(e.target.value);
  }

  const handleChangee = e => {
    setAmount((e.target.value).toString())
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if(
      (add === "" || add === "0x0000000000000000000000000000000000000000") || 
      (amount === "" || amount === "0")
    ) {

      alert("Error: Either Address or Amount is Zero")
    } else {
      return await contract.methods
      .transfer(add, toWei(amount))
      .send({ from: account })
      console.log("u have submited");
    }
  }
  useEffect(() => {
    const loadBlockchain = async () => {
      try {
        if (window.ethereum) {
          console.log(window.ethereum);

          // Loading web3
          const web3Local = new Web3(
            window.ethereum || 'http://localhost:7545'
          );
          console.log('web3Local', web3Local);
          setWeb3(web3Local);

          // await window.ethereum.enable();
          let accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          console.log('accounts ', accounts);
          setAccount(accounts[0]);

          const dai = new web3Local.eth.Contract(
            CONTRACT_ABI,
            CONTRACT_ADDRESS
          );
          console.log('dai ', dai);
          setContract(dai);

          const bal = await dai.methods.balanceOf(accounts[0]).call();
          console.log('bal ', bal);
          setBalance(bal.toString());
        } else if (Web3.givenProvider) {
          // creating web3 instance
          const web3local = new Web3(Web3.givenProvider);
          console.log('web3local: ', web3local);
          setWeb3(web3local);

          // popup metamask to connect account
          await web3local.givenProvider.enable();

          // getting the account connected
          const accountsLocal = await web3local.eth.getAccounts();
          console.log('accountsLocal: ', accountsLocal[0]);
          setAccount(accountsLocal[0]);
        } else {
          console.log('please install metamask');
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadBlockchain();
  }, []);

  if (!web3) return <h1>please connect to metamask</h1>;
  
  return (

        
    <div>

<div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            By Muhammad Zeeshan Maaki
          </Typography>
        </Toolbar>
      </AppBar>
    </div>

      <center>
        <br></br>
      <img src={'https://th.bing.com/th/id/Rc73c7a5b032bca2e72021ff0942a6a0b?rik=yjwT3xCPVHdivA&pid=ImgRaw'} alt="this is car image" />
      <br></br>
      <br></br>
      <h1>Send DAI To Any Address</h1>
      <br></br>
      <h3><u>You Have = {fromWei(balance)} DAI</u></h3>
      <form onSubmit={handleSubmit}>
      <div >
      Input Address Here <input type="text" value={addzero()} onChange={handleChange} required/>
      </div>
     
      <div>
      Input Amount Here <input type="number" value={addzero()} onChange={handleChangee} required/> 
      </div>
        
        {/* <button style={{ fontSize: '30px' }} type="submit" onClick={async () => {
          await contract.methods
            .transfer(add, fromWei(amount))
            .send({ from: account });
        }}></button> */}
        <br></br>
        {/* {web3? <Button
        variant="contained"
        color="primary"
        endIcon={<Icon>send</Icon>}
        type="submit" onClick={async () => {
          await contract.methods
            .transfer(add, toWei(amount))
            .send({ from: account });
        }}
      >
        Send
      </Button> 
      : 
      <div><Button disabled>Disabled</Button>
      <h1>Connect To MetaMask</h1></div>} */}

        <Button
        variant="contained"
        color="primary"
        type="submit"
        endIcon={<Icon>send</Icon>}
        // onClick={async () => {
        //   await contract.methods
        //     .transfer(add, toWei(amount))
        //     .send({ from: account });
        // }}
      >
        Send
      </Button>
      </form>
        </center>
    </div>
  );
}
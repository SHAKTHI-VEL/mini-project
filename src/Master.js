import  React from 'react';
import {useEffect,useContext} from 'react';

import {Grid} from '@material-ui/core';
import{ExpenseTrackerContext} from './context/context';
import Main from './components/Main/Main'
import Details from './components/Details/Details'
import useStyles from './styles';
import './master.css'
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
import { useNavigate } from 'react-router-dom'
// import { SpeechState, useSpeechContext } from "@speechly/react-client";


const Master= () => {

    const classes = useStyles();
    const context = useContext(ExpenseTrackerContext);
    let navigate = useNavigate();
    let {getTransactions,transactions}=context;
    useEffect(() => {
        if(sessionStorage.getItem('token')){
            
      getTransactions();
      sessionStorage.setItem('transactions', JSON.stringify(transactions));
        
        }
        else{
          navigate("/login")
        }
         
         // eslint-disable-next-line
        
       }, [])
  return (
    <div>
        <Grid className={classes.grid} container spacing={0} alignItems="center" justifyContent='center' style={{height: '100vh'}}>
            <Grid item xs={12} sm={4} className={classes.mobile}>
                <Details title="Income"/>
            </Grid>

            <Grid item xs={12} sm={3} className={classes.main}>
                <Main/>
            </Grid>

            <Grid item xs={12} sm={4} className={classes.desktop}>
                <Details title="Income"/>
            </Grid>

            <Grid item xs={12} sm={4} className={classes.last}>
                <Details title="Expense"/>
            </Grid>

        </Grid>
        <PushToTalkButtonContainer>
            <PushToTalkButton/>
           
        </PushToTalkButtonContainer>
    </div>
  )
}

export default Master
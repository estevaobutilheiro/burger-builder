import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';

const checkoutSumary = (props) => {
    return (
        <div className={classes.CheckoutSumary}>
            <h1 style={{textAlign: 'center'}}>We hope it tastes good!</h1>
            <div style={{width: '100%', textAlign: 'center', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
                <Button btnType="Danger"clicked={props.checkoutCancekled}>CANCEL</Button>
                <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </div>
    );
}

export default checkoutSumary;
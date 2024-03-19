import React, { useEffect, useState } from 'react'
import PaymentButtons from '../../components/PaymentButtons'
import SavingSummary from '../../components/SavingSummary'

import { useDispatch, useSelector } from "react-redux";
import { setAmountList, selectNewSavings} from '../newSavingsSlice/newSavingsSlice';
import {selectSavingDetail} from '../savings/savingsSlice.js'
// import { selectAllSavings } from "./savingsSlice";
import { saveSavingPlan } from '../newSavingsSlice/newSavingsAction';

import useSavePlan from '../newSavingsSlice/utils/useSavePlan';


const SavingPlanDetail = () => {
    const sId = 55
    const dispatch = useDispatch();
    const savingsData = useSelector(selectSavingDetail)
    // console.log('data', savingsData);
    const savings = savingsData.filter((saving) => saving.id === sId)[0]
    // console.log('data', savings.amount_list);

    const targetAmount = savings.amount
    
    const {
        amount_list: numberList, amount, savings_name: savingsName,
    } = savings 
    //date_created: dateCreated 
    
    const [sumNumbers, setSumNumbers] = useState(0);


    // useEffect(() => {
    //     console.log('numberList', numberList);
    //     if (numberList.length > 0) {
    //         const sums = numberList.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    //         setSumNumbers(sums);
    //     }
    //     // savePlan()
    // }, [numberList, dispatch, savings]);
    return (
        <div>
            <header className="app-header">
                <h1>MONEY SAVING CHART</h1>
                {/* <h3>USE THIS CHART TO SAVE AN EXTRA £{sumNumbers} IN 2024</h3> */}
                <h3>USE THIS CHART TO SAVE AN EXTRA £{parseInt(amount)} IN 2024</h3>
                {targetAmount && targetAmount !== 1000 && (
                    <div>
                        <h2>Saving Plan: {savingsName}</h2>
                        <span>Target: £ {amount}</span>
                        {/* <p>Date: {dateCreated.toLocaleString()}</p> */}
                    </div>
                )}
            </header>

            <div className="flex-container">
                <PaymentButtons noList={numberList} setNoList={setAmountList} />
                {/* <SavingSummary /> */}
            </div>
        </div>
    )
}

export default SavingPlanDetail
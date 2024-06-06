import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Calculator.css';
import Remove from '../Assets/remove.png';
import Reset from '../Assets/reset.png';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateBasicSalary,
    updateEarningTitle,
    updateEarningAmount,
    addEarning,
    removeEarning,
    toggleEPFETF,
    updateDeductionTitle,
    updateDeductionAmount,
    addDeduction,
    removeDeduction,
    resetForm
} from '../redux/action';

export default function Calculator() {
    const dispatch = useDispatch();
    const { basicSalary, earnings, deductions } = useSelector(state => state);

    const handleBasicSalaryChange = (e) => {
        dispatch(updateBasicSalary(Number(e.target.value)));
    };

    const handleEarningTitleChange = (id, e) => {
        dispatch(updateEarningTitle(id, e.target.value));
    };

    const handleEarningAmountChange = (id, e) => {
        dispatch(updateEarningAmount(id, Number(e.target.value)));
    };

    const handleAddEarning = () => {
        dispatch(addEarning());
    };

    const handleRemoveEarning = (id) => {
        dispatch(removeEarning(id));
    };

    const handleToggleEPFETF = (id) => {
        dispatch(toggleEPFETF(id));
    };

    const handleDeductionTitleChange = (id, e) => {
        dispatch(updateDeductionTitle(id, e.target.value));
    };

    const handleDeductionAmountChange = (id, e) => {
        dispatch(updateDeductionAmount(id, Number(e.target.value)));
    };

    const handleAddDeduction = () => {
        dispatch(addDeduction());
    };

    const handleRemoveDeduction = (id) => {
        dispatch(removeDeduction(id));
    };

    const handleResetForm = () => {
        dispatch(resetForm());
    };

    // Function to calculate the sum of earnings
    const calculateTotalEarnings = () => {
        return basicSalary + earnings.reduce((total, earning) => total + earning.amount, 0);
    };

    // Function to calculate the sum of EPF/ETF allowed earnings
    const calculateTotalEarningsForEPF = () => {
        return basicSalary + earnings.filter(earning => earning.epfEtf).reduce((total, earning) => total + earning.amount, 0);
    };

    // Function to calculate the sum of deductions
    const calculateGrossDeduction = () => {
        return deductions.reduce((total, deduction) => total + deduction.amount, 0);
    };

    // Function to calculate APIT
    const calculateAPIT = (grossEarnings) => {
        let tax = 0;
    
        if (grossEarnings <= 100000) {
            tax = 0;
        } else if (grossEarnings <= 141667) {
            tax = (grossEarnings) * 0.06 - 6000;
        } else if (grossEarnings <= 183333) {
            tax = (grossEarnings) * 0.12 - 14500;
        } else if (grossEarnings <= 225000) {
            tax = (grossEarnings) * 0.18 - 25500;
        } else if (grossEarnings <= 266667) {
            tax = (grossEarnings) * 0.24 - 39000;
        } else if (grossEarnings <= 308333) {
            tax = (grossEarnings) * 0.30 - 55000;
        } else {
            tax = (grossEarnings) * 0.36 - 73500;
        }
    
        return tax;
    };
    

    const totalEarnings = calculateTotalEarnings();
    const totalEarningsForEPF = calculateTotalEarningsForEPF();
    const grossDeduction = calculateGrossDeduction();
    const grossEarnings = totalEarnings - grossDeduction;
    const grossSalaryForEPF = totalEarningsForEPF - grossDeduction;
    const employeeEPF = grossSalaryForEPF * 0.08;
    const employerEPF = grossSalaryForEPF * 0.12;
    const employerETF = grossSalaryForEPF * 0.03;
    const apit = calculateAPIT(grossEarnings);
    const netSalary = grossEarnings - employeeEPF - apit;
    const ctc = grossEarnings + employerEPF + employerETF;

    return (
        <div className='container Container-page'>
            <div className='Full-Page'>
                <div className='Calculator-side'>
                    <div className='First-Line'>
                        <h4 className='main-points'>Calculate Your Salary</h4>
                        <button className='reset-button' onClick={handleResetForm}>
                            <img src={Reset} className='reset-img' alt='reset' />
                            <span className='add-new'> Reset</span>
                        </button>
                    </div>

                    <div className='basic'>
                        <h5 className='semi-titles'>Basic Salary</h5>
                        <input
                            className='input'
                            placeholder='Enter your Basic Salary'
                            type='number'
                            id='basicSalary'
                            autoComplete='off'
                            onChange={handleBasicSalaryChange}
                            value={basicSalary}
                            required
                        />
                    </div>

                    <div className='Earning'>
                        <h5 className='semi-titles'>Earning</h5>
                        <h6 className='title-description'>Allowance, Fixed Allowance, Bonus and etc.</h6>
                        {earnings.map((earning) => (
                            <div key={earning.id} className='one-row'>
                                <input
                                    className='input'
                                    placeholder='Pay Details (Title)'
                                    type='text'
                                    autoComplete='off'
                                    onChange={(e) => handleEarningTitleChange(earning.id, e)}
                                    value={earning.title}
                                    required
                                />
                                <input
                                    className='input'
                                    placeholder='Amount'
                                    type='number'
                                    autoComplete='off'
                                    onChange={(e) => handleEarningAmountChange(earning.id, e)}
                                    value={earning.amount}
                                    required
                                />
                                <button className='remove' onClick={() => handleRemoveEarning(earning.id)}>
                                    <img src={Remove} alt='remove' />
                                </button>
                                <input
                                    type='checkbox'
                                    className='check-box'
                                    checked={earning.epfEtf}
                                    onChange={() => handleToggleEPFETF(earning.id)}
                                />
                                <h5 className='epf-etf'>EPF/ETF</h5>
                            </div>
                        ))}
                        <button className='add-new' onClick={handleAddEarning}>+ Add New Allowance</button>
                    </div>

                    <hr />

                    <div className='Deductions'>
                        <h5 className='semi-titles'>Deductions</h5>
                        <h6 className='title-description'>Salary Advances, Loan Deductions and all</h6>
                        {deductions.map((deduction) => (
                            <div key={deduction.id} className='one-row'>
                                <input
                                    className='input'
                                    placeholder='Pay Details (Title)'
                                    type='text'
                                    autoComplete='off'
                                    onChange={(e) => handleDeductionTitleChange(deduction.id, e)}
                                    value={deduction.title}
                                    required
                                />
                                <input
                                    className='input'
                                    placeholder='Amount'
                                    type='number'
                                    autoComplete='off'
                                    onChange={(e) => handleDeductionAmountChange(deduction.id, e)}
                                    value={deduction.amount}
                                    required
                                />
                                <button className='remove' onClick={() => handleRemoveDeduction(deduction.id)}>
                                    <img src={Remove} alt='remove' />
                                </button>
                            </div>
                        ))}
                        <button className='add-new' onClick={handleAddDeduction}>+ Add New Deduction</button>
                    </div>
                </div>

                <div className='Salary-side '>
                    <div className='Your-Salary'>
                        <h4 className='main-points'>Your Salary</h4> 
                    </div>

                    <div className='Items-Amount'>
                        <h6>Items</h6>
                        <h6>Amount</h6>
                    </div>

                    <div>
                        <div className='Salaries-Deductions'>
                            <h5>Basic Salary</h5><h5>{basicSalary}</h5>
                        </div>   
                        <div className='Salaries-Deductions'>
                            <h5>Total Earnings</h5><h5>{totalEarnings}</h5>
                        </div>  
                        <div className='Salaries-Deductions'>
                            <h5>Total Earnings for EPF</h5><h5>{totalEarningsForEPF}</h5>
                        </div>  
                        <div className='Salaries-Deductions'>
                            <h5>Gross Deduction</h5><h5>{grossDeduction}</h5>
                        </div>  
                        <div className='Salaries-Deductions'>
                            <h5>Gross Earnings</h5><h5>{grossEarnings}</h5>
                        </div>  
                        <div className='Salaries-Deductions'>
                            <h5>Gross Salary for EPF</h5><h5>{grossSalaryForEPF}</h5>
                        </div>  
                        <div className='Salaries-Deductions'>
                            <h5>Employee EPF (8%)</h5><h5>{employeeEPF}</h5>
                        </div>  
                        <div className='Salaries-Deductions'>
                            <h5>Employer EPF (12%)</h5><h5>{employerEPF}</h5>
                        </div>  
                        <div className='Salaries-Deductions'>
                            <h5>Employer ETF (3%)</h5><h5>{employerETF}</h5>
                        </div>  
                        <div className='Salaries-Deductions'>
                            <h5>APIT</h5><h5>{apit}</h5>
                        </div>  
                        <div className='Net-Salary'>
                            <h5>Net Salary</h5><h5>{netSalary}</h5>
                        </div> 
                        <div className='Salaries-Deductions'>
                            <h5>Cost To Company (CTC)</h5><h5>{ctc}</h5>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
}

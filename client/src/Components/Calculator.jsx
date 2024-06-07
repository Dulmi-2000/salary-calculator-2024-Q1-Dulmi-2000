import React, { useEffect } from 'react';
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
    resetForm,
    updateFormData
} from '../redux/action';

export default function Calculator() {
    const dispatch = useDispatch();
    const { basicSalary, earnings, deductions } = useSelector(state => state);
    
    
    const formData = useSelector((state) => state);
    useEffect(() => {
        // Load data from localStorage when the component mounts
        const savedFormData = JSON.parse(localStorage.getItem('formData'));
        if (savedFormData) {
          dispatch(updateFormData(savedFormData));
        }
      }, [dispatch]);
    
      useEffect(() => {
        // Save data to localStorage whenever formData changes
        localStorage.setItem('formData', JSON.stringify(formData));
      }, [formData]);
    



    
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

    const calculateTotalEarnings = () => {
        return Math.floor(basicSalary + earnings.reduce((total, earning) => total + earning.amount, 0));
    };
    
    const calculateTotalEarningsForEPF = () => {
        return Math.floor(basicSalary + earnings.filter(earning => earning.epfEtf).reduce((total, earning) => total + earning.amount, 0));
    };
    
    const calculateGrossDeduction = () => {
        return Math.floor(deductions.reduce((total, deduction) => total + deduction.amount, 0));
    };
    
    const calculateAPIT = (grossEarnings) => {
        let tax = 0;
    
        if (grossEarnings <= 100000) {
            tax = 0;
        } else if (grossEarnings <= 141667) {
            tax = Math.floor((grossEarnings) * 0.06 - 6000);
        } else if (grossEarnings <= 183333) {
            tax = Math.floor((grossEarnings) * 0.12 - 14500);
        } else if (grossEarnings <= 225000) {
            tax = Math.floor((grossEarnings) * 0.18 - 25500);
        } else if (grossEarnings <= 266667) {
            tax = Math.floor((grossEarnings) * 0.24 - 39000);
        } else if (grossEarnings <= 308333) {
            tax = Math.floor((grossEarnings) * 0.30 - 55000);
        } else {
            tax = Math.floor((grossEarnings) * 0.36 - 73500);
        }
    
        return tax;
    };
    


    //seperate by 3 digits
    const formatNumberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const totalEarnings = calculateTotalEarnings();
    const totalEarningsForEPF = calculateTotalEarningsForEPF();
    const grossDeduction = calculateGrossDeduction();
    const grossEarnings = totalEarnings - grossDeduction;
    const grossSalaryForEPF = totalEarningsForEPF - grossDeduction;
    const employeeEPF = Math.floor(grossSalaryForEPF * 0.08);
    const employerEPF = Math.floor(grossSalaryForEPF * 0.12);
    const employerETF = Math.floor(grossSalaryForEPF * 0.03);
    const apit = calculateAPIT(grossEarnings);
    const netSalary = Math.floor(grossEarnings - employeeEPF - apit);
    const ctc = grossEarnings + employerEPF + employerETF;
    

    
    return (
        <div className='container'>
            <div className='Full-Page'>
                <div className='Calculator-side'>
                    <div className='First-Line'>
                        <h4 className='main-points'>Calculate Your Salary</h4>
                       
                        <button className='reset-button' onClick={handleResetForm}>
                            <img src={Reset} className='reset-img' alt='reset' />
                            <span className='add-new'> Reset</span>
                        </button>
                    </div>
                    <br></br>

                    <div className='basic'>
                        <h5 className='semi-titles'>Basic Salary</h5>
                        <input
                            className='basic-salary-input'
                            placeholder='Amount'
                            type='number'
                            id='basicSalary'
                            autoComplete='off'
                            onChange={handleBasicSalaryChange}
                            value={formData.basicSalary}
                            required
                        />
                    </div>
                    <br></br>

                    <div className='Earning'>
                        <h5 className='semi-titles'>Earnings</h5>
                        <h6 className='title-description'>Allowance, Fixed Allowance, Bonus and etc.</h6>
                        {earnings.map((earning) => (
                            <div key={earning.id} className='one-row'>
                                <input
                                    className='pay-details-input'
                                    placeholder='Pay Details (Title)'
                                    type='text'
                                    autoComplete='off'
                                    onChange={(e) => handleEarningTitleChange(earning.id, e)}
                                    value={earning.title}
                                    required
                                />
                                <input
                                    className='amount-input'
                                    placeholder='Amount'
                                    type='number'
                                    autoComplete='off'
                                    onChange={(e) => handleEarningAmountChange(earning.id, e)}
                                    value={earning.amount}
                                    required
                                />

                                <button className='remove' onClick={() => handleRemoveEarning(earning.id)}>
                                    <img src={Remove} alt='remove' className='remove-img' />
                                </button>

                                <div className='checkbox-and-details'>
                                <input
                                    type='checkbox'
                                    className='check-box'
                                    checked={earning.epfEtf}
                                    onChange={() => handleToggleEPFETF(earning.id)}
                                    />
                                    <h5 className='epf-etf'>EPF/ETF</h5>
                                </div>
                                
                               
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
                                    className='pay-details-input'
                                    placeholder='Pay Details (Title)'
                                    type='text'
                                    autoComplete='off'
                                    onChange={(e) => handleDeductionTitleChange(deduction.id, e)}
                                    value={deduction.title}
                                    required
                                />
                                <input
                                    className='amount-input'
                                    placeholder='Amount'
                                    type='number'
                                    autoComplete='off'
                                    onChange={(e) => handleDeductionAmountChange(deduction.id, e)}
                                    value={deduction.amount}
                                    required
                                />
                                <button className='remove' onClick={() => handleRemoveDeduction(deduction.id)}>
                                    <img src={Remove} alt='remove' className='remove-img' />
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
                    <br></br>

                    <div className='Items-Amount'>
                    <h6 className='item-amount-both'>Items</h6>
                    <h6 className='item-amount-both'>Amount</h6>
                </div>

                <div className='salary-all'>
                        <div className='Salaries-Deductions'>
                        <h5 className='items'>Basic Salary</h5>
                        <h5 className='items'>{basicSalary ? formatNumberWithCommas(basicSalary.toFixed(2)) : '0.00'}</h5>

                        </div> 
                        <div className='Salaries-Deductions'>
                            <h5 className='items'>Gross Earning</h5><h5 className='items'>{formatNumberWithCommas(grossEarnings.toFixed(2))}</h5>
                        </div>
                        <div className='Salaries-Deductions'>
                            <h5 className='items'>Gross Deduction</h5><h5 className='items'>-{formatNumberWithCommas(grossDeduction.toFixed(2))}</h5>
                        </div>
                        <div className='Salaries-Deductions'>
                            <h5 className='items'>Employee EPF (8%)</h5><h5 className='items'>-{formatNumberWithCommas(employeeEPF.toFixed(2))}</h5>
                        </div>
                        <div className='Salaries-Deductions'>
                            <h5 className='items'>APIT</h5><h5 className='items'>-{apit}.00</h5>
                        </div>  
                        <br></br>

                        <div className='Net-Salary'>
                            <h5 className='net-salary-details'>Net Salary (Take Home)</h5><h5 className='net-salary-details'>{formatNumberWithCommas(netSalary.toFixed(2))}</h5>
                    </div> 

                </div>

                 <br></br>

                        <div className='Emplyer-Contribution'>
                    Contribution from the Employer
                </div>

                <div className='salary-deduction-all'>
                    <div className='Salaries-Deductions'>
                        <h5 className='items'>Employer EPF (12%)</h5><h5 className='items'>{formatNumberWithCommas(employerEPF.toFixed(2))}</h5>
                    </div>   
                        <div className='Salaries-Deductions'>
                        <h5 className='items'>Employer ETF (3%)</h5><h5 className='items'>{formatNumberWithCommas(employerETF.toFixed(2))}</h5>
                    </div>  
                       <br></br>
                        <div className='Salaries-Deductions'>
                            <h5 className='items'>CTC (Cost to Company)</h5><h5 className='items'>{formatNumberWithCommas(ctc.toFixed(2))}</h5>
                        </div>

                     </div>
                    </div>
                    </div>
            </div>
       
    );
}
 
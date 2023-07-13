import React from "react";
import InputField from "../../webcomponent/InputField";
import {Checkbox } from "@material-tailwind/react";


function Signup2({formData, setFormData}) {
    // const validateForm2 = () => {
    //     let errors = {};
    //     if(!formData.policeReport.trim()){
    //         errors.policeReport = "Police report is required";
    //     }
    //     if(!formData.bankStatement.trim()){
    //         errors.bankStatement = "Bank statement is required";
    //     }
    //     if(!formData.password.trim()){
    //         errors.password = "Password is required";
    //     }
    //     if(!formData.confirmPassword.trim()){
    //         errors.confirmPassword = "Confirm password is required";
    //     }
    //     if(formData.password !== formData.confirmPassword){
    //         errors.confirmPassword = "Passwords do not match";
    //     }
    //     return Object.keys(errors).length === 0 ? null : errors;
    // };
    return(
    <div className="Signup2">
        <h3 className="text-3xl text-main-purple self-center">Sign up as an Individual Investor</h3>                                <p className="text-main-purple">
        Tell us more about you
        </p>

        <div className="mt-6">
            <div className="row">
                <div className="file-input-container">
                    <label htmlFor="policeReport" className="text-main-black block mb-1 text-[14px]">
                    Please provide a copy of any police report .
                    </label>
                    <input type="file" id="policeReport" name="policeReport" accept="image/png, image/jpeg" className="hidden" />
                    <label htmlFor="policeReport" className="file-input-button">
                        Select File
                    </label>
                    <span className="file-input-text">No file chosen</span>
                </div>
            </div>
            <div className="row">
                <div className="file-input-container">
                    <label htmlFor="bankStatement" className="text-main-black block mb-1 text-[14px]">
                    Please provide a copy of your bank statement.
                    </label>
                    <input type="file" id="bankStatement" name="bankStatement" accept="image/png, image/jpeg" className="hidden" />
                    <label htmlFor="bankStatement" className="file-input-button">
                        Select File
                    </label>
                    <span className="file-input-text">No file chosen</span>
                </div>
            </div>

            <div className="row2">                                  
                <label>
                    Password:
                    <InputField 
                        type="password" 
                        color="purple" 
                        value={formData.password}
                        onChange={(event)=>
                            setFormData({...formData, password: event.target.value})
                        }
                    />
                </label>
            </div>    
            <br></br>
            <div className="row2">                                  
                <label>
                    Confirm Password:
                    <InputField 
                        type="password" 
                        color="purple" 
                        value={formData.confirmPassword}
                        onChange={(event)=>
                            setFormData({...formData, confirmPassword: event.target.value})
                        }
                    />
                </label>
            </div> 
            <br></br>
            <div>
                <Checkbox color="purple" label="I agree to the Terms and Conditions" />
            </div>           
        </div>
    </div> 
    );   
}
export default Signup2;
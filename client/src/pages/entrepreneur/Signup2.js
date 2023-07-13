import React from "react";
import { Radio, Textarea} from "@material-tailwind/react";


function Signup2({formData, setFormData}) {
    const handleFelonyChange = (event) => {
        setFormData({ ...formData, felony: event.target.value });
    };
    
    const handleLawsuitChange = (event) => {
        setFormData({ ...formData, lawsuit: event.target.value });
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFormData({ ...formData, bankStatement: file });
    };

    const handlePoliceReportUpload = (event) => {
        const file = event.target.files[0];
        setFormData({ ...formData, policeReport: file });
    };

    return(
    <div className="Signup2">
        <h3 className="text-3xl text-main-purple self-center">Sign up as an Entrepreneur</h3>                                
        <p className="text-main-purple">
        Tell us more about you
        </p>

        <div className="mt-6">
            <div className="row">
                <div>
                    <label htmlFor="felony" className="text-main-black block mb-1 text-[14px]">
                    Have you ever been charged with any felony or misdemeanor?
                    </label>
                    <div className="flex gap-20 text-main-black block mb-1 text-[14px] h-4 w-4">
                        <Radio 
                            color="purple"
                            name="felony"
                            id="felony-yes"
                            label={<span style={{ fontSize: '12px' }}>Yes</span>}
                            className="w-4 h-4"
                            value="yes"
                            checked={formData.felony === 'yes'}
                            onChange={handleFelonyChange}
                        />
                        <Radio 
                            color="purple"
                            name="felony"
                            id="felony-no"
                            label={<span style={{ fontSize: '12px' }}>No</span>}
                            className="w-4 h-4"
                            value="no"
                            checked={formData.felony === 'no'}
                            onChange={handleFelonyChange}
                        />
                    </div>    
                </div>
            </div>   

            <div className="row">
                <div>
                    <label htmlFor="lawsuit" className="text-main-black block mb-1 text-[14px]">
                    Have you ever been party to a lawsuit? 
                    </label>
                    <div className="flex gap-20 text-main-black block mb-1 text-[14px] h-4 w-4">
                        <Radio 
                            color="purple"
                            name="lawsuit"
                            id="lawsuit-yes"
                            value="yes"
                            className="w-4 h-4"
                            label={<span style={{ fontSize: '12px' }}>Yes</span>}
                            checked={formData.lawsuit === 'yes'}
                            onChange={handleLawsuitChange}
                        />
                        <Radio 
                            color="purple"
                            name="lawsuit"
                            id="lawsuit-no"
                            value="no"
                            className="w-4 h-4"
                            label={<span style={{ fontSize: '12px' }}>No</span>}
                            checked={formData.lawsuit === 'no'}
                            onChange={handleLawsuitChange}
                        />
                    </div>    
                </div>
            </div> 

            
            <div className="row2">
                <div>
                    <label htmlFor="lawsuitDetails" className="text-main-black block mb-2 text-[14px]">
                    if so explain (date,city,state and circumstances, including precise charge and resolution of the case):
                    </label>
                    <Textarea 
                        outline="true"
                        className="w-full" 
                        value={formData.lawsuitDetails}
                        label={<span style={{ fontSize: '12px' }}>Lawsuit Details</span>}
                        onChange={(event)=>
                            setFormData({...formData, lawsuitDetails: event.target.value})
                        }
                    />
                </div>
            </div>  

            <div className="row">
                <div className="file-input-container">
                <label htmlFor="policeReport" className="text-main-black block mb-1 text-[14px]">
                    Please provide a copy of any police report.
                </label>
                <input
                    type="file"
                    id="policeReport"
                    name="policeReport"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handlePoliceReportUpload}
                />
                <label htmlFor="policeReport" className="file-input-button">
                    Select File
                </label>
                <span className="file-input-text">
                    {formData.policeReport ? formData.policeReport.name : 'No file chosen'}
                </span>
                </div>
            </div>

            <div className="row">
                <div className="file-input-container">
                <label htmlFor="bankStatement" className="text-main-black block mb-1 text-[14px]">
                    Please provide a copy of your bank statement.
                </label>
                <input
                    type="file"
                    id="bankStatement"
                    name="bankStatement"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleFileUpload}
                />
                <label htmlFor="bankStatement" className="file-input-button">
                    Select File
                </label>
                <span className="file-input-text">
                    {formData.bankStatement ? formData.bankStatement.name : 'No file chosen'}
                </span>
                </div>
            </div>
        </div>
    </div> 
    );   
}
export default Signup2;
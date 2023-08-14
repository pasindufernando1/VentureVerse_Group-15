import React, {useState} from 'react';
import {Button, Textarea, Header} from "../webcomponent";
import useAxiosMethods from '../../hooks/useAxiosMethods';
import Modal from "react-modal";
import Terms from "../common/Terms";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip, Input, Checkbox,
} from "@material-tailwind/react";
import {Link} from "react-router-dom";


function FinalizeListingAdmin() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>
            <Header active="View Listing">
                <main className="h-auto flex justify-center items-center ">
                    <form
                        className="bg-white flex drop-shadow-md w-full h-auto lg:rounded-[1rem] mt-[-2rem] border-[1px] border-main-purple rounded-[1rem]">
                        <div className="text-gray-700 p-[2rem] w-full">
                            <div className="Signup1">
                                <h3 className="text-3xl text-main-purple self-center">Finalized Investment</h3>
                                <div className="mt-6">
                                    <div className="row2 flex flex-row flex-wrap gap-5 justify-center">
                                        <div className='flex justify-center'>
                                            <div>
                                                <Card className="w-80">
                                                    <CardHeader floated={false} className="h-80">
                                                        <img
                                                            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                                                            alt="profile-picture"/>
                                                    </CardHeader>
                                                    <CardBody className="text-center">
                                                        <Typography variant="h4" color="blue-gray" className="mb-2">
                                                            George Fernando
                                                        </Typography>
                                                        <Typography color="blue-gray" className="font-medium" textGradient>
                                                            Entrepreneur
                                                        </Typography>
                                                    </CardBody>
                                                    
                                                </Card>

                                            </div>
                                            <div>
                                            <Card className="w-80 ml-10">
                                                    <CardHeader floated={false} className="h-80">
                                                        <img
                                                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80"
                                                            alt="profile-picture"/>
                                                    </CardHeader>
                                                    <CardBody className="text-center">
                                                        <Typography variant="h4" color="blue-gray" className="mb-2">
                                                            Dinuni Fernando
                                                        </Typography>
                                                        <Typography color="blue-gray" className="font-medium" textGradient>
                                                            Investor
                                                        </Typography>
                                                    </CardBody>
                                                    
                                                </Card>

                                            </div>
                                        </div>
                                        <div>
                                            <Card className="w-full shadow-lg p-6 border-2 border-main-purple mt-2 ml-5">
                                            <p className="text-main-purple justify-center flex font-extrabold text-2xl">
                                                Finalized Offerings
                                            </p>
                                                <label htmlFor="seek"
                                                       className="text-main-gray block mb-2 text-[14px] font-extrabold mt-5 text-lg">
                                                    Investing amount (Rs.) : <span
                                                    className='font-black font-extrabold text-base'>1000000</span>
                                                </label>
                                                <label htmlFor="seek"
                                                       className="text-main-gray block mb-2 mt-5 text-[14px] font-extrabold text-lg">
                                                    Returns as a percentage
                                                </label>
                                                <div>
                                                    <label htmlFor="seek"
                                                           className="text-main-gray block mb-2 text-[14px] ml-4 text-base text-base">
                                                        Equity : <span className='font-black font-extrabold text-base'>5 %</span>
                                                    </label>
                                                    <label htmlFor="seek"
                                                           className="text-main-gray block mb-2 text-[14px] ml-4 text-base">
                                                        Profit per unit : <span className='font-black font-extrabold text-base'>10 %</span>
                                                    </label>
                                                </div>
                                                
                                                <div className='flex flex-row'>
                                                    <div className="document-container w-full mt-10">  
                                                        <p><strong>Entrepreneur side agreement</strong></p>
                                                        <p>
                                                        <iframe
                                                            src="/assets/documents/clearance_application.pdf"
                                                            width="88%"
                                                            height="520px"
                                                            title="Police Report"
                                                        ></iframe>
                                                        <br></br>
                                                        {/* <Button
                                                            className="download-button"
                                                            type="button"
                                                            onClick={() =>
                                                            handleDocumentDownload(
                                                                pdfs.policeReport,
                                                                registrationRequestDetails.id + "_police_report"
                                                            )
                                                            }
                                                            label="Download"
                                                        /> */}
                                                        </p>
                                                    </div>
                                                    <div className="document-container w-full ml-10 mt-10">  
                                                        <p><strong>Investor side agreement</strong></p>
                                                        <p>
                                                        <iframe
                                                            src="/assets/documents/clearance_application.pdf"
                                                            width="88%"
                                                            height="520px"
                                                            title="Police Report"
                                                        ></iframe>
                                                        <br></br>
                                                            {/* <Button
                                                                className="download-button"
                                                                type="button"
                                                                onClick={() =>
                                                                handleDocumentDownload(
                                                                    pdfs.policeReport,
                                                                    registrationRequestDetails.id + "_police_report"
                                                                )
                                                                }
                                                                label="Download"
                                                            /> */}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                
                                                
                                                
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button
                                type="button"
                                className="float-right mt-2"
                            >
                                Mark as finished
                            </Button>
                        </div>

                    </form>
                </main>
            </Header>
        </div>
    );
}

export default FinalizeListingAdmin;

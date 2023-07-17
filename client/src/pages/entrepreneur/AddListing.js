import {
    Card, textarea
  } from "@material-tailwind/react";
import React from "react";
import InputField from "../webcomponent/CustomInput";
import { useState } from "react";
import Checkbox from "../webcomponent/CustomCheckbox";
import CustomButton from "../webcomponent/CustomButton";
import NavbarAll from "../webcomponent/NavbarAll";
import Footer from "../webcomponent/Footer";
import Radio from "../webcomponent/CustomRadio";
import Textarea from "../webcomponent/CustomTextarea";
import axios from "axios";

function AddListing() {
    
    const [currentSection, setCurrentSection] = useState(1);
    const [previouseSection, setPrevSection] = useState(0);

    const handleNext = () => {
        setCurrentSection(currentSection + 1);
        setPrevSection(previouseSection + 1);
    }

    const handlePrevious = () => {
        setCurrentSection(currentSection - 1);
        setPrevSection(previouseSection - 1);
    }

    // Hooks to handle the inputs
    const [intention, setIntention] = useState("");
    const [startdate, setStartDate] = useState("");
    const [howlong, setHowLong] = useState("");
    const [lifetimesales, setLifeTimeSales] = useState("");
    const [grossincome, setGrossIncome] = useState("");
    const [netincome, setNetIncome] = useState("");
    const [nextsales, setNextSales] = useState("");
    const [projectionlogic, setProjectionLogic] = useState("");
    const [outsideSource, setOutsideSource] = useState("");
    const handleOutsideSourceChange = (event) => {
        setOutsideSource(event.target.value);
    };
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [outsidedetails, setOutsideDetails] = useState("");
    const [attempts, setAttempts] = useState("");
    const [proposition, setProposition] = useState("");
    const [awards, setAwards] = useState("");
    const [categories, setCategories] = useState({
        food: false,
        technology: false,
        app: false,
        fitness: false,
        healthcare: false,
        sports: false,
        beauty: false,
        clothing: false,
        toys: false,
        entertainment: false,
        pets: false,
        music: false,
        holiday: false,
        children: false,
        housewares: false, 
    });
    
    const [stage, setStage] = useState("");
    const handleStageChange = (event) => {
        setStage(event.target.value);
    };

    // Current date
    const date = new Date();

// Images and video { Section 4}
    
    const [seek, setSeek] = useState("");
    const [equity, setEquity] = useState("");
    const [equitychecked, setEquityChecked] = useState(false);
    const [profitunit, setProfitUnit] = useState("");
    const [profitunitchecked, setProfitUnitChecked] = useState(false);


    // Pricing handling
    const [selectedPackage, setSelectedPackage] = useState("");

    const handlePackageSelect = (packageId) => {
        setSelectedPackage(packageId);
    };

    // Handling the image upload
    const [image1, setImage1] = useState({
        file: null,
        preview: null,
      });
      const [image2, setImage2] = useState({
        file: null,
        preview: null,
      });
      const [image3, setImage3] = useState({
        file: null,
        preview: null,
      });
      const [video, setVideo] = useState({
        file: null,
        preview: null,
      });

    const handleImageupload = (event) => {
        const { name, files } = event.target;
        const selectedFile = files[0];

        if (name === 'images' && image1.file === null) {
            setImage1({
                file: selectedFile,
                preview: URL.createObjectURL(selectedFile),
            }); 
        } else if (name === 'images' && image2.file === null) {
            setImage2({
                file: selectedFile,
                preview: URL.createObjectURL(selectedFile),
            });
        } else if (name === 'images' && image3.file === null) {
            setImage3({
                file: selectedFile,
                preview: URL.createObjectURL(selectedFile),
            });
    }}

    const handleVideoUpload = (event) => {
        const { name, files } = event.target;
        const selectedFile = files[0];

        if (name === 'video') {
            setVideo({
                file: selectedFile,
                preview: URL.createObjectURL(selectedFile),
            });
        }
    }

    // The listin object to be sent to the backend
    const listing = {
        "title": {title},
        "description": {description},
        "pitchingVideo": "https://example.com/video",
        "intention": {intention},
        "businessStartDate": {startdate},
        "businessDuration": {howlong},
        "lifetimeSales": {lifetimesales},
        "lastYearGrossIncome": {grossincome},
        "lastYearNetIncome": {netincome},
        "salesProjectionThisYear": {nextsales},
        "salesProjectionNextYear": {nextsales},
        "projectionMethod": {projectionlogic},
        "outsideSources": {outsideSource},
        "outsideSourceDescription": {outsidedetails},
        "attemptsToGrow":   {attempts},
        "awards": {awards},
        "uniqueSellingProposition": {proposition},
        "stage": {stage},
        "expectedAmount": {seek},
        "returnUnitProfitPercentage": {profitunit},
        "returnEquityPercentage": {equity},
        "subscriptionType": {selectedPackage},
        "publishedDate": {date},
        "status": "Active",
        "entrepreneurId": 102,
        "sectorId": [102, 2, 3]
    }

    // Sending the listing object to the backend with the post request
    
    const onSubmit = async (e) =>{
        e.preventDefault();
        await axios.post("http://localhost:8080/api/auth/addListing",listing)
    }
    
    return (
        <div>
            <NavbarAll />
            <main className="h-auto min-h-[100vh] p-[2rem] flex justify-center items-center bg-gray-200">
                
                <form className=" bg-white flex drop-shadow-md mb-4 w-full h-full  rounded-[1rem] lg:w-9/12 lg:h-auto">
                        {currentSection === 1 && (
                            <>
                            <div className="text-gray-700 p-[2rem] w-full">
                                <h1 className="text-3xl text-main-purple self-center">Add investment opportunity</h1>
                                <p className="text-main-purple">Tell us about your business</p>
                                <div className="mt-6">

                                    <div className="row">
                                        <div className="w-full">
                                        <label htmlFor="last-name" className="text-main-gray block mb-2 text-[14px] ">
                                        What are your plans with the investment fund ? Where will the money go?</label>
                                        <InputField 
                                            type="text" 
                                            id="INTEN"  
                                            value={intention} 
                                            onChange={(e) => setIntention(e.target.value)} 
                                            className="w-full"
                                        />
                                        </div>
                                    </div>
                                    <div className="row flex-auto">
                                        <div className="flex-grow">
                                        <label htmlFor="startdate" className="text-main-gray block mb-2 text-[14px]">
                                        When did you start the business?
                                        </label>
                                        <InputField 
                                            type="date" 
                                            id="date" 
                                            value={startdate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                        </div>
                                        <div className="flex-grow">
                                        <label htmlFor="howlong" className="text-main-gray block mb-2 text-[14px]">
                                        How long have you been operating as a business (Years) ?
                                        </label>
                                        <InputField 
                                            type="text" 
                                            id="years" 
                                            value={howlong}
                                            onChange={(e) => setHowLong(e.target.value)}
                                        />
                                        </div>
                                    </div>
                                    <div className="row flex-grow">
                                        <div>
                                        <label htmlFor="lifetimesales" className="text-main-gray block mb-2 text-[14px]">
                                        What are your business's total lifetime sales since starting (Rs.)?</label>
                                        <InputField 
                                            type="text" 
                                            id="lifesales" 
                                            value={lifetimesales}
                                            onChange={(e) => setLifeTimeSales(e.target.value)}
                                        />
                                        </div>
                                        <div>
                                        <label htmlFor="grossincome" className="text-main-gray block mb-2 text-[14px]">
                                        What was the gross income from your business last year?
                                        </label>
                                        <InputField 
                                            type="text" 
                                            id="grossincome" 
                                            value={grossincome}
                                            onChange={(e) => setGrossIncome(e.target.value)}
                                        />
                                        </div>
                                    </div>
                                    <div className="row flex-grow">
                                        <div>
                                        <label htmlFor="netincome" className="text-main-gray block mb-2 text-[14px]">
                                        What was the net income from your business last year?</label>
                                        <InputField 
                                            type="text" 
                                            id="netincome" 
                                            value={netincome}
                                            onChange={(e) => setNetIncome(e.target.value)}
                                        />
                                        </div>
                                        <div>
                                        <label htmlFor="grossincome" className="text-main-gray block mb-2 text-[14px]">
                                        What are your sale projections for THIS CALENDAR YEAR ? 
                                        </label>
                                        <InputField 
                                            type="text" 
                                            id="salesprojections"
                                            value={nextsales}
                                            onChange={(e) => setNextSales(e.target.value)}
                                        />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="w-full">
                                        <label htmlFor="nextsales" className="text-main-gray block mb-2 text-[14px]">
                                        What are your sale projections for NEXT CALENDAR YEAR ?
                                        </label>
                                        <InputField 
                                            type="text" 
                                            id="lifesales" 
                                            value={nextsales}
                                            onChange={(e) => setNextSales(e.target.value)}
                                        />
                                        </div>
                                    </div>
                                    {/* Take up the maximum width */}
                                    <div className="row">
                                        <div className="w-full">
                                        <label htmlFor="projectionlogic" className="text-main-gray block mb-2 text-[14px]">
                                        How did you come up with those projections?
                                        </label>
                                        <InputField 
                                            type="text" 
                                            id="projectionlogic" 
                                            className="w-full"
                                            value={projectionlogic}
                                            onChange={(e) => setProjectionLogic(e.target.value)}
                                        />
                                        </div>
                                    </div>
                                    <div className="row flex justify-end">
                                        <CustomButton variant="primary" label="Next" icon="next" onClick={handleNext} />
                                    </div>
                                </div>
                            </div>
                            <div className="listing w-[50%] rounded-r-[1rem] hidden lg:block">
                            </div>
                            </>
                        )}
                        {currentSection === 2 && (
                            <>
                            <div className="text-gray-700 p-[2rem] w-full">
                                <p className="text-main-purple">Tell us more about your business ...</p>
                                <div className="mt-6">
                                    <div className="row">
                                        <div className="w-full">
                                        <label htmlFor="title" className="text-main-gray block mb-2 text-[14px] ">
                                        Give a good title for your listing
                                        </label>
                                        <InputField 
                                            type="text" 
                                            id="title"  
                                            value={title} 
                                            onChange={(e) => setTitle(e.target.value)} 
                                            className="w-full"
                                        />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="w-full">
                                        <label htmlFor="title" className="text-main-gray block mb-2 text-[14px] ">
                                        Give a brief description about your listing
                                        </label>
                                        <Textarea 
                                            type="text" 
                                            id="description"  
                                            value={description} 
                                            onChange={(e) => setDescription(e.target.value)} 
                                            className="w-full"
                                        />
                                        </div>
                                    </div>
                                    {/* Radio button to select either yes or no for outside funding */}
                                    <div className="row">
                                        <div>
                                            <label htmlFor="outside-sources" className="text-main-gray block mb-2 text-[14px]">
                                            Have you ever tried to raise money from outside sources?
                                            </label>
                                                <Radio 
                                                    color="purple"
                                                    type="radio" 
                                                    id="yes" 
                                                    name="outsource" 
                                                    value="yes"
                                                    label={<span style={{ fontSize: '12px' }}>Yes</span>}
                                                    checked={outsideSource === 'yes'}
                                                    onChange={handleOutsideSourceChange}

                                                />
                                                
                                                <Radio 
                                                    color="purple"
                                                    type="radio"  
                                                    id="no" 
                                                    name="outsource" 
                                                    value="no"
                                                    label={<span style={{ fontSize: '12px' }}>No</span>}
                                                    checked={outsideSource === 'no'}
                                                    onChange={handleOutsideSourceChange}
                                                />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="w-full">
                                        <label htmlFor="outside-details" className="text-main-gray block mb-2 text-[14px]">
                                        If yes provide details
                                        </label>
                                        <InputField 
                                            type="text" 
                                            id="outsidedetails" 
                                            className="w-full"
                                            value={outsidedetails}
                                            onChange={(e) => setOutsideDetails(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="w-full">
                                        <label htmlFor="attempts" className="text-main-gray block mb-2 text-[14px]">
                                        What attempts have you made to build your business? Have you been successful?
                                        </label>
                                        <InputField 
                                            type="text" 
                                            id="attempts" 
                                            className="w-full"
                                            value={attempts}
                                            onChange={(e) => setAttempts(e.target.value)}
                                        />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="w-full">
                                        <label htmlFor="proposition" className="text-main-gray block mb-2 text-[14px]">
                                        What is your unique selling proposition? What is your “hook”, and why is your business Notable?
                                        </label>
                                        <InputField 
                                            type="text" 
                                            id="proposition" 
                                            className="w-full"
                                            value={proposition}
                                            onChange={(e) => setProposition(e.target.value)}    
                                        />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="w-full">
                                        <label htmlFor="awards" className="text-main-gray block mb-2 text-[14px]">
                                        List any awards or accolades you've received?
                                        </label>
                                        <InputField 
                                            type="text" 
                                            id="awards" 
                                            className="w-full"
                                            value={awards}
                                            onChange={(e) => setAwards(e.target.value)}
                                        />
                                        </div>
                                    </div>
                                    <div className="row w-full flex">
                                        <div className="justify-begin">
                                            <CustomButton variant="clear" label="Previous" icon="previous" onClick={handlePrevious} />
                                        </div>
                                        <div className="justify-end">
                                            <CustomButton variant="primary" label="Next" icon="next" onClick={handleNext} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="listing w-[50%] rounded-r-[1rem] hidden lg:block">
                        </div>
                            </>
                        )}
                        {currentSection === 3 && (
                            <>
                            <div className="text-gray-700 p-[2rem] w-full">
                                <p className="text-main-purple">Tell us more about your business ...</p>
                                <div className="mt-6">  
                                    <div className="row">
                                        {/* Label */}
                                        <div className="w-full">
                                            <label htmlFor="category" className="text-main-gray block mb-2 text-[14px]">
                                                What category describes your business or product? (check all that apply): *
                                            </label>
                                            <div className="flex flex-cols gap-2">
                                                <div className="row parent w-full">
                                                <Checkbox 
                                                        label="Food & Beverage" 
                                                        name="Food & Beverage" 
                                                        checked={categories.food} 
                                                        onChange={(event)=>
                                                            setCategories({...categories, food: event.target.checked})
                                                        }
                                                />
                                                <Checkbox 
                                                        label="Technology"
                                                        name="Technology"
                                                        checked={categories.technology}
                                                        onChange={(event)=>
                                                            setCategories({...categories, technology: event.target.checked})
                                                        }
                                                />
                                                <Checkbox
                                                        label="App / Website"
                                                        name="App / Website"
                                                        checked={categories.app}
                                                        onChange={(event)=>
                                                            setCategories({...categories, app: event.target.checked})
                                                        }
                                                />
                                                </div>
                                            </div>
                                            <div className="flex flex-cols gap-2">
                                                <div className="row parent w-full">
                                                <Checkbox
                                                        label="Fitness"
                                                        name="Fitness"
                                                        checked={categories.fitness}
                                                        onChange={(event)=>
                                                            setCategories({...categories, fitness: event.target.checked})
                                                        }
                                                />
                                                <Checkbox 
                                                        label="Health / Wellness / Nutrition"
                                                        name="Health / Wellness / Nutrition"
                                                        checked={categories.healthcare}
                                                        onChange={(event)=>
                                                            setCategories({...categories, healthcare: event.target.checked})
                                                        }
                                                />
                                                <Checkbox 

                                                        label="Sports"
                                                        name="Sports"
                                                        checked={categories.sports}
                                                        onChange={(event)=>
                                                            setCategories({...categories, sports: event.target.checked})
                                                        }
                                                />
                                                </div>
                                            </div>
                                            <div className="flex flex-cols gap-2">
                                                <div className="row parent w-full">
                                                <Checkbox 
                                                        label="Beauty"
                                                        name="Beauty"
                                                        checked={categories.beauty}
                                                        onChange={(event)=>
                                                            setCategories({...categories, beauty: event.target.checked})
                                                        }
                                                />
                                                <Checkbox 
                                                        label="Clothing / Fashion"
                                                        name="Clothing / Fashion"
                                                        checked={categories.clothing}
                                                        onChange={(event)=>
                                                            setCategories({...categories, clothing: event.target.checked})
                                                        }
                                                />
                                                <Checkbox 
                                                        label="Toys / Games"
                                                        name="Toys / Games"
                                                        checked={categories.toys}
                                                        onChange={(event)=>
                                                            setCategories({...categories, toys: event.target.checked})
                                                        }
                                                />
                                                </div>
                                            </div>
                                            <div className="flex flex-cols gap-2">
                                                <div className="row parent w-full">
                                                <Checkbox 
                                                        label="Entertainment / Experiential"
                                                        name="Entertainment / Experiential"
                                                        checked={categories.entertainment}
                                                        onChange={(event)=>
                                                            setCategories({...categories, entertainment: event.target.checked})
                                                        }
                                                />
                                                <Checkbox 
                                                        label="Pets"
                                                        name="Pets"
                                                        checked={categories.pets}
                                                        onChange={(event)=>
                                                            setCategories({...categories, pets: event.target.checked})
                                                        }
                                                />
                                                <Checkbox 
                                                        label="Music"
                                                        name="Music"
                                                        checked={categories.music}
                                                        onChange={(event)=>
                                                            setCategories({...categories, music: event.target.checked})
                                                        }
                                                />
                                                </div>
                                            </div>
                                            <div className="flex flex-cols gap-2">
                                                <div className="row parent w-full">
                                                <Checkbox 
                                                        label="Holiday"
                                                        name="Holiday"
                                                        checked={categories.holiday}
                                                        onChange={(event)=>
                                                            setCategories({...categories, holiday: event.target.checked})
                                                        }
                                                />
                                                <Checkbox 
                                                        label="Children"
                                                        name="Children"
                                                        checked={categories.children}
                                                        onChange={(event)=>
                                                            setCategories({...categories, children: event.target.checked})
                                                        }
                                                />
                                                <Checkbox
                                                        label="Housewares / Home Design"
                                                        name="Housewares / Home Design"
                                                        checked={categories.housewares}
                                                        onChange={(event)=>
                                                            setCategories({...categories, housewares: event.target.checked})
                                                        }
                                                />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="w-full">
                                        <label htmlFor="stage" className="text-main-gray block mb-2 text-[14px]">
                                        What stage describes your business or product? (check all that apply): *
                                        </label>
                                        <div className="flex flex-rows">
                                            <div className="row">
                                            <Radio label={<span style={{ fontSize: '12px' }}>Shopping Live</span>} name="stage" value="live" checked={stage === 'live'} onChange={handleStageChange}/>
                                            <Radio label={<span style={{ fontSize: '12px' }}>Revenue</span>} name="stage" value="revenue" checked={stage === 'revenue'} onChange={handleStageChange}/>
                                            <Radio label={<span style={{ fontSize: '12px' }}>Expansion</span>} name="stage" value="expansion" checked={stage === 'expansion'} onChange={handleStageChange}/>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                            
                                    <div className="row w-full flex">
                                        <div className="justify-begin">
                                            <CustomButton variant="clear" label="Previous" icon="previous" onClick={handlePrevious} />
                                        </div>
                                        <div className="justify-end">
                                            <CustomButton variant="primary" label="Next" icon="next" onClick={handleNext} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="listing w-[50%] rounded-r-[1rem] hidden lg:block">
                            </div>
                            </>
                        )}
                        {currentSection === 4 && (
                            <>
                            <div className="text-gray-700 p-[2rem] w-full">
                                    <div className="mt-6">
                                    <p className="text-main-purple">Tell us more about your business ...</p>
                                    <div className="row">
                                        <div className="w-full">
                                        <label htmlFor="image1" className="text-main-gray block mb-2 text-[14px]">
                                            Please upload a photo of your business or product if applicable:
                                        </label>
                                        {/* Three divs to hold the three images uploaded */}
                                        <div className="flex flex-cols gap-2">
                                            <div className="row">
                                            <div className="w-[100px] h-[100px] border-2 border-main-purple rounded-[1rem] flex items-center justify-center overflow-hidden">
                                                {image1.preview && (
                                                <img src={image1.preview} alt="Image 1" className="w-full h-full object-cover rounded-[1rem]" />
                                                )}
                                            </div>
                                            <div className="w-[100px] h-[100px] border-2 border-main-purple rounded-[1rem] flex items-center justify-center overflow-hidden">
                                                {image2.preview && (
                                                <img src={image2.preview} alt="Image 2" className="w-full h-full object-cover rounded-[1rem]" />
                                                )}
                                            </div>
                                            <div className="w-[100px] h-[100px] border-2 border-main-purple rounded-[1rem] flex items-center justify-center overflow-hidden">
                                                {image3.preview && (
                                                <img src={image3.preview} alt="Image 3" className="w-full h-full object-cover rounded-[1rem]" />
                                                )}
                                            </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="file-input-container">
                                            <input
                                                type="file"
                                                id="image1"
                                                name="images"
                                                accept="image/png, image/jpeg"
                                                className="hidden"
                                                onChange={handleImageupload}
                                            />
                                            <label htmlFor="image1" className="file-input-button">
                                                Select File
                                            </label>
                                            <span className="file-input-text">
                                                {/* Show all the uploadded images */}
                                                {image1.file && image1.file.name + ","}
                                                {image2.file && image2.file.name + ","}
                                                {image3.file && image3.file.name}
                                                {!image1.file && "No file uploaded"}
                                            </span>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    {/* Div to upload SINGLE video */}
                                    <div className="row">
                                        <div className="w-full">
                                        <label htmlFor="video" className="text-main-gray block mb-2 text-[14px]">
                                            Please upload a pitch video of your business:
                                        </label>
                                        <div className="flex flex-cols gap-2">
                                            <div className="row">
                                            <div className="w-full md:w-[600px] md:h-[300px] sm:w-[400px] sm:w-[200px] border-2 border-main-purple rounded-[1rem] video-container">
                                                {video.preview && (
                                                <video src={video.preview} alt="Video" className="w-full h-full object-cover rounded-[1rem]" controls />
                                                )}
                                                {!video.preview && (
                                                    <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] mx-auto my-[4rem] md:my-[6rem] play-image"></div>
                                                )}
                                            </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="file-input-container">
                                            <input
                                                type="file"
                                                id="video"
                                                name="video"
                                                accept="video/*"
                                                className="hidden"
                                                onChange={handleVideoUpload}
                                            />
                                            <label htmlFor="video" className="file-input-button">
                                                Select File
                                            </label>
                                            <span className="file-input-text">
                                                {video && video.file && video.file.name}
                                                {!video.file && "No file uploaded"}
                                            </span>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                        <div className="row w-full flex">
                                            <div className="justify-begin">
                                            <CustomButton variant="clear" label="Previous" icon="previous" onClick={handlePrevious} />
                                            </div>
                                            <div className="justify-end">
                                            <CustomButton variant="primary" label="Next" icon="next" onClick={handleNext} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="listing w-[50%] rounded-r-[1rem] hidden lg:block"></div>
                            </>
                        )}
                        {currentSection === 5 && (
                            <>  
                            <div className="text-gray-700 p-[2rem] w-full">
                                <div className="mt-6">
                                    {/* Container for the logo  */}
                                    <div className="flex justify-center items-center">
                                        <div className="venture-logo w-[200px] h-[80px] rounded-[1rem] justify-center drop-shadow">
                                        </div>
                                    </div> 
                                    <div className="flex justify-center items-center row">
                                        <p className="text-main-purple font-bold mt-[1rem]">Let's begin</p>
                                    </div>   
                                    <div className="row">
                                        <div className="w-full">
                                            <label htmlFor="venture-name" className="text-main-gray block mb-2 text-[14px]">
                                            What investment amount are you seeking and what percentage of equity are you willing to give in exchange?
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row flex justify-center items-center">
                                        <Card className="w-500 shadow-lg p-6 border-2 border-main-purple">
                                            <label htmlFor="seek" className="text-main-gray block mb-2 text-[14px]">
                                                I am seeking (Rs) :
                                            </label>
                                            <InputField 
                                                type="text" 
                                                id="seek" 
                                                className="w-full"
                                                value={seek}
                                                onChange={(e) => setSeek(e.target.value)}
                                                />
                                            <label htmlFor="seek" className="text-main-gray block mb-2 mt-5 text-[14px]">
                                                And willing to give up :
                                            </label>
                                            <div className="flex items-center mb-3">
                                                <InputField 
                                                    type="text" 
                                                    id="seek" 
                                                    className="w-full mr-2"
                                                    value={equity}
                                                    onChange={(e) => setEquity(e.target.value)}
                                                    />
                                                <Checkbox 
                                                    label="On Equity" 
                                                    name="equity" 
                                                    checked={equitychecked}
                                                    onChange={(event) => setEquityChecked(event.target.checked)}
                                                />
                                            </div>
                                            <div className="flex items-center">
                                                <InputField 
                                                    type="text" 
                                                    id="seek" 
                                                    className="w-full mr-2"
                                                    value={profitunit}
                                                    onChange={(e) => setProfitUnit(e.target.value)}    
                                                />
                                                <Checkbox 
                                                    label="Profit per unit" 
                                                    name="profitunit"
                                                    checked={profitunitchecked}
                                                    onChange={(event) => setProfitUnitChecked(event.target.checked)}
                                                />
                                            </div>
                                        </Card>


                                    </div>
                                    <div className="row w-full flex">
                                        <div className="justify-begin">
                                            <CustomButton variant="clear" label="Previous" icon="previous" onClick={handlePrevious} />
                                        </div>
                                        <div className="justify-end">
                                            <CustomButton variant="primary" label="Next" icon="next" onClick={handleNext} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="listing w-[50%] rounded-r-[1rem] hidden lg:block">
                            </div>
                            </>
                        )}
                        {currentSection === 6 && (
                            <>  
                            <div className="text-gray-700 p-[2rem] w-full">
                                <div className="row">
                                        <div className="w-full flex justify-center items-center row">
                                        <label htmlFor="attempts" className="text-main-gray block text-[14px] font-extrabold">
                                        You will get 7 days free trial for your listing. You can do the subscription now which gives more benefits ...
                                        </label>
                                        </div>
                                </div>
                                <div className="mb-5">
                                    <div className="flex justify-center items-center row">
                                        <p className="text-main-purple font-bold mt-[1rem]">Choose a pricing package</p>
                                    </div>   
                                    <div className="row flex justify-center items-center">
                                        {/* Pricing 1 */}
                                        <div
                                            className={`grid-cols-3 ${
                                            selectedPackage === "basic" ? "border-[5px] border-main-purple shadow-lg" : ""
                                            }`}
                                            onClick={() => handlePackageSelect("basic")}
                                        >
                                            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                                            <h3 className="mb-4 text-2xl font-semibold">Basic</h3>
                                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                                                Best option for personal use & for your next project.
                                            </p>
                                            <div className="flex justify-center items-baseline my-8">
                                                <span className="mr-2 text-5xl font-extrabold">Rs2000</span>
                                                <span className="text-gray-500 dark:text-gray-400">/month</span>
                                            </div>
                                            {/* List */}
                                            <ul className="mb-8 space-y-4 text-left">
                                                <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span>Individual configuration</span>
                                                </li>
                                                <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span>No setup or hidden fees</span>
                                                </li>
                                                <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span>Team size: <span className="font-semibold">1 developer</span></span>
                                                </li>
                                                <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span>Premium support: <span className="font-semibold">6 months</span></span>
                                                </li>
                                                <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span>Free updates: <span className="font-semibold">6 months</span></span>
                                                </li>
                                            </ul>
                                            </div>
                                        </div>
                                        {/* Pricing 2 */}
                                        <div
                                            className={`grid-cols-3 ${
                                            selectedPackage === "standard" ? "border-[5px] border-main-purple shadow-lg" : ""
                                            }`}
                                            onClick={() => handlePackageSelect("standard")}
                                        >
                                            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-main-gray bg-opacity-90 rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                                            <h3 className="mb-4 text-2xl text-white font-semibold">Standard</h3>
                                            <p className="font-light text-white sm:text-lg dark:text-gray-400">
                                                Relevant for multiple users, extended & premium support.
                                            </p>
                                            <div className="flex justify-center items-baseline my-8">
                                                <span className="mr-2 text-5xl text-white font-extrabold">Rs5000</span>
                                                <span className="text-gray-500 dark:text-gray-400">/month</span>
                                            </div>
                                            {/* List */}
                                            <ul className="mb-8 space-y-4 text-left">
                                                <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span className="text-white">Individual configuration</span>
                                                </li>
                                                <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span className="text-white">No setup or hidden fees</span>
                                                </li>
                                                <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span className="text-white">Team size: <span className="font-semibold">10 developers</span></span>
                                                </li>
                                                <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span className="text-white">Premium support: <span className="font-semibold">24 months</span></span>
                                                </li>
                                                <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span className="text-white">Free updates: <span className="font-semibold">24 months</span></span>
                                                </li>
                                            </ul>
                                            </div>
                                        </div>
                                        {/* Pricing 3 */}
                                        <div
                                            className={`grid-cols-3 ${
                                            selectedPackage === "premium" ? "border-[5px] border-main-purple shadow-lg" : ""
                                            }`}
                                            onClick={() => handlePackageSelect("premium")}
                                        >
                                            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                                            <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
                                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                                                Best for large-scale uses and extended redistribution rights.
                                            </p>
                                            <div className="flex justify-center items-baseline my-8">
                                                <span className="mr-2 text-5xl font-extrabold">Rs10000</span>
                                                <span className="text-gray-500 dark:text-gray-400">/month</span>
                                            </div>
                                            {/* List */}
                                            <ul className="mb-8 space-y-4 text-left">
                                                <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span>Individual configuration</span>
                                                </li>
                                                <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span>No setup or hidden fees</span>
                                                </li>
                                                <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span>Team size: <span className="font-semibold">100+ developers</span></span>
                                                </li>
                                                <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span>Premium support: <span className="font-semibold">Lifetime</span></span>
                                                </li>
                                                <li className="flex items-center space-x-3">
                                                {/* Icon */}
                                                <svg
                                                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span>Free updates: <span className="font-semibold">Lifetime</span></span>
                                                </li>
                                            </ul>
                                            </div>
                                        </div>       
                                    </div>
                                    <div className="row w-full flex mt-5">
                                        <div className="justify-begin">
                                            <CustomButton variant="clear" label="Previous" icon="previous" onClick={handlePrevious} />
                                        </div>
                                        <div className="justify-end">
                                            <CustomButton variant="clear" label="Subscribe now" onClick={onSubmit}/>
                                        </div>
                                        <div className="justify-end">
                                            <CustomButton variant="primary" label="Submit without subscribing" icon="next" type="submit" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </>
                        )}    
                </form>
            </main>
            <Footer />
        </div>
    );
}

export default AddListing;



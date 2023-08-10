import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

// Import Pages Here
// Common Pages
import Home from "./pages/common/Home";
import About from "./pages/common/About";
import Pricing from "./pages/common/Pricing";
import Contact from "./pages/common/Contact";
import Signup from "./pages/common/Signup";
import EntrepreneurSignup from "./pages/entrepreneur/Form"
import IndividualInvestorSignup from "./pages/investor/individualInvestor/Form";
import EnterpriseInvestorSignup from "./pages/investor/enterpriseInvestor/Form";
import Success from "./pages/common/Success";
import Login from "./pages/common/Login";
import ForgotPassword from "./pages/common/ForgotPassword";
import ResetPassword from "./pages/common/ResetPassword";
import Components from "./pages/webcomponent/Components";

// Entrepreneur Pages
import EntrepreneurDashboard from "./pages/entrepreneur/Dashboard";
import EntrepreneurTestHome from "./pages/entrepreneur/EntrepreneurTestHome";
import AddListing from "./pages/entrepreneur/AddListing";

// Investor Pages
import InvestorDashboard from "./pages/investor/Dashboard";
import InvestorTestHome from "./pages/investor/InvestorTestHome";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminTestHome from "./pages/admin/AdminTestHome";

import {Routes, Route} from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/*Public Routes*/}
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/pricing" element={<Pricing/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password/:token" element={<ResetPassword/>}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signup/entrepreneur" element={<EntrepreneurSignup />} />
                <Route path="/signup/individual-investor" element={<IndividualInvestorSignup />} />
                <Route path="/signup/enterprise-investor" element={<EnterpriseInvestorSignup />} />
                <Route path="/success" element={<Success/>}/>
                <Route path="/comp" element={<Components />}/>
                {/*Protected Routes*/}
                <Route element={<PersistLogin/>}>
                    <Route element={<RequireAuth allowedRoles={["ADMIN", "INVESTOR", "ENTREPRENEUR"]}/>}>
                        {/* Routes Authorized to All Users */}
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
                        {/* Routes Authorized to Admins */}
                        <Route path="/admin/dashboard" element={<AdminDashboard />}/>
                        <Route path="/admin" element={<AdminTestHome/>}/>
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["INDIVIDUAL INVESTOR", "ENTERPRISE INVESTOR"]}/>}>
                        {/* Routes Authorized to Investors */}
                        <Route path="/investor/dashboard" element={<InvestorDashboard />}/>
                        <Route path="/investor" element={<InvestorTestHome/>}/>
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["ENTREPRENEUR"]}/>}>
                        {/* Routes Authorized to Entrepreneurs */}
                        <Route path="/entrepreneur/dashboard" element={<EntrepreneurDashboard />}/>
                        <Route path="/entrepreneur/listing" element={<EntrepreneurTestHome/>}/>
                        <Route path="/entrepreneur/add-listing" element={<AddListing />} />
                    </Route>
                </Route>
                {/*404*/}

            </Route>
        </Routes>
    );
}

export default App;

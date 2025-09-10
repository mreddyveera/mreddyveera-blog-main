import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";   // ✅ named import
import axios from "axios";
import { Label, TextInput, Button } from "flowbite-react";
import {signInStart,signInSuccess,signInFailure} from "../redux/user/userSlice.js";
import {useDispatch,useSelector} from "react-redux";
import OAuth from "../components/OAuth.jsx";


function Signin() {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const {loading,error:errorMessage}=useSelector(state=>state.user);
  const [valid,setValid]=useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedState={...formData,[name]:value.trim()};
    setFormData(updatedState);
    let errors = {
      email: "",
      password: "",
    };
    if (
      name === "email" &&
      !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value.trim())
    ) {
      errors.email = "Please enter a valid gmail account";
    }
    if (name === "password" && !(value.length > 8 && value.length <= 12)) {
      errors.password =
        "Password shouid be in between 8 to 12 characters of length";
    }
    setFormErrors(errors);
    let noErrors=Object.values(errors).every((item)=>item==="");
    let formFilled=Object.values(updatedState).every((item)=>item!=="");
    setValid(noErrors&&formFilled);
  };
  const handleSubmit =  (e) => {
    e.preventDefault();
    if (!formData.password || !formData.email) {
      return dispatch(signInFailure("Please fill out all the fields"));
    }

    try {
      dispatch(signInStart());
      axios.post("http://localhost:3000/api/auth/signin",formData)
      .then((response)=>
        {
        dispatch(signInSuccess(response));
        setTimeout(()=>{navigate("/")},2000);
        
      })
      .catch((error)=>{
        console.log(error.message);
        dispatch(signInFailure(error.message));
      })
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
          {/* Main container with left + right */}
          <div className="flex p-6 max-w-4xl w-full flex-col md:flex-row gap-8">
            {/* Left */}
            <div className="flex-1 flex flex-col justify-center gap-5">
              <Link to="/" className="font-bold dark:text-white text-4xl mb-4">
                <span className="px-3 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                  Manikanta
                </span>{" "}
                Blog
              </Link>
    
              <p className="text-gray-600 dark:text-gray-300">
                This is a knowledge sharing blog. You can signin with your email and
                password or with Google.
              </p>
            </div>
    
            {/* Right (Signup Form) */}
            <div className="flex-1">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="email" value="Your Email" >Your Email</Label>
                  <TextInput
                    type="email"
                    placeholder="example@gmail.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {formErrors.email && (
                    <small className="text-red-600">{formErrors.email}</small>
                  )}
                </div>
    
                <div>
                  <Label htmlFor="password" value="Your Password" >Your password</Label>
                  <TextInput
                    type="password"
                    placeholder="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {formErrors.password && (
                    <small className="text-red-600">{formErrors.password}</small>
                  )}
                </div>
    
                <Button
                  type="submit"
                  className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
                  disabled={!valid}

                >
                  Sign In
                </Button>
                <OAuth/>
              </form>
              <div className="flex gap-2 text-sm mt-5">
                <span>Have no account?</span>
                <Link to="/signup" className="text-blue-500">
                  Sign Up
                </Link>
              </div>
              {errorMessage && (
                <small className="text-red-600">{errorMessage}</small>
              )}
            </div>
          </div>
        </div>
  );
}

export default Signin;

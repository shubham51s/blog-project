import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/userContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slidingImg1 from "../../assets/images/slidingImg1.jpeg";
import slidingImg2 from "../../assets/images/slidingImg2.jpeg";
import slidingImg3 from "../../assets/images/slidingImg3.jpeg";
import slidingImg4 from "../../assets/images/slidingImg4.jpeg";
import Slider from "react-slick";
import TextField from "@mui/material/TextField";
import { CircularProgress } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useApi } from "../../hooks/useApi";
import { urlBasePath } from "../../constants/constant";
import { IoMdClose } from "react-icons/io";
import infinity from "../../assets/images/infinity.png";
import Select from "react-select";
import { IoMdArrowRoundBack } from "react-icons/io";
import { showToast } from "../../utils/toaster";

function LoginSignupComp() {
  const { setIsShowLoginPopup, isLoginTabActive, setIsLoginTabActive, setIsUserLoggedIn, setUserInfo, verifyAuthentication } = useContext(UserContext);
  const { fetchRequest } = useApi();

  const sliderOptions = {
    dots: true, // show dots
    arrows: false, // hide next/prev
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500, // 2.5 seconds per slide
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };

  const slidingImages = [slidingImg1, slidingImg2, slidingImg3, slidingImg4];
  const defaultUserInput = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPass: "",
    gender: "",
  };

  const defaultErrMsg = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPass: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isTopicsTabActive, setIsTopicsTabActive] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [topics, setTopics] = useState([]);

  const [userDetails, setUserDetails] = useState({ ...defaultUserInput });
  const [errDetails, setErrDetails] = useState({ ...defaultErrMsg });

  const handleInputChange = (type, val) => {
    if (type === "firstName") {
      setUserDetails((prev) => ({ ...prev, firstName: val }));
      setErrDetails((prev) => ({ ...prev, firstName: "" }));
    }

    if (type === "lastName") {
      setUserDetails((prev) => ({ ...prev, lastName: val }));
      setErrDetails((prev) => ({ ...prev, lastName: "" }));
    }

    if (type === "email") {
      setUserDetails((prev) => ({ ...prev, email: val }));
      setErrDetails((prev) => ({ ...prev, email: "" }));
    }

    if (type === "password") {
      setUserDetails((prev) => ({ ...prev, password: val }));
      setErrDetails((prev) => ({ ...prev, password: "" }));
    }

    if (type === "confirmPass") {
      setUserDetails((prev) => ({ ...prev, confirmPass: val }));
      setErrDetails((prev) => ({ ...prev, confirmPass: "" }));
    }
  };

  const isLoginFormValid = () => {
    const nameRegex = /^[A-Za-z]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    if (!userDetails.email) {
      setErrDetails((prev) => ({ ...prev, email: "Email is required" }));
      isValid = false;
    } else if (!emailRegex.test(userDetails.email)) {
      setErrDetails((prev) => ({ ...prev, email: "Please enter valid email address" }));
      isValid = false;
    }

    if (!userDetails.password) {
      setErrDetails((prev) => ({ ...prev, password: "Password is required" }));
      isValid = false;
    } else if (userDetails.password.length < 6) {
      setErrDetails((prev) => ({ ...prev, password: "Password must be at least 6 characters" }));
      isValid = false;
    }

    return isValid;
  };

  const isFormValid = () => {
    const nameRegex = /^[A-Za-z]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    if (!userDetails.email) {
      setErrDetails((prev) => ({ ...prev, email: "Email is required" }));
      isValid = false;
    } else if (!emailRegex.test(userDetails.email)) {
      setErrDetails((prev) => ({ ...prev, email: "Please enter valid email address" }));
      isValid = false;
    }

    if (!userDetails.password) {
      setErrDetails((prev) => ({ ...prev, password: "Password is required" }));
      isValid = false;
    } else if (userDetails.password.length < 6) {
      setErrDetails((prev) => ({ ...prev, password: "Password must be at least 6 characters" }));
      isValid = false;
    } else if (userDetails.password !== userDetails.confirmPass) {
      setErrDetails((prev) => ({ ...prev, confirmPass: "Password did not match" }));
      isValid = false;
    }

    if (!userDetails.firstName) {
      setErrDetails((prev) => ({ ...prev, firstName: "First name is required" }));
      isValid = false;
    } else if (!nameRegex.test(userDetails.firstName)) {
      setErrDetails((prev) => ({ ...prev, firstName: "Please enter valid first name" }));
      isValid = false;
    }

    if (!userDetails.lastName) {
      setErrDetails((prev) => ({ ...prev, lastName: "Last name is required" }));
      isValid = false;
    } else if (!nameRegex.test(userDetails.lastName)) {
      setErrDetails((prev) => ({ ...prev, lastName: "Please enter valid last name" }));
      isValid = false;
    }

    return isValid;
  };

  const handleLoginTypeChange = () => {
    setUserDetails({ ...defaultUserInput });
    setErrDetails({ ...defaultErrMsg });
    setIsLoginTabActive(!isLoginTabActive);
    setSelectedTopic([]);
  };

  const createUser = async () => {
    setIsLoading(true);
    try {
      const params = {
        email: userDetails.email,
      };

      const response = await fetchRequest("/users/pre-signup", "POST", params);

      const result = await response.json();
      setIsLoading(false);

      if (response?.status === 200) {
        setIsTopicsTabActive(true);
      } else {
        showToast(result?.message || "Something went wrong", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Something went wrong", "error");
      setIsLoading(false);
    }
  };

  const signInUser = async () => {
    setIsLoading(true);
    try {
      const params = {
        email: userDetails.email,
        password: userDetails.password,
      };

      const response = await fetch(urlBasePath + "/users/login", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        method: "POST",
        body: JSON.stringify(params),
      });

      const result = await response.json();

      if (response?.status === 200) {
        verifyAuthentication();
      } else {
        showToast(result?.message || "Some error occured.");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupBtnClick = () => {
    if (isFormValid()) createUser();
  };

  const handleLoginBtnClick = () => {
    if (isLoginFormValid()) signInUser();
  };

  const closeLoginPopup = () => {
    if (isLoading) return;
    setIsShowLoginPopup(false);
  };

  const handleTopicSelectionChange = (selected) => {
    if (selected.length <= 50) setSelectedTopic(selected);
    else showToast("Select upto 50 topics!");
  };

  const handleCloseTopicsTab = () => {
    setSelectedTopic([]);
    setIsTopicsTabActive(false);
  };

  const handleFinishSignuBtnClick = async () => {
    setIsLoading(true);
    try {
      const interests = selectedTopic.map((item) => item.value);

      const params = {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        password: userDetails.password,
        gender: userDetails.gender,
        interests,
      };

      const response = await fetch(urlBasePath + "/users/signup", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        method: "POST",
        body: JSON.stringify(params),
      });

      const result = await response.json();

      if (response?.status === 201) {
        verifyAuthentication();
      } else {
        showToast(result?.message || "Some error occured.");
      }
    } catch (err) {
      console.error(err);
      showToast("Some error occured.");
    } finally {
      setIsLoading(false);
    }
  };

  const getAllTopics = async () => {
    try {
      const response = await fetchRequest("/topic", "GET");
      if (!response?.status === 200) return;

      const result = await response.json();

      if (result?.data?.topics?.length > 0) {
        const sortedResult = result.data.topics.map((item) => ({ label: item.name.charAt(0).toUpperCase() + item.name.slice(1), value: item._id }));
        setTopics(sortedResult || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllTopics();
  }, []);

  return (
    <div onClick={closeLoginPopup} className="absolute z-[999] w-full custom-bg-6 h-screen flex items-center justify-center select-none">
      <div onClick={(e) => e.stopPropagation()} className="width67 flex items-center height74 border-radius-1 overflow-hidden custom-bg-2 padding-23 boxShadow6 relative">
        <div className="absolute z-[999] top-0 right-0 padding-6 bg-transparent">
          <button onClick={closeLoginPopup} className="width-13 aspect-square cursor-pointer transition-all duration-200 linear opacity-75 hover:opacity-100">
            <IoMdClose className="w-full h-full" />
          </button>
        </div>

        {/* left section */}
        <div className="w-[50%] max-w-[50%] h-full border-radius-1 overflow-hidden">
          <Slider {...sliderOptions} className="w-full h-full">
            {slidingImages.map((item, i) => (
              <div className="w-full h-full flex items-center justify-center" key={i}>
                <img src={item} className="w-full h-full object-cover" />
              </div>
            ))}
          </Slider>
        </div>

        {/* right section */}
        <div className="w-[50%] max-w-[50%] h-full relative overflow-hidden">
          {/* login */}
          <div className={`w-full h-full flex items-center transition-all ease-in-out duration-200 absolute ${isLoginTabActive ? "translate-x-0 visible pointer-none-auto" : "-translate-x-full invisible pointer-events-none"}`}>
            <div className="padding65 padding66 w-full h-full flex flex-col items-center justify-start">
              <h3 className="flex items-center justify-center letter-spacing-4 line-h-5 font-7 color-6 font-normal select-none" style={{ marginTop: 0, marginInline: 0, paddingTop: 0, paddingInline: 0 }}>
                Welcome back.
              </h3>

              <div className="w-full margin53">
                <FormLabel htmlFor="email" className="font-10">
                  Email
                </FormLabel>
                <div className="height-2 margin-9" style={{ marginBottom: 0, marginInline: 0 }}>
                  <TextField
                    fullWidth
                    id="email"
                    placeholder="Enter email"
                    className="w-full h-full font-10"
                    type="email"
                    value={userDetails.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    error={errDetails.email}
                    helperText={errDetails.email}
                    sx={{
                      height: "100%",
                      "& .MuiOutlinedInput-root": {
                        height: "100%",
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full margin53">
                <FormLabel htmlFor="password" className="font-10">
                  Password
                </FormLabel>
                <div className="height-2 margin-9" style={{ marginBottom: 0, marginInline: 0 }}>
                  <TextField
                    id="password"
                    fullWidth
                    placeholder="Enter password"
                    className="w-full h-full font-10"
                    type="password"
                    value={userDetails.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    error={errDetails.password}
                    helperText={errDetails.password}
                    sx={{
                      height: "100%",
                      "& .MuiOutlinedInput-root": {
                        height: "100%",
                      },
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center margin53">
                <p className="color-3 custom-line-h-1 margin-6 font-normal custom-fs-1" style={{ marginBottom: 0 }}>
                  No account?{" "}
                  <button onClick={handleLoginTypeChange} disabled={isLoading} className="underline cursor-pointer m-0 p-0">
                    Create one
                  </button>
                </p>
              </div>
              <div className="height-2 margin-8 flex items-center w-full justify-center" style={{ marginInline: 0, marginBottom: 0 }}>
                <button onClick={handleLoginBtnClick} disabled={isLoading} className={`h-full w-full flex items-center justify-center custom-gap-3 custom-bg-7 font-normal color-5 font-10 rounded-full opacity-75 transition-all ease-in-out duration-200 ${isLoading ? "" : "cursor-pointer hover:opacity-100"}`}>
                  {isLoading && <CircularProgress size={22} />}
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* signup */}
          <div
            className={`w-full h-full flex items-center transition-all ease-in-out duration-200 absolute ${isLoginTabActive ? "translate-x-full invisible pointer-events-none" : isTopicsTabActive ? "-translate-x-full invisible pointer-events-none" : "translate-x-0 visible pointer-events-auto"}
`}
          >
            <div className="padding-18 padding60 w-full h-full flex flex-col items-center justify-start">
              <h3 className="flex items-center justify-center letter-spacing-4 line-h-5 font-7 color-6 font-normal  select-none" style={{ marginTop: 0, marginInline: 0, paddingTop: 0, paddingInline: 0 }}>
                Join Medium.
              </h3>

              <div className="w-full height-2 flex items-center gap-[2%] margin53">
                <div className="w-[49%] h-full">
                  <TextField
                    fullWidth
                    placeholder="First name"
                    className="w-full h-full font-10"
                    value={userDetails.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    error={errDetails.firstName}
                    helperText={errDetails.firstName}
                    sx={{
                      height: "100%",
                      "& .MuiOutlinedInput-root": {
                        height: "100%",
                      },
                    }}
                  />
                </div>
                <div className="w-[49%] h-full">
                  <TextField
                    fullWidth
                    placeholder="Last name"
                    className="w-full h-full font-10"
                    value={userDetails.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    error={errDetails.lastName}
                    helperText={errDetails.lastName}
                    sx={{
                      height: "100%",
                      "& .MuiOutlinedInput-root": {
                        height: "100%",
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full height-2 margin53">
                <TextField
                  fullWidth
                  placeholder="Enter email"
                  className="w-full h-full font-10"
                  type="email"
                  value={userDetails.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  error={errDetails.email}
                  helperText={errDetails.email}
                  sx={{
                    height: "100%",
                    "& .MuiOutlinedInput-root": {
                      height: "100%",
                    },
                  }}
                />
              </div>

              <div className="w-full height-2 margin53">
                <TextField
                  fullWidth
                  placeholder="Enter password"
                  className="w-full h-full font-10"
                  type="password"
                  value={userDetails.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  error={errDetails.password}
                  helperText={errDetails.password}
                  sx={{
                    height: "100%",
                    "& .MuiOutlinedInput-root": {
                      height: "100%",
                    },
                  }}
                />
              </div>

              <div className="w-full height-2 margin53">
                <TextField
                  fullWidth
                  placeholder="Confirm password"
                  className="w-full h-full font-10"
                  type="password"
                  value={userDetails.confirmPass}
                  onChange={(e) => handleInputChange("confirmPass", e.target.value)}
                  error={errDetails.confirmPass}
                  helperText={errDetails.confirmPass}
                  sx={{
                    height: "100%",
                    "& .MuiOutlinedInput-root": {
                      height: "100%",
                    },
                  }}
                />
              </div>
              <div className="w-full height-2 flex items-center gap-4 margin53 select-none color-4">
                <FormLabel
                  className="font-10"
                  sx={{
                    color: "inherit",
                    "&.Mui-focused": {
                      color: "inherit",
                    },
                  }}
                >
                  Gender:{" "}
                </FormLabel>
                <RadioGroup value={userDetails.gender} onChange={(e) => setUserDetails((prev) => ({ ...prev, gender: e.target.value }))} row name="gender">
                  <FormControlLabel className="font-10" value="male" control={<Radio />} label="Male" />
                  <FormControlLabel className="font-10" value="female" control={<Radio />} label="Female" />
                  <FormControlLabel className="font-10" value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </div>

              <div className="flex items-center justify-center margin53">
                <p className="color-3 custom-line-h-1 m-0 font-normal custom-fs-1" style={{ marginBottom: 0 }}>
                  Already have an account?{" "}
                  <button onClick={handleLoginTypeChange} disabled={isLoading} className="underline cursor-pointer m-0 p-0">
                    Sign in
                  </button>
                </p>
              </div>
              <div className="height-2 margin-8 flex items-center w-full justify-center" style={{ marginInline: 0, marginBottom: 0 }}>
                <button onClick={handleSignupBtnClick} disabled={isLoading} className={`h-full w-full flex items-center justify-center custom-gap-3 custom-bg-7 font-normal color-5 font-10 rounded-full opacity-75 transition-all ease-in-out duration-200 ${isLoading ? "" : "cursor-pointer hover:opacity-100"}`}>
                  {isLoading && <CircularProgress size={22} />}
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* select topics */}

          <div className={`w-full h-full overflow-y-auto flex items-center transition-all ease-in-out duration-200 absolute ${!isLoginTabActive && isTopicsTabActive ? "translate-x-0 visible pointer-events-auto" : "translate-x-full invisible pointer-events-none "}`}>
            <div className="absolute z-[999] top-0 left-0 padding-6 bg-transparent">
              <button onClick={handleCloseTopicsTab} className="width-13 aspect-square cursor-pointer transition-all duration-200 linear opacity-75 hover:opacity-100" disabled={isLoading}>
                <IoMdArrowRoundBack className="w-full h-full" />
              </button>
            </div>

            <div className="padding-18 padding60 color-3 w-full h-full flex flex-col items-center justify-start">
              <h3 className="flex items-center justify-center letter-spacing-4 line-h-5 font-7 color-6 font-medium select-none padding-37" style={{ marginTop: 0, marginInline: 0, paddingTop: 0, paddingInline: 0 }}>
                Medium
              </h3>
              <div className="w-full padding-37"></div>
              <div className="padding-37 flex items-center justify-center w-full">
                <img src={infinity} className="w-24 aspect-square" />
              </div>

              <div className="padding-37 flex items-center justify-center w-full line-h-5 font-3 font-normal" style={{ paddingBottom: 0 }}>
                What are you interested in?
              </div>

              <div className="padding-37 flex items-center justify-center w-full line-h-8 font13 font-normal" style={{ paddingBottom: 0 }}>
                Choose three or more.
              </div>
              <div className="w-full padding-37"></div>
              <div className="padding-37 w-full font13 font-normal" style={{ paddingBottom: 0 }}>
                <Select value={selectedTopic} onChange={handleTopicSelectionChange} isMulti name="colors" options={topics} className="basic-multi-select custom-select box-border bg-transparent" classNamePrefix="select" placeholder="Select a topic..." />
              </div>

              <div className="height-2 margin-8 flex items-center w-full justify-center shrink-0" style={{ marginInline: 0, marginBottom: 0 }}>
                <button onClick={handleFinishSignuBtnClick} disabled={isLoading || selectedTopic.length < 3} className={`h-full w-full flex items-center justify-center custom-gap-3 custom-bg-7 font-normal color-5 font-10 rounded-full transition-all linear duration-200 ${selectedTopic.length < 3 ? "opacity-[0.4]" : "opacity-75 cursor-pointer hover:opacity-100"}`}>
                  {isLoading && <CircularProgress size={22} />}
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignupComp;

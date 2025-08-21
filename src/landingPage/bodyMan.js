import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../utils/url";
import axios from "axios";

export default function BodyMan() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fillPercentage, setFillPercentage] = useState(0);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const handleQuestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BaseUrl}/eraktkosh/question/list`);

        if (Array.isArray(response.data)) {
          const donorQuestions = response.data.filter(
            (ques) => ques.quesType?.toLowerCase() === "donor question"
          );
          setQuestions(donorQuestions);
        } else {
          setError("Invalid questions data format");
          setQuestions([]);
        }

        console.log("Questions deepu1 : ", response.data);
      } catch (error) {
        console.error("Error loading donation questions", error);
        setError("Failed to load questions");
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    handleQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const correctCount = answers.filter((ans) => ans === "correct").length;
      const rawFill = (correctCount / questions.length) * 100;
      const calculatedFill = Math.min(
        100,
        rawFill + (correctCount === questions.length ? 1 : 0)
      );
      setFillPercentage(calculatedFill);
      
      // Check if all questions have been answered
      if (answers.length === questions.length && questions.length > 0) {
        setAllQuestionsAnswered(true);
      }
    }
  }, [answers, questions]);

  const clipPathStyle = {
    clipPath: `inset(${100 - fillPercentage}% 0 0 0)`,
    transition: "clip-path 0.5s ease",
  };

  const percentageShow = Math.min(100, fillPercentage).toFixed(1) + "%";

  const handleAnswer = (response) => {
    const currentQuestion = questions[currentIndex];

    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentIndex] =
        response === currentQuestion.faqAnswer ? "correct" : "incorrect";
      return updated;
    });

    if (currentIndex < questions.length - 1) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setTransitioning(false);
      }, 300);
    }
  };

  const handleStepChange = (newStep) => {
    setTransitioning(true);
    setTimeout(() => {
      setStep(newStep);
      setTransitioning(false);
    }, 300);
  };

  const handleMouseEnter = () => {
    setShowGuidelines(true);
  };

  const handleMouseLeave = () => {
    setShowGuidelines(false);
  };

  const handleNearbyCamps = () => {
    setTransitioning(true);
    setTimeout(() => {
      window.location.href = "/#/publicPages/campSchedule";
    }, 300);
  };

  const handleStartOver = () => {
    setTransitioning(true);
    setTimeout(() => {
      setStep(1);
      setAnswers([]);
      setCurrentIndex(0);
      setAllQuestionsAnswered(false);
      setTransitioning(false);
    }, 300);
  };

  return (
    <section className="body__man">
      <div className="container">
        <div className="inner__container mt-4 mb-2">
          {allQuestionsAnswered ? (
            <div className={`completion-message w-100 d-flex flex-column align-items-center justify-content-center ${transitioning ? 'fade-out' : 'fade-in'}`}>
              <h3 className="mb-3 section__heading">Your donation analysis has been done.</h3>
              <p className="mb-3 section__overview">
                A doctor will re-verify donor eligibility before actual blood donation.
              </p>
              <Button className="btn__colored" onClick={handleStartOver}>
                Start Over
              </Button>
            </div>
          ) : (
            <>
              <div className="guidelines__img d-flex align-items-center">
                <p className="mb-0 guidelines__content">NHM Blood Guidelines</p>
                <img
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  src="assets/landingPage/guidelines.svg"
                  alt="Guidelines"
                  className="cursor-pointer"
                />
              </div>
              <div className="left__panel">
                {/* Step 1 */}
                {step === 1 && (
                  <div className={`step-content ${transitioning ? 'slide-out-left' : 'slide-in-right'}`}>
                    <h3 className="mb-1 section__heading">Who Can Donate</h3>
                    <p className="mb-2 section__overview">
                      Donating blood is a simple, safe and life-saving act. But not
                      everyone may be eligible to donate. To ensure the safety of
                      both donors and recipients, certain health criteria must be
                      met.
                    </p>
                    <div>
                      <Button
                        className="me-3 mb-3 btn__colored"
                        onClick={() => handleStepChange(2)}
                      >
                        Check your eligibility
                      </Button>
                      <Button onClick={handleNearbyCamps} className="btn__outlined">
                        Find Nearby Camps
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div className={`step-content ${transitioning ? 'slide-out-left' : 'slide-in-right'}`}>
                    <h3 className="mb-1 section__heading">
                      Check Your Eligibility
                    </h3>
                    <p className="mb-2 section__overview">
                      Your donation changes lives. But not everyone can donate blood
                      for a few reasons. Check your eligibility to donate today.
                    </p>
                    <div>
                      <Button
                        className="me-3 btn__colored"
                        onClick={() => handleStepChange(3)}
                      >
                        Yes
                      </Button>
                      <Button className="btn__outlined" onClick={() => handleStepChange(1)}>
                        Back
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <div className={`step-content ${transitioning ? 'slide-out-left' : 'slide-in-right'}`}>
                    <h3 className="mb-0 section__heading">
                      Check Your Eligibility
                    </h3>
                    {currentIndex < questions.length ? (
                      <div className={`question_block ${transitioning ? 'fade-out' : 'fade-in'}`}>
                        <p className="mb-3 section__overview">
                          Question {currentIndex + 1} of {questions.length}
                        </p>
                        <p className="mb-3 question__section">
                          {questions[currentIndex].faqQuestion}
                        </p>
                        <p className="mb-1 section__overview">
                          {questions[currentIndex].title}
                        </p>
                        <Button
                          onClick={() => handleAnswer("yes")}
                          className="btn__colored me-3"
                        >
                          Yes
                        </Button>
                        <Button
                          onClick={() => handleAnswer("no")}
                          className="btn__outlined"
                        >
                          No
                        </Button>
                      </div>
                    ) : (
                      <div className={`fade-in`}>
                        <p className="mb-2 section__overview">
                          Eligibility Check Complete
                        </p>
                        <Button
                          className="mt-3 btn__outlined"
                          onClick={handleStartOver}
                        >
                          Start Over
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="right__panel">
                <div className="image__wrapper">
                  {step !== 3 && (
                    <img
                      src="assets/landingPage/person_initial.png"
                      alt="raw person"
                    />
                  )}
                  {step === 3 && (
                    <div className={`d-flex align-items-center ${transitioning ? 'fade-out' : 'fade-in'}`}>
                      <div>
                        <div className="image__container">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            q
                            width="109"
                            height="274.876"
                            viewBox="0 0 109 274.876"
                            style={{ position: "relative" }}
                          >
                            <path
                              d="M114.694,155.8c-.716-.944-2.16-4.561-2.805-5.758a41.18,41.18,0,0,0-4.9-7.129,5.774,5.774,0,0,0-1.347-1.035c-1.337-3.288-2.962-16.512-3.876-26.571-.967-10.642-4.127-14.857-4.127-14.857.451-8.707-2.257-17.759-2.171-19.9s0-8.822,0-8.822c-.473-10.964-5.89-13.083-11.78-15.11s-13.069-5.9-14.145-6.91-1.075-2.672-1.118-5.39c-.041-2.63,1-5.433,1.849-8.617,2.279-.058,3.623-7.392,2.493-8.06a1.091,1.091,0,0,0-.942-.176c.358-3.731.208-7.931-1.465-11.2a10.661,10.661,0,0,0-9.372-5.989h-.543a10.661,10.661,0,0,0-9.372,5.989c-1.674,3.271-1.823,7.471-1.465,11.2a1.093,1.093,0,0,0-.942.176c-1.13.668.213,8,2.493,8.06.847,3.184,1.891,5.987,1.849,8.617-.043,2.718-.043,4.376-1.118,5.39s-8.255,4.883-14.145,6.91-11.307,4.146-11.78,15.11c0,0-.086,6.68,0,8.822s-2.622,11.195-2.171,19.9c0,0-3.16,4.215-4.127,14.857-.914,10.058-2.539,23.283-3.876,26.571a5.751,5.751,0,0,0-1.347,1.035,41.157,41.157,0,0,0-4.9,7.129c-.645,1.2-2.09,4.815-2.805,5.758-.838,1.105-.723,2.736.774,1.969a10.291,10.291,0,0,0,3.579-3.72,3.963,3.963,0,0,1,1.032-1.382s-.8,7.244-1.022,9.445c-.247,2.442-1.105,5.781.077,6.126,1.3.38,1.634-1.474,1.849-2.9s1.549-8.293,1.973-8.707c.529-.516.3.284.176,1.935-.04.558-.215,3.363-.473,5.16s-1.118,5.8.688,5.574,2.236-11.056,2.537-11.839.559-.461.387,1.474c-.054.612-.989,7.877-.645,9.352s1.677,1.244,2.107-.645.86-9.536,1.161-10.089.387.461.3,1.843c-.063,1.011-.6,6.542.43,6.772s1.451-.449,1.737-4.491c.251-3.54.284-5.506.455-7.762s.387-8.891-.645-10.918a64.9,64.9,0,0,1,3.956-12.715c2.665-5.9,6.621-16.216,6.449-21.283-.143-4.208,3.153-18.835,4.373-23.781.116,1.233.284,2.539.527,3.879,1.2,6.634,3.01,14.65,2.752,19.625s-.774,12.531-1.29,15.479-3.611,14.373-3.525,28.47,1.892,30.727,2.752,34.228a29.025,29.025,0,0,1,.85,9.367c-.258,2.4-.763,7.724-.248,11.318a71.643,71.643,0,0,0-.43,22.205c1.634,12.807,4.557,26.9,4.557,28.378v.586c-.141.688-.3,1.372-.437,2.059a14.289,14.289,0,0,0-.306,2.515c-.021.842.023,1.682.037,2.524a16.5,16.5,0,0,1-.059,1.765,23.192,23.192,0,0,1-1.36,2.476,37.139,37.139,0,0,1-2.175,3.074c-.77,1-1.555,1.991-2.289,3.024-.365.514-.717,1.038-1.047,1.578a5.536,5.536,0,0,0-.856,1.827,1.375,1.375,0,0,0,.6,1.541,1.047,1.047,0,0,0,.344.113,1.783,1.783,0,0,0,.047.585,1.745,1.745,0,0,0,1.586,1.283,1.015,1.015,0,0,0,.708.73,1.691,1.691,0,0,0,1.358-.259,1.293,1.293,0,0,0,.1.327,1.407,1.407,0,0,0,1.354.743,2.3,2.3,0,0,0,1.584-.895c.217-.247.415-.511.611-.774a1.9,1.9,0,0,0,.033,1.073,1.79,1.79,0,0,0,1.484,1.06,2.667,2.667,0,0,0,1.659-.31,3.4,3.4,0,0,0,.585-.4,3.684,3.684,0,0,0,.944-.744,6.747,6.747,0,0,0,1.341-2.293,34.75,34.75,0,0,0,1.288-5.862c.069-.369.14-.741.219-1.113a.133.133,0,0,0,.179-.037,5.831,5.831,0,0,0,1.177-3.377,16.555,16.555,0,0,0-.33-4.2c-.259-1.469-.514-2.933-.677-4.418s-.251-2.976-.317-4.468q-.054-1.231-.1-2.461c0-.06-.006-.12-.008-.18.157-2.278.337-4.5.543-6.394.86-7.923,3.869-21.1,3.1-27.917s.169-24.232.989-29.207,4.772-32.985,3.912-41l.96-.094.96.094c-.86,8.016,3.092,36.025,3.912,41s1.763,22.389.989,29.207,2.236,19.994,3.1,27.917c.206,1.9.387,4.116.543,6.394l-.009.18q-.049,1.231-.1,2.461c-.066,1.492-.155,2.984-.317,4.468s-.418,2.95-.677,4.418a16.554,16.554,0,0,0-.33,4.2,5.828,5.828,0,0,0,1.177,3.377.133.133,0,0,0,.179.037c.079.371.15.744.219,1.113a34.749,34.749,0,0,0,1.288,5.862,6.749,6.749,0,0,0,1.341,2.293,3.694,3.694,0,0,0,.944.744,3.4,3.4,0,0,0,.585.4,2.663,2.663,0,0,0,1.659.31,1.791,1.791,0,0,0,1.484-1.06,1.9,1.9,0,0,0,.033-1.073c.2.264.394.527.611.774a2.3,2.3,0,0,0,1.584.895,1.4,1.4,0,0,0,1.354-.743,1.293,1.293,0,0,0,.1-.327,1.691,1.691,0,0,0,1.358.259,1.016,1.016,0,0,0,.708-.73,1.744,1.744,0,0,0,1.586-1.283,1.783,1.783,0,0,0,.047-.585,1.054,1.054,0,0,0,.344-.113,1.375,1.375,0,0,0,.6-1.541,5.531,5.531,0,0,0-.856-1.827c-.33-.54-.682-1.064-1.047-1.578-.734-1.033-1.519-2.022-2.289-3.024a37.241,37.241,0,0,1-2.175-3.074,23.253,23.253,0,0,1-1.36-2.476,16.659,16.659,0,0,1-.059-1.765c.014-.842.058-1.682.037-2.524a14.288,14.288,0,0,0-.306-2.515c-.141-.688-.3-1.371-.437-2.059v-.586c0-1.474,2.923-15.571,4.557-28.378a71.645,71.645,0,0,0-.43-22.205c.516-3.593.01-8.922-.248-11.318a29.024,29.024,0,0,1,.85-9.367c.86-3.5,2.665-20.132,2.752-34.228s-3.01-25.522-3.525-28.47-1.032-10.5-1.29-15.479,1.548-12.991,2.752-19.625c.243-1.34.412-2.646.527-3.879,1.22,4.946,4.516,19.573,4.373,23.781-.172,5.067,3.783,15.387,6.448,21.283a64.942,64.942,0,0,1,3.956,12.715c-1.032,2.027-.817,8.661-.645,10.918s.2,4.223.455,7.762c.286,4.042.705,4.722,1.737,4.491s.493-5.761.43-6.772c-.086-1.382,0-2.4.3-1.843s.731,8.2,1.161,10.089,1.763,2.119,2.107.645-.59-8.74-.645-9.352c-.172-1.935.086-2.258.387-1.474s.731,11.609,2.537,11.839.946-3.777.688-5.574-.433-4.6-.473-5.16c-.119-1.651-.352-2.451.176-1.935.424.414,1.758,7.279,1.973,8.707s.55,3.282,1.849,2.9c1.182-.346.324-3.684.077-6.126-.223-2.2-1.023-9.445-1.023-9.445a3.976,3.976,0,0,1,1.032,1.382,10.3,10.3,0,0,0,3.579,3.72C115.417,158.535,115.532,156.9,114.694,155.8Z"
                              transform="translate(-6.215 -10.268)"
                              fill="#e3e3e3"
                            />

                            <g style={clipPathStyle}>
                              <path
                                d="M114.694,155.8c-.716-.944-2.16-4.561-2.805-5.758a41.18,41.18,0,0,0-4.9-7.129,5.774,5.774,0,0,0-1.347-1.035c-1.337-3.288-2.962-16.512-3.876-26.571-.967-10.642-4.127-14.857-4.127-14.857.451-8.707-2.257-17.759-2.171-19.9s0-8.822,0-8.822c-.473-10.964-5.89-13.083-11.78-15.11s-13.069-5.9-14.145-6.91-1.075-2.672-1.118-5.39c-.041-2.63,1-5.433,1.849-8.617,2.279-.058,3.623-7.392,2.493-8.06a1.091,1.091,0,0,0-.942-.176c.358-3.731.208-7.931-1.465-11.2a10.661,10.661,0,0,0-9.372-5.989h-.543a10.661,10.661,0,0,0-9.372,5.989c-1.674,3.271-1.823,7.471-1.465,11.2a1.093,1.093,0,0,0-.942.176c-1.13.668.213,8,2.493,8.06.847,3.184,1.891,5.987,1.849,8.617-.043,2.718-.043,4.376-1.118,5.39s-8.255,4.883-14.145,6.91-11.307,4.146-11.78,15.11c0,0-.086,6.68,0,8.822s-2.622,11.195-2.171,19.9c0,0-3.16,4.215-4.127,14.857-.914,10.058-2.539,23.283-3.876,26.571a5.751,5.751,0,0,0-1.347,1.035,41.157,41.157,0,0,0-4.9,7.129c-.645,1.2-2.09,4.815-2.805,5.758-.838,1.105-.723,2.736.774,1.969a10.291,10.291,0,0,0,3.579-3.72,3.963,3.963,0,0,1,1.032-1.382s-.8,7.244-1.022,9.445c-.247,2.442-1.105,5.781.077,6.126,1.3.38,1.634-1.474,1.849-2.9s1.549-8.293,1.973-8.707c.529-.516.3.284.176,1.935-.04.558-.215,3.363-.473,5.16s-1.118,5.8.688,5.574,2.236-11.056,2.537-11.839.559-.461.387,1.474c-.054.612-.989,7.877-.645,9.352s1.677,1.244,2.107-.645.86-9.536,1.161-10.089.387.461.3,1.843c-.063,1.011-.6,6.542.43,6.772s1.451-.449,1.737-4.491c.251-3.54.284-5.506.455-7.762s.387-8.891-.645-10.918a64.9,64.9,0,0,1,3.956-12.715c2.665-5.9,6.621-16.216,6.449-21.283-.143-4.208,3.153-18.835,4.373-23.781.116,1.233.284,2.539.527,3.879,1.2,6.634,3.01,14.65,2.752,19.625s-.774,12.531-1.29,15.479-3.611,14.373-3.525,28.47,1.892,30.727,2.752,34.228a29.025,29.025,0,0,1,.85,9.367c-.258,2.4-.763,7.724-.248,11.318a71.643,71.643,0,0,0-.43,22.205c1.634,12.807,4.557,26.9,4.557,28.378v.586c-.141.688-.3,1.372-.437,2.059a14.289,14.289,0,0,0-.306,2.515c-.021.842.023,1.682.037,2.524a16.5,16.5,0,0,1-.059,1.765,23.192,23.192,0,0,1-1.36,2.476,37.139,37.139,0,0,1-2.175,3.074c-.77,1-1.555,1.991-2.289,3.024-.365.514-.717,1.038-1.047,1.578a5.536,5.536,0,0,0-.856,1.827,1.375,1.375,0,0,0,.6,1.541,1.047,1.047,0,0,0,.344.113,1.783,1.783,0,0,0,.047.585,1.745,1.745,0,0,0,1.586,1.283,1.015,1.015,0,0,0,.708.73,1.691,1.691,0,0,0,1.358-.259,1.293,1.293,0,0,0,.1.327,1.407,1.407,0,0,0,1.354.743,2.3,2.3,0,0,0,1.584-.895c.217-.247.415-.511.611-.774a1.9,1.9,0,0,0,.033,1.073,1.79,1.79,0,0,0,1.484,1.06,2.667,2.667,0,0,0,1.659-.31,3.4,3.4,0,0,0,.585-.4,3.684,3.684,0,0,0,.944-.744,6.747,6.747,0,0,0,1.341-2.293,34.75,34.75,0,0,0,1.288-5.862c.069-.369.14-.741.219-1.113a.133.133,0,0,0,.179-.037,5.831,5.831,0,0,0,1.177-3.377,16.555,16.555,0,0,0-.33-4.2c-.259-1.469-.514-2.933-.677-4.418s-.251-2.976-.317-4.468q-.054-1.231-.1-2.461c0-.06-.006-.12-.008-.18.157-2.278.337-4.5.543-6.394.86-7.923,3.869-21.1,3.1-27.917s.169-24.232.989-29.207,4.772-32.985,3.912-41l.96-.094.96.094c-.86,8.016,3.092,36.025,3.912,41s1.763,22.389.989,29.207,2.236,19.994,3.1,27.917c.206,1.9.387,4.116.543,6.394l-.009.18q-.049,1.231-.1,2.461c-.066,1.492-.155,2.984-.317,4.468s-.418,2.95-.677,4.418a16.554,16.554,0,0,0-.33,4.2,5.828,5.828,0,0,0,1.177,3.377.133.133,0,0,0,.179.037c.079.371.15.744.219,1.113a34.749,34.749,0,0,0,1.288,5.862,6.749,6.749,0,0,0,1.341,2.293,3.694,3.694,0,0,0,.944.744,3.4,3.4,0,0,0,.585.4,2.663,2.663,0,0,0,1.659.31,1.791,1.791,0,0,0,1.484-1.06,1.9,1.9,0,0,0,.033-1.073c.2.264.394.527.611.774a2.3,2.3,0,0,0,1.584.895,1.4,1.4,0,0,0,1.354-.743,1.293,1.293,0,0,0,.1-.327,1.691,1.691,0,0,0,1.358.259,1.016,1.016,0,0,0,.708-.73,1.744,1.744,0,0,0,1.586-1.283,1.783,1.783,0,0,0,.047-.585,1.054,1.054,0,0,0,.344-.113,1.375,1.375,0,0,0,.6-1.541,5.531,5.531,0,0,0-.856-1.827c-.33-.54-.682-1.064-1.047-1.578-.734-1.033-1.519-2.022-2.289-3.024a37.241,37.241,0,0,1-2.175-3.074,23.253,23.253,0,0,1-1.36-2.476,16.659,16.659,0,0,1-.059-1.765c.014-.842.058-1.682.037-2.524a14.288,14.288,0,0,0-.306-2.515c-.141-.688-.3-1.371-.437-2.059v-.586c0-1.474,2.923-15.571,4.557-28.378a71.645,71.645,0,0,0-.43-22.205c.516-3.593.01-8.922-.248-11.318a29.024,29.024,0,0,1,.85-9.367c.86-3.5,2.665-20.132,2.752-34.228s-3.01-25.522-3.525-28.47-1.032-10.5-1.29-15.479,1.548-12.991,2.752-19.625c.243-1.34.412-2.646.527-3.879,1.22,4.946,4.516,19.573,4.373,23.781-.172,5.067,3.783,15.387,6.448,21.283a64.942,64.942,0,0,1,3.956,12.715c-1.032,2.027-.817,8.661-.645,10.918s.2,4.223.455,7.762c.286,4.042.705,4.722,1.737,4.491s.493-5.761.43-6.772c-.086-1.382,0-2.4.3-1.843s.731,8.2,1.161,10.089,1.763,2.119,2.107.645-.59-8.74-.645-9.352c-.172-1.935.086-2.258.387-1.474s.731,11.609,2.537,11.839.946-3.777.688-5.574-.433-4.6-.473-5.16c-.119-1.651-.352-2.451.176-1.935.424.414,1.758,7.279,1.973,8.707s.55,3.282,1.849,2.9c1.182-.346.324-3.684.077-6.126-.223-2.2-1.023-9.445-1.023-9.445a3.976,3.976,0,0,1,1.032,1.382,10.3,10.3,0,0,0,3.579,3.72C115.417,158.535,115.532,156.9,114.694,155.8Z"
                                transform="translate(-6.215 -10.268)"
                                fill="#5288c7"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="health__percent text-center">
                        <p className="body__percent mb-0">{percentageShow}</p>
                        <p className="body__percent_text mb-0">Health Percentage</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <p className="note__text mb-2">
          The answers to these questions are for general guidance only. Please
          consult a doctor before donating blood.
        </p>
      </div>
    </section>
  );
}
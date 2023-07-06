import React, { useState, useEffect } from "react";
import styles from "./contact.css";
import "./nav.css";
import { useNavigate, Link, useHref } from "react-router-dom";
import swal from "sweetalert";
import NAVBAR from "./nav";
import logo from '../assets/earth.webp';
import validate from "../common/validation";

const Typewriter = ({ sentences, delay }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const currentSentence = sentences[currentIndex % sentences.length];
    const currentSentenceLength = currentSentence.length;

    if (displayText.length === currentSentenceLength) {
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        setDisplayText("");
      }, delay);
    } else {
      const timer = setTimeout(() => {
        setDisplayText(
          (prevText) => prevText + currentSentence[displayText.length]
        );
      }, 100); // Adjust the typing speed as per your preference

      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentIndex, displayText, sentences, delay]);

  return <span>{displayText}</span>;
};
const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [error, setError] = useState({});

  const sentences = [
    "Have A Question ❓",
    "Want To contact me ?",
    "Any Suggestions 💡",
    "Report a bug 🪲",
  ];

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setForm((prev)=>{
      return {...prev, [name]: value}
    })
    const errMessage =  validate[name](value);
    setError((prev)=>{
      return {...prev, ...errMessage}
    })

  }

  function handleSubmit(event) {
    event.preventDefault();
    // Do some authentication here...
    console.log("function called");
    let submitable = true;
     Object.values(error).forEach((err)=>{
      if(err !== false){
        submitable = false;
      }
     })
 
     if(submitable){
      try {
        // const response = await fetch("https://cropforesight-backend.onrender.com/subform", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(formData),
        // });

        // if (response.ok) {
        //   // Form submission successful
        //   // Handle success or show a success message
        //   console.log('submitted');
        // } else {
        //   // Form submission failed
        //   // Handle error or show an error message
        //   console.log('failed');
        // }
        //console.log(formData);
        swal(
          "Success",
          `Thanks for contacting us ${form.name}. We have received your details successfully. We will get back to you soon.`,
          "success"
        );
      } catch (error) {
        // Handle error or show an error message
        console.log(error);
        swal("Error", "Something went wrong... Please try again", "error");
      }
    }else{
      swal("Error", "Plesae fill all fields with valid data.")
    }
  }

  return (
    <div>
      {/* nav bar */}
      <NAVBAR />
      <h1 className="contact">Contact US</h1>

      <h3 className="tag">
        <Typewriter sentences={sentences} delay={2000} />
      </h3>

      <form className="form glass" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            id="name"
            name="name"
            placeholder="Name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className={`form-control`}
          />
          {error.name && error.nameError && <p className="errorMsg">{error.nameError}</p>}
        </div>
        <div className="form-group">
          <input
            className={`form-control`}
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
          />
           {error.email && error.emailError && <p className="errorMsg">{error.emailError}</p>}
        </div>
        <div className="form-grojup">
          <textarea
            className={`form-control`}
            id="message"
            name="message"
            placeholder="Message"
            rows="5"
            required
            value={form.message}
            onChange={handleChange}
          ></textarea>
           {error.message && error.messageError && <p className="errorMsg">{error.messageError}</p>}
        </div>
        <button className="btn ac_btn" type="submit">
          Send
        </button>
        <div class="wrapper">
          <div class="icon twitter">
            <div class="tooltip">Twitter</div>
            {/* Add your twitter ID */}
            <span>
              <i
                class="fab fa-twitter"
                onClick={() => openInNewTab("https://www.twitter.com/")}
              ></i>
            </span>
          </div>
          {/* Add your Instagram */}
          <div class="icon instagram">
            <div class="tooltip">Instagram</div>
            <span>
              <i
                class="fab fa-instagram"
                onClick={() => openInNewTab("https://www.instagram.com/")}
              ></i>
            </span>
          </div>
          <div class="icon email">
            <div class="tooltip">Email</div>
            {/* add your email in place of --- */}
            <span>
              <Link to="mailto:---">
                <i class="fa fa-envelope"></i>
              </Link>
            </span>
          </div>
          <div class="icon github">
            <div class="tooltip">Github</div>
            {/* add you github ID */}
            <span>
              <i
                class="fab fa-github"
                onClick={() => openInNewTab("https://www.github.com/")}
              ></i>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;

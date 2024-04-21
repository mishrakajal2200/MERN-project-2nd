import React, { useState } from "react";
import "./BringCards.css";

const BringCards = () => {
  // State to manage the selected card
  const [selectedCard, setSelectedCard] = useState([]);
  const [selectedCardDescription, setSelectedCardDescription] = useState("");

  const handleCardSelect = (title, description) => {
    setSelectedCardDescription(description); // Display description when a card is clicked
    if (selectedCard.includes(title)) {
      setSelectedCard(selectedCard.filter((card) => card !== title)); // Remove card if already selected
    } else {
      setSelectedCard([...selectedCard, title]); // Add card to selectedCards array
    }
  };
  // Function to handle card selection and automatically select radio button
  // const handleCardSelect = (cardTitle) => {
  //   setSelectedCard(cardTitle);
  // };
  const handleFinish = () => {
    // Send selectedCards data to backend
    // Trigger email sending process
    console.log("Selected Cards:", selectedCard);
    // Call backend API to save data and send email
    fetch("http://localhost:60001/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedCards: selectedCard }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from backend:", data);
        // If successful response, trigger email sending
        if (data.success) {
          fetch("http://localhost:60001/send-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: process.env.EMAIL_USERNAME,
              message: "Thank you for registering!",
            }),
          })
            .then((emailResponse) => emailResponse.json())
            .then((emailData) => console.log("Email response:", emailData))
            .catch((error) => console.error("Error sending email:", error));
        }
      })
      .catch((error) => console.error("Error submitting data:", error));
  };

  return (
    <div className="container main-cards">
      <div className="container text-center header-section col-lg-12">
        <h1>What brings you to Dribble?</h1>
        <p>
          Select the options that best describe you. Don't worry, you can
          explore more options later
        </p>
      </div>

      <div className="col-lg-12 col-md-6 col-sm-12">
        {/* <div
          className={`card ${
            selectedCard === "Card title 1" ? "selected" : "",
            selectedCard.includes("Card title 1") ? "selected" : ""
          }`}
          style={{ width: "18rem" }}
          onClick={() => handleCardSelect("Card title 1")}
        >
          <img
            src="https://jaffa.net.au/wp-content/uploads/2016/05/Jaffa-Design-Ideas-web-1500x1000.jpg"
            className="card-img-top"
            alt="image3"
          />
          <div className="card-body">
            <h5>I'm designer to looking to share my work.</h5>
            <input
              type="radio"
              name="radio"
              className="radio"
              // checked={selectedCard === "Card title 1"}
              checked={selectedCard.includes("Card title 1")}
              readOnly
            />
          </div>
        </div> */}

        <div
          className={`card ${
            selectedCard.includes("Card title 1") ? "selected" : ""
          }`}
          style={{ width: "18rem" }}
          onClick={() => handleCardSelect("Card title 1")}
        >
          <img
            src="https://jaffa.net.au/wp-content/uploads/2016/05/Jaffa-Design-Ideas-web-1500x1000.jpg"
            className="card-img-top"
            alt="image3"
          />
          <div className="card-body">
            <h5>I'm designer to looking to share my work.</h5>
            <input
              type="radio"
              name="radio"
              className="radio"
              checked={selectedCard.includes("Card title 1")}
              readOnly
            />
          </div>
        </div>

        <div
          className={`card ${
            selectedCard.includes("Card title 2") ? "selected" : ""
          }`}
          style={{ width: "18rem" }}
          onClick={() => handleCardSelect("Card title 2")}
        >
          <img
            src="https://i.pinimg.com/originals/0b/eb/69/0beb69dfde059a5ed866fb182b07bdfd.jpg"
            className="card-img-top"
            alt="image3"
          />
          <div className="card-body">
            <h5 class="card-title">I'm looking to hire designer</h5>
            <input
              type="radio"
              name="radio"
              className="radio"
              checked={selectedCard.includes("Card title 2")}
              readOnly
            />
          </div>
        </div>

        {/* <div
          className={`card ${
            selectedCard === "Card title 2" ? "selected" : ""
          }`}
          style={{ width: "18rem" }}
          onClick={() => handleCardSelect("Card title 2")}
        >
          <img
            src="https://i.pinimg.com/originals/0b/eb/69/0beb69dfde059a5ed866fb182b07bdfd.jpg"
            className="card-img-top"
            alt="image3"
          />
          <div className="card-body">
            <h5 class="card-title">I'm looking to hire designer</h5>
            <input
              type="radio"
              name="radio"
              className="radio"
              checked={selectedCard === "Card title 2"}
              readOnly
            />
          </div>
        </div> */}

        {/* <div
          className={`card ${
            selectedCard === "Card title 3" ? "selected" : ""
          }`}
          style={{ width: "18rem" }}
          onClick={() => handleCardSelect("Card title 3")}
        >
          <img
            src="https://markustudio.com/wp-content/uploads/2023/01/WEB-DESIGN-INSPIRATION-2023.jpg"
            className="card-img-top"
            alt="image3"
          />
          <div className="card-body">
            <h5 class="card-title">I'm looking for design inspiration</h5>

            <label className="radio-container">
              <input
                type="radio"
                name="radio"
                className="radio"
                checked={selectedCard === "Card title 3"}
                readOnly
              />
            </label>
          </div>
        </div> */}
        <div
          className={`card ${
            selectedCard.includes("Card title 3") ? "selected" : ""
          }`}
          style={{ width: "18rem" }}
          onClick={() => handleCardSelect("Card title 3")}
        >
          <img
            src="https://markustudio.com/wp-content/uploads/2023/01/WEB-DESIGN-INSPIRATION-2023.jpg"
            className="card-img-top"
            alt="image3"
          />
          <div className="card-body">
            <h5 class="card-title">I'm looking for design inspiration</h5>

            <label className="radio-container">
              <input
                type="radio"
                name="radio"
                className="radio"
                checked={selectedCard.includes("Card title 3")}
                readOnly
              />
            </label>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="description-section">
        <p>{selectedCardDescription}</p>
      </div>

      <button className="finish-btn mt-5" onClick={handleFinish}>
        Finish
      </button>
    </div>
  );
};

export default BringCards;

document.getElementById("submitBtn").addEventListener("click", function() {
    // Get values from the form
    const formData = {
        gender: document.getElementById("gender").value,
        age: document.getElementById("age").value,
        hypertension: document.getElementById("hypertension").value,
        heart_disease: document.getElementById("heart_disease").value,
        ever_married: document.getElementById("ever_married").value,
        work_type: document.getElementById("work_type").value,
        Residence_type: document.getElementById("Residence_type").value,
        avg_glucose_level: document.getElementById("avg_glucose_level").value,
        bmi: document.getElementById("bmi").value,
        smoking_status: document.getElementById("smoking_status").value
    };

    // Clear any previous error message
    document.getElementById("error").innerText = "";

    // Check if any of the required fields are empty
    for (const key in formData) {
        if (formData[key] === "" || formData[key] === null) {
            document.getElementById("error").innerText = "Please fill out all the fields before submitting.";
            return; // Stop the function if any field is missing
        }
    }

    // If all fields are filled, proceed with the API call
    console.log(formData);

    // Send data to Flask backend using Fetch API
    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from Flask
        const resultElement = document.getElementById("resultBox");
        if (!resultElement) {
            console.error("Result element not found in the DOM.");
            return;  // Exit if the result element is missing
        }

        if (data.error) {
            resultElement.innerText = `Error: ${data.error}`; // Display plain text error
        } else {
            const prediction = data.prediction === 1 ? "Stroke Detected" : "No Stroke Detected";
            const probabilities = data.probabilities[0];

            // Display only the prediction and its relevant probability
            const probMessage = prediction === "Stroke Detected" ?
                `Stroke: ${probabilities[1].toFixed(4)}` :
                `No Stroke: ${probabilities[0].toFixed(4)}`;

            resultElement.innerText = `${prediction} - ${probMessage}`;
        }
    })
    .catch(error => {
        const resultElement = document.getElementById("resultBox");
        if (!resultElement) {
            console.error("Result element not found in the DOM.");
            return;
        }
        resultElement.innerText = `Failed to fetch: ${error.message}`; // Display plain text error
    });
});

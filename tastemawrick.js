document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 1;
    const totalSteps = 7;


    function showStep(step) 
    {
        document.querySelectorAll(".form-step").forEach((formStep) => {
            formStep.classList.remove("active");
        });
        

        document.getElementById(`step${step}`).classList.add("active");

        if (step === totalSteps) {
            document.querySelector("#step7 button[type='submit']").style.display = "block"; // Show submit
        } else {
            document.querySelector("#step7 button[type='submit']").style.display = "none"; // Hide submit
        }
        
        if (step === 7) 
            {
            suggestMenu();
            }
            
    }
    function validateStep(step) {
        const inputs = document.querySelectorAll(`#step${step} input[required]`);
        let valid = true;

        inputs.forEach(input => {
            if (!input.value) {
                valid = false;
                input.style.borderColor = 'red'; // Highlight empty fields
            } else {
                input.style.borderColor = ''; // Reset border color
            }
        });

        return valid;
    }
    

    window.nextStep = function (stepNumber) {
        if (validateStep(stepNumber)) {
            if (stepNumber < totalSteps) {
                currentStep = stepNumber + 1;
                showStep(currentStep);
            }
        } else {
            alert('Please fill in all required fields.');
        }
    };

    window.prevStep = function (stepNumber) {
        if (stepNumber > 1) {
            currentStep = stepNumber - 1;
            showStep(currentStep);
        }
    };

    showStep(currentStep);
});

window.submitForm = function () {
    const formData = {};
    for (let step = 1; step <= totalSteps; step++) {
        const inputs = document.querySelectorAll(`#step${step} input`);
        inputs.forEach(input => {
            formData[input.placeholder] = input.value; // Use placeholder as key
        });
    }

    // Send data to the server
    fetch('/save_data', {  // Update the URL to match the Flask route
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Form submitted successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error submitting the form.');
    });
};

function suggestMenu() {
    const age = document.getElementById("age").value;
    const mood = document.querySelector('input[name="mood"]:checked')?.value || "neutral";
    const allergies = document.getElementById("allergies").value.toLowerCase();
    
    let menu = "Balanced Diet: Rice, Vegetables, and Protein.";

    if (mood === "happy") {
        menu = "Cheerful Treat: Ice Cream & Pasta!";
    } else if (mood === "sad") {
        menu = "Comfort Food: Warm Soup & Brownie.";
    } else if (mood === "energetic") {
        menu = "High Energy: Protein Shake & Nuts!";
    }

    if (allergies.includes("nuts")) {
        menu += " (Avoid nuts due to allergy)";
    }

    document.getElementById("menu-suggestion").innerText = menu;
}

// Call this function when the user reaches Form 7
document.getElementById("form7").addEventListener("click", suggestMenu);

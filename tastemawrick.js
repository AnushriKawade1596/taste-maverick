document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 1;
    const totalSteps = 6;

    function showStep(step) {
        document.querySelectorAll(".form-step").forEach((formStep) => {
            formStep.classList.remove("active");
        });

        document.getElementById(`step${step}`).classList.add("active");
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
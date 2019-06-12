// Listen for submit
document.querySelector("#loan-form").addEventListener("submit", function (e) {
  // Hide results
  document.getElementById("results").style.display = "none";
  //Show Loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 1500);

  e.preventDefault();
});

// Calculate Results
function calculateResults() {
  // UI Vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const repaymentYears = document.getElementById("repayment-years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(repaymentYears.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);

    // Show results in UI
    document.getElementById("results").style.display = "block";
    // Hide Loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check that you've entered all numbers correctly");
  }

  function showError(errorMessage) {
    // Hide results
    document.getElementById("results").style.display = "none";
    // Hide loader
    document.getElementById("loading").style.display = "none";
    // Create Error Message div
    const errorDiv = document.createElement("div");

    //Get neighbouring UI elements to error message
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    // Add (Bootstrap) classes
    errorDiv.className = "alert alert-danger";

    // Create error message text node and append to div
    errorDiv.appendChild(document.createTextNode(errorMessage));

    // Insert error message above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

}
document.addEventListener("DOMContentLoaded", () => {
  const openFormBtn = document.getElementById("openFormBtn");
  const offerForm = document.getElementById("offerForm");
  const cancelBtn = document.getElementById("cancelBtn");
  const addOfferForm = document.getElementById("addOfferForm");
  const responseMsg = document.getElementById("responseMsg");

  // Show form
  openFormBtn.addEventListener("click", () => {
    offerForm.classList.remove("d-none");
    openFormBtn.classList.add("d-none");
  });

  // Cancel form
  cancelBtn.addEventListener("click", () => {
    offerForm.classList.add("d-none");
    openFormBtn.classList.remove("d-none");
    addOfferForm.reset();
    responseMsg.textContent = "";
  });

  // Submit form
  addOfferForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      restaurant: document.getElementById("restaurant").value,
      description: document.getElementById("description").value,
      expiration_date: document.getElementById("expiration_date").value,
      active: document.getElementById("active").checked
    };

    fetch("http://127.0.0.1:5000/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      responseMsg.style.color = "green";
      responseMsg.textContent = "Offer added successfully!";
      addOfferForm.reset();
    })
    .catch(error => {
      console.error("Error:", error);
      responseMsg.style.color = "red";
      responseMsg.textContent = "Failed to add offer.";
    });
  });
});

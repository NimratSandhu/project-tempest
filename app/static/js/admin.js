document.addEventListener("DOMContentLoaded", () => {
  const openFormBtn = document.getElementById("openFormBtn");
  const offerForm = document.getElementById("offerForm");
  const cancelBtn = document.getElementById("cancelBtn");
  const addOfferForm = document.getElementById("addOfferForm");
  const responseMsg = document.getElementById("responseMsg");

  const openPromoFormBtn = document.getElementById("openPromoFormBtn");
  const promoForm = document.getElementById("promoForm");
  const cancelPromoBtn = document.getElementById("cancelPromoBtn");
  const addPromoForm = document.getElementById("addPromoForm");

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

  openPromoFormBtn.addEventListener("click", () => {
    promoForm.classList.remove("d-none");
    openPromoFormBtn.classList.add("d-none");
  });

  cancelPromoBtn.addEventListener("click", () => {
    promoForm.classList.add("d-none");
    openPromoFormBtn.classList.remove("d-none");
    addPromoForm.reset();
    responseMsg.textContent = "";
  });

  addPromoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      restaurant: document.getElementById("promo_restaurant").value,
      description: document.getElementById("promo_description").value,
      day_of_week: document.getElementById("promo_day_of_week").value,
      active: document.getElementById("promo_active").checked
    };

    fetch("http://127.0.0.1:5000/promos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      responseMsg.style.color = "green";
      responseMsg.textContent = "Promo added successfully!";
      addPromoForm.reset();
    })
    .catch(error => {
      console.error("Error:", error);
      responseMsg.style.color = "red";
      responseMsg.textContent = "Failed to add promo.";
    });
  });
});

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

  const deactivateOfferBtn = document.getElementById("deactivateOfferBtn");
  const deactivateOfferForm = document.getElementById("deactivateOfferForm");
  const cancelDeactivateOfferBtn = document.getElementById("cancelDeactivateOfferBtn");
  const deactivateOfferFormElem = document.getElementById("deactivateOfferFormElem");

  deactivateOfferBtn.addEventListener("click", () => {
    deactivateOfferForm.classList.remove("d-none");
    deactivateOfferBtn.classList.add("d-none");
  });

  cancelDeactivateOfferBtn.addEventListener("click", () => {
    deactivateOfferForm.classList.add("d-none");
    deactivateOfferBtn.classList.remove("d-none");
    deactivateOfferFormElem.reset();
    responseMsg.textContent = "";
  });

  deactivateOfferFormElem.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = document.getElementById("deactivate_offer_id").value;

    fetch("http://127.0.0.1:5000/deactivate_offer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(result => {
      responseMsg.style.color = "green";
      responseMsg.textContent = "Offer deactivated successfully!";
      deactivateOfferFormElem.reset();
    })
    .catch(error => {
      console.error("Error:", error);
      responseMsg.style.color = "red";
      responseMsg.textContent = "Failed to deactivate offer.";
    });
  });

  const deactivatePromoBtn = document.getElementById("deactivatePromoBtn");
  const deactivatePromoForm = document.getElementById("deactivatePromoForm");
  const cancelDeactivatePromoBtn = document.getElementById("cancelDeactivatePromoBtn");
  const deactivatePromoFormElem = document.getElementById("deactivatePromoFormElem");

  deactivatePromoBtn.addEventListener("click", () => {
    deactivatePromoForm.classList.remove("d-none");
    deactivatePromoBtn.classList.add("d-none");
  });

  cancelDeactivatePromoBtn.addEventListener("click", () => {
    deactivatePromoForm.classList.add("d-none");
    deactivatePromoBtn.classList.remove("d-none");
    deactivatePromoFormElem.reset();
    responseMsg.textContent = "";
  });

  deactivatePromoFormElem.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = document.getElementById("deactivate_promo_id").value;

    fetch("http://127.0.0.1:5000/deactivate_promo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(result => {
      responseMsg.style.color = "green";
      responseMsg.textContent = "Promo deactivated successfully!";
      deactivatePromoFormElem.reset();
    })
    .catch(error => {
      console.error("Error:", error);
      responseMsg.style.color = "red";
      responseMsg.textContent = "Failed to deactivate promo.";
    });
  });

  const openUserFormBtn = document.getElementById("openUserFormBtn");
  const userForm = document.getElementById("userForm");
  const cancelUserBtn = document.getElementById("cancelUserBtn");
  const addUserForm = document.getElementById("addUserForm");

  openUserFormBtn.addEventListener("click", () => {
    userForm.classList.remove("d-none");
    openUserFormBtn.classList.add("d-none");
  });

  cancelUserBtn.addEventListener("click", () => {
    userForm.classList.add("d-none");
    openUserFormBtn.classList.remove("d-none");
    addUserForm.reset();
    responseMsg.textContent = "";
  });

  addUserForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      username: document.getElementById("username").value,
      country: document.getElementById("country").value,
      state: document.getElementById("state").value,
      active: document.getElementById("user_active").checked
    };

    fetch("http://127.0.0.1:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      responseMsg.style.color = "green";
      responseMsg.textContent = "User added successfully!";
      addUserForm.reset();
    })
    .catch(error => {
      console.error("Error:", error);
      responseMsg.style.color = "red";
      responseMsg.textContent = "Failed to add user.";
    });
  });

  const deactivateUserBtn = document.getElementById("deactivateUserBtn");
  const deactivateUserForm = document.getElementById("deactivateUserForm");
  const cancelDeactivateUserBtn = document.getElementById("cancelDeactivateUserBtn");
  const deactivateUserFormElem = document.getElementById("deactivateUserFormElem");

  deactivateUserBtn.addEventListener("click", () => {
    deactivateUserForm.classList.remove("d-none");
    deactivateUserBtn.classList.add("d-none");
  });

  cancelDeactivateUserBtn.addEventListener("click", () => {
    deactivateUserForm.classList.add("d-none");
    deactivateUserBtn.classList.remove("d-none");
    deactivateUserFormElem.reset();
    responseMsg.textContent = "";
  });

  deactivateUserFormElem.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = document.getElementById("deactivate_user_id").value;

    fetch("http://127.0.0.1:5000/deactivate_user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(result => {
      responseMsg.style.color = "green";
      responseMsg.textContent = "User deactivated successfully!";
      deactivateUserFormElem.reset();
    })
    .catch(error => {
      console.error("Error:", error);
      responseMsg.style.color = "red";
      responseMsg.textContent = "Failed to deactivate user.";
    });
  });
});

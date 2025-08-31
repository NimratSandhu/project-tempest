document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("offers-container");

  fetch("http://127.0.0.1:5000/offers")
    .then(response => response.json())
    .then(offers => {
      offers.forEach(offer => {
        const card = document.createElement("div");
        card.className = "offer-card";

        card.innerHTML = `
          <h2>${offer.restaurant_name}</h2>
          <p>${offer.description}</p>
          <p class="expiration">Expires: ${offer.expiration_date}</p>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error fetching offers:", error);
      container.innerHTML = `<p style="color:red;">Failed to load offers.</p>`;
    });
});

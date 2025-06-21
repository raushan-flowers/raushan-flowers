document.addEventListener("DOMContentLoaded", () => {
  const langModal = new bootstrap.Modal(document.getElementById("languageModal"));
  langModal.show();

  document.getElementById("order-btn").addEventListener("click", () => {
    const msg = generateMessage();
    if (msg) {
      const phone = "77761039294";
      window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
    }
  });

  document.getElementById("delivery-btn").addEventListener("click", () => {
    showDeliveryPopup();
  });

  autoScrollCarousel("flower-scroll", 0.5);
  autoScrollCarousel("wrap-scroll", 0.5);
});


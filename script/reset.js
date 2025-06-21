function resetBouquet() {
  flowerQuantities = {};
  selectedWrap = null;

  // Reset UI
  flowerData.forEach(f => {
    const qtyEl = document.getElementById(`${f.id}-qty`);
    if (qtyEl) qtyEl.innerText = "0";
  });

  renderWrappings();
  renderBouquetPreview(flowerQuantities, null);
  updateTotalCostDisplay();
  updateBouquetInfo();

  // Hide info
  document.getElementById("bouquet-info").classList.add("d-none");
}

function updateBouquetInfo() {
  const listEl = document.getElementById("bouquet-list");
  const wrapEl = document.getElementById("bouquet-wrap");
  const infoEl = document.getElementById("bouquet-info");

  listEl.innerHTML = "";
  let hasFlowers = false;

  flowerData.forEach(f => {
    const qty = flowerQuantities[f.id] || 0;
    if (qty > 0) {
      hasFlowers = true;
      const cost = qty * Number(f.price);
      const li = document.createElement("li");
      const name = f[`name_${currentLang}`] || f.name?.[currentLang] || f.name_ru || "-";
      li.innerText = `${name} х ${qty} = ${cost} ₸`;
      listEl.appendChild(li);
    }
  });

  const wrap = wrapData.find(w => w.id === selectedWrap);
  wrapEl.innerText = wrap?.[`name_${currentLang}`] || wrap?.name?.[currentLang] || wrap?.name_ru || "";

  infoEl.classList.toggle("d-none", !hasFlowers);
}

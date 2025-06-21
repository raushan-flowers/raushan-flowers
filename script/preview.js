function renderBouquetPreview(selectedFlowers, wrapImageUrl) {
  const container = document.getElementById("bouquet-preview");
  container.innerHTML = "";

  // Create flower holder with will-change for smoother compositing
  const flowersHolder = document.createElement("div");
  flowersHolder.style.position = "relative";
  flowersHolder.style.height = "200px";
  flowersHolder.style.width = "100%";
  flowersHolder.style.willChange = "contents"; // Added for smoothness
  container.appendChild(flowersHolder);

  // Track selection order with generation counters
  if (!window.flowerGenerations) window.flowerGenerations = { nextId: 0, flowers: [] };
  
  // Update our flower generations based on current selection
  const currentFlowers = [];
  Object.entries(selectedFlowers).forEach(([id, qty]) => {
    const flower = flowerData.find(f => f.id === id);
    if (!flower) return;
    
    // Get existing flowers of this type
    const existing = window.flowerGenerations.flowers.filter(f => f.id === id);
    
    // Add new flowers if needed
    while (existing.length < qty) {
      const newFlower = {
        id,
        image: flower.image,
        generation: window.flowerGenerations.nextId++
      };
      window.flowerGenerations.flowers.push(newFlower);
      existing.push(newFlower);
    }
    
    // Remove excess flowers if needed
    while (existing.length > qty) {
      const index = window.flowerGenerations.flowers.findIndex(f => f === existing[0]);
      window.flowerGenerations.flowers.splice(index, 1);
      existing.shift();
    }
    
    currentFlowers.push(...existing);
  });

  // Sort flowers by generation (oldest first)
  currentFlowers.sort((a, b) => a.generation - b.generation);

  // Position each flower with proper z-index
  currentFlowers.forEach((flower, index) => {
    const P = index % 2 === 0 ? -1 : 1;
    const middle = Math.floor(currentFlowers.length / 2);
    const offset = index <= middle ? index : currentFlowers.length - index;
    const rotate = P * Math.min(35, offset * 6);
    const shift = P * Math.min(40, 1 + offset * 1);
    const vertical = Math.min(index * 5, 20);

    const flowerEl = document.createElement("img");
    flowerEl.src = flower.image;
    flowerEl.alt = `Flower ${index}`;
    flowerEl.style.position = "absolute";
    flowerEl.style.bottom = `${65 + vertical}px`;
    flowerEl.style.left = `calc(50% + ${shift}px)`;
    flowerEl.style.transform = `translateX(-50%) rotate(0deg)`; // Start from 0
    flowerEl.style.transformOrigin = "bottom center";
    flowerEl.style.zIndex = 20 + index;
    flowerEl.style.willChange = "transform"; // Added for smoothness
    flowerEl.style.transition = "transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)"; // Smoother curve
    flowersHolder.appendChild(flowerEl);

    // Trigger animation with double RAF for smoother start
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        flowerEl.style.transform = `translateX(-50%) rotate(${rotate}deg)`;
      });
    });
  });

  if (wrapImageUrl) {
    const frontWrap = document.createElement("img");
    frontWrap.src = wrapImageUrl;
    frontWrap.alt = "Wrapping Front";
    frontWrap.style.position = "absolute";
    frontWrap.style.bottom = "0";
    frontWrap.style.left = "50%";
    frontWrap.style.transform = "translateX(-50%)";
    frontWrap.style.width = "200px";
    frontWrap.style.zIndex = 50 + currentFlowers.length;
    frontWrap.style.pointerEvents = "none";
    container.appendChild(frontWrap);
  }
}
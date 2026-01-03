const searchForm = document.getElementById("searchForm");
const searchBox = document.querySelector(".search-box");
const suggestionsBox = document.getElementById("suggestions");
let debounceTimer;

// Prevent empty searches
searchForm.addEventListener('submit', function (e) {
  if (!searchBox.value.trim()) e.preventDefault();
});

// Input listener with debounce
searchBox.addEventListener("input", () => {
  const q = searchBox.value.trim();
  suggestionsBox.style.display = q ? "block" : "none";

  clearTimeout(debounceTimer);
  if (!q) return;

  debounceTimer = setTimeout(() => {
    chrome.runtime.sendMessage(
      { type: "GET_SUGGESTIONS", query: q },
      (suggestions) => {
        if (chrome.runtime.lastError || !Array.isArray(suggestions)) return;
        renderSuggestions(suggestions.slice(0, 6));
      }
    );
  }, 150);
});

// Render suggestions and handle click → auto-search
function renderSuggestions(suggestions) {
  suggestionsBox.innerHTML = "";

  suggestions.forEach(text => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.textContent = text;

    // Click sets input AND submits form
    div.onclick = () => {
      searchBox.value = text;
      suggestionsBox.style.display = "none";
      searchForm.submit(); // 🔥 automatic search
    };

    suggestionsBox.appendChild(div);
  });
}

// Particle background (unchanged)
const particlesContainer = document.querySelector('.particles');
for (let i = 0; i < 50; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  particle.style.left = Math.random() * 100 + 'vw';
  const size = 5 + Math.random() * 10;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  const duration = 5 + Math.random() * 10;
  particle.style.animationDuration = duration + 's';
  const delay = Math.random() * 10;
  particle.style.animationDelay = delay + 's';
  particle.style.transform = `translateY(${100 + Math.random() * 20}vh)`;
  particlesContainer.appendChild(particle);
}

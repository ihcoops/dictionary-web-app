//when a font is selected, the previous font is removed from the document and the new one is added

const fonts = ["sans-serif-font", "serif-font", "mono-font"];

const fontSelector = document.getElementById("font");
fontSelector.addEventListener("change", () => {
  document.body.classList.forEach((fontClass) => {
    if (fonts.includes(fontClass)) {
      document.body.classList.remove(fontClass);
    }
  });
  document.body.classList.add(fontSelector.value);
});

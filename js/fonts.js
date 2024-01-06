const fonts = ["sans-serif-font", "serif-font", "mono-font"];

const fontSelector = document.getElementById("font");
fontSelector.addEventListener("change", () => {
  document.body.classList.forEach((fontClass) => {
    if (fonts.includes(fontClass)) {
      console.log(fontClass);
      document.body.classList.remove(fontClass);
    }
  });
  document.body.classList.add(fontSelector.value);
});

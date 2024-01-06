const themes = ["light-theme", "dark-theme"];

document.addEventListener("DOMContentLoaded", function () {
  var checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      console.log("Checked");
    } else {
      // do that
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      console.log("Not checked");
    }
  });
});

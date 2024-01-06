document.addEventListener("DOMContentLoaded", function () {
  var checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  });
});

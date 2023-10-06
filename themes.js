const themes = ["light-theme", "dark-theme", "desert-theme", "glacier-theme"];

const themeSelector = document.getElementById('theme');
themeSelector.addEventListener('change', () => {
    console.log("hello");
    document.body.classList.forEach((themeClass) => {
        if (themes.includes(themeClass)) {
            console.log(themeClass);
            document.body.classList.remove(themeClass);
        }
    });
    console.log(themeSelector.value);
    document.body.classList.add(themeSelector.value);
});
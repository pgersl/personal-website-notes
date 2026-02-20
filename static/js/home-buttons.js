const disclaimerButton = document.getElementById('disclaimer-button');
const disclaimerContent = document.getElementById('disclaimer');
const infoButton = document.getElementById('info-button');
const infoContent = document.getElementById('info');

disclaimerButton.addEventListener('click', () => {
    disclaimerContent.style.display = 'flex';
    setTimeout(() => {
        disclaimerContent.style.opacity = '1';
    }, 200);
});
infoButton.addEventListener('click', () => {
    infoContent.style.display = 'flex';
    setTimeout(() => {
        infoContent.style.opacity = '1';
    }, 200);
});

const disclaimerOkButton = document.getElementById('disclaimer-ok');
disclaimerOkButton.addEventListener('click', () => {
    disclaimerContent.style.opacity = '0';
    setTimeout(() => {
        disclaimerContent.style.display = 'none';
    }, 200);
});
const infoOkButton = document.getElementById('info-ok');
infoOkButton.addEventListener('click', () => {
    infoContent.style.opacity = '0';
    setTimeout(() => {
        infoContent.style.display = 'none';
    }, 200);
});
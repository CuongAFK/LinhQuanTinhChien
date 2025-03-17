window.onload = function () {
    const screenFlash = document.getElementById('screen-flash');
    setTimeout(() => {
        screenFlash.style.display = 'none'; // Ẩn hoàn toàn sau khi hiệu ứng kết thúc
    }, 1000); // Thời gian chờ tương ứng với thời lượng animation
};


function randomizeOverlayEffect() {
    const overlay = document.getElementById('weather-overlay');
    function changeOverlay() {
        // Tạo ngẫu nhiên mức độ tối từ 0.3 đến 0.7
        const darknessLevel = Math.random() * 0.4 + 0.3;
        overlay.style.background = `rgba(0, 0, 0, ${darknessLevel})`;

        // Tạo thời gian ngẫu nhiên từ 3 đến 10 giây
        const randomDuration = Math.random() * 3000 + 500;
        setTimeout(changeOverlay, randomDuration);
    }
    changeOverlay(); // Bắt đầu hiệu ứng
}

document.addEventListener("DOMContentLoaded", randomizeOverlayEffect);

const { ipcRenderer } = require('electron');

document.addEventListener("DOMContentLoaded", function () {
    const subtitle = document.querySelector('.subtitle');
  
    subtitle.addEventListener('click', function () {
        ipcRenderer.send('load-main-page');
    });
});
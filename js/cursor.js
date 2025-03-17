// Tạo các đường chữ thập
const horizontalLine = document.createElement('div');
horizontalLine.classList.add('crosshair-horizontal');
document.body.appendChild(horizontalLine);

const verticalLine = document.createElement('div');
verticalLine.classList.add('crosshair-vertical');
document.body.appendChild(verticalLine);

// Theo dõi vị trí con trỏ và cập nhật đường chữ thập
document.body.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX; // Tọa độ X của chuột
    const mouseY = e.clientY; // Tọa độ Y của chuột

    // Cập nhật vị trí đường chữ thập
    horizontalLine.style.top = `${mouseY}px`;
    verticalLine.style.left = `${mouseX}px`;
});

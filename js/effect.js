document.addEventListener('click', function (event) {
    const x = event.clientX;
    const y = event.clientY;

    // Tạo hiệu ứng pháo hoa trung tâm
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.left = `${x - 15}px`; // Căn giữa hiệu ứng
    firework.style.top = `${y - 15}px`;
    document.body.appendChild(firework);

    // Tạo container chứa tia lửa
    const sparkContainer = document.createElement('div');
    sparkContainer.style.position = 'absolute';
    sparkContainer.style.left = `${x}px`;
    sparkContainer.style.top = `${y}px`;
    sparkContainer.style.pointerEvents = 'none';

    // Tạo 10 tia lửa
    for (let i = 0; i < 10; i++) {
        const spark = document.createElement('div');
        spark.classList.add('spark');

         // Random màu sắc
         const colors = ['#ff9800', '#ff5722', '#ffc107', '#ff3d00', '#fbc02d'];
         spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
 

        // Random hóa vị trí bắn
        const angle = Math.random() * 2 * Math.PI; // Góc ngẫu nhiên
        const distance = Math.random() * 500 + 5; // Khoảng cách ngẫu nhiên (50-150px)
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;

         // Random góc xoay ngẫu nhiên (giữa 0 và 360 độ)
         const rotation = Math.random() * 360;
        console.log(`Góc xoay của tia lửa ${i + 1}: ${rotation.toFixed(2)}°`); // Hiển thị góc xoay trong console

        // Cập nhật kiểu xoay elip (tăng độ nghiêng để hợp lý)
        spark.style.transform = `rotate(${rotation}deg)`; // Xoay theo góc đã tính

         // Random chiều dài và chiều rộng của tia lửa
        const width = Math.random() * 20 + 1; // Chiều rộng ngẫu nhiên từ 1px đến 20px
        let height = 1; // Mặc định chiều cao là 1px

        // Chọn chiều cao ngẫu nhiên hoặc bằng chiều rộng
        const randomChoice = Math.random();  // Random 0 đến 1
        if (randomChoice < 0.2) {
            height = width;  // Khi giá trị ngẫu nhiên < 0.33 thì chiều cao = chiều rộng
        }

         spark.style.width = `${width}px`;  // Cập nhật chiều rộng
         spark.style.height = `${height}px`; // Cập nhật chiều cao


        spark.style.setProperty('--x', `${dx}px`);
        spark.style.setProperty('--y', `${dy}px`);
        spark.style.setProperty('--rotation', `${rotation}deg`); // Truyền giá trị góc xoay

        sparkContainer.appendChild(spark);
    }

    document.body.appendChild(sparkContainer);

    // Xóa pháo hoa và tia lửa sau khi hoàn tất
    setTimeout(() => {
        firework.remove();
        sparkContainer.remove();
    }, 1000); // Trùng với thời gian hiệu ứng
});

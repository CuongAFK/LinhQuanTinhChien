const { ipcRenderer } = require("electron");

document.addEventListener("DOMContentLoaded", async () => {
  const avatarDisplay = document.getElementById("avatar"); // Avatar hiển thị trong header
  const nameDisplay = document.querySelector(".name"); // Tên hiển thị trong header
  const inputName = document.getElementById("inputName"); // Input tên trong modal
  const avatarOptions = document.querySelectorAll(".avatar-option"); // Các lựa chọn avatar
  const saveProfileBtn = document.getElementById("saveProfile"); // Nút lưu trong modal


  // Lấy dữ liệu từ file khi trang được load
  try {
    const profileData = await ipcRenderer.invoke('get-profile-data'); // Gửi yêu cầu đến main process để lấy dữ liệu profile
    // Cập nhật giao diện với dữ liệu từ file
    avatarDisplay.src = profileData.avatar;
    nameDisplay.textContent = profileData.name;
  } catch (error) {
    console.error("Error loading profile data:", error);
  }

  let selectedAvatar = avatarDisplay.src; // Lưu avatar hiện tại

  // Xử lý chọn avatar
  avatarOptions.forEach((avatar) => {
    avatar.addEventListener("click", () => {
      // Gỡ viền đã chọn trước đó
      avatarOptions.forEach((option) => option.classList.remove("selected"));
      // Đặt viền cho avatar được chọn
      avatar.classList.add("selected");
      // Lưu avatar được chọn
      selectedAvatar = avatar.dataset.avatar;
    });
  });

  // Xử lý lưu thông tin
  saveProfileBtn.addEventListener("click", async () => {
    // Cập nhật tên hiển thị
    const newName = inputName.value.trim();
    if (newName) {
      nameDisplay.textContent = newName;
    }





    // Cập nhật avatar hiển thị
    avatarDisplay.src = selectedAvatar;

    // Gửi dữ liệu về main process
    try {
      const response = await ipcRenderer.invoke("save-profile", {
        name: newName,
        avatar: selectedAvatar,
      });
      console.log(response); // In phản hồi từ main process
      // alert("Thông tin đã được lưu!");
    } catch (error) {
      console.error("Error saving profile:", error);
      console.log("Saving profile:", { name: newName, avatar: selectedAvatar });
      alert("Đã xảy ra lỗi khi lưu thông tin!");
    }


    // Đóng modal
    const editProfileModal = bootstrap.Modal.getInstance(
      document.getElementById("editProfileModal")
    );
    editProfileModal.hide();
  });
});

// Hàm phát âm thanh click
function playClickSound() {
  const clickSound = document.getElementById("click-sound");
  clickSound.currentTime = 0; // Reset âm thanh về đầu
  clickSound.play(); // Phát âm thanh
}


// Lấy các phần tử âm thanh
const bgMusic = document.getElementById("bgMusic");
const clickSound = document.getElementById("click-sound");

// Lấy slider âm lượng
const bgMusicVolumeSlider = document.getElementById("bgMusicVolume");
const clickSoundVolumeSlider = document.getElementById("clickSoundVolume");

// Sự kiện thay đổi âm lượng nhạc nền
bgMusicVolumeSlider.addEventListener("input", (e) => {
  bgMusic.volume = e.target.value; // Cập nhật âm lượng nhạc nền
});

// Sự kiện thay đổi âm lượng âm thanh click
clickSoundVolumeSlider.addEventListener("input", (e) => {
  clickSound.volume = e.target.value; // Cập nhật âm lượng hiệu ứng
});


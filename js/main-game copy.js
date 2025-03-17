document.addEventListener("DOMContentLoaded", () => {
  const avatarDisplay = document.getElementById("avatar"); // Avatar hiển thị trong header
  const nameDisplay = document.querySelector(".name"); // Tên hiển thị trong header
  const inputName = document.getElementById("inputName"); // Input tên trong modal
  const avatarOptions = document.querySelectorAll(".avatar-option"); // Các lựa chọn avatar
  const saveProfileBtn = document.getElementById("saveProfile"); // Nút lưu trong modal

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
  saveProfileBtn.addEventListener("click", () => {
    // Cập nhật tên hiển thị
    const newName = inputName.value.trim();
    if (newName) {
      nameDisplay.textContent = newName;
    }


    // Cập nhật avatar hiển thị
    avatarDisplay.src = selectedAvatar;


    // Đóng modal
    const editProfileModal = bootstrap.Modal.getInstance(
      document.getElementById("editProfileModal")
    );
    editProfileModal.hide();
  });
});

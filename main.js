process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const { app, BrowserWindow, ipcMain } = require('electron');  // Thêm import ipcMain
const path = require('path');
const fs = require('fs');

// Đọc dữ liệu từ file
const loadProfileData = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'data/user.json'), 'utf-8');
    return JSON.parse(data);  // Trả về dữ liệu từ file
  } catch (err) {
    console.error('Error reading file:', err);
    // Trả về giá trị mặc định nếu không có file hoặc có lỗi
    return { name: 'NewPlayer', avatar: '../assets/avatar/avatar.png' };
  }
};

// Đăng ký handler cho sự kiện 'get-profile-data' để trả dữ liệu từ file
ipcMain.handle('get-profile-data', () => {
  return loadProfileData();  // Gọi hàm để lấy dữ liệu
});

// Hàm ghi dữ liệu vào file
const saveProfileData = (name, avatar) => {
  const profileData = { name, avatar };
  const filePath = path.join(__dirname, 'data/user.json');
  try {
    fs.writeFileSync(filePath, JSON.stringify(profileData, null, 2));
    console.log('Profile saved:', profileData);
  } catch (err) {
    console.error('Error writing file:', err);
  }
};

// Đăng ký handler cho sự kiện 'save-profile'
ipcMain.handle("save-profile", (event, profile) => {
  try {
    saveProfileData(profile.name, profile.avatar);
    return "Profile saved successfully!";
  } catch (error) {
    console.error("Error saving profile:", error);
    throw new Error("Could not save profile.");
  }
});












function createWindow() {
  // Tạo cửa sổ trình duyệt
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    fullscreen: true,  // Cửa sổ full màn hình
    frame: false,      // Ẩn thanh menu
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, 'assets/imgs/icon.jpg')  // Đường dẫn tới icon của bạn
  });

  win.loadFile('index.html');  // Tệp HTML chính

  // Tắt thanh cuộn
  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS('body { overflow: hidden; }');
  });

  // Lắng nghe sự kiện để tải trang mới
  ipcMain.on('load-main-page', () => {
    win.loadFile('page/main-game.html');  // Chuyển trang khi có yêu cầu
  });
}

app.whenReady().then(createWindow);



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

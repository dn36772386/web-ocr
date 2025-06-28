const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');

// 開発者モードかどうか
const isDev = process.env.NODE_ENV === 'development';

// メインウィンドウの参照を保持
let mainWindow = null;

// ウィンドウ作成
function createWindow() {
  // メインウィンドウを作成
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true
    },
    icon: path.join(__dirname, 'icon.png'),
    title: 'QRコード転送システム'
  });

  // index.htmlを読み込む
  mainWindow.loadFile('index.html');

  // 開発者モードの場合はDevToolsを開く
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // ウィンドウが閉じられた時の処理
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // メニューバーを設定
  createMenu();
}

// メニューバー作成
function createMenu() {
  const template = [
    {
      label: 'ファイル',
      submenu: [
        {
          label: '新規転送',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.reload();
          }
        },
        { type: 'separator' },
        {
          label: '終了',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: '編集',
      submenu: [
        { label: '元に戻す', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: 'やり直す', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
        { type: 'separator' },
        { label: 'カット', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: 'コピー', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: 'ペースト', accelerator: 'CmdOrCtrl+V', role: 'paste' }
      ]
    },
    {
      label: '表示',
      submenu: [
        { label: 'リロード', accelerator: 'CmdOrCtrl+R', role: 'reload' },
        { label: '強制リロード', accelerator: 'CmdOrCtrl+Shift+R', role: 'forceReload' },
        { type: 'separator' },
        { label: 'フルスクリーン', accelerator: 'F11', role: 'togglefullscreen' }
      ]
    },
    {
      label: 'ヘルプ',
      submenu: [
        {
          label: 'バージョン情報',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'バージョン情報',
              message: 'QRコード転送システム',
              detail: 'バージョン: 1.0.0\n\n最大8個のデータQRコードと1個の制御QRコードを使用した高速ファイル転送システム',
              buttons: ['OK']
            });
          }
        },
        {
          label: '使い方',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: '使い方',
              message: '使い方',
              detail: '【送信側】\n1. ファイルを選択\n2. 送信開始をクリック\n3. QRコードが表示されます\n\n【受信側】\n1. 受信モードに切り替え\n2. カメラで送信側の画面を映す\n3. 自動的に撮影・解析されます',
              buttons: ['OK']
            });
          }
        }
      ]
    }
  ];

  // macOSの場合の調整
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { label: `${app.getName()}について`, role: 'about' },
        { type: 'separator' },
        { label: 'サービス', role: 'services', submenu: [] },
        { type: 'separator' },
        { label: `${app.getName()}を隠す`, accelerator: 'Command+H', role: 'hide' },
        { label: '他を隠す', accelerator: 'Command+Shift+H', role: 'hideothers' },
        { label: 'すべて表示', role: 'unhide' },
        { type: 'separator' },
        { label: '終了', accelerator: 'Command+Q', click: () => app.quit() }
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Electronの初期化が完了したら
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // macOSで全てのウィンドウが閉じられても、アプリは起動したまま
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 全てのウィンドウが閉じられた時
app.on('window-all-closed', () => {
  // macOS以外では、全てのウィンドウが閉じられたらアプリを終了
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// セキュリティ設定
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    // 外部リンクを開くのを防ぐ
    event.preventDefault();
  });
});
# QRコード転送システム - Electronアプリ版

企業のセキュリティポリシーに準拠したローカル実行可能なファイル転送アプリケーション

## 🚀 セットアップ手順

### 1. 必要なソフトウェア
- Node.js (v14以上) - https://nodejs.org/

### 2. インストール

```bash
# プロジェクトフォルダに移動
cd qr-transfer-app

# 依存関係をインストール
npm install

# ライブラリをダウンロード（Windows）
setup.bat

# ライブラリをダウンロード（Mac/Linux）
chmod +x setup.sh
./setup.sh
```

### 3. アプリの起動

```bash
npm start
```

## 📦 配布用実行ファイルの作成

### Windows用 (.exe)
```bash
npm run build-win
```
→ `dist/QR転送システム Setup 1.0.0.exe` が作成されます

### Mac用 (.dmg)
```bash
npm run build-mac
```
→ `dist/QR転送システム-1.0.0.dmg` が作成されます

## 🔒 セキュリティについて

- **完全にローカルで動作** - ファイルデータは外部に送信されません
- **Azure API** - 画像解析時のみ使用（オプション）
- **企業ポリシー準拠** - Intune/Defenderの警告を回避

## 📱 使い方

### 送信側
1. アプリを起動
2. 「送信モード」を選択
3. ファイルを選択
4. 「送信開始」をクリック

### 受信側
1. アプリを起動
2. 「受信モード」を選択
3. 「自動撮影開始」をクリック
4. カメラで送信側の画面を映す
5. 自動的に撮影・解析される

## ⚙️ Azure APIキーの設定

より安全にAzure APIキーを管理する場合：

1. `config.json` ファイルを作成：
```json
{
  "azure": {
    "endpoint": "https://your-endpoint.cognitiveservices.azure.com/",
    "key": "your-api-key"
  }
}
```

2. `.gitignore` に追加：
```
config.json
```

## 🛠️ トラブルシューティング

### カメラが起動しない
- カメラの権限を確認してください
- 他のアプリがカメラを使用していないか確認

### Azure APIエラー
- APIキーが正しいか確認
- インターネット接続を確認

### ファイルが大きすぎる
- チャンクサイズを小さくしてみてください
- 圧縮オプションを有効にしてください

## 📄 ライセンス

MIT License
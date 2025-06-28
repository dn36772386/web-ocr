#!/bin/bash

# ライブラリディレクトリを作成
mkdir -p libs

# QRコード生成ライブラリをダウンロード
echo "📦 qrcode.min.js をダウンロード中..."
curl -o libs/qrcode.min.js https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js

# 圧縮ライブラリをダウンロード
echo "📦 pako.min.js をダウンロード中..."
curl -o libs/pako.min.js https://cdnjs.cloudflare.com/ajax/libs/pako/2.1.0/pako.min.js

# QRコード読み取りライブラリをダウンロード
echo "📦 jsQR.js をダウンロード中..."
curl -o libs/jsQR.js https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js

echo "✅ すべてのライブラリのダウンロードが完了しました！"

# Windows用の場合は setup.bat も使用可能
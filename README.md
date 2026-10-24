# JConte 小說庫

以繁體中文創作與閱讀小說的靜態網站。首頁會導向閱讀器，作品清單與章節資料由 `reader/library.json` 管理，章節正文以 Markdown 儲存在 `novels/`。

## 閱讀器功能

- 依作品類型篩選小說，查看作品簡介與章節內容。
- 作品頁以四個分頁整理「關於」、「人物介紹」、「故事時間軸」和「章節」。
- 故事時間軸依章節排序並連到正文；點進章節後也可展開時間軸，查看目前閱讀位置。
- 尚未整理的人物或時間軸會顯示提示；資料可直接在小說庫 JSON 中補上。
- 章節閱讀與作品頁使用網址片段導覽，可分享作品或章節連結。

## 專案結構

```text
index.html                  網站入口，導向 reader/
reader/index.html           小說庫與閱讀器介面
reader/library.json         作品、章節和作品資料索引
novels/<slug>/chapters/
  drafts/<NN>.md            章節 Markdown 正文
```

## 新增作品

1. 在 `novels/<slug>/chapters/drafts/` 建立章節 Markdown 檔案。
2. 在 `reader/library.json` 的 `novels` 陣列新增作品資料。
3. 在作品的 `chapters` 陣列加入章節編號、標題與正文路徑。`source` 路徑以 `reader/` 為基準，例如：

```json
{
  "number": 1,
  "title": "第一章：序幕",
  "source": "../novels/example/chapters/drafts/01.md"
}
```

作品資料可用 `details` 填寫介紹、人物和章節時間軸：

```json
{
  "details": {
    "about": "作品的延伸介紹。",
    "characters": [
      {
        "name": "角色名稱",
        "role": "角色定位",
        "description": "人物介紹。"
      }
    ],
    "timeline": [
      {
        "chapter": 1,
        "period": "故事時間或階段",
        "event": "本章的重要事件。"
      }
    ]
  }
}
```

`timeline.chapter` 必須對應作品 `chapters` 中的章節編號；`period` 填寫故事內的日期、時段或相對順序，`event` 簡述該章事件。作品頁時間軸會連到各章；章節閱讀頁的時間軸預設收合，展開後可查看全篇順序與目前位置。未提供 `details` 時，作品簡介會作為「關於」內容，人物介紹與時間軸分頁會顯示尚未整理提示，沒有時間軸資料的章節則不顯示章節內時間軸區塊。

## 本機預覽

在專案根目錄啟動靜態 HTTP 伺服器，再開啟 `http://localhost:8000/`：

```powershell
py -m http.server 8000
```

使用 HTTP 伺服器可讓閱讀器正常載入 JSON 和 Markdown 章節檔案。

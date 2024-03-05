## This trick is for those who use large monitor & / want to customize font of "file explorer" in Vscode.

There is extension called "Apc Customize UI++"

Download and install.

add following settings to your "settings.json" in vscode.

```
 "apc.listRow": {
      "lists": ["explorer-folders-view"],
      "fontSize": 14, // sets font size of file explorer
      "height": 21 // sets vertical spacing between lines of file explorer
   },

   // "apc.menubar.compact": true,
   "apc.stylesheet": {
       // <!-- Below line enable to zoom just file explorer pane -->
      ".explorer-folders-view": "zoom: 1.05; transform-origin: 0 0;",
       //  <!-- below line will change font of file explorer, menu and context menu  -->
      font-family: 'Iosevka Aile KD Light', Times, serif;"
   },
   "apc.font.family": "Iosevka Aile KD Light",
```

NOTE :: Sometimes after vscode update extension stops working, just press "Ctr+shft+p" and type "enable APC extension" and select. It will resolve.

link to github repository
https://github.com/drcika/apc-extension

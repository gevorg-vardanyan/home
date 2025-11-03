const {
    aceVimMap,
    mapkey,
    imap,
    imapkey,
    getClickableElements,
    vmapkey,
    map,
    unmap,
    unmapAllExcept,
    vunmap,
    cmap,
    addSearchAlias,
    removeSearchAlias,
    tabOpenLink,
    readText,
    Clipboard,
    Front,
    Hints,
    Visual,
    RUNTIME
} = api;

// an example to create a new mapping `ctrl-y`
api.mapkey('<ctrl-y>', 'Show me the money', function() {
    Front.showPopup('a well-known phrase uttered by characters in the 1996 film Jerry Maguire (Escape to close).');
});

// api.unmapAllExcept(['j'], /youtube.com/);

// settings.repeatThreshold = 2

api.unmap("[[", /youtube.com|vk.com|vkvideo.ru|rutube.ru/);
api.unmap("]]", /youtube.com|vk.com|vkvideo.ru|rutube.ru/);
api.unmap("c", /youtube.com|vk.com/);
api.map("e", "f")
api.map("gm", "gp")
api.unmap("f", /youtube.com|vk.com|vkvideo.ru|rutube.ru/);
// api.unmap("f", /rutube.ru/);
api.unmap("t", /rutube.ru/);
api.unmap("1", /youtube.com/);
api.unmap("m", /youtube.com|vk.com|vkvideo.ru|rutube.ru/);
api.unmap('<Ctrl-h>');
api.unmap('P');
api.unmap('U');
api.unmap('S')
api.unmap('D')

// api.mapkey("e", '#1Open a link, press SHIFT to flip overlapped hints, hold SPACE to hide hints', function() {
//     hints.create("", hints.dispatchMouseClick);
// });

mapkey('gp', '#4Go to the playing tab', function() {
    RUNTIME('getTabs', { queryInfo: {audible: true}}, response => {
        if (response.tabs?.at(0)) {
            const tab = response.tabs[0]
            RUNTIME('focusTab', {
                windowId: tab.windowId,
                tabId: tab.id
            });
        }
    })
}, { repeatIgnore: true });

if (window.location.hostname.includes("kino")) {
    console.log("==============\nhostname:", window.location.hostname)
    api.map("e", "f");
    api.unmap("f", /kinogo.media/);
    // api.unmap("f", '/' + window.location.hostname + '/');
}

if (window.location.hostname === 'www.youtube.com' || window.location.hostname === 'www.youtu.be') {
    settings.digitForRepeat = false;
    api.map("e", "f")
    api.unmap("f")
    api.map("T", "t");
    api.unmap("t");

    api.mapkey('h', 'Toggle YT chapters list(help of chapters)', function() {
        document.querySelector('#__youtube-chapters-in-player__button > button:nth-child(1)').click()
    } );
    api.mapkey('l', 'Toggle YT video like', function() {
        document.querySelector('like-button-view-model:nth-child(1) > toggle-button-view-model:nth-child(1) > button-view-model:nth-child(1) > button:nth-child(1)').click()
    } );
    api.mapkey('D', 'Toggle YT video dislike', function() {
        document.querySelector('dislike-button-view-model:nth-child(2) > toggle-button-view-model:nth-child(1) > button-view-model:nth-child(1) > button:nth-child(1)').click()
    } );
    api.mapkey('<Alt-l>', 'Toggle YT video loop', function() {
        document.querySelector('button.ytp-efyt-button:nth-child(1)').click()
    } );
    api.mapkey('E', 'Expand/shrink YT video view', function() {
        // document.querySelector('button.ytp-button:nth-child(13)').click()
        document.getElementById('efyt-size').click()
    } );
    api.mapkey('P', 'Take Page screenshot of YT video (Print screen)', function() {
        document.getElementById('efyt-screenshot').click()
    } );
    api.mapkey('s', 'Save YT video to playlist', function() {
        // click 'More options' to open the buttons list
        document.querySelector('ytd-menu-renderer.ytd-watch-metadata > yt-button-shape:nth-child(4) > button:nth-child(1)').click();    

        // wait until menu items render, then look for the one with "Save" text
        const interval = setInterval(() => {
            const items = document.querySelectorAll('ytd-menu-service-item-renderer');
            if (!items.length) return;
    
            for (const item of items) {
                const text = item.innerText.trim().toLowerCase();
                if (text.includes("save")) {
                    item.click();
                    clearInterval(interval);
                    return;
                }
            }
        }, 200);
    } );
}

settings.blocklist = {
    "https://mail.zealous.tech": 1
},
// api.mapkey('j', '#4Move down', function() {
//     RUNTIME("down", {backward: true});
// }, {repeatIgnore: false, domain: /youtube.com/i});
api.mapkey('H', '#4Go back in history', function() {
    history.go(-1);
}, {repeatIgnore: true});
api.mapkey('L', '#4Go forward in history', function() {
    history.go(1);
}, {repeatIgnore: true});
api.mapkey('J', '#4Go one tab left', function() {
    RUNTIME("previousTab");
}, {repeatIgnore: true});
api.mapkey('K', '#4Go one tab right', function() {
    RUNTIME("nextTab");
}, {repeatIgnore: true});

api.mapkey('S', 'Open omnibar', function() {
    Front.openOmnibar({type: "TabURLs"});
} );
// api.mapkey("e", '#1Open a link, press SHIFT to flip overlapped hints, hold SPACE to hide hints', function() {
//     hints.create("", hints.dispatchMouseClick);
// }, {repeatIgnore: true});

if (window.location.hostname === 'app.dupdub.com') {
    console.info('----------DUPDUB configs-----------')
    api.mapkey('e', 'Export DupDub current TTS as mp3', function() {
        function waitForElement(selectorOrFn, timeout = 5000) {
          return new Promise((resolve, reject) => {
            const start = Date.now();
            const check = () => {
              const el = typeof selectorOrFn === "function" ? selectorOrFn() : document.querySelector(selectorOrFn);
              if (el) return resolve(el);
              if (Date.now() - start >= timeout) return reject("Timeout waiting for element");
              requestAnimationFrame(check);
            };
            check();
          });
        }

        async function exportMp3Sequence() {
          // Click export dropdown button
          const exportMenuBtn = await waitForElement('.export-span.el-popover__reference');
          exportMenuBtn.click();
            console.info('click on exportbtn')
        
          // Click MP3 option
          const mp3Btn = await waitForElement(() =>
            Array.from(document.querySelectorAll('.option-item-title'))
              .find(el => el.textContent.trim() === 'MP3')
          );
          mp3Btn.click();
            console.info('click on mp3')
        
          // Click Export in second menu
          const exportBtn = await waitForElement(() =>
            Array.from(document.querySelector('.export-container').querySelectorAll('span'))
              .find(el => el.textContent.trim() === 'Export')
          );
          exportBtn.click();
            console.info('click on export btn')
        }
        console.info('----start to export-----')
        exportMp3Sequence().catch(console.error);
    } );
}


// only keep E, R and T from Surfingkeys for gmail.com and twitter.com
// api.unmapAllExcept(['E','R','T'], /gmail.com|twitter.com/);
// api.unmap([']]','[[','T','t'], "/.*mail.google.com.*|.*inbox.google.com.*|trello.com|duolingo.com|youtube.com");


// Tabs
// api.mapkey('J', '#3Go one tab left', 'RUNTIME("previousTab")');
// api.mapkey('K', '#3Go one tab right', 'RUNTIME("nextTab")');

// --- VK mapping
api.mapkey('p', 'Repeat audio', function() {
    if (window.location.hostname === "vk.com") {
        var repeat_icon = document.querySelector('[class*=vkuiIcon--repeat_]');
        if (repeat_icon) {
            repeat_icon.parentElement.click();
        }
    } else {
        
    }
});

api.mapkey('aa', 'Add audiotrack to list', function() {
    if (window.location.hostname === "vk.com") {
        var add_icon = document.querySelector('.vkuiIcon--add_24');
        if (add_icon) {
            add_icon.parentElement.click();
        }
    }
});

// set theme
settings.theme = `
.sk_theme {
    font-family: Input Sans Condensed, Charcoal, sans-serif;
    font-size: 10pt;
    background: #24272e;
    color: #abb2bf;
}
.sk_theme tbody {
    color: #fff;
}
.sk_theme input {
    color: #d0d0d0;
}
.sk_theme .url {
    color: #61afef;
}
.sk_theme .annotation {
    color: #56b6c2;
}
.sk_theme .omnibar_highlight {
    color: #528bff;
}
.sk_theme .omnibar_timestamp {
    color: #e5c07b;
}
.sk_theme .omnibar_visitcount {
    color: #98c379;
}
.sk_theme #sk_omnibarSearchResult ul li:nth-child(odd) {
    background: #303030;
}
.sk_theme #sk_omnibarSearchResult ul li.focused {
    background: #3e4452;
}
#sk_status, #sk_find {
    font-size: 20pt;
}`;
// click `Save` button to make above settings to take effect.</ctrl-i></ctrl-y>

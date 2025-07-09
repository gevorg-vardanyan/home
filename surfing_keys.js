// an example to create a new mapping `ctrl-y`
api.mapkey('<ctrl-y>', 'Show me the money', function() {
    Front.showPopup('a well-known phrase uttered by characters in the 1996 film Jerry Maguire (Escape to close).');
});
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

// api.unmapAllExcept(['j'], /youtube.com/);

// settings.repeatThreshold = 2

api.unmap("[[", /youtube.com|vk.com/);
api.unmap("]]", /youtube.com|vk.com/);
api.unmap("c", /youtube.com|vk.com/);
api.map("e", "f")
api.map("gm", "gp")
api.unmap("f", /youtube.com/);
api.unmap("f", /rutube.ru/);
api.unmap("t", /rutube.ru/);
api.unmap("1", /youtube.com/);
api.unmap("m", /youtube.com/);
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

if (window.location.hostname === 'www.youtube.com' || window.location.hostname === 'www.youtu.be') {
    settings.digitForRepeat = false;
    api.map("e", "f")
    api.unmap("f")
    api.map("T", "t");
    api.unmap("t");

    api.mapkey('h', 'Toggle YT chapters list(help of chapters)', function() {
        document.querySelector('#__youtube-chapters-in-player__button > button:nth-child(1)').click()
    } );
    api.mapkey('l', 'Toggle YT video loop', function() {
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
        document.querySelector('ytd-menu-service-item-renderer.style-scope:nth-child(3) > tp-yt-paper-item:nth-child(1)').click()
    } );
}

settings.blocklist = {
    "https://mail.zealous.tech": 1
},


// api.mapkey('j', '#4Move down', function() {
//     RUNTIME("down", {backward: true});
// }, {repeatIgnore: false, domain: /youtube.com/i});


api.unmap('<Ctrl-h>');
api.unmap('P');
api.unmap('U');
// api.unmap('e');

api.unmap('S')
api.unmap('D')
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

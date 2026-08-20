/* Peer-e-Kamil Clone Standard Theme & Interactive Reader Engine */

(function () {
    const THEME_KEY = 'selectedTheme';
    
    window.setTheme = function (themeId) {
        localStorage.setItem(THEME_KEY, themeId);
        document.documentElement.setAttribute('data-theme', themeId);
    };

    window.toggleChapters = function () {
        const drawer = document.getElementById('chaptersDrawer');
        const overlay = document.getElementById('chaptersDrawerOverlay');
        if (drawer) drawer.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
    };

    window.toggleChapterAccordion = function (accId) {
        const el = document.getElementById(accId);
        if (el) {
            el.style.display = el.style.display === 'block' ? 'none' : 'block';
        }
    };

    window.promptChapterUnlock = function (chNum, partNum, chName, partName, chUrl) {
        const secret = "kaif@431";
        const unlocked = localStorage.getItem("novel_unlocked") === "true";
        if (chNum === 1 || unlocked) {
            window.location.href = chUrl || `chapter${chNum}.html`;
            return;
        }
        const pwd = prompt(`Chapter ${chNum < 10 ? '0' + chNum : chNum} is Locked!
Enter Access Password (kaif@431) to unlock:`);
        if (pwd === secret) {
            localStorage.setItem("novel_unlocked", "true");
            alert("Unlocked successfully!");
            window.location.href = chUrl || `chapter${chNum}.html`;
        } else if (pwd !== null) {
            alert("Incorrect password!");
        }
    };

    let audio = null;
    window.toggleAmbient = function (type, btn) {
        if (!audio) {
            audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
            audio.loop = true;
        }
        if (audio.paused) {
            audio.play().catch(() => {});
            if (btn) btn.innerText = "⏸️ Mute";
        } else {
            audio.pause();
            if (btn) btn.innerText = "🔊 Sound";
        }
    };
})();

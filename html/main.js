document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (toggle && links) {
        toggle.addEventListener('click', function () {
            links.classList.toggle('open');
        });
        links.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () { links.classList.remove('open'); });
        });
    }

    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        reveals.forEach(function (el) { observer.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('in-view'); });
    }

    var tabs = document.querySelectorAll('.gallery-tab');
    if (tabs.length) {
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var group = tab.closest('[data-gallery]');
                var beforeTop = group.getBoundingClientRect().top;
                group.querySelectorAll('.gallery-tab').forEach(function (t) { t.classList.remove('active'); });
                group.querySelectorAll('.gallery-panel').forEach(function (p) { p.classList.remove('active'); });
                tab.classList.add('active');
                group.querySelector('#' + tab.dataset.target).classList.add('active');
                tab.blur();
                // Swapping panels (different content height) can make the browser
                // auto-scroll to keep the focused button "comfortably" placed
                // (notably on mobile Safari). Re-anchor to where the group was
                // on screen once that auto-scroll has had a chance to happen.
                requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                        var afterTop = group.getBoundingClientRect().top;
                        if (afterTop !== beforeTop) {
                            window.scrollBy(0, afterTop - beforeTop);
                        }
                    });
                });
            });
        });
    }

    var learnMoreLinks = document.querySelectorAll('[data-learn-more]');
    learnMoreLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            var heroSwitch = document.querySelector('.app-hero [data-platform-switch]');
            var activeHeroBtn = heroSwitch && heroSwitch.querySelector('.platform-toggle-btn.active');
            if (!activeHeroBtn) return;
            var targetId = (link.getAttribute('href') || '').replace('#', '');
            var target = document.getElementById(targetId);
            if (!target) return;
            var matchingTab = target.querySelector('.gallery-tab[data-platform="' + activeHeroBtn.dataset.platform + '"]');
            if (matchingTab) matchingTab.click();
        });
    });

    var switches = document.querySelectorAll('[data-platform-switch]');
    switches.forEach(function (el) {
        var img = el.querySelector('img');
        var buttons = el.querySelectorAll('.platform-toggle-btn');
        if (!img || !buttons.length) return;
        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                buttons.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                var platform = btn.dataset.platform;
                if (img.dataset[platform]) {
                    img.src = img.dataset[platform];
                }
                if (img.dataset[platform + 'Alt']) {
                    img.alt = img.dataset[platform + 'Alt'];
                }
            });
        });
    });
});

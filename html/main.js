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
                group.querySelectorAll('.gallery-tab').forEach(function (t) { t.classList.remove('active'); });
                group.querySelectorAll('.gallery-panel').forEach(function (p) { p.classList.remove('active'); });
                tab.classList.add('active');
                group.querySelector('#' + tab.dataset.target).classList.add('active');
            });
        });
    }
});

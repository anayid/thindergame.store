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
        name: "Mini Soccer Star (MOD, Unlimited Coins/Gems) 1.96",
        image: "https://play.google.com/pc-store/games/details?id=com.touch2goal.soccer&hl=fr_CH",
        linkAndroid: "https://appcomplete.org/cl/i/6njp5m",
        type: "MOD"
    },
    {
        id: 2,
        name: "Mob Control v3.23.4 MOD APK (Unlimited Money)",
        image: "https://www.latestmodapks.com/wp-content/uploads/2023/04/Mob-Control-MOD-APK.jpg",
        linkAndroid: "https://trckapp.org/cl/i/o4ee1d",
        type: "MOD"
    },
    {
        id: 3,
        name: "NBA 2K26 arcade edition",
        image: "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/f6/d1/5f/f6d15fad-828c-2c49-d74c-865f10c728b9/NBA2K25_MTM_App-Store-Screenshots_2796x1290_7_EN.jpg/313x144bb.webp",
        linkAndroid: "https://applocked.store/cl/i/l77kdg",
        type: "MOD"
    },
    {
        id: 4,
        name: "GTA San Andreas",
        image: "https://gtandreaspro.com/wp-content/uploads/2024/11/GTA-San-Logo.webp",
        linkAndroid: "https://applocked.store/cl/i/pqqok2",
        type: "MOD"
    },
    {
        id: 5,
        name: "Marvels Spider-Man: Miles Morales APK",
        image: "https://m.media-amazon.com/images/M/MV5BZjhiMTJhZjUtOTZkNC00OGVkLThkNjctODQ4MGYzOWU3NGVkXkEyXkFqcGdeQVRoaXJkUGFydHlJbmdlc3Rpb25Xb3JrZmxvdw@@._V1_QL75_UX500_CR0,0,500,281_.jpg",
        linkAndroid: "https://applocked.store/cl/i/7jjnq9",
        type: "mobile"
    },
];

// دالة توليد النجوم
function getStars(rating) {
    const fullStars = Math.round(parseFloat(rating));
    let stars = '';
    for (let i = 0; i < 5; i++) stars += (i < fullStars) ? '★' : '☆';
    return stars;
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
            <div class="game-card scroll-reveal" onclick="openModal(${game.id})" data-title="${game.name.toLowerCase()}" data-type="${game.type.toLowerCase()}" role="button" tabindex="0" aria-label="${game.name}">
                <div class="game-link skeleton-box"> 
                    <img src="${game.image}" alt="${game.name}" class="skeleton-img" loading="lazy" onload="this.classList.add('loaded'); this.parentElement.classList.remove('skeleton-box');"> 
                    <span class="type-badge ${badgeClass}">${game.type}</span>
                    <span class="updated-badge"><i class="fas fa-check-circle"></i> <span class="updated-text">Updated </span>2026</span>
                </div>
                <div class="game-info">
                    <p class="game-name" title="${game.name}">${game.name}</p>
                    <div class="game-meta">
                        <span class="game-rating"><i class="fas fa-star"></i> 4.9</span>
                        <span class="game-action-btn">GET <i class="fas fa-arrow-down"></i></span>
                    </div>
                </div>
            </div>
        `;
        const card = div.firstElementChild;
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(game.id);
            }
        });
        fragment.appendChild(card);
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

    document.getElementById('modal-game-image').src = game.image;
    document.getElementById('modal-game-name').textContent = game.name;
    document.getElementById('modal-game-rating').innerHTML = `<span style="color: #ffcc00;">${getStars(rating)}</span> <span style="font-size: 0.8rem; color:#aaa;">(${rating})</span>`;

    const downloadBtn = document.getElementById('download-android');
    if (downloadBtn) {
        if (game.linkAndroid) {
            downloadBtn.style.display = 'flex';
            downloadBtn.onclick = (e) => {
                e.preventDefault();
                closeModal();
                startFakeDownload(game.linkAndroid);
            };
        } else {
            downloadBtn.style.display = 'none';
        }
    }

    modal.style.display = 'flex';
};

window.closeModal = function () {
    modal.style.display = 'none';
};

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});


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
                card.style.display = '';
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

/**
 * --------------------------------
 * AI Daily Dynamic Reviews Generator (20 to 25 Reviews)
 * --------------------------------
 */
function generateDailyReviews() {
    const today = new Date();
    // Unique seed based on current calendar date (YYYYMMDD) so it generates a fresh batch every day
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    // Deterministic PRNG
    let s = seed % 2147483647;
    if (s <= 0) s += 2147483646;
    const rng = () => (s = (s * 16807) % 2147483647) / 2147483647;

    // Pick random target between 20 and 25 reviews
    const targetCount = Math.floor(rng() * 6) + 20; // 20, 21, 22, 23, 24, 25

    // Extract clean game titles from active games list
    const activeGameNames = games.map(g => {
        if (g.name.includes("Spider-Man") || g.name.includes("Miles Morales")) return "Spider-Man: Miles Morales";
        if (g.name.includes("GTA") || g.name.includes("San Andreas")) return "GTA San Andreas";
        if (g.name.includes("NBA")) return "NBA 2K26";
        if (g.name.includes("Mob Control")) return "Mob Control MOD";
        return g.name.replace(/\bv?\d+(\.\d+)*\b/gi, '').replace(/\b(MOD|APK|edition|arcade|Unlimited Money)\b/gi, '').trim();
    });

    const userNamesPool = [
        "Viper_Gaming", "KronoX99", "Sarah_Playz", "DarkKnight_DZ", "HoloGamer_77",
        "GhostRider_X", "ApexHunter", "PixelQueen", "SamuraiJack_9", "FrostByte",
        "CyberWolf26", "Redemption_Pro", "NexusGamer", "EchoStrike", "VortexMaster",
        "OmegaGamer_88", "ShadowBlade", "TitanGamer_01", "Nova_Pulse", "BlazeStorm",
        "ZeroGravity_X", "QuantumPulse", "AeroGamer", "DriftKing_26", "LegendarySam",
        "MatrixWalker", "NeonSpectre", "Hyperion_99", "SolarisGamer", "ThunderStrike_X"
    ];

    const timeAgoList = [
        "Just now", "4m ago", "12m ago", "25m ago", "38m ago", "50m ago",
        "1h ago", "2h ago", "3h ago", "4h ago", "6h ago", "7h ago",
        "9h ago", "11h ago", "13h ago", "15h ago", "18h ago", "21h ago", "Today"
    ];

    const avatarGradients = [
        "linear-gradient(135deg, #5d5dff, #c988ff)",
        "linear-gradient(135deg, #00ff88, #00b4d8)",
        "linear-gradient(135deg, #ff5ebc, #c988ff)",
        "linear-gradient(135deg, #ffb703, #fb8500)",
        "linear-gradient(135deg, #7209b7, #3a0ca3)",
        "linear-gradient(135deg, #06d6a0, #1b9aaa)",
        "linear-gradient(135deg, #3a86ff, #8338ec)"
    ];

    // Smart templates mentioning active games with enthusiasm
    const gameReviewTemplates = [
        (g) => ({ text: `Downloaded ${g} and it runs at a buttery smooth 60 FPS on my phone! No lag or stutters at all.`, tag: g, icon: "fa-gamepad" }),
        (g) => ({ text: `The unlimited money feature in ${g} works 100%! Saved me weeks of endless grinding, thank you THUNDERGAME!`, tag: g, icon: "fa-coins" }),
        (g) => ({ text: `Finally a verified working APK for ${g} without endless captcha loops or broken links. Installed in 20 seconds.`, tag: g, icon: "fa-check-circle" }),
        (g) => ({ text: `Played ${g} for 3 hours straight today, zero crashes. Phone stays cool and touch controls feel super responsive.`, tag: g, icon: "fa-gamepad" }),
        (g) => ({ text: `The graphics on ${g} look insane on high settings! Didn't expect a mobile port/mod to look this stunning.`, tag: g, icon: "fa-mobile-alt" }),
        (g) => ({ text: `Connected my Bluetooth controller and ${g} recognized it immediately. Pure portable console experience!`, tag: g, icon: "fa-gamepad" }),
        (g) => ({ text: `Everything unlocked in ${g} right from the start. Top tier quality release, highly recommend downloading!`, tag: g, icon: "fa-unlock-alt" }),
        (g) => ({ text: `No license verification errors or server disconnects with ${g}. Works totally fine offline too!`, tag: g, icon: "fa-wifi" }),
        (g) => ({ text: `Tried 3 other websites for ${g} and all files were corrupted. Downloaded here and worked on the very first tap.`, tag: g, icon: "fa-check-double" }),
        (g) => ({ text: `The optimization on ${g} is top notch. Running on mid-range Android device with max textures without dropping frames.`, tag: g, icon: "fa-bolt" })
    ];

    // Security & file protection templates
    const securityTemplates = [
        { text: "Scanned the APK with VirusTotal and Bitdefender before installing: 0 detections! Truly clean, safe, and malware-free.", tag: "Security Verified", icon: "fa-shield-virus" },
        { text: "I was hesitant at first, but the SSL encrypted gateway and SHA-256 package check proved this platform is 100% legit.", tag: "Malware Free", icon: "fa-shield-alt" },
        { text: "Zero adware, zero shady redirects, and no weird permissions requested like contacts or storage. Very respectful of privacy.", tag: "Privacy Protected", icon: "fa-lock" },
        { text: "Tested the installer in an Android sandbox: verified clean token handshake with zero background battery drain.", tag: "Verified Clean", icon: "fa-shield-check" },
        { text: "The safest mod store on the internet right now. You get direct high-speed files without spam traps.", tag: "Safe Download", icon: "fa-user-shield" },
        { text: "Double-checked the digital signature against official builds. Authentic signature and perfectly safe package.", tag: "Verified APK", icon: "fa-certificate" }
    ];

    // Page design, UI, and mobile speed templates
    const uiTemplates = [
        { text: "The new mobile layout with square cards is brilliant! Looks like a futuristic gaming launcher, so easy to navigate.", tag: "Mobile Design", icon: "fa-mobile-screen" },
        { text: "Download speed hit 45 MB/s on my 5G connection! Got the whole game in under 25 seconds.", tag: "Fast Servers", icon: "fa-bolt" },
        { text: "Instant search filter is super snappy. Love the neon dark mode aesthetics, easy on the eyes during late night gaming.", tag: "User Experience", icon: "fa-moon" },
        { text: "Cleanest gaming site on mobile. No giant ads blocking the screen and the square thumbnails look so neat.", tag: "Clean UI", icon: "fa-sparkles" },
        { text: "Bookmarked this site on my phone's home screen. Fast, responsive, and feels just like a native mobile app.", tag: "High Quality", icon: "fa-star" },
        { text: "The secure download verification progress bar with integrity scanner is super slick and reassuring.", tag: "Secure Protocol", icon: "fa-server" }
    ];

    // Community and Discord templates
    const communityTemplates = [
        { text: "Joined the Discord server and the team helped me configure custom touch controls in 2 minutes. Great community!", tag: "Discord Community", icon: "fa-discord" },
        { text: "They update the APKs within 24 hours of official patches. Best mod curation team on the web!", tag: "Fast Updates", icon: "fa-sync-alt" }
    ];

    const rawList = [];

    // 1. Generate 3 to 4 reviews for each active game
    activeGameNames.forEach(gameName => {
        const count = Math.floor(rng() * 2) + 3; // 3 or 4 per game
        for (let i = 0; i < count; i++) {
            const template = gameReviewTemplates[Math.floor(rng() * gameReviewTemplates.length)];
            rawList.push(template(gameName));
        }
    });

    // 2. Add security reviews
    securityTemplates.forEach(sec => {
        if (rng() > 0.1) rawList.push(sec);
    });

    // 3. Add UI reviews
    uiTemplates.forEach(ui => {
        if (rng() > 0.1) rawList.push(ui);
    });

    // 4. Add community reviews
    communityTemplates.forEach(com => {
        rawList.push(com);
    });

    // Deterministic shuffle using seeded PRNG
    for (let i = rawList.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [rawList[i], rawList[j]] = [rawList[j], rawList[i]];
    }

    // Slice to exact target count (between 20 and 25)
    const selectedReviews = rawList.slice(0, Math.min(targetCount, rawList.length));

    // Construct full review objects
    return selectedReviews.map((item, idx) => {
        const username = userNamesPool[idx % userNamesPool.length];
        const initial = username.replace(/[^a-zA-Z]/g, '').charAt(0).toUpperCase() || 'G';
        const rating = rng() > 0.15 ? "5.0" : "4.9";
        const timeAgo = timeAgoList[Math.floor(rng() * timeAgoList.length)];
        const gradient = avatarGradients[idx % avatarGradients.length];
        const likes = Math.floor(rng() * 32) + 6;

        return {
            id: idx + 1,
            user: "@" + username,
            initial: initial,
            rating: rating,
            stars: "★★★★★",
            time: timeAgo,
            text: item.text,
            tag: item.tag,
            icon: item.icon,
            gradient: gradient,
            likes: likes
        };
    });
}

let isReviewsExpanded = false;

function renderReviews() {
    const container = document.getElementById('reviews-container');
    const countBadge = document.getElementById('reviews-count-badge');
    if (!container) return;

    const reviews = generateDailyReviews();
    if (countBadge) {
        countBadge.textContent = `${reviews.length} Verified Reviews`;
    }

    const fragment = document.createDocumentFragment();

    reviews.forEach((rev, index) => {
        const card = document.createElement('div');
        // Show first 6 reviews initially, hide remainder until toggle button is pressed
        const isHiddenInitially = index >= 6;
        card.className = `review-card scroll-reveal ${isHiddenInitially ? 'review-item-hidden' : ''}`;
        card.setAttribute('data-review-id', rev.id);

        card.innerHTML = `
            <div class="review-header">
                <div class="user-info">
                    <span class="avatar" style="background: ${rev.gradient}; color: #ffffff;">${rev.initial}</span>
                    <div class="user-meta">
                        <span class="username">${rev.user}</span>
                        <span class="review-time"><i class="far fa-clock"></i> ${rev.time}</span>
                    </div>
                </div>
                <div class="review-stars">${rev.stars}</div>
            </div>

            <div class="review-tag-wrap">
                <span class="review-tag"><i class="fas ${rev.icon}"></i> ${rev.tag}</span>
                <span class="review-verified"><i class="fas fa-check-circle"></i> Verified Download</span>
            </div>

            <p class="review-text">"${rev.text}"</p>

            <div class="review-footer">
                <button class="helpful-btn" onclick="toggleHelpful(this, ${rev.likes})">
                    <i class="far fa-thumbs-up"></i> Helpful (<span class="like-count">${rev.likes}</span>)
                </button>
            </div>
        `;
        fragment.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(fragment);

    const toggleBtn = document.getElementById('toggle-reviews-btn');
    if (toggleBtn) {
        if (reviews.length <= 6) {
            toggleBtn.style.display = 'none';
        } else {
            toggleBtn.style.display = 'inline-flex';
            const toggleText = document.getElementById('toggle-reviews-text');
            if (toggleText) toggleText.textContent = `Show All ${reviews.length} Reviews`;
        }
    }

    observeElements();
}

window.toggleReviewsVisibility = function () {
    isReviewsExpanded = !isReviewsExpanded;
    const hiddenItems = document.querySelectorAll('.review-item-hidden');
    const toggleText = document.getElementById('toggle-reviews-text');
    const toggleIcon = document.getElementById('toggle-reviews-icon');

    hiddenItems.forEach(el => {
        if (isReviewsExpanded) {
            el.classList.add('review-item-visible');
        } else {
            el.classList.remove('review-item-visible');
        }
    });

    if (toggleText && toggleIcon) {
        if (isReviewsExpanded) {
            toggleText.textContent = "Show Less";
            toggleIcon.className = "fas fa-chevron-up";
        } else {
            const total = document.querySelectorAll('.review-card').length;
            toggleText.textContent = `Show All ${total} Reviews`;
            toggleIcon.className = "fas fa-chevron-down";
            const sec = document.getElementById('reviews');
            if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};

window.toggleHelpful = function (btn, originalLikes) {
    const icon = btn.querySelector('i');
    const countSpan = btn.querySelector('.like-count');
    const isLiked = btn.classList.toggle('liked');

    if (isLiked) {
        icon.className = "fas fa-thumbs-up";
        countSpan.textContent = originalLikes + 1;
    } else {
        icon.className = "far fa-thumbs-up";
        countSpan.textContent = originalLikes;
    }
};

/**
 * --------------------------------
 * Dynamic Adaptive Ad Banners (Syncs banner with ad size changes without breaking ad scripts)
 * --------------------------------
 */
function initAdaptiveAdBanners() {
    const adSections = document.querySelectorAll('.premium-inline-ad');
    if (!adSections.length) return;

    adSections.forEach(section => {
        const adContainer = section.querySelector('[id^="container-"]');
        if (!adContainer) return;

        // Check if the ad container actually has loaded content and adapt banner smoothly
        const updateAdLayout = () => {
            const iframe = adContainer.querySelector('iframe');
            const img = adContainer.querySelector('img');
            const adEl = iframe || img || (adContainer.children.length > 0 ? adContainer.firstElementChild : null);

            if (adEl) {
                const rect = adEl.getBoundingClientRect();
                const detectedW = Math.round(rect.width) || parseInt(adEl.getAttribute('width')) || adEl.offsetWidth || 0;

                if (detectedW > 40) {
                    section.classList.remove('ad-hidden');
                    const maxAvailable = window.innerWidth - (window.innerWidth < 600 ? 24 : 40);
                    section.style.maxWidth = `${Math.min(detectedW + 36, maxAvailable)}px`;
                }
            }
        };

        // 1. Observe when the ad script injects DOM elements
        if (window.MutationObserver) {
            const mo = new MutationObserver(() => {
                updateAdLayout();
                const iframe = adContainer.querySelector('iframe');
                if (iframe) {
                    iframe.addEventListener('load', updateAdLayout, { once: true });
                }
            });
            mo.observe(adContainer, { childList: true, subtree: true });
        }

        // 2. Periodic checks to adapt smoothly after async loading
        [300, 800, 1500, 3000].forEach(delay => setTimeout(updateAdLayout, delay));

        // 3. Fallback: If no ad is loaded after 4.5 seconds (adblocked, empty, or removed), hide the empty frame
        setTimeout(() => {
            const hasVisibleAd = adContainer.querySelector('iframe, img, a') || 
                                 (adContainer.children.length > 0 && adContainer.offsetHeight > 25);
            if (!hasVisibleAd) {
                section.classList.add('ad-hidden');
            }
        }, 4500);
    });

    window.addEventListener('resize', () => {
        adSections.forEach(sec => {
            const container = sec.querySelector('[id^="container-"]');
            if (container) {
                const el = container.querySelector('iframe, img') || container.firstElementChild;
                if (el) {
                    const w = el.offsetWidth || parseInt(el.getAttribute('width')) || 0;
                    if (w > 40) {
                        const maxAvailable = window.innerWidth - (window.innerWidth < 600 ? 24 : 40);
                        sec.style.maxWidth = `${Math.min(w + 36, maxAvailable)}px`;
                    }
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderGames();
    renderReviews();
    initSearch();
    initAdaptiveAdBanners();
});

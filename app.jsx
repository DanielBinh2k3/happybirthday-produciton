import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Heart, Sparkles, Volume2, VolumeX, Lock, Flame, Gift,
    Wand2, Copy, Check, ChevronRight, RefreshCw, Star, Wind,
    X, Send, Camera, BookOpen, Smartphone, Banknote
} from 'lucide-react';

// ============================================================================
// CONFIG — TÙY CHỈNH NỘI DUNG CỦA BẠN Ở ĐÂY
// ============================================================================
const U = (id) => (id.startsWith('/') || id.startsWith('http')) ? id : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

const CONFIG = {
    passcodeDigits: "18102021", // Chấp nhận: 18.10.2021, 18/10/2021, 18-10-2021, 18102021
    passcodeHint: "Gợi ý nhỏ: Ngày đặc biệt tụi mình chính thức quen nhau (đủ ngày tháng năm nhé) 💕",
    boyfriendName: "Anh Người Yêu",
    girlfriendName: "Công Chúa",
    boyfriendContactUrl: "https://m.me/",

    bgmOptions: [
        {
            id: 'hbd_japanese',
            title: '🌸 Happy Birthday (Japanese Version)',
            artist: 'Japanese Birthday Theme',
            src: '/assets/happybirthdayjapanese.mp3'
        }
    ],

    gifs: {
        wave: "/assets/cat_anim.gif",
        hug: "/assets/magic_cat.gif",
        kiss: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXp5d3R5bm95NnJ6c3R4b3B6eHBoZnJ5eG54eG54eG54eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KmxmoHUGPDjfQXqGgv/giphy.gif",
        cake: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXp5d3R5bm95NnJ6c3R4b3B6eHBoZnJ5eG54eG54eG54eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/He4wudo59enf2/giphy.gif",
        magic: "/assets/tenor_cat.gif"
    },

    floatingQuotes: [
        "🎵 Cause all of me loves all of you... 💫",
        "Anh yêu em hơn hôm qua, và ít hơn ngày mai 🌙",
        "🎵 Take my hand, take my whole life too... 💖",
        "Em là điều dịu dàng nhất thế gian này 🌷",
        "🎵 I love you 3000 & to the moon and back 🌙",
        "Có em bên cạnh, ngày bình thường cũng hoá phép màu ✨",
        "Mãi là cô công chúa nhỏ được anh cưng chiều 🌸",
        "Tuổi mới rực rỡ và cười thật tươi nhé 🎂",
        "🎵 You are my sunshine, my only sunshine ☀️",
        "Cảm ơn vũ trụ đã mang em đến bên anh 💌"
    ],

    gateIntroLines: [
        "Khoan đã, chờ một chút! 👋",
        "Trang web nhỏ này chỉ dành riêng cho một người đặc biệt..."
    ],

    hero: {
        title: "Happy Birthday, My Love! 🎂",
        subtitle: "Chúc mừng sinh nhật cô gái tuyệt vời nhất thế gian. Cảm ơn em vì đã bước vào cuộc đời anh và biến mỗi ngày trôi qua đều ngập tràn tiếng cười.",
        buttonText: "Sẵn sàng khám phá bất ngờ chưa?"
    },

    soloTitle: "Cô Gái Xinh Đẹp Nhất Hôm Nay",
    soloSubtitle: "Chạm vào từng tấm ảnh Polaroid để ngắm kỹ hơn nhé ✨",
    soloPhotos: [
        ["/assets/photo_new.jpeg", "Nụ cười tỏa nắng ☀️"],
        ["1517841905240-472988babdf9", "Xinh đẹp mọi góc nhìn ✨"],
        ["1524504388940-b1c1722653e1", "Công chúa của anh 👑"],
        ["1494790108377-be9c29b29330", "Đáng yêu vô đối 🥰"],
        ["1529626455594-4ff0802cfb7e", "Birthday Girl rực rỡ 🎂"],
        ["1488426862026-3ee34a7d66df", "Ánh mắt làm anh say 💕"],
        ["1507003211169-0a1dd7228f2d", "Dịu dàng như mùa thu 🌸"],
        ["1544005313-94ddf0286df2", "Mãi tươi trẻ nhé 💖"],
        ["1531746020798-e6953c6e8e04", "My Favorite Person 🌷"]
    ],

    togetherTitle: "Hành Trình Tụi Mình Bên Nhau",
    togetherSubtitle: "Từ ngày ấy đến mãi về sau... 💑",
    togetherPhotos: [
        ["1518199266791-5375a83190b7", "Ngày bắt đầu 💑"],
        ["1516589178581-6cd7833ae3b2", "Những chuyến đi ✈️"],
        ["1522673607200-164d1b6ce486", "Nắm chặt tay anh 🤝"],
        ["1511285560929-80b456fea0bc", "Cười quên lối về 😆"],
        ["1474552226712-ac0f0961a954", "Hoàng hôn lãng mạn 🌅"],
        ["1494774157365-9e04c6720e47", "Hẹn hò cuối tuần 🧋"],
        ["1529333166437-7750a6dd5a70", "Bình yên bên em 🏡"],
        ["1501901609772-df0848060b33", "Kỷ niệm ngọt ngào 🍬"],
        ["1513279922550-250c2129b13a", "Mãi bên nhau nhé 💍"]
    ],

    cardCoverDear: "Dear Công Chúa",
    cardCoverSub: "A purr-fect message just for you...",
    letterHeader: "To You!",
    letterGreeting: "Happy Birthday, Công Chúa ❤️",
    letterParagraphs: [
        "Từ khoảnh khắc tụi mình gặp nhau, cuộc sống của anh đã rẽ sang một trang hoàn toàn mới — giống như vũ trụ âm thầm dẫn lối anh đến với người tuyệt vời nhất.",
        "Em mang hơi ấm đến những góc nhỏ trong tim anh, và làm mỗi ngày của anh ngập tràn niềm vui. Chúc em tuổi mới luôn rạng rỡ, hạnh phúc và đạt được mọi ước mơ nhé!",
        "Dù phía trước có bao nhiêu điều mới mẻ, anh sẽ luôn ở ngay đây nắm chặt tay em. Yêu em rất nhiều!"
    ],
    letterSignature: "Your Love, Anh Yêu 💖",
    cardPhotos: [
        ["/assets/photo_new.jpeg", "Công chúa của anh 💕"],
        ["1518199266791-5375a83190b7", "Ngày bắt đầu 💑"],
        ["1516589178581-6cd7833ae3b2", "Những chuyến đi ✈️"],
        ["1513279922550-250c2129b13a", "Mãi bên nhau nhé 💍"]
    ],

    // Giải thưởng tiền mặt (Màn 4) — cốc 0/1/2 tương ứng 36/69/96
    cashPrizes: [
        { amount: "500.000đ", code: "HBD2026-9E4B-8F12", label: "Lộc Phát May Mắn", desc: "Bao lì xì tiền mặt 500.000đ 💸" },
        { amount: "1.000.000đ", code: "LOVE-7C3A-DF91-88E4", label: "Tình Yêu Vĩnh Cửu", desc: "Bao lì xì tiền mặt 1.000.000đ 💸" },
        { amount: "2.000.000đ", code: "KISS-4B9F-83EC-71A0", label: "Đại Lộc Phú Quý", desc: "Bao lì xì tiền mặt 2.000.000đ siêu to 💸" }
    ]
};

const tilt = [-3, 2.2, -2, 3, -1.5, 2.5, -2.5, 1.8, -2.2];
const toPhotos = (arr, base) =>
    arr.map(([id, caption], i) => ({ id: base + i, url: U(id), caption, rotate: tilt[i] }));
const SOLO = toPhotos(CONFIG.soloPhotos, 1);
const TOGETHER = toPhotos(CONFIG.togetherPhotos, 101);

// ============================================================================
// HỆ THỐNG ÂM THANH (Web Audio API Music Box + Sound FX)
// ============================================================================
const N = {
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392, A4: 440, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5
};
const MOOD = { calm: { bpm: 90, lead: 1, vol: 0.9 }, cake: { bpm: 98, lead: 1, vol: 1 }, magic: { bpm: 116, lead: 0.65, vol: 0.85 } };
const TRI = { C: [261.63, 329.63, 392], G: [246.94, 293.66, 392], Am: [261.63, 329.63, 440], Em: [246.94, 329.63, 392], F: [261.63, 349.23, 440] };
const ROOT = { C: 130.81, G: 98, Am: 110, Em: 82.41, F: 87.31 };
const BARS = ['C', 'G', 'G', 'C', 'C', 'C', 'F', 'C', 'C', 'G', 'Am', 'Em', 'F', 'C', 'F', 'G'];
const HBD = [
    [N.G4, .75], [N.G4, .25], [N.A4, 1], [N.G4, 1], [N.C5, 1], [N.B4, 2],
    [N.G4, .75], [N.G4, .25], [N.A4, 1], [N.G4, 1], [N.D5, 1], [N.C5, 2],
    [N.G4, .75], [N.G4, .25], [N.G5, 1], [N.E5, 1], [N.C5, 1], [N.B4, 1], [N.A4, 1],
    [698.46, .75], [698.46, .25], [N.E5, 1], [N.C5, 1], [N.D5, 1], [N.C5, 2]
];
const LOVE = [[N.E5, N.G5], [N.D5, N.B4], [N.C5, N.E5], [N.B4, N.G4], [N.A4, N.C5], [N.G4, N.E5], [N.A4, N.C5], [N.B4, N.D5]];
const BEATS = Array.from({ length: 48 }, () => []);
(() => {
    let c = 0;
    HBD.forEach(([f, d]) => { BEATS[Math.floor(c)].push([c, f, d * 1.1, 'lead']); c += d; });
    LOVE.forEach(([a, b], i) => {
        const s0 = (8 + i) * 3;
        BEATS[s0].push([s0, a, 2, 'lead']);
        BEATS[s0 + 2].push([s0 + 2, b, 1.2, 'lead']);
    });
    BARS.forEach((ch, i) => {
        const s0 = i * 3, t = TRI[ch];
        BEATS[s0].push([s0, ROOT[ch], 2.6, 'bass']);
        [[1, t[1]], [1.5, t[2]], [2, t[1]], [2.5, t[2]]].forEach(([o, f]) =>
            BEATS[Math.floor(s0 + o)].push([s0 + o, f, 0.9, 'chord'])
        );
    });
})();

class Sound {
    ctx = null; master = null; on = false; mood = 'calm'; step = 0; next = 0; timer = null;
    init() {
        if (!this.ctx) {
            const A = window.AudioContext || window.webkitAudioContext;
            this.ctx = new A();
            this.master = this.ctx.createGain();
            this.master.gain.value = 0.85;
            this.master.connect(this.ctx.destination);
        }
        if (this.ctx.state === 'suspended') this.ctx.resume();
    }
    tone(f, t, d, { type = 'sine', vol = 0.1, glide = 0 } = {}) {
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.type = type; o.frequency.setValueAtTime(f, t);
        if (glide) o.frequency.exponentialRampToValueAtTime(f * glide, t + d);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, t + d);
        o.connect(g); g.connect(this.master); o.start(t); o.stop(t + d + 0.05);
    }
    noise(t, d, { vol = 0.08, freq = 1800 } = {}) {
        const len = Math.floor(this.ctx.sampleRate * d),
            buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate),
            data = buf.getChannelData(0);
        for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
        const s = this.ctx.createBufferSource(), f = this.ctx.createBiquadFilter(), g = this.ctx.createGain();
        s.buffer = buf; f.type = 'bandpass'; f.frequency.value = freq; g.gain.value = vol;
        s.connect(f); f.connect(g); g.connect(this.master); s.start(t);
    }
    bell(f, t, d, vol) {
        this.tone(f, t, d, { vol });
        this.tone(f * 3, t, d * 0.3, { vol: vol * 0.22 });
    }
    schedule() {
        const m = MOOD[this.mood], beat = 60 / m.bpm;
        while (this.next < this.ctx.currentTime + 0.3) {
            BEATS[this.step % 48].forEach(([b, f, d, k]) => {
                const t = this.next + (b - Math.floor(b)) * beat;
                if (k === 'lead') this.bell(f, t, d * beat * 1.2, 0.08 * m.vol * m.lead);
                else if (k === 'bass') this.tone(f, t, d * beat, { type: 'triangle', vol: 0.065 * m.vol });
                else this.bell(f, t, d * beat, 0.038 * m.vol);
            });
            this.next += beat;
            this.step++;
        }
    }
    start() {
        this.init(); if (this.on) return; this.on = true;
        this.master.gain.cancelScheduledValues(this.ctx.currentTime);
        this.master.gain.linearRampToValueAtTime(0.85, this.ctx.currentTime + 1);
        this.next = this.ctx.currentTime + 0.1; this.schedule();
        this.timer = setInterval(() => this.schedule(), 100);
    }
    stop() {
        if (!this.on) return; this.on = false; clearInterval(this.timer);
        this.master.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
    }
    setMood(m) { this.mood = m; }
    fx(fn) { try { this.init(); fn(this.ctx.currentTime); } catch (e) { } }
    pop(f = 540) { this.fx((t) => this.tone(f, t, 0.13, { type: 'triangle', vol: 0.12, glide: 1.35 })); }
    whoosh(p = 340) { this.fx((t) => { this.tone(p, t, 0.1, { vol: 0.08, glide: 0.5 }); this.noise(t, 0.1, { vol: 0.03, freq: 2400 }); }); }
    blow() { this.fx((t) => this.noise(t, 0.35, { vol: 0.1, freq: 950 })); }
    chime(list = [N.C5, N.E5, N.G5, N.C6]) { this.fx((t) => list.forEach((f, i) => this.tone(f, t + i * 0.1, 0.85, { vol: 0.09 }))); }
    wrong() { this.fx((t) => { this.tone(210, t, 0.22, { type: 'sawtooth', vol: 0.05 }); this.tone(165, t + 0.14, 0.28, { type: 'sawtooth', vol: 0.05 }); }); }
    paper() { this.fx((t) => this.noise(t, 0.3, { vol: 0.06, freq: 3200 })); }
    drum(sec) { this.fx((t) => { for (let i = 0; i < sec * 14; i++) this.noise(t + i / 14, 0.065, { vol: 0.03 + (i / (sec * 14)) * 0.06, freq: 240 }); }); }
    fanfare() { this.fx((t) => [[N.C5, 0], [N.E5, 0.11], [N.G5, 0.22], [N.C6, 0.36], [N.G5, 0.54], [N.C6, 0.66]].forEach(([f, d]) => this.tone(f, t + d, 0.48, { type: 'triangle', vol: 0.11 }))); }
}
const snd = new Sound();

// ============================================================================
// NHÂN VẬT CUTE GIF + SVG FALLBACK ĐÁNG YÊU
// ============================================================================
function CuteSvgFallback({ kind = 'wave', size = 96 }) {
    if (kind === 'hug') {
        return (
            <div className="relative inline-flex items-center justify-center" style={{ width: size * 1.25, height: size }}>
                <svg viewBox="0 0 140 105" className="w-full h-full overflow-visible drop-shadow-md">
                    <g className="bear-l">
                        <circle cx="32" cy="26" r="10" fill="#fbcfe8" stroke="#f472b6" strokeWidth="2.5" />
                        <circle cx="62" cy="26" r="10" fill="#fbcfe8" stroke="#f472b6" strokeWidth="2.5" />
                        <ellipse cx="47" cy="68" rx="28" ry="28" fill="#fff1f2" stroke="#f472b6" strokeWidth="2.5" />
                        <circle cx="47" cy="44" r="24" fill="#fff1f2" stroke="#f472b6" strokeWidth="2.5" />
                        <circle cx="39" cy="42" r="3" fill="#4a1d35" />
                        <circle cx="55" cy="42" r="3" fill="#4a1d35" />
                        <circle cx="33" cy="49" r="4.5" fill="#fda4af" opacity=".75" />
                        <circle cx="61" cy="49" r="4.5" fill="#fda4af" opacity=".75" />
                        <path d="M43 49 Q47 53 51 49" fill="none" stroke="#4a1d35" strokeWidth="2.2" strokeLinecap="round" />
                    </g>
                    <g className="bear-r">
                        <circle cx="78" cy="26" r="10" fill="#fed7aa" stroke="#fb923c" strokeWidth="2.5" />
                        <circle cx="108" cy="26" r="10" fill="#fed7aa" stroke="#fb923c" strokeWidth="2.5" />
                        <ellipse cx="93" cy="68" rx="28" ry="28" fill="#ffedd5" stroke="#fb923c" strokeWidth="2.5" />
                        <circle cx="93" cy="44" r="24" fill="#ffedd5" stroke="#fb923c" strokeWidth="2.5" />
                        <path d="M84 42 q3 -3.5 6 0 M96 42 q3 -3.5 6 0" stroke="#4a1d35" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <circle cx="80" cy="49" r="4.5" fill="#fda4af" opacity=".75" />
                        <circle cx="106" cy="49" r="4.5" fill="#fda4af" opacity=".75" />
                        <path d="M89 49 Q93 53 97 49" fill="none" stroke="#4a1d35" strokeWidth="2.2" strokeLinecap="round" />
                    </g>
                    <ellipse cx="70" cy="70" rx="32" ry="10" fill="#fff1f2" stroke="#f472b6" strokeWidth="2" />
                </svg>
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl anim-heart-pop">💖</span>
            </div>
        );
    }
    return (
        <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
            <svg viewBox="0 0 110 110" className="w-full h-full overflow-visible drop-shadow-md">
                <path d="M22 42 L26 12 L48 28 Z M88 42 L84 12 L62 28 Z" fill="#fbcfe8" stroke="#f472b6" strokeWidth="3" strokeLinejoin="round" />
                <ellipse cx="55" cy="62" rx="37" ry="33" fill="#ffffff" stroke="#f472b6" strokeWidth="3" />
                <g className="cat-eyes">
                    <ellipse cx="41" cy="59" rx="4.5" ry="6" fill="#3b1929" />
                    <ellipse cx="69" cy="59" rx="4.5" ry="6" fill="#3b1929" />
                    <circle cx="39.5" cy="57" r="1.8" fill="#fff" />
                    <circle cx="67.5" cy="57" r="1.8" fill="#fff" />
                </g>
                <ellipse cx="31" cy="69" rx="6" ry="4" fill="#fda4af" opacity=".8" />
                <ellipse cx="79" cy="69" rx="6" ry="4" fill="#fda4af" opacity=".8" />
                <path d="M49 69 Q55 75 55 69 Q55 75 61 69" fill="none" stroke="#3b1929" strokeWidth="2.6" strokeLinecap="round" />
                <g className="cat-paw">
                    <ellipse cx="92" cy="78" rx="9" ry="11" fill="#ffffff" stroke="#f472b6" strokeWidth="3" />
                    <circle cx="92" cy="77" r="3" fill="#fda4af" />
                </g>
            </svg>
            <span className="absolute -top-1 -right-1 text-xl animate-bounce">
                {kind === 'kiss' ? '😘' : kind === 'cake' ? '🎂' : kind === 'magic' ? '🪄' : '✨'}
            </span>
        </div>
    );
}

function CuteGif({ kind = 'wave', size = 100, className = '' }) {
    const [err, setErr] = useState(false);
    const src = CONFIG.gifs[kind];
    if (!src || err) return <CuteSvgFallback kind={kind} size={size} />;
    return (
        <div
            className={`relative inline-flex items-center justify-center rounded-3xl bg-white/80 p-2 shadow-md border-2 border-pink-200/80 ${className}`}
            style={{ width: size + 16, height: size + 16 }}
        >
            <img
                src={src}
                alt={kind}
                onError={() => setErr(true)}
                className="w-full h-full object-contain rounded-2xl"
            />
            <span className="absolute -top-2 -right-2 text-lg animate-bounce">💖</span>
        </div>
    );
}

// ============================================================================
// HIỆU ỨNG TRỎ CHUỘT TRÁI TIM NỞ RỘ (BLOOMING HEART CURSOR)
// ============================================================================
function InteractiveCursorBg() {
    const [pos, setPos] = useState({ x: -200, y: -200 });
    const [isVisible, setIsVisible] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const [hearts, setHearts] = useState([]);
    const lastSpawn = useRef(0);
    const stopTimer = useRef(null);

    useEffect(() => {
        const handleMove = (x, y) => {
            setPos({ x, y });
            setIsVisible(true);
            setIsMoving(true);

            if (stopTimer.current) clearTimeout(stopTimer.current);
            stopTimer.current = setTimeout(() => setIsMoving(false), 140);

            const now = Date.now();
            if (now - lastSpawn.current > 60) {
                lastSpawn.current = now;
                const heartIcons = ['💖', '💕', '💗', '💓', '✨', '🌸'];
                const newHeart = {
                    id: now + Math.random(),
                    x,
                    y,
                    icon: heartIcons[Math.floor(Math.random() * heartIcons.length)],
                    size: Math.floor(Math.random() * 12) + 18,
                    rot: Math.floor(Math.random() * 50) - 25
                };
                setHearts((prev) => [...prev.slice(-18), newHeart]);
            }
        };

        const onMouse = (e) => handleMove(e.clientX, e.clientY);
        const onTouch = (e) => {
            if (e.touches && e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
        };
        const onLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', onMouse, { passive: true });
        window.addEventListener('touchmove', onTouch, { passive: true });
        window.addEventListener('mouseleave', onLeave);
        return () => {
            window.removeEventListener('mousemove', onMouse);
            window.removeEventListener('touchmove', onTouch);
            window.removeEventListener('mouseleave', onLeave);
            if (stopTimer.current) clearTimeout(stopTimer.current);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
            {/* Trái tim chính nở to dần và đập nhẹ tại vị trí trỏ chuột */}
            {isVisible && (
                <div
                    className="fixed pointer-events-none transition-transform duration-100 ease-out flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                    style={{
                        left: pos.x,
                        top: pos.y,
                        transform: `translate(-50%, -50%) scale(${isMoving ? 1.35 : 1})`,
                    }}
                >
                    {/* Hào quang hình trái tim màu hồng phấn phát sáng nở to */}
                    <div className="absolute w-28 h-28 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-pink-400/25 blur-xl anim-pulse-fast pointer-events-none" />
                    <svg
                        viewBox="0 0 32 32"
                        className="w-10 h-10 drop-shadow-[0_0_12px_rgba(244,63,94,0.7)] anim-heart-grow fill-rose-500/90 stroke-white stroke-[1.5]"
                    >
                        <path d="M16 28 C16 28 3 19 3 10 C3 5 7 2 11.5 2 C14.5 2 15.8 3.5 16 4.5 C16.2 3.5 17.5 2 20.5 2 C25 2 29 5 29 10 C29 19 16 28 16 28 Z" />
                    </svg>
                </div>
            )}

            {/* Vệt các trái tim nở to dần rồi bay nhẹ bồng bềnh */}
            {hearts.map((h) => (
                <span
                    key={h.id}
                    style={{
                        left: h.x,
                        top: h.y,
                        fontSize: `${h.size}px`,
                        '--rot': `${h.rot}deg`
                    }}
                    className="fixed select-none pointer-events-none anim-heart-bloom"
                >
                    {h.icon}
                </span>
            ))}
        </div>
    );
}

// ============================================================================
// PHÁO GIẤY, BÓNG BAY & LỜI BÀI HÁT BAY
// ============================================================================
const COLORS = ['#f43f5e', '#ec4899', '#a855f7', '#fbbf24', '#38bdf8', '#34d399'];

function Confetti({ rain, burst }) {
    if (!rain && !burst) return null;
    const pieces = Array.from({ length: rain ? 38 : 55 }, (_, i) => ({
        left: (i * 2.7 + (i % 7) * 3) % 100,
        c: COLORS[i % COLORS.length],
        delay: (i % 10) * 0.25,
        dur: 2.8 + (i % 5) * 0.65,
        w: i % 2 ? 7 : 10,
        h: i % 2 ? 14 : 9
    }));
    return (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
            {pieces.map((p, i) => (
                <span
                    key={i}
                    className={`absolute -top-6 rounded-sm ${rain ? 'anim-confetti-loop' : 'anim-confetti'}`}
                    style={{
                        left: `${p.left}%`,
                        width: p.w,
                        height: p.h,
                        background: p.c,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.dur}s`
                    }}
                />
            ))}
        </div>
    );
}

function Balloons({ show }) {
    if (!show) return null;
    const list = [
        { left: 6, color: '#fb7185', delay: 0, dur: 11 },
        { left: 18, color: '#f472b6', delay: 2.5, dur: 13 },
        { left: 82, color: '#c084fc', delay: 1.2, dur: 12 },
        { left: 92, color: '#fda4af', delay: 3.8, dur: 10.5 }
    ];
    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {list.map((b, i) => (
                <div
                    key={i}
                    className="absolute -bottom-28 anim-balloon flex flex-col items-center"
                    style={{ left: `${b.left}%`, animationDelay: `${b.delay}s`, animationDuration: `${b.dur}s` }}
                >
                    <div
                        className="w-11 h-14 rounded-full shadow-lg relative flex items-center justify-center"
                        style={{ background: `radial-gradient(circle at 30% 30%, #fff, ${b.color} 60%)` }}
                    >
                        <span className="text-xs">✨</span>
                    </div>
                    <div className="w-0.5 h-12 bg-pink-300/70" />
                </div>
            ))}
        </div>
    );
}

function FloatingQuotes({ show }) {
    const [activeIdx, setActiveIdx] = useState(null);
    if (!show) return null;
    const lanes = [2, 66, 4, 70, 3, 64, 6, 68, 5, 65];
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none">
            {CONFIG.floatingQuotes.map((text, i) => (
                <div
                    key={i}
                    onMouseEnter={() => { setActiveIdx(i); snd.pop(660); }}
                    onMouseLeave={() => setActiveIdx(null)}
                    onClick={() => { setActiveIdx(i); snd.pop(660); }}
                    style={{
                        left: `${lanes[i % lanes.length]}%`,
                        animationDuration: `${20 + (i % 4) * 3.5}s`,
                        animationDelay: `${i * 2.2}s`
                    }}
                    className={`pointer-events-auto cursor-pointer absolute -bottom-16 px-3.5 py-1.5 rounded-full backdrop-blur-sm border transition-all duration-300 anim-float-up ${activeIdx === i
                        ? 'bg-white/95 border-pink-400 text-rose-600 scale-110 shadow-[0_0_20px_rgba(244,63,94,0.45)] z-30'
                        : 'bg-white/60 border-pink-200/80 text-pink-700/85 shadow-sm'
                        }`}
                >
                    <span className="text-xs sm:text-sm font-bold tracking-wide flex items-center gap-1.5">
                        {text} {activeIdx === i && <span>💖</span>}
                    </span>
                </div>
            ))}
        </div>
    );
}

// ============================================================================
// COMPONENT DÙNG CHUNG
// ============================================================================
function Typed({ text, speed = 22, onDone, className = '' }) {
    const [s, setS] = useState('');
    const done = useRef(onDone);
    done.current = onDone;
    useEffect(() => {
        setS('');
        let i = 0;
        const iv = setInterval(() => {
            i++;
            setS(text.slice(0, i));
            if (i >= text.length) {
                clearInterval(iv);
                done.current && done.current();
            }
        }, speed);
        return () => clearInterval(iv);
    }, [text, speed]);
    return (
        <p className={className}>
            {s}
            <span className="inline-block w-1 h-[0.95em] bg-rose-400 ml-1 align-middle rounded-full animate-pulse" />
        </p>
    );
}

function Bridge({ text, subtext, gif = 'wave', onComplete, ms = 2500 }) {
    const cb = useRef(onComplete);
    cb.current = onComplete;
    useEffect(() => {
        snd.chime([N.G5, N.C6]);
        const t = setTimeout(() => cb.current(), ms);
        return () => clearTimeout(t);
    }, [ms]);

    return (
        <div
            onClick={onComplete}
            className="max-w-xl mx-auto px-6 py-12 text-center cursor-pointer select-none anim-fade-in flex flex-col items-center gap-5"
        >
            <CuteGif kind={gif} size={92} />
            <Typed
                text={text}
                speed={20}
                className="text-2xl sm:text-3xl font-extrabold text-rose-700 glow-white leading-snug"
            />
            {subtext && <p className="text-sm sm:text-base text-pink-700 font-semibold">{subtext}</p>}
            <span className="mt-1 px-3 py-1 rounded-full bg-white/70 text-[11px] font-bold text-pink-500 border border-pink-200 shadow-sm">
                Chạm nhẹ để tiếp tục ✨
            </span>
        </div>
    );
}

const Card = ({ children, className = '' }) => (
    <div
        className={`bg-white/90 backdrop-blur-xl rounded-[32px] shadow-[0_20px_60px_rgba(244,114,182,0.25)] border-2 border-white relative z-10 anim-fade-in ${className}`}
    >
        {children}
    </div>
);

const Btn = ({ children, onClick, className = '' }) => (
    <button
        onClick={onClick}
        className={`px-7 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-bold text-sm sm:text-base shadow-[0_10px_25px_rgba(244,63,94,0.35)] hover:shadow-[0_12px_30px_rgba(244,63,94,0.55)] hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center gap-2 cursor-pointer ${className}`}
    >
        {children}
    </button>
);

// ============================================================================
// MÀN 1: CỔNG MẬT MÃ
// ============================================================================
function Gate({ onUnlock }) {
    const [step, setStep] = useState(0);
    const [input, setInput] = useState('');
    const [shake, setShake] = useState(false);
    const [fails, setFails] = useState(0);
    const lines = CONFIG.gateIntroLines;

    const nextLine = useCallback(() => {
        setTimeout(() => setStep((s) => s + 1), 550);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        if (input.replace(/\D/g, '') === CONFIG.passcodeDigits) {
            snd.pop(784);
            onUnlock();
            return;
        }
        snd.wrong();
        setFails((f) => f + 1);
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    if (step < lines.length) {
        return (
            <div
                className="py-16 px-4 text-center cursor-pointer flex flex-col items-center gap-5"
                onClick={() => setStep(lines.length)}
            >
                <CuteGif kind="wave" size={95} />
                <Typed
                    key={step}
                    text={lines[step]}
                    speed={22}
                    onDone={nextLine}
                    className="text-2xl sm:text-3xl font-extrabold text-rose-700 glow-white max-w-lg"
                />
                <span className="text-xs font-semibold text-pink-500/80">Chạm để bỏ qua</span>
            </div>
        );
    }

    return (
        <Card className="max-w-md w-full p-7 sm:p-9 text-center">
            <div className="mb-3 flex justify-center">
                <CuteGif kind="wave" size={88} />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-bold mb-2">
                <Lock className="w-3.5 h-3.5" /> Cổng Bí Mật Tình Yêu
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
                Xác Minh Người Đặc Biệt
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mb-6 font-medium">
                Nhập mật mã kỷ niệm của tụi mình để mở cánh cửa bất ngờ này nhé:
            </p>
            <form onSubmit={submit} className="space-y-4">
                <div className={shake ? 'anim-shake' : ''}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Nhập mật mã kỷ niệm..."
                        autoFocus
                        inputMode="numeric"
                        className="w-full px-5 py-4 text-center text-lg font-bold text-rose-600 bg-pink-50/80 border-2 border-pink-200 rounded-2xl focus:outline-none focus:border-pink-400 focus:bg-white placeholder:text-pink-300 placeholder:font-medium transition-all"
                    />
                </div>
                {fails > 0 && (
                    <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-600 space-y-1 anim-fade-in">
                        <p className="font-extrabold">Ưm... chưa đúng rồi công chúa ơi 🥺</p>
                        <p className="font-medium">{CONFIG.passcodeHint}</p>
                    </div>
                )}
                <Btn className="w-full">
                    Mở Cửa Trái Tim <Heart className="w-4 h-4 fill-white" />
                </Btn>
            </form>
        </Card>
    );
}

// ============================================================================
// MÀN 2: HERO + 2 ALBUM POLAROID
// ============================================================================
function Hero({ onNext }) {
    return (
        <Card className="max-w-xl w-full p-8 sm:p-10 text-center">
            <div className="flex items-center justify-center gap-3 sm:gap-5 mb-5">
                <CuteGif kind="wave" size={82} />
                <CuteGif kind="kiss" size={92} />
                <CuteGif kind="hug" size={82} />
            </div>
            <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-pink-100 text-rose-600 text-xs font-extrabold mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Today is all about you
            </span>
            <h1 className="text-3xl sm:text-5xl font-script text-pink-600 neon-pink mb-4 py-1">
                {CONFIG.hero.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed mb-8 max-w-md mx-auto">
                {CONFIG.hero.subtitle}
            </p>
            <Btn onClick={() => { snd.pop(680); onNext(); }}>
                {CONFIG.hero.buttonText} <ChevronRight className="w-5 h-5" />
            </Btn>
        </Card>
    );
}

function Gallery({ title, subtitle, photos, buttonText, onNext, gifKind = 'kiss' }) {
    const [sel, setSel] = useState(null);
    return (
        <div className="w-full max-w-4xl mx-auto relative z-10 anim-fade-in">
            <div className="text-center mb-6 bg-white/85 backdrop-blur-md rounded-3xl py-5 px-6 max-w-xl mx-auto shadow-lg border-2 border-white">
                <div className="flex justify-center mb-2">
                    <CuteGif kind={gifKind} size={74} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-rose-600 mb-1">{title}</h2>
                <p className="text-xs sm:text-sm text-pink-600 font-semibold">{subtitle}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 px-1">
                {photos.map((p, i) => (
                    <div
                        key={p.id}
                        onClick={() => { snd.pop(580 + i * 20); setSel(p); }}
                        style={{ '--r': `${p.rotate}deg`, animationDelay: `${i * 0.06}s` }}
                        className="polaroid bg-white p-2.5 sm:p-3.5 pb-4 rounded-2xl shadow-lg border border-pink-100 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:z-20"
                    >
                        <div className="aspect-square overflow-hidden rounded-xl bg-pink-50 mb-2.5">
                            <img src={p.url} alt={p.caption} loading="lazy" className="w-full h-full object-cover" />
                        </div>
                        <p className="font-hand text-gray-700 text-base sm:text-xl font-bold text-center leading-tight">
                            {p.caption}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <Btn onClick={() => { snd.pop(740); onNext(); }}>
                    {buttonText} <ChevronRight className="w-5 h-5" />
                </Btn>
            </div>

            {sel && (
                <div
                    onClick={() => setSel(null)}
                    className="fixed inset-0 bg-rose-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4 anim-fade-in"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white p-4 pb-6 rounded-3xl max-w-md w-full shadow-2xl relative anim-open border-2 border-pink-200"
                    >
                        <button
                            onClick={() => setSel(null)}
                            className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="aspect-square overflow-hidden rounded-2xl bg-pink-50 mb-4">
                            <img src={sel.url} alt={sel.caption} className="w-full h-full object-cover" />
                        </div>
                        <p className="font-hand text-2xl sm:text-3xl font-bold text-center text-rose-600">
                            {sel.caption}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

// ============================================================================
// MÀN 3B: THIỆP 3D LẬT SÁCH
// ============================================================================
function Card3DBook({ onNext }) {
    const [vw, setVw] = useState(typeof window === 'undefined' ? 1024 : window.innerWidth);
    const [open, setOpen] = useState(false);
    const [photoIdx, setPhotoIdx] = useState(0);
    const [mobileSinglePage, setMobileSinglePage] = useState(false);
    const [readyNext, setReadyNext] = useState(false);

    useEffect(() => {
        const onResize = () => setVw(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const isMobile = vw < 768;

    const handleOpenCard = () => {
        if (!open) {
            snd.paper();
            snd.chime([N.C5, N.E5, N.G5, N.C6]);
            setOpen(true);
            if (isMobile) {
                setTimeout(() => setMobileSinglePage(true), 1350);
            }
            setTimeout(() => setReadyNext(true), 2400);
        }
    };

    const cyclePhoto = (e) => {
        e.stopPropagation();
        snd.pop(620);
        setPhotoIdx((i) => (i + 1) % CONFIG.cardPhotos.length);
    };

    const currentPhoto = U(CONFIG.cardPhotos[photoIdx][0]);

    // Kích thước thiệp to hơn, hoành tráng hơn
    const bookW = 820;
    const bookH = 550;
    const scale3D = Math.min(1.08, (vw - 20) / bookW);

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center relative z-10 anim-fade-in">
            <div className="mb-3 text-center">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 text-rose-600 text-xs font-extrabold shadow-sm border border-pink-200">
                    {!open ? '💌 Chạm vào tấm thiệp để mở' : '✨ Thiệp sinh nhật dành riêng cho em'}
                </span>
            </div>

            {open && isMobile && (
                <div className="mb-3 flex gap-2">
                    <button
                        onClick={() => setMobileSinglePage(true)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${mobileSinglePage ? 'bg-rose-500 text-white shadow' : 'bg-white/80 text-rose-600'
                            }`}
                    >
                        <Smartphone className="w-3.5 h-3.5" /> Đọc chữ to rõ
                    </button>
                    <button
                        onClick={() => setMobileSinglePage(false)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${!mobileSinglePage ? 'bg-rose-500 text-white shadow' : 'bg-white/80 text-rose-600'
                            }`}
                    >
                        <BookOpen className="w-3.5 h-3.5" /> Xem 2 trang 3D
                    </button>
                </div>
            )}

            {open && isMobile && mobileSinglePage ? (
                <div className="w-full max-w-lg mx-auto rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-[0_0_50px_rgba(255,105,145,0.75)] border-4 border-pink-100 coral-polka anim-open">
                    <span className="absolute top-3 left-3 text-4xl -rotate-12 drop-shadow">🎀</span>
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <img
                            src={currentPhoto}
                            alt="Birthday girl"
                            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                        />
                    </div>
                    <h3 className="font-script text-3xl sm:text-4xl text-center pb-3 border-b-2 border-dashed border-white/75 mx-4 drop-shadow">
                        {CONFIG.letterHeader}
                    </h3>
                    <div className="mt-5 space-y-4 font-hand text-[21px] sm:text-[23px] leading-relaxed text-left">
                        <p className="font-bold text-[24px] sm:text-[26px] text-yellow-100">{CONFIG.letterGreeting}</p>
                        {CONFIG.letterParagraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </div>
                    <p className="font-script text-2xl sm:text-3xl text-right mt-6 text-yellow-100 drop-shadow">
                        {CONFIG.letterSignature}
                    </p>
                </div>
            ) : (
                <div
                    onClick={handleOpenCard}
                    style={{
                        width: open ? bookW * scale3D : (bookW / 2) * Math.min(1, (vw - 32) / (bookW / 2)),
                        height: open ? bookH * scale3D : bookH * Math.min(1, (vw - 32) / (bookW / 2)),
                        transition: 'width 0.9s cubic-bezier(.4,0,.2,1), height 0.9s cubic-bezier(.4,0,.2,1)'
                    }}
                    className={`relative select-none ${!open ? 'cursor-pointer hover:scale-[1.02] transition-transform' : ''}`}
                >
                    <div
                        style={{
                            width: open ? bookW : bookW / 2,
                            height: bookH,
                            transform: `scale(${open ? scale3D : Math.min(1, (vw - 32) / (bookW / 2))})`,
                            transformOrigin: 'top left',
                            perspective: 2000
                        }}
                    >
                        <div
                            style={{
                                position: 'relative',
                                width: bookW,
                                height: bookH,
                                transformStyle: 'preserve-3d',
                                transition: 'transform 1.2s cubic-bezier(.4,0,.2,1)',
                                transform: open ? 'translateX(0px) rotateX(4deg)' : `translateX(-${bookW / 2}px)`
                            }}
                        >
                            {/* TRANG PHẢI */}
                            <div
                                style={{
                                    position: 'absolute',
                                    left: bookW / 2,
                                    top: 0,
                                    width: bookW / 2,
                                    height: bookH
                                }}
                                className="rounded-r-2xl bg-[#fff5f7] p-3 shadow-[0_0_45px_rgba(255,110,150,0.6),0_20px_50px_rgba(0,0,0,0.28)] border border-pink-200"
                            >
                                <div className="w-full h-full rounded-xl coral-polka p-5 flex flex-col text-white relative overflow-hidden shadow-inner">
                                    <span className="absolute top-1.5 left-2 text-4xl -rotate-12 select-none drop-shadow">🎀</span>

                                    <h3 className="font-script text-3xl text-center pb-2.5 border-b-2 border-dashed border-white/75 mx-6 drop-shadow">
                                        {CONFIG.letterHeader}
                                    </h3>

                                    <div className="letter-scroll flex-1 min-h-0 overflow-y-auto mt-3.5 pr-2.5 space-y-3 font-hand text-[19.5px] leading-[1.45] text-left -rotate-[1deg]">
                                        <p className="font-bold text-[21px] text-yellow-100">{CONFIG.letterGreeting}</p>
                                        {CONFIG.letterParagraphs.map((p, i) => (
                                            <p key={i}>{p}</p>
                                        ))}
                                    </div>

                                    <p className="font-script text-2xl text-right mt-2 pr-2 text-yellow-50 drop-shadow">
                                        {CONFIG.letterSignature}
                                    </p>

                                    <div
                                        className="absolute bottom-0 right-0 w-8 h-8"
                                        style={{
                                            background: 'linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.38) 50%)',
                                            borderTopLeftRadius: 10
                                        }}
                                    />
                                </div>
                            </div>

                            {/* TỜ BÌA LẬT 3D */}
                            <div
                                style={{
                                    position: 'absolute',
                                    left: bookW / 2,
                                    top: 0,
                                    width: bookW / 2,
                                    height: bookH,
                                    transformOrigin: 'left center',
                                    transformStyle: 'preserve-3d',
                                    transition: 'transform 1.3s cubic-bezier(.45,0,.15,1)',
                                    transform: open ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                                    zIndex: 30
                                }}
                            >
                                {/* MẶT TRƯỚC BÌA */}
                                <div
                                    style={{ backfaceVisibility: 'hidden' }}
                                    className="absolute inset-0 rounded-2xl cover-stripes p-6 flex flex-col items-center justify-center text-center shadow-[0_0_45px_rgba(255,120,160,0.55),0_20px_50px_rgba(0,0,0,0.28)] border-2 border-white overflow-hidden"
                                >
                                    <svg viewBox="0 0 100 100" className="w-14 h-14 absolute top-5 right-5 fill-white/80 drop-shadow-sm rotate-12">
                                        <polygon points="50,5 63,36 96,39 71,61 79,93 50,75 21,93 29,61 4,39 37,36" />
                                    </svg>

                                    <p className="text-lg font-extrabold text-gray-800 tracking-wide -rotate-2 mb-1">
                                        {CONFIG.cardCoverDear}
                                    </p>

                                    <h2 className="font-script text-5xl leading-[1.15] text-[#ff2e93] neon-pink -rotate-2 my-2">
                                        Happy<br />Birthday!
                                    </h2>

                                    <p className="text-sm font-semibold text-gray-600 -rotate-2 mt-1 mb-5">
                                        {CONFIG.cardCoverSub} 💌
                                    </p>

                                    <div
                                        onClick={cyclePhoto}
                                        title="Chạm để đổi ảnh"
                                        className="w-28 h-28 rounded-full p-1.5 bg-pink-200/90 shadow-[0_0_25px_rgba(255,90,150,0.65)] cursor-pointer hover:scale-105 transition-transform"
                                    >
                                        <img
                                            src={currentPhoto}
                                            alt="Avatar"
                                            className="w-full h-full object-cover rounded-full border-2 border-white"
                                        />
                                    </div>

                                    <div className="absolute bottom-7 left-7 w-14 h-14 rounded-full border-2 border-white/90 bg-pink-200/35 shadow-[0_0_20px_rgba(255,255,255,0.9)] flex items-center justify-center animate-pulse">
                                        <div className="w-7 h-7 rounded-full bg-pink-300/60 blur-[1px]" />
                                    </div>

                                    <span className="absolute bottom-3 text-[11px] font-bold text-pink-600/80">
                                        Chạm vào thiệp để mở ✨
                                    </span>
                                </div>

                                {/* MẶT TRONG BÌA TRÁI */}
                                <div
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        transform: 'rotateY(180deg)'
                                    }}
                                    className="absolute inset-0 rounded-l-2xl cover-stripes p-6 flex flex-col items-center justify-center text-center shadow-[inset_-14px_0_22px_-12px_rgba(0,0,0,0.28)] border-2 border-white overflow-hidden"
                                >
                                    <div className="w-full h-full flex flex-col items-center justify-center relative" style={{ transform: 'scaleX(-1)' }}>
                                        <svg viewBox="0 0 100 100" className="w-14 h-14 absolute top-0 right-0 fill-white/80 drop-shadow-sm rotate-12">
                                            <polygon points="50,5 63,36 96,39 71,61 79,93 50,75 21,93 29,61 4,39 37,36" />
                                        </svg>
                                        <p className="text-lg font-extrabold text-gray-800/85 tracking-wide -rotate-2 mb-1">
                                            {CONFIG.cardCoverDear}
                                        </p>
                                        <h2 className="font-script text-5xl leading-[1.15] text-[#ff2e93]/85 neon-pink -rotate-2 my-2">
                                            Happy<br />Birthday!
                                        </h2>
                                        <p className="text-sm font-semibold text-gray-600/85 -rotate-2 mt-1 mb-5">
                                            {CONFIG.cardCoverSub} 💌
                                        </p>
                                        <div className="w-28 h-28 rounded-full p-1.5 bg-pink-200/90 shadow-[0_0_25px_rgba(255,90,150,0.55)]">
                                            <img
                                                src={currentPhoto}
                                                alt="Avatar"
                                                className="w-full h-full object-cover rounded-full border-2 border-white"
                                            />
                                        </div>
                                        <div className="absolute bottom-1 left-1 w-14 h-14 rounded-full border-2 border-white/90 bg-pink-200/35 shadow-[0_0_20px_rgba(255,255,255,0.9)] flex items-center justify-center">
                                            <div className="w-7 h-7 rounded-full bg-pink-300/60 blur-[1px]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`mt-8 transition-all duration-700 ${readyNext ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
            >
                <Btn onClick={() => { snd.pop(880); onNext(); }}>
                    <Wand2 className="w-5 h-5" /> Khoan đã... Còn màn ảo thuật nhận thưởng nữa!
                </Btn>
            </div>
        </div>
    );
}

// ============================================================================
// MÀN 3A: BÁNH SINH NHẬT LÒ XO (Mini-game tap nhanh — đã tăng độ khó, bỏ mic)
// ============================================================================
function CakeLetter({ onNext, burst }) {
    // ⚙️ CHỈNH ĐỘ KHÓ Ở ĐÂY
    const TARGET_TAPS = 20;   // số tap tối thiểu trong cửa sổ trượt
    const WINDOW_MS = 4000;   // cửa sổ trượt 4 giây => cần ~10 tap/giây
    const HOLD_MS = 1000;     // phải GIỮ nhịp đó liên tục thêm 1 giây mới tắt

    const [power, setPower] = useState(0);
    const [bounce, setBounce] = useState(0);
    const [blown, setBlown] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [hintMsg, setHintMsg] = useState("Chạm liên tục thật nhanh vào màn hình để tạo gió thổi tắt nến nhé! 💨");

    const tapsHistory = useRef([]);
    const blownRef = useRef(false);
    const holdStart = useRef(null);

    const finishBlow = useCallback(() => {
        if (blownRef.current) return;
        blownRef.current = true;
        setBlown(true);
        setPower(100);
        setHintMsg("🎉 Tuyệt vời! Nến đã tắt rồi, mở thiệp sinh nhật thôi!!");
        snd.blow();
        burst();
        snd.chime([N.C5, N.E5, N.G5, N.C6, N.E5]);
        setTimeout(() => {
            snd.paper();
            setShowCard(true);
        }, 1500);
    }, [burst]);

    useEffect(() => {
        if (blown) return;
        const iv = setInterval(() => {
            const now = Date.now();
            tapsHistory.current = tapsHistory.current.filter((t) => now - t <= WINDOW_MS);
            const count = tapsHistory.current.length;
            const pct = Math.min(100, Math.round((count / TARGET_TAPS) * 100));
            setPower(pct);

            if (count >= TARGET_TAPS) {
                if (!holdStart.current) holdStart.current = now;
                if (now - holdStart.current >= HOLD_MS) {
                    finishBlow();
                    return;
                }
                setHintMsg("GIỮ NHỊP!! Đừng dừng lại, sắp tắt rồi!! 🔥💨");
            } else {
                holdStart.current = null;
                if (pct === 0) return;
                if (pct < 35) setHintMsg("Nhanh tay hơn nữa công chúa ơi, lửa vẫn còn mạnh lắm! 🔥");
                else if (pct < 70) setHintMsg("Gió đang mạnh lên!! Cố lên bấm nhanh liên tục nào!! 💨💨");
                else setHintMsg("Một chút xíu nữa thôi!! Phùùù!! 🌬️✨");
            }
        }, 100);
        return () => clearInterval(iv);
    }, [blown, finishBlow]);

    const handleTap = () => {
        if (blownRef.current) return;
        const now = Date.now();
        tapsHistory.current = [...tapsHistory.current.filter((t) => now - t <= WINDOW_MS), now];
        const pct = Math.min(100, Math.round((tapsHistory.current.length / TARGET_TAPS) * 100));
        setPower(pct);
        setBounce((b) => b + 1);
        snd.pop(400 + pct * 5);
    };

    const candleOut = (i) => blown || (i === 0 && power >= 40) || (i === 2 && power >= 75);

    if (showCard) return <Card3DBook onNext={onNext} />;

    return (
        <Card className="w-full max-w-xl p-6 sm:p-8 text-center overflow-hidden select-none">
            <div className="flex justify-center mb-2">
                <CuteGif kind="cake" size={76} />
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-extrabold mb-2">
                <Flame className="w-3.5 h-3.5" /> Nghi thức tuổi mới
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-1">
                Ước Một Điều Rồi Thổi Nến 🎂
            </h2>
            <p className="text-xs sm:text-sm text-rose-600 font-semibold max-w-md mx-auto mb-3 min-h-[36px]">
                {hintMsg}
            </p>

            {/* Vùng chạm bánh lò xo */}
            <div
                onPointerDown={handleTap}
                style={{ touchAction: 'manipulation' }}
                className="relative h-72 flex flex-col items-center justify-end cursor-pointer select-none active:scale-95 transition-transform"
            >
                {power > 0 && !blown && (
                    <div className="absolute top-1 z-30 animate-bounce">
                        <span className="px-3.5 py-1 rounded-full bg-sky-100 text-sky-600 text-xs font-extrabold flex items-center gap-1 shadow-sm border border-sky-200">
                            <Wind className="w-3.5 h-3.5" /> Phùùù... Sức gió {power}%
                        </span>
                    </div>
                )}

                <div key={bounce} className="flex flex-col items-center origin-bottom anim-spring">
                    <div className="flex items-end justify-center gap-6 -mb-1.5 z-20">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="h-8 flex items-center justify-center">
                                    {!candleOut(i) ? (
                                        <div
                                            className="w-4 h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-[0_0_18px_#fbbf24] flame"
                                            style={{ transform: `scale(${1 - power * 0.004})` }}
                                        />
                                    ) : (
                                        <span className="text-base anim-smoke">💨</span>
                                    )}
                                </div>
                                <div className="w-3.5 h-11 rounded-t-md bg-gradient-to-b from-white via-pink-200 to-rose-300 border border-pink-300" />
                            </div>
                        ))}
                    </div>

                    <div className="w-40 h-14 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-2xl border-2 border-pink-300 relative shadow-md flex items-start justify-around pt-1 z-10">
                        {[5, 6, 5, 6].map((w, i) => (
                            <div key={i} className="bg-white rounded-b-full" style={{ width: w * 4, height: 18 + (i % 2) * 4 }} />
                        ))}
                        <span className="absolute bottom-1 text-[10px] font-black text-rose-700 tracking-wider">
                            HAPPY BIRTHDAY
                        </span>
                    </div>

                    <div className="w-56 h-14 bg-gradient-to-b from-rose-300 to-rose-400 rounded-t-2xl rounded-b-xl border-2 border-rose-400 shadow-xl flex items-center justify-center gap-3 text-base">
                        🍓 🍒 🍓 🍒
                    </div>

                    <div className="w-60 h-3.5 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-full shadow-md border border-gray-300" />

                    <svg width="70" height="64" viewBox="0 0 70 64" className="overflow-visible -mt-1 drop-shadow-md">
                        <defs>
                            <linearGradient id="spr" x1="0" x2="1">
                                <stop offset="0" stopColor="#f472b6" />
                                <stop offset=".5" stopColor="#fbcfe8" />
                                <stop offset="1" stopColor="#e11d48" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M35 0 C65 6,65 13,35 17 C5 21,5 28,35 32 C65 36,65 43,35 47 C5 51,5 58,35 62"
                            fill="none"
                            stroke="url(#spr)"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                <div className="w-36 h-6 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 rounded-t-xl shadow-lg flex items-center justify-center">
                    <span className="text-[10px] font-extrabold text-white tracking-widest">TAP TO BLOW</span>
                </div>
            </div>

            <div className="max-w-xs mx-auto my-4">
                <div className="flex justify-between text-xs font-extrabold text-rose-600 mb-1">
                    <span>🌬️ Sức gió thổi nến</span>
                    <span>{power}%</span>
                </div>
                <div className="h-3.5 bg-pink-100 rounded-full overflow-hidden p-0.5 border border-pink-200">
                    <div
                        style={{ width: `${power}%` }}
                        className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-amber-400 rounded-full transition-all duration-100"
                    />
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
                <Btn onClick={handleTap} className="select-none">
                    <Wind className="w-4 h-4" /> Chạm liên tục để thổi nến!
                </Btn>
            </div>
        </Card>
    );
}

// ============================================================================
// MÀN 4: ẢO THUẬT 3 CỐC BẠC
// ============================================================================
const SLOTS = [10, 40, 70];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function Cup({ lifted, hyper, children, pickable }) {
    return (
        <div
            className={`w-full flex flex-col items-center transition-all duration-500 ${lifted ? '-translate-y-24 -rotate-6' : pickable ? 'group-hover:-translate-y-3' : ''
                } ${hyper
                    ? 'drop-shadow-[0_0_18px_rgba(255,255,255,0.85)] blur-[0.8px]'
                    : 'drop-shadow-[0_14px_14px_rgba(0,0,0,0.55)]'
                }`}
        >
            <div className="w-11 sm:w-14 h-3 bg-gradient-to-r from-zinc-400 via-white to-zinc-400 rounded-t-xl" />
            <div className="w-14 sm:w-20 h-20 sm:h-24 bg-gradient-to-r from-zinc-500 via-zinc-100 to-zinc-600 rounded-t-lg flex flex-col items-center justify-end pb-3 relative overflow-hidden border-x border-white/60">
                <div className="absolute inset-y-0 left-1/3 w-3 bg-white/65 blur-[2px]" />
                <div className="w-full h-1 bg-zinc-700/35 mb-1" />
                <div className="w-full h-1.5 bg-white/80 mb-1" />
                <div className="w-full h-1 bg-zinc-700/35" />
            </div>
            <div className="w-16 sm:w-[5.5rem] h-3.5 bg-gradient-to-r from-zinc-500 via-white to-zinc-500 rounded-full border border-white/80" />
            {children}
        </div>
    );
}

function MagicCups({ burst }) {
    const [slots, setSlots] = useState([0, 1, 2]);
    const posRef = useRef([0, 1, 2]);
    const [arc, setArc] = useState([0, 0, 0]);
    const [phase, setPhase] = useState('intro');
    const [status, setStatus] = useState(
        'Nhìn kỹ nhé! Dưới 3 chiếc cốc bạc là 3 bao lì xì TIỀN MẶT THẬT (500K • 1 Triệu • 2 Triệu). Bắt trúng cốc nào, nhận ngay tiền đó! 💸'
    );
    const [dur, setDur] = useState(500);
    const [picked, setPicked] = useState(null);
    const [prize, setPrize] = useState(null);
    const [copied, setCopied] = useState(false);

    const swap = async (ms) => {
        const a = Math.floor(Math.random() * 3),
            b = (a + 1 + Math.floor(Math.random() * 2)) % 3,
            p = posRef.current;
        const ca = p.indexOf(a),
            cb = p.indexOf(b);
        setDur(ms);
        setArc(() => {
            const n = [0, 0, 0];
            n[ca] = 1;
            n[cb] = -1;
            return n;
        });
        const np = [...p];
        np[ca] = b;
        np[cb] = a;
        posRef.current = np;
        setSlots(np);
        snd.whoosh(ms < 150 ? 540 : 320);
        await sleep(ms + 30);
        setArc([0, 0, 0]);
    };

    const startTest = async () => {
        setPicked(null);
        setPrize(null);
        setPhase('closing');
        setStatus('Úp 3 chiếc cốc bạc xuống nào... Chuẩn bị khởi động Vòng Thử (Tốc độ chậm) nhé!');
        snd.pop(480);
        await sleep(1100);
        setPhase('practice');
        for (let i = 0; i < 4; i++) {
            await swap(560);
            await sleep(110);
        }
        setPhase('pick_test');
        setStatus('✨ Vòng thử dừng rồi! Em chọn thử 1 chiếc cốc xem mắt mình tinh cỡ nào nhé!');
        snd.pop(880);
    };

    const startReal = async () => {
        setPicked(null);
        setPrize(null);
        setPhase('hyper');
        setStatus('⚡ CẤP ĐỘ KHÓ CỰC ĐẠI: TỐC ĐỘ BÀN THỜ 🌪️ Đừng chớp mắt nha!!');
        snd.setMood('magic');
        await sleep(400);
        for (let burstNo = 0; burstNo < 4; burstNo++) {
            snd.drum(0.5);
            const speed = burstNo === 0 ? 68 : burstNo === 1 ? 55 : burstNo === 2 ? 46 : 40;
            for (let i = 0; i < 9; i++) {
                await swap(speed);
            }
            await sleep(120);
        }
        setPhase('pick_real');
        setStatus('🔥 DỪNG RỒI!! Cốc bị tráo chóng mặt luôn! Giờ hãy chọn chiếc cốc em tin tưởng nhất đi nào!! 💸');
        snd.fanfare();
    };

    const select = (id) => {
        if (phase === 'pick_test') {
            snd.pop(960);
            setPicked(id);
            setPhase('test_done');
            setStatus('🐱 Quá đỉnh! Nhưng đây mới là vòng khởi động nháp thôi nha. Bấm nút bên dưới để vào Vòng Thật tốc độ cao nào!');
        } else if (phase === 'pick_real') {
            snd.fanfare();
            setPicked(id);
            // id là cốc gốc, đi theo cốc dù đã bị tráo => số trúng khớp với cốc đã chọn
            const chosen = CONFIG.cashPrizes[id];
            setPrize(chosen);
            setPhase('revealed');
            setStatus(`🎉 Chúc mừng công chúa! Em đã mở trúng bao lì xì TIỀN MẶT ${chosen.amount}!! 💸`);
            burst();
            snd.setMood('calm');

            // Sao chep san vao clipboard de nguoi dung tien gui
            const msg = `Anh yêu ơi! Em vừa bốc trúng giải TIỀN MẶT ${chosen.amount} 💸 với MÃ XÁC THỰC ĐỘC QUYỀN: [${chosen.code}] 🎁 Mau chuyển khoản lì xì sinh nhật cho em đi nào!! 💖`;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(msg).catch(() => {});
            }
        }
    };

    const copy = () => {
        if (!prize) return;
        const t = `Anh yêu ơi! Em vừa bốc trúng giải TIỀN MẶT ${prize.amount} 💸 với MÃ XÁC THỰC ĐỘC QUYỀN: [${prize.code}] 🎁 Mau chuyển khoản lì xì sinh nhật cho em đi nào!! 💖`;
        navigator.clipboard && navigator.clipboard.writeText(t);
        setCopied(true);
        snd.chime();
        setTimeout(() => setCopied(false), 3000);
    };

    const sendToMessenger = () => {
        if (!prize) return;
        copy();
        const targetUrl = CONFIG.boyfriendContactUrl || "https://m.me/";
        window.open(targetUrl, "_blank");
    };

    const pickable = phase === 'pick_test' || phase === 'pick_real';
    const showAllUnder = phase === 'intro';

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6 relative z-10 anim-fade-in">
            <Card className="p-5 sm:p-8 text-center">
                <div className="flex justify-center mb-2">
                    <CuteGif kind="magic" size={76} />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-extrabold mb-2">
                    <Wand2 className="w-3.5 h-3.5" /> Màn cuối: Ảo Thuật Trúng Tiền Mặt
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
                    Thử Thách 3 Chiếc Cốc Bạc 🎩
                </h2>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-md mx-auto mb-4">
                    {CONFIG.cashPrizes.map((p) => (
                        <div
                            key={p.code}
                            className="rounded-2xl bg-gradient-to-br from-amber-50 via-rose-50 to-pink-100 border-2 border-amber-300/80 p-2 shadow-sm text-center"
                        >
                            <div className="flex items-center justify-center gap-1 text-amber-600 text-[11px] font-extrabold">
                                <Banknote className="w-3.5 h-3.5" /> TIỀN MẶT
                            </div>
                            <div className="text-lg sm:text-2xl font-black text-rose-600 neon-gold my-0.5">{p.amount}</div>
                            <div className="text-[10px] font-bold text-gray-600 truncate">{p.label}</div>
                        </div>
                    ))}
                </div>

                <p className="text-xs sm:text-sm text-rose-700 font-bold max-w-lg mx-auto mb-4 min-h-[38px]">
                    {status}
                </p>

                <div className="relative rounded-[28px] bg-gradient-to-b from-[#0b462c] via-[#13653f] to-[#08331f] p-5 sm:p-8 shadow-[inset_0_4px_30px_rgba(0,0,0,0.65)] border-4 border-[#232733] overflow-hidden">
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-56 bg-amber-200/15 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex justify-center mb-3">
                        <div
                            className={`px-4 py-1.5 rounded-full text-xs font-extrabold border transition-all ${phase === 'hyper'
                                ? 'bg-rose-600 text-white border-rose-300 animate-pulse shadow-[0_0_20px_#f43f5e]'
                                : 'bg-black/40 text-amber-200 border-white/15'
                                }`}
                        >
                            🪄 Bàn ảo thuật của {CONFIG.boyfriendName}
                            {phase === 'hyper' && ' • SIÊU TỐC ĐỘ ⚡'}
                        </div>
                    </div>

                    <div className="relative h-52 sm:h-56 max-w-md mx-auto">
                        {[0, 1, 2].map((id) => {
                            const a = arc[id];
                            const liftedPick = (phase === 'test_done' || phase === 'revealed') && picked === id;
                            const lifted = showAllUnder || liftedPick;
                            const initPrize = CONFIG.cashPrizes[id];

                            return (
                                <div
                                    key={id}
                                    onClick={() => select(id)}
                                    style={{
                                        left: `${SLOTS[slots[id]]}%`,
                                        zIndex: liftedPick ? 40 : a === 1 ? 30 : a === -1 ? 10 : 20,
                                        transitionDuration: `${dur}ms`,
                                        transform: `translateY(${a * 22}px) scale(${a === 1 ? 1.08 : a === -1 ? 0.92 : 1})`
                                    }}
                                    className={`absolute bottom-5 w-[22%] flex flex-col items-center select-none transition-all ease-in-out ${pickable ? 'cursor-pointer group' : ''
                                        }`}
                                >
                                    <div
                                        className={`absolute bottom-1 flex flex-col items-center transition-all duration-500 ${lifted ? 'opacity-100 scale-100' : 'opacity-0 scale-50 translate-y-4 pointer-events-none'
                                            }`}
                                    >
                                        {showAllUnder && (
                                            <div className="px-2.5 py-1.5 rounded-2xl bg-gradient-to-br from-amber-300 via-rose-500 to-pink-600 p-0.5 shadow-[0_0_25px_#fbbf24] animate-bounce">
                                                <div className="bg-white rounded-[12px] px-2.5 py-1 flex flex-col items-center">
                                                    <span className="text-[9px] font-extrabold text-amber-600">💸 TIỀN MẶT</span>
                                                    <span className="text-base sm:text-lg font-black text-rose-600 leading-none">
                                                        {initPrize.amount}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        {phase === 'test_done' && liftedPick && (
                                            <div className="px-3 py-1.5 rounded-xl bg-white/95 text-rose-600 font-extrabold text-xs shadow-lg animate-bounce">
                                                🧸 Nháp thôi nha!
                                            </div>
                                        )}
                                        {phase === 'revealed' && liftedPick && prize && (
                                            <div className="w-20 h-16 rounded-2xl bg-gradient-to-br from-amber-300 via-rose-500 to-pink-600 p-0.5 shadow-[0_0_30px_#fbbf24] animate-bounce">
                                                <div className="w-full h-full bg-white rounded-[14px] flex flex-col items-center justify-center">
                                                    <span className="text-[9px] font-extrabold text-amber-600">💸 TIỀN MẶT</span>
                                                    <span className="text-base sm:text-lg font-black text-rose-600 leading-none">
                                                        {prize.amount}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <Cup lifted={lifted} hyper={phase === 'hyper'} pickable={pickable}>
                                        {pickable && (
                                            <span className="mt-2 px-2.5 py-0.5 rounded-full bg-white/20 text-amber-200 text-[10px] font-bold group-hover:bg-pink-500 group-hover:text-white transition-all whitespace-nowrap">
                                                Chọn cốc này
                                            </span>
                                        )}
                                    </Cup>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    {phase === 'intro' && (
                        <Btn onClick={startTest}>
                            <Wand2 className="w-5 h-5" /> Úp cốc & Bắt đầu Vòng Thử (Chậm) 🪄
                        </Btn>
                    )}
                    {phase === 'test_done' && (
                        <Btn onClick={startReal} className="from-purple-600 via-pink-600 to-rose-500">
                            <Flame className="w-5 h-5" /> Chơi Vòng Thật (Siêu Tốc Độ) ⚡
                        </Btn>
                    )}
                    {phase === 'revealed' && (
                        <Btn onClick={startReal}>
                            <RefreshCw className="w-4 h-4" /> Tráo lại lần nữa
                        </Btn>
                    )}
                    {['closing', 'practice', 'hyper'].includes(phase) && (
                        <div className="px-6 py-3.5 rounded-2xl bg-pink-50 text-rose-600 font-extrabold text-sm flex items-center gap-2 border border-pink-200">
                            <RefreshCw className="w-4 h-4 animate-spin" /> Đang tráo cốc... Đừng rời mắt nhé!
                        </div>
                    )}
                </div>
            </Card>

            {phase === 'revealed' && prize && (
                <Card className="p-6 sm:p-9 text-center border-2 border-pink-300 anim-open">
                    <div className="flex justify-center items-center gap-3 mb-3">
                        <CuteGif kind="kiss" size={78} />
                        <CuteGif kind="hug" size={78} />
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 text-white text-xs font-extrabold mb-3 shadow">
                        <Star className="w-3.5 h-3.5 fill-white" /> Phần thưởng tiền mặt của công chúa
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
                        Chúc Mừng Em Trúng Giải Tiền Mặt! 🎉
                    </h3>
                    <p className="text-sm text-gray-600 font-medium max-w-md mx-auto mb-5">
                        {prize.desc} — Hãy gửi mã số này cho <b>{CONFIG.boyfriendName}</b> để nhận thưởng ngay nhé!
                    </p>

                    <div className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-3xl p-6 max-w-md mx-auto border-2 border-dashed border-rose-300 mb-4 shadow-inner">
                        <p className="text-xs font-extrabold tracking-wider text-rose-500">
                            GIẢI THƯỞNG TIỀN MẶT CỦA CÔNG CHÚA
                        </p>
                        <div className="text-4xl sm:text-5xl font-black text-rose-600 neon-gold my-2">
                            {prize.amount}
                        </div>
                        <span className="inline-block px-3.5 py-1 rounded-full bg-white text-rose-600 text-xs font-bold shadow-sm mb-3">
                            {prize.label} • {prize.desc}
                        </span>

                        <div className="pt-3 border-t border-rose-200/80">
                            <span className="text-[11px] font-extrabold text-gray-500 block mb-1">
                                MÃ XÁC THỰC ĐỘC QUYỀN (16 KÝ TỰ):
                            </span>
                            <div className="text-sm sm:text-base font-black text-rose-700 font-mono tracking-wider select-all bg-white/90 py-1.5 px-3 rounded-xl border border-rose-200 inline-block shadow-sm">
                                {prize.code}
                            </div>
                        </div>
                    </div>

                    <div className="max-w-sm mx-auto mb-5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2 text-left font-medium">
                        <Camera className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                        <span>
                            <b>Nhớ chụp màn hình (screenshot)</b> hoặc bấm nút Copy mã bên dưới rồi gửi cho người yêu để nhận lì xì thật nhé 💌
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Btn onClick={sendToMessenger} className="w-full sm:w-auto from-rose-500 via-pink-500 to-rose-600 shadow-[0_8px_25px_rgba(244,63,94,0.45)]">
                            <Send className="w-5 h-5" /> Gửi Mã Nhận Tiền Qua Messenger 💌
                        </Btn>
                        <button
                            onClick={copy}
                            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-pink-50 text-rose-600 font-extrabold text-sm border-2 border-pink-200 flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 text-emerald-500" /> Đã copy mã!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" /> Copy mã xác thực
                                </>
                            )}
                        </button>
                    </div>
                </Card>
            )}
        </div>
    );
}

// ============================================================================
// APP CHÍNH
// ============================================================================
const MOOD_BY_STEP = { cake_letter: 'cake', magic: 'magic' };

export default function App() {
    const [step, setStep] = useState('gate');
    const [musicOn, setMusicOn] = useState(false);
    const [burst, setBurst] = useState(false);
    const [trackIdx, setTrackIdx] = useState(0);
    const [showMusicMenu, setShowMusicMenu] = useState(false);
    const audioRef = useRef(null);

    const activeTrack = CONFIG.bgmOptions[trackIdx] || CONFIG.bgmOptions[0];

    const fire = useCallback(() => {
        snd.paper();
        setBurst(true);
        setTimeout(() => setBurst(false), 3800);
    }, []);

    // Điều khiển phát nhạc khi đổi track hoặc bật/tắt
    useEffect(() => {
        if (!audioRef.current) return;
        if (musicOn) {
            audioRef.current.play().catch(() => {});
        } else {
            audioRef.current.pause();
        }
    }, [musicOn, trackIdx]);

    useEffect(() => {
        snd.setMood(MOOD_BY_STEP[step] || "calm");
        if (step === "cake_letter") {
            // Khi đến màn thổi nến, tự động chuyển sang giai điệu Happy Birthday
            if (audioRef.current) audioRef.current.pause();
            snd.start();
        } else if (musicOn) {
            snd.stop();
            if (audioRef.current) audioRef.current.play().catch(() => {});
        }
    }, [step, musicOn]);

    const go = (s) => () => setStep(s);
    const unlock = () => {
        fire();
        snd.chime();
        setMusicOn(true);
        setStep('b_hero');
        if (audioRef.current) {
            audioRef.current.play().catch(() => {
                // Fallback nếu browser block audio thẻ, chuyển sang Web Audio
                snd.start();
            });
        }
    };

    const toggleMusic = () => {
        if (musicOn) {
            if (audioRef.current) audioRef.current.pause();
            snd.stop();
            setMusicOn(false);
        } else {
            setMusicOn(true);
            if (audioRef.current) {
                audioRef.current.play().catch(() => snd.start());
            }
        }
    };

    const selectTrack = (idx) => {
        setTrackIdx(idx);
        setMusicOn(true);
        setShowMusicMenu(false);
        snd.pop(640);
    };

    return (
        <div className="min-h-screen w-full text-gray-800 relative overflow-x-hidden flex flex-col py-6 px-4 sm:px-6 font-sans-vi">
            <div className="fixed inset-0 z-0 pastel-bg" />

            <InteractiveCursorBg />

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Patrick+Hand&family=Quicksand:wght@500;600;700;800&display=swap');

        .font-sans-vi { font-family: 'Quicksand', sans-serif; }
        .font-script { font-family: 'Pacifico', cursive; }
        .font-hand { font-family: 'Patrick Hand', cursive; }

        .pastel-bg {
          background:
            radial-gradient(circle at 15% 15%, rgba(255, 182, 213, 0.55), transparent 42%),
            radial-gradient(circle at 85% 20%, rgba(254, 205, 211, 0.6), transparent 45%),
            radial-gradient(circle at 50% 85%, rgba(251, 207, 232, 0.55), transparent 50%),
            linear-gradient(135deg, #fff5f8 0%, #ffe4ef 50%, #ffd9e8 100%);
        }

        .cover-stripes {
          background:
            repeating-linear-gradient(
              -35deg,
              rgba(255, 182, 205, 0.25) 0px,
              rgba(255, 182, 205, 0.25) 14px,
              rgba(255, 255, 255, 0.35) 14px,
              rgba(255, 255, 255, 0.35) 28px
            ),
            linear-gradient(155deg, #ffc4d9 0%, #ffdde8 52%, #fff5f8 100%);
        }

        .coral-polka {
          background:
            radial-gradient(rgba(255, 255, 255, 0.28) 1.5px, transparent 1.8px) 0 0 / 18px 18px,
            linear-gradient(160deg, #ff7b89 0%, #f66d7b 55%, #ee5d6c 100%);
        }

        .neon-pink {
          text-shadow: 0 0 8px rgba(255, 110, 175, 0.85), 0 0 22px rgba(255, 46, 147, 0.65), 0 2px 4px rgba(130, 20, 70, 0.25);
        }
        .neon-gold {
          text-shadow: 0 0 12px rgba(251, 191, 36, 0.7), 0 2px 4px rgba(180, 40, 80, 0.2);
        }
        .glow-white {
          text-shadow: 0 2px 14px rgba(255, 255, 255, 0.95), 0 0 24px rgba(244, 114, 182, 0.45);
        }

        .anim-fade-in { animation: fadeIn .5s ease-out both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }

        .anim-open { animation: open3d .75s cubic-bezier(.16,1,.3,1) both; }
        @keyframes open3d {
          from { opacity: 0; transform: perspective(1200px) rotateX(-22deg) scale(.88); }
          to { opacity: 1; transform: perspective(1200px) rotateX(0) scale(1); }
        }

        .anim-shake { animation: shake .45s; }
        @keyframes shake {
          0%, 100% { transform: none; }
          20%, 60% { transform: translateX(-9px); }
          40%, 80% { transform: translateX(9px); }
        }

        .anim-float-up { animation: floatUp linear infinite; opacity: 0; }
        @keyframes floatUp {
          0% { transform: translate(0, 0); opacity: 0; }
          10%, 88% { opacity: 0.92; }
          50% { transform: translate(14px, -55vh); }
          100% { transform: translate(0, -112vh); opacity: 0; }
        }

        .anim-balloon { animation: balloonUp linear infinite; }
        @keyframes balloonUp {
          0% { transform: translateY(0) rotate(-4deg); opacity: 0.95; }
          50% { transform: translateY(-55vh) rotate(5deg); }
          100% { transform: translateY(-118vh) rotate(-4deg); opacity: 0; }
        }

        .anim-heart-grow { animation: heartGrow 1.2s ease-in-out infinite alternate; transform-origin: center; }
        @keyframes heartGrow {
          0% { transform: scale(0.92); filter: drop-shadow(0 0 6px rgba(244,63,94,0.6)); }
          100% { transform: scale(1.18); filter: drop-shadow(0 0 16px rgba(244,63,94,0.95)); }
        }

        .anim-heart-bloom { animation: heartBloom 0.95s cubic-bezier(0.2, 0.8, 0.3, 1) forwards; }
        @keyframes heartBloom {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3) rotate(0deg); }
          30% { opacity: 1; transform: translate(-50%, -50%) scale(1.3) rotate(var(--rot, 0deg)); }
          70% { opacity: 0.9; transform: translate(-50%, -90%) scale(1.1) rotate(var(--rot, 0deg)); }
          100% { opacity: 0; transform: translate(-50%, -140%) scale(0.6) rotate(var(--rot, 0deg)); }
        }

        .anim-pulse-fast { animation: pulseFast 1.4s ease-in-out infinite alternate; }
        @keyframes pulseFast {
          0% { transform: translate(-50%, -50%) scale(0.75); opacity: 0.35; }
          100% { transform: translate(-50%, -50%) scale(1.25); opacity: 0.7; }
        }

        .anim-cursor-sparkle { animation: cursorSparkle .85s ease-out forwards; }
        @keyframes cursorSparkle {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(0.7); }
          100% { opacity: 0; transform: translate(-50%, -140%) scale(1.25) rotate(20deg); }
        }

        .anim-confetti { animation: cf linear forwards; }
        .anim-confetti-loop { animation: cf linear infinite; }
        @keyframes cf {
          0% { transform: translateY(-10px) rotate(0); opacity: 1; }
          100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }

        .anim-spring { animation: spring .9s cubic-bezier(.22,1,.36,1) both; }
        @keyframes spring {
          0% { transform: scaleY(.45) translateY(65px); }
          25% { transform: scaleY(1.16) translateY(-20px) rotate(-6deg); }
          50% { transform: scaleY(.9) translateY(8px) rotate(5deg); }
          75% { transform: scaleY(1.05) translateY(-6px) rotate(-3deg); }
          100% { transform: none; }
        }

        .flame { animation: flame .32s ease-in-out infinite alternate; transform-origin: bottom; }
        @keyframes flame { from { transform: scale(1,1) rotate(-3deg); } to { transform: scale(.88,1.14) rotate(3deg); } }

        .anim-smoke { animation: smoke 1.3s ease-out both; display: inline-block; }
        @keyframes smoke { from { transform: translateY(6px) scale(.6); opacity: 1; } to { transform: translateY(-26px) scale(1.4); opacity: 0; } }

        .polaroid { transform: rotate(var(--r)); animation: fadeIn .5s ease-out both; }
        .polaroid:hover { transform: rotate(0) scale(1.05); }

        .cat-paw { transform-origin: 92px 84px; animation: paw .9s ease-in-out infinite; }
        @keyframes paw { 0%, 100% { transform: rotate(0); } 50% { transform: rotate(-26deg); } }

        .cat-eyes { transform-origin: 55px 59px; animation: blink 3.8s infinite; }
        @keyframes blink { 0%, 94%, 100% { transform: scaleY(1); } 97% { transform: scaleY(.1); } }

        .bear-l { animation: hugL 2.4s ease-in-out infinite; }
        .bear-r { animation: hugR 2.4s ease-in-out infinite; }
        @keyframes hugL { 0%, 100% { transform: translateX(-3px); } 50% { transform: translateX(3px) rotate(3deg); } }
        @keyframes hugR { 0%, 100% { transform: translateX(3px); } 50% { transform: translateX(-3px) rotate(-3deg); } }

        .anim-heart-pop { animation: hp 1.5s ease-in-out infinite; }
        @keyframes hp { 0%, 100% { transform: translate(-50%, 0) scale(1); } 50% { transform: translate(-50%, -6px) scale(1.25); } }

        .letter-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.85) rgba(255,255,255,.22); }
        .letter-scroll::-webkit-scrollbar { width: 6px; }
        .letter-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,.85); border-radius: 99px; }
        .letter-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,.22); border-radius: 99px; }
      `}</style>

            <Confetti rain={step === 'cake_letter'} burst={burst} />
            <Balloons show={step === 'cake_letter'} />
            <FloatingQuotes show={step !== 'gate'} />

            {/* Audio player phát nhạc anime chill / lofi */}
            <audio
                ref={audioRef}
                src={activeTrack?.src}
                loop
                preload="auto"
                onEnded={() => {
                    // Tự động chuyển bài tiếp theo trong danh sách anime
                    setTrackIdx((prev) => (prev + 1) % CONFIG.bgmOptions.length);
                }}
            />

            {step !== 'gate' && (
                <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 flex flex-col items-end gap-1.5">
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={toggleMusic}
                            className="px-3.5 sm:px-4 py-2 rounded-full bg-white/95 border-2 border-pink-200 shadow-md text-rose-600 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform backdrop-blur-sm"
                        >
                            {musicOn ? (
                                <>
                                    <Volume2 className="w-4 h-4 animate-pulse text-pink-500" />
                                    <span className="max-w-[160px] sm:max-w-[240px] truncate text-[11px] sm:text-xs text-rose-600 font-bold">
                                        {step === "cake_letter" ? "🎂 Nhạc Happy Birthday" : (activeTrack?.title || "Đang phát")}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <VolumeX className="w-4 h-4 text-gray-400" />
                                    <span>Bật nhạc</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            <main className="flex-1 flex items-center justify-center w-full py-4 relative z-10">
                {step === 'gate' && <Gate onUnlock={unlock} />}
                {step === 'b_hero' && (
                    <Bridge
                        gif="wave"
                        text="Đúng là em rồi! Chào mừng công chúa của anh 💕"
                        subtext="Hôm nay là ngày đặc biệt của riêng em..."
                        onComplete={go('hero')}
                    />
                )}
                {step === 'hero' && <Hero onNext={go('b_solo')} />}
                {step === 'b_solo' && (
                    <Bridge
                        gif="kiss"
                        text="Trước tiên, cùng ngắm cô gái xinh đẹp nhất hôm nay nhé ✨"
                        onComplete={go('solo')}
                    />
                )}
                {step === 'solo' && (
                    <Gallery
                        gifKind="kiss"
                        title={CONFIG.soloTitle}
                        subtitle={CONFIG.soloSubtitle}
                        photos={SOLO}
                        buttonText="Em muốn xem thêm kỷ niệm tụi mình không? 💕"
                        onNext={go('b_together')}
                    />
                )}
                {step === 'b_together' && (
                    <Bridge
                        gif="hug"
                        text="Và đây là những khoảnh khắc ngọt ngào nhất của tụi mình 💑"
                        onComplete={go('together')}
                    />
                )}
                {step === 'together' && (
                    <Gallery
                        gifKind="hug"
                        title={CONFIG.togetherTitle}
                        subtitle={CONFIG.togetherSubtitle}
                        photos={TOGETHER}
                        buttonText="Vẫn còn một chiếc bánh & bức thư bí mật... 🎂"
                        onNext={go('b_cake')}
                    />
                )}
                {step === 'b_cake' && (
                    <Bridge
                        gif="cake"
                        text="Hãy nhắm mắt ước một điều thật đẹp trước khi thổi nến nhé 🕯️"
                        onComplete={go('cake_letter')}
                    />
                )}
                {step === 'cake_letter' && <CakeLetter onNext={go('b_magic')} burst={fire} />}
                {step === 'b_magic' && (
                    <Bridge
                        gif="magic"
                        text="Tiếp theo: Bàn Ảo Thuật 3 Chiếc Cốc Bạc săn Tiền Mặt! Đừng chớp mắt nhé! 🎩💸"
                        onComplete={go('magic')}
                    />
                )}
                {step === 'magic' && <MagicCups burst={fire} />}
            </main>

            <footer className="text-center text-xs text-rose-500/80 font-bold z-10 mt-4">
                Made with 💖 just for you
            </footer>
        </div>
    );
}

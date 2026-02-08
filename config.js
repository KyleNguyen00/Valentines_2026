// ============================================
// � OUR LOVE STORY - STORYBOOK EDITION 📖
// ============================================

const CONFIG = {
    valentineName: "Cassandra",
    pageTitle: "Our Love Story 📖✨",

    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],
        stars: ['⭐', '✨', '🌟']
    },

    storyTitle: "Once upon a time...",
    storySubtitle: "I found you",

    questions: {
        chapter1: {
            title: "Chapter 1: The Discovery",
            text: "I remember the moment I found you... Do you believe in fate?",
            yesBtn: "Yes ✨",
            noBtn: "No",
            secretAnswer: "Me too... it felt like destiny ✨"
        },
        chapter2: {
            title: "Chapter 2: The Feeling",
            text: "How would you describe the feeling when we first met?",
            startText: "My heart was racing like this:",
            nextBtn: "Next 💫"
        },
        chapter3: {
            title: "Chapter 3: The Realization",
            text: "Did you know right away that you felt something special?",
            yesBtn: "I knew immediately 💕",
            noBtn: "It grew over time",
            secretAnswer: "Looking back now, it was always there 🌹"
        },
        chapter4: {
            title: "Chapter 4: The Promise",
            text: "Every moment with you feels like a fairytale...",
            yesBtn: "Absolutely 🧚",
            noBtn: "Let me think",
            secretAnswer: "I want to write every chapter with you 💫"
        },
        chapter5: {
            title: "Chapter 5: The Question",
            text: "Will you be my forever Valentine? 💕",
            yesBtn: "Yes! Forever! 💍",
            noBtn: "Not sure"
        }
    },

    loveMessages: {
        extreme: "To infinity. I couldn't love you anymore 🌙✨💕",
        high: "To the stars and back 🌟💫💕",
        normal: "I love you so much"
    },

    celebration: {
        title: "And so begins our greatest adventure... 🎉✨💕",
        message: "You've made me the happiest person alive! I love you princess 💋🤗",
        emojis: "🎁💖✨🌹💕🧚🎉💫💝"
    },

    colors: {
        backgroundStart: "#ffd4e5",
        backgroundEnd: "#e8d4f8",
        buttonBackground: "#d99ec6",
        buttonHover: "#e6b3d9",
        textColor: "#6b4e71",
        accentColor: "#b8e0d2",
        accentLight: "#f5e6d3"
    },

    animations: {
        floatDuration: "15s",
        floatDistance: "50px",
        bounceSpeed: "0.5s",
        heartExplosionSize: 1.5
    },

    music: {
        enabled: true,
        autoplay: true,
        musicUrl: "https://res.cloudinary.com/doexwzt6i/video/upload/v1770592368/onlymp3.io_-_New_West_ft_Zeph_-_Those_Eyes_Official_Audio_-320-1770592298806_tq4ckr.mp3",
        startText: "🎵 Play Music",
        stopText: "🔇 Stop Music",
        volume: 0.5
    }
};

window.VALENTINE_CONFIG = CONFIG;

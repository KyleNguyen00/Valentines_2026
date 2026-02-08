// Initialize configuration
const config = window.VALENTINE_CONFIG;

function validateConfig() {
    const warnings = [];
    if (!config.valentineName) {
        warnings.push("Valentine's name is not set! Using default.");
        config.valentineName = "My Love";
    }
    const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) config.colors[key] = getDefaultColor(key);
    });
    if (warnings.length > 0) warnings.forEach(w => console.warn("- " + w));
}

function getDefaultColor(key) {
    const defaults = {
        backgroundStart: "#ffd4e5", backgroundEnd: "#e8d4f8",
        buttonBackground: "#d99ec6", buttonHover: "#e6b3d9", textColor: "#6b4e71"
    };
    return defaults[key];
}

function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

function showNextQuestion(questionNumber) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const nextQuestion = document.getElementById(`question${questionNumber}`);
    if (nextQuestion) {
        nextQuestion.classList.remove('hidden');
    }
}

function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebration = document.getElementById('celebration');
    if (celebration) {
        celebration.classList.remove('hidden');
        document.getElementById('celebrationTitle').textContent = config.celebration.title;
        document.getElementById('celebrationMessage').textContent = config.celebration.message;
        document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;
        createHeartExplosion();
    }
}

function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;
    
    config.floatingEmojis.hearts.forEach(heart => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = heart;
        setRandomPosition(div);
        container.appendChild(div);
    });
    
    if (config.floatingEmojis.stars) {
        config.floatingEmojis.stars.forEach(star => {
            const div = document.createElement('div');
            div.className = 'star';
            div.innerHTML = star;
            setRandomPosition(div);
            container.appendChild(div);
        });
    }
}

function createHeartExplosion() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
        heart.className = 'heart';
        container.appendChild(heart);
        setRandomPosition(heart);
    }
}

function setupMusicPlayer() {
    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    if (!config.music.enabled) {
        if (musicControls) musicControls.style.display = 'none';
        return;
    }
    
    if (musicSource) musicSource.src = config.music.musicUrl;
    if (bgMusic) {
        bgMusic.volume = config.music.volume || 0.5;
        bgMusic.load();
        if (config.music.autoplay) {
            bgMusic.play().catch(() => { 
                if (musicToggle) musicToggle.textContent = config.music.startText; 
            });
        }
    }
    
    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicToggle.textContent = config.music.stopText;
            } else {
                bgMusic.pause();
                musicToggle.textContent = config.music.startText;
            }
        });
    }
}

function setupLoveMeter() {
    const loveMeter = document.getElementById('loveMeter');
    const loveValue = document.getElementById('loveValue');
    const extraLove = document.getElementById('extraLove');

    if (!loveMeter || !loveValue || !extraLove) return;

    // Set initial position
    loveMeter.value = 100;
    loveValue.textContent = 100;
    loveMeter.style.width = '100%';

    // Add listener for changes
    loveMeter.addEventListener('input', () => {
        const value = parseInt(loveMeter.value);
        loveValue.textContent = value;
        
        if (value > 100) {
            extraLove.classList.remove('hidden');
            const overflowPercentage = (value - 100) / 9900;
            const extraWidth = overflowPercentage * window.innerWidth * 0.8;
            loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
            loveMeter.style.transition = 'width 0.3s';
            
            if (value >= 5000) {
                extraLove.classList.add('super-love');
                extraLove.textContent = config.loveMessages.extreme;
            } else if (value > 1000) {
                extraLove.classList.remove('super-love');
                extraLove.textContent = config.loveMessages.high;
            } else {
                extraLove.classList.remove('super-love');
                extraLove.textContent = config.loveMessages.normal;
            }
        } else {
            extraLove.classList.add('hidden');
            extraLove.classList.remove('super-love');
            loveMeter.style.width = '100%';
        }
    });
}

function setupTapCounter() {
    const tapBtn = document.getElementById('tapCounterBtn');
    const tapDisplay = document.getElementById('tapCountDisplay');
    
    if (!tapBtn) return;
    
    let tapCount = 0;
    
    tapBtn.addEventListener('click', () => {
        tapCount++;
        tapBtn.textContent = `❤️ Tap (${tapCount})`;
        
        if (tapCount >= 20) {
            tapDisplay.textContent = `You love me THAT much?? Well I love you to infinity 💕`;
            tapDisplay.style.fontSize = '1.1rem';
            tapDisplay.style.fontWeight = '700';
            tapDisplay.style.color = '#d99ec6';
            tapBtn.style.background = 'linear-gradient(135deg, #d99ec6, #e6b3d9)';
            tapBtn.style.fontSize = '1.4rem';
            tapBtn.style.padding = '18px 35px';
            tapDisplay.style.animation = 'none';
            setTimeout(() => {
                tapDisplay.style.animation = 'pulse 0.6s ease-out';
            }, 10);
        } else {
            tapDisplay.textContent = `You love me ${tapCount} times! 💕`;
            tapDisplay.style.fontSize = '1.4rem';
            tapDisplay.style.fontWeight = '700';
            tapDisplay.style.color = 'var(--button-color)';
            tapDisplay.style.animation = 'none';
            setTimeout(() => {
                tapDisplay.style.animation = 'bounce 0.3s ease-out';
            }, 10);
        }
    });
}

function setupHoldButton() {
    const holdBtn = document.getElementById('holdBtn');
    const holdProgress = document.getElementById('holdProgress');
    const holdStatus = document.getElementById('holdStatus');
    
    if (!holdBtn) return;
    
    let isHolding = false;
    let holdTime = 0;
    const requiredHoldTime = 2000; // 2 seconds
    let holdInterval = null;
    
    // Mouse events
    holdBtn.addEventListener('mousedown', () => {
        isHolding = true;
        holdBtn.classList.add('holding');
        holdProgress.classList.add('filling');
        holdTime = 0;
        holdStatus.textContent = 'Keep holding... 💕';
        
        holdInterval = setInterval(() => {
            if (isHolding) {
                holdTime += 10;
                const progress = Math.min((holdTime / requiredHoldTime) * 100, 100);
                holdProgress.style.setProperty('--hold-progress', progress + '%');
                
                if (holdTime >= requiredHoldTime) {
                    clearInterval(holdInterval);
                    isHolding = false;
                    holdBtn.classList.remove('holding');
                    holdBtn.classList.add('completed');
                    holdStatus.textContent = 'Promise confirmed! ✨';
                    holdBtn.disabled = true;
                    setTimeout(() => showNextQuestion(5), 1500);
                }
            }
        }, 10);
    });
    
    holdBtn.addEventListener('mouseup', () => {
        if (isHolding) {
            isHolding = false;
            holdBtn.classList.remove('holding');
            holdProgress.classList.remove('filling');
            holdProgress.style.setProperty('--hold-progress', '0%');
            clearInterval(holdInterval);
            if (holdTime < requiredHoldTime) {
                holdStatus.textContent = 'Not quite... hold longer! 💭';
            }
        }
    });
    
    holdBtn.addEventListener('mouseleave', () => {
        if (isHolding) {
            isHolding = false;
            holdBtn.classList.remove('holding');
            holdProgress.classList.remove('filling');
            holdProgress.style.setProperty('--hold-progress', '0%');
            clearInterval(holdInterval);
            if (holdTime < requiredHoldTime) {
                holdStatus.textContent = 'Not quite... hold longer! 💭';
            }
        }
    });
    
    // Touch events for mobile
    holdBtn.addEventListener('touchstart', () => {
        isHolding = true;
        holdBtn.classList.add('holding');
        holdProgress.classList.add('filling');
        holdTime = 0;
        holdStatus.textContent = 'Keep holding... 💕';
        
        holdInterval = setInterval(() => {
            if (isHolding) {
                holdTime += 10;
                const progress = Math.min((holdTime / requiredHoldTime) * 100, 100);
                holdProgress.style.setProperty('--hold-progress', progress + '%');
                
                if (holdTime >= requiredHoldTime) {
                    clearInterval(holdInterval);
                    isHolding = false;
                    holdBtn.classList.remove('holding');
                    holdBtn.classList.add('completed');
                    holdStatus.textContent = 'Promise confirmed! ✨';
                    holdBtn.disabled = true;
                    setTimeout(() => showNextQuestion(5), 1500);
                }
            }
        }, 10);
    });
    
    holdBtn.addEventListener('touchend', () => {
        if (isHolding) {
            isHolding = false;
            holdBtn.classList.remove('holding');
            holdProgress.classList.remove('filling');
            holdProgress.style.setProperty('--hold-progress', '0%');
            clearInterval(holdInterval);
            if (holdTime < requiredHoldTime) {
                holdStatus.textContent = 'Not quite... hold longer! 💭';
            }
        }
    });
}

document.title = config.pageTitle;

window.addEventListener('DOMContentLoaded', () => {
    validateConfig();

    // Story cover
    const storyTitle = document.getElementById('storyTitle');
    const storySubtitle = document.getElementById('storySubtitle');
    if (storyTitle) storyTitle.textContent = config.storyTitle;
    if (storySubtitle) storySubtitle.textContent = config.storySubtitle;
    
    // Main title
    const valentineTitle = document.getElementById('valentineTitle');
    if (valentineTitle) valentineTitle.textContent = `${config.valentineName}, my love...`;

    // Chapter 1
    const ch1Title = document.getElementById('chapter1Title');
    if (ch1Title) ch1Title.textContent = config.questions.chapter1.title;
    const q1Text = document.getElementById('question1Text');
    if (q1Text) q1Text.textContent = config.questions.chapter1.text;
    const yesBtn1 = document.getElementById('yesBtn1');
    if (yesBtn1) yesBtn1.textContent = config.questions.chapter1.yesBtn;
    const noBtn1 = document.getElementById('noBtn1');
    if (noBtn1) noBtn1.textContent = config.questions.chapter1.noBtn;
    const secretAnswerBtn = document.getElementById('secretAnswerBtn');
    if (secretAnswerBtn) secretAnswerBtn.textContent = config.questions.chapter1.secretAnswer;

    // Chapter 2
    const ch2Title = document.getElementById('chapter2Title');
    if (ch2Title) ch2Title.textContent = config.questions.chapter2.title;
    const q2Text = document.getElementById('question2Text');
    if (q2Text) q2Text.textContent = config.questions.chapter2.text;
    const startText = document.getElementById('startText');
    if (startText) startText.textContent = config.questions.chapter2.startText;
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) nextBtn.textContent = config.questions.chapter2.nextBtn;

    // Chapter 3
    const ch3Title = document.getElementById('chapter3Title');
    if (ch3Title) ch3Title.textContent = config.questions.chapter3.title;
    const q3Text = document.getElementById('question3Text');
    if (q3Text) q3Text.textContent = config.questions.chapter3.text;
    const yesBtn3 = document.getElementById('yesBtn3');
    if (yesBtn3) yesBtn3.textContent = config.questions.chapter3.yesBtn;
    const noBtn3 = document.getElementById('noBtn3');
    if (noBtn3) noBtn3.textContent = config.questions.chapter3.noBtn;
    const secretAnswerBtn3 = document.getElementById('secretAnswerBtn3');
    if (secretAnswerBtn3) secretAnswerBtn3.textContent = config.questions.chapter3.secretAnswer;

    // Chapter 4
    const ch4Title = document.getElementById('chapter4Title');
    if (ch4Title) ch4Title.textContent = config.questions.chapter4.title;
    const q4Text = document.getElementById('question4Text');
    if (q4Text) q4Text.textContent = config.questions.chapter4.text;
    const yesBtn4 = document.getElementById('yesBtn4');
    if (yesBtn4) yesBtn4.textContent = config.questions.chapter4.yesBtn;
    const noBtn4 = document.getElementById('noBtn4');
    if (noBtn4) noBtn4.textContent = config.questions.chapter4.noBtn;
    const secretAnswerBtn4 = document.getElementById('secretAnswerBtn4');
    if (secretAnswerBtn4) secretAnswerBtn4.textContent = config.questions.chapter4.secretAnswer;

    // Chapter 5 (Final)
    const ch5Title = document.getElementById('chapter5Title');
    if (ch5Title) ch5Title.textContent = config.questions.chapter5.title;
    const q5Text = document.getElementById('question5Text');
    if (q5Text) q5Text.textContent = config.questions.chapter5.text;
    const yesBtn5 = document.getElementById('yesBtn5');
    if (yesBtn5) yesBtn5.textContent = config.questions.chapter5.yesBtn;
    const noBtn5 = document.getElementById('noBtn5');
    if (noBtn5) noBtn5.textContent = config.questions.chapter5.noBtn;

    // Initialize everything
    createFloatingElements();
    setupMusicPlayer();
    setupLoveMeter();
    setupTapCounter();
    setupHoldButton();
});

// DOM Elements
const authScreen = document.getElementById('auth-screen');
const videoScreen = document.getElementById('video-screen');
const fingerprintContainer = document.getElementById('fingerprint-container');
const statusText = document.getElementById('status-text');
const countdownText = document.getElementById('countdown-text');
const progressRing = document.querySelector('.progress-ring');
const progressCircle = document.querySelector('.progress-ring-circle');
const accessVideo = document.getElementById('access-video');
const unmuteBtn = document.getElementById('unmute-btn');

// State variables
let isAuthenticating = false;
let countdownInterval = null;

// Get progress circle circumference for animation
const radius = progressCircle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

/**
 * Set progress ring percentage
 * @param {number} percent - Progress percentage (0-100)
 */
function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

/**
 * Start authentication countdown
 */
function startAuthentication() {
    // Prevent multiple clicks
    if (isAuthenticating) return;
    
    isAuthenticating = true;
    
    // Add pulse animation
    fingerprintContainer.classList.add('pulse');
    setTimeout(() => {
        fingerprintContainer.classList.remove('pulse');
        fingerprintContainer.classList.add('scanning');
    }, 600);
    
    // Update status text
    statusText.textContent = 'AUTHENTICATING...';
    
    // Show progress ring
    progressRing.classList.add('active');
    
    // Start countdown
    let timeLeft = 5;
    countdownText.textContent = `ACCESSING... ${timeLeft}`;
    setProgress(0);
    
    countdownInterval = setInterval(() => {
        timeLeft--;
        
        // Update progress
        const progress = ((5 - timeLeft) / 5) * 100;
        setProgress(progress);
        
        if (timeLeft > 0) {
            countdownText.textContent = `ACCESSING... ${timeLeft}`;
        } else {
            // Countdown complete
            clearInterval(countdownInterval);
            countdownText.textContent = 'ACCESS GRANTED';
            statusText.textContent = 'WELCOME';
            
            // Wait a moment then transition to video
            setTimeout(() => {
                transitionToVideo();
            }, 800);
        }
    }, 1000);
}

/**
 * Transition from auth screen to video screen
 */
function transitionToVideo() {
    // Hide auth screen
    authScreen.classList.remove('active');
    
    // Show video screen
    videoScreen.classList.add('active');
    
    // Try to play video with sound
    accessVideo.muted = false;
    accessVideo.play().catch(error => {
        console.log('Autoplay with sound blocked, trying muted:', error);
        // Fallback: play muted if sound is blocked
        accessVideo.muted = true;
        accessVideo.play().catch(err => {
            console.error('Video autoplay failed completely:', err);
        });
    });
}

/**
 * Toggle video mute/unmute
 */
function toggleMute() {
    if (accessVideo.muted) {
        accessVideo.muted = false;
        unmuteBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
            <span>SOUND ON</span>
        `;
        
        // Hide button after a moment
        setTimeout(() => {
            unmuteBtn.classList.add('hidden');
        }, 2000);
    } else {
        accessVideo.muted = true;
        unmuteBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
            <span>TAP TO UNMUTE</span>
        `;
        unmuteBtn.classList.remove('hidden');
    }
}

/**
 * Reset authentication state
 */
function resetAuthentication() {
    isAuthenticating = false;
    fingerprintContainer.classList.remove('scanning');
    progressRing.classList.remove('active');
    statusText.textContent = 'TAP TO AUTHENTICATE';
    countdownText.textContent = '';
    setProgress(0);
    
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

// Event Listeners

// Fingerprint click/tap event
fingerprintContainer.addEventListener('click', startAuthentication);

// Unmute button event
unmuteBtn.addEventListener('click', toggleMute);

// Video ended event - could loop or show replay option
accessVideo.addEventListener('ended', () => {
    // Option 1: Loop the video
    accessVideo.currentTime = 0;
    accessVideo.play();
    
    // Option 2: Return to auth screen (uncomment if preferred)
    // videoScreen.classList.remove('active');
    // authScreen.classList.add('active');
    // resetAuthentication();
});

// Handle video play event
accessVideo.addEventListener('play', () => {
    // Show unmute button only if video is muted
    if (accessVideo.muted) {
        unmuteBtn.classList.remove('hidden');
    } else {
        // Hide button if sound is already on
        setTimeout(() => {
            unmuteBtn.classList.add('hidden');
        }, 2000);
    }
});

// Prevent context menu on long press (mobile)
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Optional: Add touch feedback for better mobile experience
fingerprintContainer.addEventListener('touchstart', () => {
    fingerprintContainer.style.opacity = '0.8';
});

fingerprintContainer.addEventListener('touchend', () => {
    fingerprintContainer.style.opacity = '1';
});

// Initialize
console.log('Biometric Access System Initialized');

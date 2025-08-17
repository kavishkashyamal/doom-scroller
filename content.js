// content.js - Enhanced version with warning system and animations

let timerDiv = null;
let currentWarningLevel = 'normal';
let pulseInterval = null;

/**
 * Formats seconds into a more readable "HH:MM:SS" string.
 */
function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

/**
 * Updates the real-time clock display.
 */
function updateRealTimeClock() {
    const clockEl = document.getElementById('shamescroll-realtime-clock');
    if (clockEl) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        clockEl.textContent = timeString;
    }
}

/**
 * Gets motivational message based on warning level
 */
function getMotivationalMessage(warningLevel, timeSpent) {
    const messages = {
        normal: [
            "Every minute counts.",
            "Time flies when you're scrolling...",
            "Still productive, keep it up!",
        ],
        warning: [
            "Maybe time for a break?",
            "Your future self is watching...",
            "30 minutes of scrolling detected!",
            "Consider doing something creative?",
        ],
        danger: [
            "🚨 DANGER ZONE ACTIVATED 🚨",
            "An hour of your life... gone.",
            "This is getting serious...",
            "Your dreams are calling you back.",
        ]
    };
    
    const levelMessages = messages[warningLevel] || messages.normal;
    return levelMessages[Math.floor(Math.random() * levelMessages.length)];
}

/**
 * Creates pulsing animation for warning states
 */
function startPulseAnimation() {
    if (pulseInterval) clearInterval(pulseInterval);
    
    pulseInterval = setInterval(() => {
        if (timerDiv && currentWarningLevel !== 'normal') {
            timerDiv.style.transform = 'scale(1.05)';
            setTimeout(() => {
                if (timerDiv) timerDiv.style.transform = 'scale(1)';
            }, 150);
        }
    }, 2000);
}

/**
 * Stops pulsing animation
 */
function stopPulseAnimation() {
    if (pulseInterval) {
        clearInterval(pulseInterval);
        pulseInterval = null;
    }
    if (timerDiv) {
        timerDiv.style.transform = 'scale(1)';
    }
}

/**
 * Creates and injects the enhanced timer overlay into the page.
 */
function createTimerOverlay() {
    if (document.getElementById('shamescroll-timer-overlay')) {
        return;
    }

    timerDiv = document.createElement('div');
    timerDiv.id = 'shamescroll-timer-overlay';
    
    // Updated HTML structure for the new design
    timerDiv.innerHTML = `
        <div class="shamescroll-content-wrapper">
            <div class="shamescroll-timer-details">
                <span class="shamescroll-label">TIME WASTED</span>
                <span class="shamescroll-time">00:00:00</span>
                <span id="motivational-message" class="shamescroll-subtext">Every minute counts.</span>
            </div>
            <div class="shamescroll-divider"></div>
            <div class="shamescroll-clock-wrapper">
                <span id="shamescroll-realtime-clock" class="shamescroll-clock"></span>
            </div>
        </div>
        <div class="shamescroll-action-wrapper">
            <button id="shamescroll-toggle-btn" class="shamescroll-close-button" title="Hide/Show Timer">×</button>
        </div>
    `;

    // Add enhanced styles with animations and new shape
    const style = document.createElement('style');
    style.textContent = `
        #shamescroll-timer-overlay { 
            position: fixed !important; 
            bottom: 20px !important; 
            right: 20px !important; 
            background: rgba(30, 32, 42, 0.9) !important;
            color: #F9FAFB !important; 
            border-radius: 12px !important; 
            z-index: 999999 !important; 
            border: 1px solid rgba(255, 255, 255, 0.1) !important; 
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3) !important; 
            backdrop-filter: blur(8px) !important; 
            -webkit-backdrop-filter: blur(8px) !important; 
            display: flex !important; 
            align-items: stretch !important; 
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) !important; 
            overflow: hidden !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }
        
        #shamescroll-timer-overlay.warning-state { border-color: #F59E0B !important; }
        #shamescroll-timer-overlay.danger-state { border-color: #EF4444 !important; }

        .shamescroll-content-wrapper {
            display: flex;
            align-items: center;
            padding: 8px 12px;
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .shamescroll-timer-details {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        .shamescroll-label {
            color: #9CA3AF !important;
            font-size: 10px !important;
            text-transform: uppercase !important;
            font-weight: 600 !important;
            letter-spacing: 0.5px !important;
        }

        .shamescroll-time {
            color: #F87171 !important;
            font-weight: 600 !important;
            font-size: 24px !important;
            font-family: 'Courier New', Monaco, monospace !important;
            line-height: 1.1;
        }

        .warning-state .shamescroll-time { color: #F59E0B !important; }
        .danger-state .shamescroll-time {
            color: #EF4444 !important;
            animation: pulse-danger 2s infinite !important;
        }

        @keyframes pulse-danger {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }

        .shamescroll-subtext {
            font-size: 11px !important;
            color: #6B7280 !important;
            font-style: italic !important;
            line-height: 1.2 !important;
        }
        
        .warning-state .shamescroll-subtext { color: #D97706 !important; }
        .danger-state .shamescroll-subtext { color: #DC2626 !important; font-weight: 600 !important; }

        .shamescroll-divider {
            width: 1px;
            background-color: rgba(255, 255, 255, 0.1);
            margin: 0 12px;
            align-self: stretch;
        }

        .shamescroll-clock-wrapper {
            display: flex;
            align-items: center;
        }

        .shamescroll-clock {
            font-size: 20px;
            font-weight: 500;
            color: #D1D5DB;
            font-family: 'Courier New', Monaco, monospace !important;
        }
        
        .shamescroll-action-wrapper {
            display: flex;
            align-items: center;
            padding: 0 6px 0 0;
        }

        .shamescroll-close-button {
            background: rgba(75, 85, 99, 0.4) !important;
            border: none !important;
            color: #E5E7EB !important;
            cursor: pointer !important;
            font-size: 20px !important;
            line-height: 1 !important;
            border-radius: 8px !important;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1) !important;
        }
        
        .shamescroll-close-button:hover {
            background: rgba(107, 114, 128, 0.6) !important;
        }

        /* Hidden State for Animation */
        #shamescroll-timer-overlay.hidden-state {
            background: transparent !important;
            border-color: transparent !important;
            box-shadow: none !important;
            width: 44px !important;
            height: 44px !important;
        }
        
        #shamescroll-timer-overlay.hidden-state .shamescroll-content-wrapper {
            max-width: 0 !important;
            padding: 8px 0 !important;
            opacity: 0 !important;
            visibility: hidden;
        }
        
        #shamescroll-timer-overlay.hidden-state .shamescroll-close-button {
            transform: rotate(135deg) !important;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(timerDiv);

    // Start the real-time clock
    updateRealTimeClock();
    setInterval(updateRealTimeClock, 1000);

    // Add event listeners
    const toggleBtn = document.getElementById('shamescroll-toggle-btn');
    
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = timerDiv.classList.toggle('hidden-state');
        chrome.storage.local.set({ isTimerHidden: isHidden });
    });

    // Check storage for hidden state
    chrome.storage.local.get('isTimerHidden', (data) => {
        if (data.isTimerHidden) {
            timerDiv.classList.add('hidden-state');
        }
    });
}

/**
 * Updates the warning state of the timer
 */
function updateWarningState(warningLevel) {
    if (!timerDiv) return;
    
    currentWarningLevel = warningLevel;
    
    // Remove existing warning classes
    timerDiv.classList.remove('warning-state', 'danger-state');

    // Add appropriate warning class
    if (warningLevel === 'warning') {
        timerDiv.classList.add('warning-state');
        startPulseAnimation();
    } else if (warningLevel === 'danger') {
        timerDiv.classList.add('danger-state');
        startPulseAnimation();
    } else {
        stopPulseAnimation();
    }
}

/**
 * Updates the motivational message
 */
function updateMotivationalMessage(warningLevel, timeSpent) {
    const messageEl = document.getElementById('motivational-message');
    if (messageEl) {
        messageEl.textContent = getMotivationalMessage(warningLevel, timeSpent);
    }
}

/**
 * Removes the timer overlay from the page.
 */
function removeTimerOverlay() {
    const existingTimer = document.getElementById('shamescroll-timer-overlay');
    if (existingTimer) {
        existingTimer.remove();
        timerDiv = null;
    }
    stopPulseAnimation();
}

// Enhanced message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'SHAME_UPDATE') {
        if (message.isTracking) {
            if (!timerDiv) {
                createTimerOverlay();
            }
            
            const timeEl = document.querySelector('#shamescroll-timer-overlay .shamescroll-time');
            if (timeEl) {
                timeEl.textContent = formatTime(message.time);
            }
            
            // Update warning state and motivational message
            const warningLevel = message.warningLevel || 'normal';
            updateWarningState(warningLevel);
            updateMotivationalMessage(warningLevel, message.time);
            
        } else {
            removeTimerOverlay();
        }
    }
});

// Enhanced initial check when the script loads
chrome.runtime.sendMessage({ type: 'GET_CURRENT_STATUS' }, (response) => {
    if (chrome.runtime.lastError) {
        // Handle error, e.g., if the background script is not ready
        console.log("Could not connect to background script. It might be inactive.");
        return;
    }
    if (response && response.isTracking) {
        if (!timerDiv) {
            createTimerOverlay();
        }
        
        const timeEl = document.querySelector('#shamescroll-timer-overlay .shamescroll-time');
        if (timeEl) {
            timeEl.textContent = formatTime(response.time);
        }
        
        const warningLevel = response.warningLevel || 'normal';
        updateWarningState(warningLevel);
        updateMotivationalMessage(warningLevel, response.time);
    }
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    stopPulseAnimation();
});

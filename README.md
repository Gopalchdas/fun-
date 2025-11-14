# Futuristic Sci-Fi Biometric Access Website

A mobile-optimized biometric authentication interface with sci-fi aesthetics and video playback.

## Features

- 🔐 Fingerprint authentication interface with neon glow effects
- ⏱️ 5-second countdown with circular progress animation
- 🎬 Full-screen video playback after authentication
- 🔊 Tap-to-unmute functionality for mobile compatibility
- 📱 Fully responsive design for all mobile screens
- ✨ Smooth sci-fi animations (pulse, glow, fade effects)
- 🎨 Dark theme with cyan/magenta neon accents

## Setup Instructions

1. **Add Your Video File**
   - Place your video file in the `assets` folder
   - Name it `access.mp4` (or update the path in `index.html`)
   - Recommended: Use a compressed MP4 format (H.264 codec) for best mobile compatibility

2. **Optional: Custom Fingerprint Image**
   - The project includes an SVG fingerprint icon by default
   - To use a PNG image instead, replace the SVG in `index.html` with:
     ```html
     <img src="assets/fingerprint.png" alt="Fingerprint" class="fingerprint">
     ```
   - Place your `fingerprint.png` file in the `assets` folder

3. **Open the Website**
   - Simply open `index.html` in a web browser
   - For mobile testing, use browser dev tools or deploy to a web server

## File Structure

```
project/
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Interactive functionality
├── assets/             # Media files folder
│   └── access.mp4      # Video file (add your own)
└── README.md           # This file
```

## How It Works

1. **Authentication Screen**: User sees a glowing fingerprint on a sci-fi background
2. **Tap to Authenticate**: Clicking/tapping the fingerprint triggers the authentication
3. **Countdown**: 5-second countdown with circular progress animation
4. **Access Granted**: After countdown, video screen appears
5. **Video Playback**: Full-screen video plays automatically (muted)
6. **Unmute Option**: Tap the unmute button to enable sound

## Browser Compatibility

- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Safari (iOS)
- ✅ Firefox (Desktop & Mobile)
- ✅ Samsung Internet

## Mobile Autoplay Notes

- Video starts muted to comply with mobile autoplay policies
- Users can tap the "Tap to Unmute" button to enable sound
- The video will loop automatically when it ends

## Customization

### Colors
Edit the CSS variables in `style.css`:
- Primary glow: `#00ffff` (cyan)
- Secondary glow: `#ff00ff` (magenta)
- Background: `#0a0a1a` to `#1a0a2e` gradient

### Countdown Duration
Change the countdown time in `script.js`:
```javascript
let timeLeft = 5; // Change to desired seconds
```

### Video Behavior
In `script.js`, choose between looping or returning to auth screen:
```javascript
// Option 1: Loop (default)
accessVideo.currentTime = 0;
accessVideo.play();

// Option 2: Return to auth screen (uncomment)
// videoScreen.classList.remove('active');
// authScreen.classList.add('active');
// resetAuthentication();
```

## Performance Tips

- Compress your video file for faster loading
- Use MP4 format with H.264 codec
- Recommended video resolution: 1080p or lower for mobile
- Keep video file size under 10MB for best performance

## License

Free to use for personal and commercial projects.

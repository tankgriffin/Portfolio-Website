# Video Preview Setup Guide

## 1. Video File Organization

Create a `public/videos/` directory in your project root:

```
public/
├── videos/
│   ├── scrapper-demo.mp4
│   ├── tictactoe-demo.mp4
│   ├── portfolio-demo.mp4
│   └── default-demo.mp4
└── index.html
```

## 2. Video Recording Best Practices

### Recording Setup
- **Duration**: Keep videos between 10-30 seconds
- **Resolution**: 1920x1080 or 1280x720 for web optimization
- **Format**: MP4 with H.264 encoding for best browser compatibility
- **File Size**: Aim for under 5MB per video

### Recording Content
- Show the most interesting features first
- Include smooth transitions between features
- Record at normal speed (avoid rapid clicking)
- Ensure good lighting and clear screen visibility

### Tools for Recording
- **OBS Studio** (Free, cross-platform)
- **QuickTime Player** (Mac - built-in screen recording)
- **Windows Game Bar** (Windows 10/11 - Win+G)
- **Loom** (Web-based with easy sharing)

## 3. Video Optimization

### Compression
```bash
# Using FFmpeg to optimize videos
ffmpeg -i input.mp4 -vcodec h264 -acodec mp2 -crf 23 -preset medium output.mp4
```

### Web-Ready Format
- Container: MP4
- Video Codec: H.264
- Audio Codec: AAC (if audio needed)
- Bitrate: 1-3 Mbps for 1080p

## 4. Naming Convention

Use consistent naming that matches your repo names:

```javascript
// Project name transformations
'My-Awesome-Project' → 'my-awesome-project'
'ticTacToe' → 'tictactoe'
'portfolio_site' → 'portfolio-site'
```

## 5. Fallback Strategy

Always provide a default video for projects without specific recordings:

```javascript
const getVideoUrl = (repoName) => {
  const cleanName = repoName.toLowerCase().replace(/[^a-z0-9]/g, '');
  return projectVideos[cleanName] || '/videos/default-demo.mp4';
};
```

## 6. Performance Considerations

### Lazy Loading
Videos only load when hovered, reducing initial page load time.

### Preload Strategy
```html
<video preload="metadata"> <!-- Only loads video metadata -->
<video preload="none">     <!-- No preloading -->
<video preload="auto">     <!-- Full preload (use sparingly) -->
```

### Mobile Optimization
The CSS includes responsive breakpoints to ensure previews work on mobile devices.

## 7. Alternative Implementations

### GIF Alternative
If video files become too large, consider animated GIFs:
- Smaller file sizes
- No audio synchronization needed
- Universal browser support

### Progressive Loading
For larger projects, implement progressive video loading:
```javascript
const [videoLoaded, setVideoLoaded] = useState(false);

<video
  onLoadedData={() => setVideoLoaded(true)}
  style={{ opacity: videoLoaded ? 1 : 0 }}
>
```

## 8. Accessibility

- Include meaningful alt text descriptions
- Provide keyboard navigation options
- Ensure sufficient color contrast in preview text
- Consider reduced motion preferences

```css
@media (prefers-reduced-motion: reduce) {
  .project-preview-window {
    animation: none;
  }
}
```
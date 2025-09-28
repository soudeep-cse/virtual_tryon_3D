# Virtual Try-On 3D Rendering
This project allows users to try on virtual glasses and hats using their webcam, providing an interactive experience with real-time AR capabilities.

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/soudeep-cse/virtual_try_on_3d_rendering.git
cd virtual_try_on_3d_rendering
```

### 2. Install Dependencies
**Node.js (Optional for additional features):**
```bash
npm install
```

### 3. Run the Application

#### Method 1: Using VS Code Live Server (Recommended)
1. Open VS Code
2. Install the "Live Server" extension by Ritwick Dey
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server"
   - Click Install
3. Open your project folder in VS Code
   - File → Open Folder → Select your project directory
4. Right-click on `index.html` file
5. Select "Open with Live Server"
6. Your default browser will open automatically with the application
7. Allow camera permissions when prompted

#### Method 2: Alternative Local Servers
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx live-server

# Using PHP
php -S localhost:8000
```

## Project Structure
```
virtual_try_on_3d_rendering/
├── css/
│   └── styles.css
├── js/
│   └── scripts.js
├── models/
│   ├── glasses.glb
│   └── hat.glb
├── index.html
└── README.md
```

## Technologies Used

### Frontend
- **Three.js** - 3D graphics and rendering
- **WebXR** - Augmented reality capabilities
- **Face-api.js** - Facial landmark detection
- **HTML5 Canvas** - Real-time rendering
- **WebRTC** - Camera access

### AI/Face Detection
- **Mediapipe** - Real-time face detection and tracking
- **TensorFlow.js** - Machine learning in browser

### 3D Models
- **GLB format** - Optimized 3D models for glasses and hats

## Features
- ✅ Real-time face detection and tracking
- ✅ Virtual glasses and hat overlay
- ✅ Responsive design for various screen sizes
- ✅ Cross-platform compatibility
- ✅ Smooth 3D rendering performance
- ✅ Adjustable accessory size and position
- ✅ Multiple accessory options

## Usage
1. Launch the application using VS Code Live Server
2. Allow camera access when prompted
3. Position your face in front of the camera
4. Select glasses or hat from the available options
5. Use sliders to adjust size and position
6. See the virtual accessories rendered in real-time on your face

## Development Setup

### Prerequisites
- Modern web browser with WebGL support
- Webcam access
- VS Code editor
- Live Server extension

### Step-by-Step Setup in VS Code
1. **Install VS Code**: Download from [code.visualstudio.com](https://code.visualstudio.com/)

2. **Install Live Server Extension**:
   - Open VS Code
   - Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
   - Search for "Live Server"
   - Install the extension by Ritwick Dey

3. **Open Project**:
   - File → Open Folder
   - Select your project directory
   - Navigate to `index.html`

4. **Start Live Server**:
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Or use shortcut `Alt+L Alt+O`

5. **Access Application**:
   - Browser opens automatically at `http://127.0.0.1:5500`
   - Allow camera permissions
   - Start trying on virtual accessories!

## Browser Compatibility
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## Troubleshooting

### Common Issues
1. **Camera not working**: Ensure you've allowed camera permissions
2. **Live Server not starting**: Check if the extension is properly installed
3. **3D models not loading**: Verify file paths in the models directory
4. **Performance issues**: Try closing other browser tabs or applications

### Camera Permissions
- **Chrome**: Click the camera icon in the address bar
- **Firefox**: Click the shield icon and allow camera access
- **Safari**: Safari → Preferences → Websites → Camera


## Known Issues
- Performance may vary on older devices
- Safari requires HTTPS for camera access in production
- Some 3D models may need optimization for mobile devices
- Face detection accuracy depends on lighting conditions

## Future Enhancements
- [ ] Multiple accessory categories (jewelry, makeup)
- [ ] Photo capture functionality
- [ ] Social sharing features
- [ ] ML-based size fitting recommendations
- [ ] Cloud-based model storage
- [ ] Mobile app version
- [ ] Virtual makeup try-on
- [ ] AR filters and effects

## Performance Tips
- Use a well-lit environment for better face detection
- Close unnecessary browser tabs
- Use a modern browser for optimal performance
- Ensure stable internet connection for model loading

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author
**Soudeep**
- GitHub: [@soudeep-cse](https://github.com/soudeep-cse)

## Acknowledgments
- Three.js community for excellent 3D web graphics
- MediaPipe team for face detection capabilities
- Face-api.js contributors for facial landmark detection
- WebXR working group for AR standards
- VS Code Live Server extension developers

## Support
If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Open an issue on GitHub
3. Contact the author through GitHub

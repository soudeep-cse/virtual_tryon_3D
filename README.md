# Virtual Try-On 3D Rendering

This project allows users to try on virtual glasses and hats using their webcam, providing an interactive experience with real-time AR capabilities.

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/soudeep-cse/virtual_try_on_3d_rendering.git
cd virtual_try_on_3d_rendering
```

### 2. Install Dependencies
**Node.js:**
```bash
npm install
```

**Python (if using backend):**
```bash
pip install -r requirements.txt
```

### 3. Run the Application
- Open `index.html` with Live Server in VS Code
- Or directly open in your browser
- Allow camera permissions when prompted

## Project Structure

```
task-1/
├── css/
│   └── styles.css
├── js/
│   ├── loader.js
│   └── scripts.js
├── models/
│   ├── glasses.glb
│   └── hat.glb
└── index.html
```

## Technologies Used

### Frontend
- **Three.js** - 3D graphics and rendering
- **WebXR** - Augmented reality capabilities
- **Face-api.js** - Facial landmark detection

### Backend (Optional)
- **FastAPI** or **Flask** - API services

### AI/Face Detection
- **Mediapipe** - Real-time face detection and tracking

### 3D Models
- **GLB format** - Optimized 3D models for glasses and hats

## Features

- Real-time face detection and tracking
- Virtual glasses and hat overlay
- Responsive design for various screen sizes
- Cross-platform compatibility
- Smooth 3D rendering performance

## Usage

1. Launch the application in your browser
2. Allow camera access when prompted
3. Position your face in front of the camera
4. Select glasses or hat from the available options
5. See the virtual accessories rendered in real-time on your face

## Development

### Prerequisites
- Modern web browser with WebGL support
- Webcam access
- Local server (recommended for development)

### Running Locally
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx live-server

# Using PHP
php -S localhost:8000
```

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Known Issues

- Performance may vary on older devices
- Safari requires HTTPS for camera access
- Some 3D models may need optimization for mobile devices

## Future Enhancements

- Multiple accessory categories (ewelry, makeup)
- Photo capture functionality
- Social sharing features
- ML-based size fitting recommendations
- Cloud-based model storage

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

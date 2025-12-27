# TV Status Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)

A custom Home Assistant Lovelace card to display and control the status of a TV media player entity.

![TV Status Card Preview](images/preview.png)

## Features

- 📺 Displays TV on/off status with dynamic icons
- 🖱️ Click to toggle TV on/off
- ✨ Clean, modern design with smooth transitions
- 🎨 Responsive and customizable styling
- ⚠️ Error handling for missing entities

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click the three-dot menu in the top right corner
3. Select **Custom repositories**
4. Add your repository URL: `https://github.com/YOUR_USERNAME/tv-status-card`
5. Select **Lovelace** as the category
6. Click **Add**
7. Find "TV Status Card" in the HACS store and click **Download**
8. Restart Home Assistant

### Manual Installation

1. Download the `tv-status-card.js` file from the `dist` folder
2. Copy it to your `config/www` folder
3. Add the resource in your Lovelace configuration:

```yaml
resources:
  - url: /local/tv-status-card.js
    type: module
```

## Configuration

Add the card to your dashboard:

```yaml
type: custom:tv-status-card
entity: media_player.fred_s_bed_tv_2
```

### Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `type` | string | **Yes** | Must be `custom:tv-status-card` |
| `entity` | string | **Yes** | The media player entity ID to control |

## Usage

- **View Status**: The card displays the current state of your TV
- **Toggle**: Click on the card to turn the TV on or off
- **States**: Shows "TV is OFF" (dimmed) when off, "TV is ON" when on

## File Structure

```
tv-status-card/
├── dist/
│   └── tv-status-card.js    # Main component (use this file)
├── hacs.json                 # HACS configuration
├── README.md                 # Documentation
└── .gitignore
```

## Troubleshooting

**Card not showing:**
- Clear your browser cache (Ctrl+Shift+R)
- Verify the resource is loaded correctly
- Check browser console (F12) for errors

**Entity not found:**
- Confirm the entity ID exists in Developer Tools → States
- Check for typos in the entity name

**Toggle not working:**
- Verify your TV supports `media_player.turn_on` / `media_player.turn_off` services

## Browser Support

- Chrome/Edge 79+
- Firefox 78+
- Safari 13+

## License

MIT License - Feel free to use and modify!

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

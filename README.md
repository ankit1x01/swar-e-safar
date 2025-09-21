# Swar-e-Safar 🎵

**Your Musical Journey Through Lyrics**

A beautiful Next.js application that displays a listing of songs and shows their lyrics with integrated advertisements.

## Features

✨ **Song Listing**: Browse through a collection of songs with artist information  
🎼 **Lyrics Display**: Click on any song to view its complete lyrics  
📱 **Responsive Design**: Beautiful gradient backgrounds and responsive layout  
💰 **Advertisement Integration**: Contextual ads displayed at the end of each lyrics page  
🔍 **Easy Navigation**: Smooth transitions between song list and individual song pages  

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

## Adding Your Own Songs

### CSV Format

Replace the `/public/songs.csv` file with your own song data. The CSV should have the following columns:

```csv
title,artist,lyrics,album,genre,duration
"Song Title","Artist Name","Line 1
Line 2
Line 3","Album Name","Genre","Duration"
```

### Important Notes:

- **Lyrics**: Use line breaks within the quotes to separate verses
- **Multi-line Support**: The app handles multi-line lyrics properly
- **Optional Fields**: Album, genre, and duration are optional but recommended
- **File Location**: Place your CSV file in the `public` folder as `songs.csv`

### Example CSV Structure:

```csv
title,artist,lyrics,album,genre,duration
"My Song","Artist Name","This is line 1
This is line 2
This is the chorus","My Album","Pop","3:45"
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Main layout and metadata
│   ├── page.tsx            # Home page with song listing
│   └── song/[id]/
│       └── page.tsx        # Individual song lyrics page
├── components/
│   └── AdComponent.tsx     # Advertisement component
├── types/
│   └── song.ts             # TypeScript interfaces
└── utils/
    └── csvParser.ts        # CSV parsing utilities
```

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling and responsive design
- **Papa Parse** - CSV parsing
- **React Hooks** - State management

## Customization

### Styling
- Modify the gradient backgrounds in `page.tsx` files
- Update Tailwind classes for different color schemes
- Customize the glass-morphism effects

### Advertisements
- Edit `src/components/AdComponent.tsx` to customize ad content
- Add real advertisement integration (Google AdSense, etc.)
- Implement different ad types or rotations

### Features to Add
- Search functionality
- Artist filtering
- Favorites system
- Audio playback integration
- User ratings and comments

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is created for educational purposes. Please ensure you have proper rights to any song lyrics you include.

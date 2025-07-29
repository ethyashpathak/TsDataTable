# Art Institute of Chicago - DataTable Application

A modern React TypeScript application that displays artworks from the Art Institute of Chicago API using PrimeReact's DataTable component with advanced features like server-side pagination and persistent row selection.

## 🎨 Features

- **Server-Side Pagination**: Fresh data fetched on every page change
- **Row Selection**: Individual and bulk selection with checkboxes
- **Persistent Selection**: Selections maintained across page navigation
- **Memory Efficient**: Only current page data stored, preventing memory leaks
- **Responsive Design**: Optimized for various screen sizes
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Graceful error management and user feedback
- **Custom Selection Panel**: Visual display of selected items with removal capability

## 🚀 Tech Stack

- **React 19.1.0** - Modern React with latest features
- **TypeScript 5.8.3** - Strict type safety and modern JS features
- **Vite 7.0.4** - Fast development and build tool
- **PrimeReact 10.9.6** - Professional UI component library
- **Art Institute of Chicago API** - Real artwork data source

## 📋 Requirements Implemented

✅ React app created with Vite  
✅ TypeScript implementation (no JavaScript)  
✅ PrimeReact DataTable integration  
✅ Server-side pagination with API calls on every page change  
✅ Row selection with checkboxes (individual and select all)  
✅ Custom row selection panel  
✅ Persistent selection across page changes  
✅ Memory-efficient implementation  
✅ Display specific fields: title, place_of_origin, artist_display, inscriptions, date_start, date_end  

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DataTs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── ArtworksTable.tsx        # Main DataTable component
│   └── RowSelectionPanel.tsx    # Selection display panel
├── hooks/
│   └── useArtworks.ts           # Custom hook for API & state management
├── types/
│   └── api.ts                   # TypeScript interfaces
├── App.tsx                      # Root component
├── main.tsx                     # Application entry point
└── App.css                      # Styling
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build

## 🎯 Key Components

### ArtworksTable
Main component that renders the DataTable with:
- Pagination controls
- Column templates for data display
- Selection checkboxes
- Loading overlays

### RowSelectionPanel
Custom panel that shows:
- Count of selected items
- Individual selection chips
- Remove individual items
- Clear all selections

### useArtworks Hook
Custom hook managing:
- API calls to Art Institute
- Pagination state
- Selection state persistence
- Loading and error states

## 🔄 API Integration

**Base URL**: `https://api.artic.edu/api/v1/artworks`

**Endpoints Used**:
- `GET /artworks?page={page}` - Paginated artwork list
- `GET /artworks/{id}` - Individual artwork details

**Data Fields**:
- `id` - Unique identifier
- `title` - Artwork title
- `place_of_origin` - Geographic origin
- `artist_display` - Artist information
- `inscriptions` - Text inscriptions
- `date_start` - Creation start date
- `date_end` - Creation end date

## 💡 Architecture Highlights

### Memory Optimization
- Only current page data stored in state
- Selection tracking using IDs only (Set data structure)
- On-demand detail fetching for selection panel
- No accumulation of historical page data

### Performance Features
- `useCallback` for function memoization
- Set operations for O(1) selection lookup
- Parallel API requests for selection details
- Cache-busting for fresh data guarantee

### TypeScript Integration
- Strict type checking enabled
- Explicit type imports with `verbatimModuleSyntax`
- Complete API response typing
- Runtime type safety with fallbacks

## 🎨 UI/UX Features

### Loading States
- DataTable built-in loading indicator
- Custom overlay spinner
- Selection panel loading for details

### Error Handling
- Network error recovery
- User-friendly error messages
- Graceful degradation

### Selection UX
- Visual feedback for selections
- Indeterminate state for partial selections
- Persistent selections across navigation
- Easy removal from selection panel

## 🔍 Code Quality

- **ESLint** configuration for code standards
- **TypeScript strict mode** for type safety
- **Modern React patterns** (hooks, functional components)
- **Separation of concerns** (custom hooks, components)
- **Performance optimizations** (memoization, efficient data structures)

## 🌐 Browser Support

- Modern browsers supporting ES2022
- Chrome 89+
- Firefox 89+
- Safari 14+
- Edge 89+

## 📝 Development Notes

### State Management
Uses React's built-in state management with custom hooks rather than external libraries like Redux for simplicity and performance.

### API Strategy
Implements server-side pagination to handle large datasets efficiently without overwhelming the client or API.

### Selection Persistence
Maintains selections across page changes using a Set of IDs, allowing users to build selections across multiple pages.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Art Institute of Chicago](https://www.artic.edu/) for providing the public API
- [PrimeReact](https://primereact.org/) for the excellent UI components
- [Vite](https://vitejs.dev/) for the fast development experience

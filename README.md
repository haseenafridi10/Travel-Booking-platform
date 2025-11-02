# TravelScape - Modern Travel Booking Website

A fully responsive, feature-rich travel booking website built with Next.js 13, TypeScript, and Tailwind CSS. This application provides an intuitive interface for browsing destinations, viewing packages, and booking vacation experiences.

## Features

### ✅ Multi-step Booking Form
- Step-by-step wizard for destination, dates, travelers, and preferences
- Visual progress indicator showing current step
- Comprehensive form validation with helpful error messages
- Smooth transitions between steps

### ✅ Interactive Destination Map
- Visual map with clickable destination markers
- Hover tooltips showing destination details and images
- Animated selection highlighting
- Smooth scroll to relevant packages

### ✅ Hotel & Package Gallery
- Card-based layout with beautiful imagery
- Favorite heart icon that toggles fill color
- Sortable by price, rating, or popularity
- Filtering by selected destination
- Responsive grid layout

### ✅ Date Range Picker
- Custom calendar component using react-day-picker
- Disabled past dates
- Check-in/check-out date selection
- Touch-friendly for mobile devices

### ✅ Customer Review System
- Star rating displays (5-star system)
- Expandable review cards with excerpts
- "Read more/Show less" toggle functionality
- Load more button for additional reviews
- Avatar images and reviewer information

### ✅ Price Calculator
- Dynamic price updates based on selections
- Detailed breakdown modal
- Currency converter (USD, EUR, GBP)
- Real-time calculations for:
  - Room rates by type
  - Number of nights
  - Additional services
  - Child discounts
  - Taxes

### ✅ Mobile Optimization
- Fully responsive design for all screen sizes
- Touch-friendly date picker and form elements
- Collapsible sections for better mobile UX
- Optimized images from Pexels CDN
- Mobile-first approach

## Technology Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Calendar**: react-day-picker

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/app
  /page.tsx              # Main page component
  /layout.tsx            # Root layout
  /globals.css           # Global styles

/components
  /travel
    /Hero.tsx            # Hero section with CTA
    /DestinationMap.tsx  # Interactive destination map
    /PackageGallery.tsx  # Package cards with sorting/filtering
    /BookingForm.tsx     # Multi-step booking wizard
    /PriceCalculator.tsx # Dynamic price calculator
    /ReviewSection.tsx   # Customer reviews

  /ui                    # shadcn/ui components
    /button.tsx
    /card.tsx
    /dialog.tsx
    /calendar.tsx
    /select.tsx
    /checkbox.tsx
    /... (and more)
```

## Key Features Implementation

### Multi-Step Form
The booking form uses a state-driven wizard with 5 steps:
1. Destination selection
2. Date range picker
3. Travelers and room type
4. Additional preferences
5. Review and confirmation

Each step has validation that must pass before proceeding to the next step.

### Price Calculation
The price calculator dynamically computes:
- Base room rate × number of nights
- Additional services (airport transfer, breakfast, tours, etc.)
- Child discounts
- 10% tax
- Currency conversion

### Responsive Design
- Mobile: Single column layout, collapsible sections
- Tablet: 2-column package grid
- Desktop: 4-column package grid
- All interactive elements are touch-optimized

### Image Optimization
All images are loaded from Pexels CDN with optimized parameters for faster loading.

## Build for Production

```bash
npm run build
npm run start
```

The application is configured for static export, making it suitable for deployment to any static hosting service.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Static site generation for optimal performance
- Optimized images with proper sizing
- Minimal JavaScript bundle
- Fast page loads
- Smooth animations and transitions

## Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Focus states for interactive elements
- Screen reader friendly

## Future Enhancements

- Integration with real booking API
- User authentication and saved trips
- Payment gateway integration
- Email notifications
- Multi-language support
- Advanced filtering options
- Real-time availability checking

## License

MIT License - feel free to use this project for learning or as a template for your own travel booking website.

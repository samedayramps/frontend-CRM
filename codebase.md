# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}

```

# tailwind.config.js

```js
// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

# postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

# package.json

```json
{
  "name": "ramp-rental-app-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@emotion/react": "^11.13.3",
    "@emotion/styled": "^11.13.0",
    "@mui/icons-material": "^6.1.1",
    "@mui/material": "^6.1.1",
    "@react-google-maps/api": "^2.19.3",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/react": "^18.3.7",
    "@types/react-dom": "^18.3.0",
    "@types/react-router-dom": "^5.3.3",
    "axios": "^1.7.7",
    "lodash": "^4.17.21",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@types/lodash": "^4.17.7",
    "@types/node": "^22.5.5",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.12"
  }
}

```

# netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

# backend-documentation

```
# Ramp Rental API Documentation

## Endpoints

### Quotes

#### GET /api/quotes
- Description: Retrieve all quotes
- Response: Array of Quote objects

#### GET /api/quotes/:id
- Description: Retrieve a specific quote
- Parameters: 
  - id: Quote ID
- Response: Quote object

#### POST /api/quotes
- Description: Create a new quote
- Request Body:
  - customerId: Customer ID
  - rentalRequestId (optional): Rental Request ID
  - rampConfiguration:
    - components: Array of ramp component names
    - totalLength: Total length of the ramp
    - rentalDuration: Duration of the rental in months
- Response: Created Quote object

#### PUT /api/quotes/:id
- Description: Update an existing quote
- Parameters:
  - id: Quote ID
- Request Body:
  - rampConfiguration: Updated ramp configuration
  - pricingCalculations: Updated pricing calculations
- Response: Updated Quote object

#### DELETE /api/quotes/:id
- Description: Delete a quote
- Parameters:
  - id: Quote ID
- Response: Success message

### Customers

#### GET /api/customers
- Description: Retrieve all customers
- Response: Array of Customer objects

#### GET /api/customers/:id
- Description: Retrieve a specific customer
- Parameters:
  - id: Customer ID
- Response: Customer object

#### POST /api/customers
- Description: Create a new customer
- Request Body: Customer data (firstName, lastName, phone, email, installAddress, mobilityAids, preferredContactMethod, notes)
- Response: Created Customer object

#### PUT /api/customers/:id
- Description: Update an existing customer
- Parameters:
  - id: Customer ID
- Request Body: Updated customer data
- Response: Updated Customer object

#### POST /api/customers/from-rental-request/:rentalRequestId
- Description: Create a customer from a rental request
- Parameters:
  - rentalRequestId: Rental Request ID
- Response: Created Customer object

#### DELETE /api/customers/:id
- Description: Delete a customer
- Parameters:
  - id: Customer ID
- Response: Success message

### Rental Requests

#### GET /api/rental-requests
- Description: Retrieve all rental requests
- Response: Array of RentalRequest objects

#### GET /api/rental-requests/:id
- Description: Retrieve a specific rental request
- Parameters:
  - id: Rental Request ID
- Response: RentalRequest object

#### POST /api/rental-requests
- Description: Create a new rental request
- Request Body: Rental request data (customerInfo, rampDetails, installAddress)
- Response: Created RentalRequest object

#### PUT /api/rental-requests/:id
- Description: Update an existing rental request
- Parameters:
  - id: Rental Request ID
- Request Body: Updated rental request data
- Response: Updated RentalRequest object

### Pricing Variables

#### GET /api/pricing-variables
- Description: Retrieve the latest pricing variables
- Response: PricingVariables object

#### POST /api/pricing-variables
- Description: Create new pricing variables
- Request Body: Pricing variable data (baseDeliveryFee, deliveryFeePerMile, baseInstallFee, installFeePerComponent, monthlyRentalRatePerFt)
- Response: Created PricingVariables object

#### PUT /api/pricing-variables/:id
- Description: Update existing pricing variables
- Parameters:
  - id: Pricing Variables ID
- Request Body: Updated pricing variable data
- Response: Updated PricingVariables object

### Payments

#### POST /api/payments/create-link
- Description: Create a payment link for a quote
- Request Body:
  - quoteId: Quote ID
- Response: Payment link URL and PaymentIntent ID

#### GET /api/payments/status/:paymentIntentId
- Description: Check the status of a payment
- Parameters:
  - paymentIntentId: Stripe PaymentIntent ID
- Response: Payment status, amount, and associated Quote ID

### E-Signatures

#### POST /api/esignatures/send
- Description: Send an e-signature request
- Request Body:
  - templateId: E-signature template ID
  - signers: Array of signer objects (name, email)
  - metadata (optional): Additional metadata
  - placeholderFields (optional): Array of placeholder field objects (api_key, value)
- Response: E-signature request result

#### GET /api/esignatures/status/:contractId
- Description: Check the status of an e-signature request
- Parameters:
  - contractId: E-signature contract ID
- Response: E-signature status


# Pricing Calculation Logic

The pricing calculation for ramp rentals is performed in the `calculatePricing` function in `src/services/pricingService.ts`. Here's a breakdown of the calculation:

1. Retrieve the latest pricing variables from the database.
2. Calculate the distance between the company address and the customer's address using the Google Maps Distance Matrix API.
3. Calculate the delivery fee:
   - deliveryFee = baseDeliveryFee + (deliveryFeePerMile * distance)
4. Calculate the installation fee:
   - installFee = baseInstallFee + (installFeePerComponent * number of ramp components)
5. Calculate the monthly rental rate:
   - monthlyRentalRate = monthlyRentalRatePerFt * total ramp length
6. Calculate the total rental cost:
   - totalRentalCost = monthlyRentalRate * rental duration (in months)
7. Calculate the total amount:
   - totalAmount = deliveryFee + installFee + totalRentalCost

The function returns an object containing all these calculated values, along with the distance and rental duration.

Note: All pricing variables (baseDeliveryFee, deliveryFeePerMile, baseInstallFee, installFeePerComponent, monthlyRentalRatePerFt) are stored in the database and can be updated through the Pricing Variables API endpoints.


# Ramp Rental Backend Documentation

## Project Structure

The backend is structured as follows:

- `src/`
  - `models/`: MongoDB schemas and models
  - `routes/`: Express route handlers
  - `services/`: Business logic and external service integrations
  - `utils/`: Utility functions and custom error classes
  - `middlewares/`: Custom middleware functions
  - `app.ts`: Express app configuration
  - `index.ts`: Server entry point

## Key Components

### Models

- `Customer`: Stores customer information
- `RentalRequest`: Represents a rental request from a customer
- `Quote`: Stores quote information, including pricing calculations
- `PricingVariables`: Stores configurable pricing variables

### Routes

- `customers.ts`: Handles customer-related operations
- `rentalRequests.ts`: Manages rental request operations
- `quotes.ts`: Handles quote creation, retrieval, and management
- `pricingVariables.ts`: Manages pricing variable operations
- `payments.ts`: Handles payment-related operations using Stripe
- `esignatures.ts`: Manages e-signature operations using eSignatures.io

### Services

- `pricingService.ts`: Calculates pricing based on ramp configuration and distance
- `distanceCalculation.ts`: Calculates distance using Google Maps API
- `EsignatureService.ts`: Handles communication with eSignatures.io API

### Utils

- `CustomError.ts`: Custom error class for consistent error handling
- `validationRules.ts`: Input validation rules for various endpoints

## Key Features

1. **Dynamic Pricing**: Prices are calculated based on ramp configuration, rental duration, and delivery distance.
2. **Customer Management**: Create, update, and manage customer information.
3. **Quote Generation**: Generate quotes based on rental requests and customer information.
4. **Payment Integration**: Create payment links and check payment status using Stripe.
5. **E-Signature Integration**: Send e-signature requests and check their status using eSignatures.io.
6. **Input Validation**: Comprehensive input validation for all endpoints using express-validator.
7. **Error Handling**: Consistent error handling and reporting using a custom error class.

## Environment Variables

The following environment variables need to be set:

- `MONGODB_URI`: MongoDB connection string
- `STRIPE_SECRET_KEY`: Stripe API secret key
- `ESIGNATURES_IO_TOKEN`: eSignatures.io API token
- `GOOGLE_MAPS_API_KEY`: Google Maps API key for distance calculation
- `COMPANY_ADDRESS`: Company address for distance calculation
- `FRONTEND_URL`: URL of the frontend application (for payment success redirect)
- `NOTIFICATION_EMAIL`: Email address to receive rental request notifications

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in a `.env` file
4. Start the development server: `npm run dev`
5. Run tests: `npm test`
6. Build for production: `npm run build`
7. Start production server: `npm start`

## API Documentation

Refer to the API documentation for detailed information on available endpoints and their usage.
```

# README.md

```md
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

```

# Procfile

```
web: node dist/app.js
```

# .aidigestignore

```
# Ignore node_modules
node_modules/

# Ignore build output
build/
dist/

# Ignore version control
.git/
.gitignore

# Ignore environment files
.env
.env.*

# Ignore package manager files
package-lock.json
yarn.lock

# Ignore IDE and editor files
.vscode/
.idea/
*.swp
*.swo

# Ignore log files
*.log
```

# src/theme.ts

```ts
// src/theme.ts

import { createTheme } from '@mui/material/styles';

// Example: Customizing primary and secondary colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize as needed
    },
    secondary: {
      main: '#dc004e', // Customize as needed
    },
  },
  // Add more theme customizations if necessary
});

export default theme;
```

# src/setupTests.ts

```ts
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

```

# src/reportWebVitals.ts

```ts
import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

```

# src/react-app-env.d.ts

```ts
/// <reference types="react-scripts" />

```

# src/logo.svg

This is a file of the type: SVG Image

# src/index.tsx

```tsx
// src/index.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Tailwind CSS
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

# src/index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

```

# src/App.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import NavBar from './components/NavBar';
import ErrorBoundary from './components/ErrorBoundary';
import DashboardPage from './pages/DashboardPage';
import RentalRequestsPage from './pages/RentalRequestsPage';
import RentalRequestDetailsPage from './pages/RentalRequestDetailsPage';
import QuotesPage from './pages/QuotesPage';
import QuoteDetailsPage from './pages/QuoteDetailsPage';
import CustomersPage from './pages/CustomersPage';
import CustomerDetailsPage from './pages/CustomerDetailsPage';
import SettingsPage from './pages/SettingsPage';

const App: React.FC = () => {
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    if (!window.google && !document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]')) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsGoogleMapsLoaded(true);
      document.head.appendChild(script);
    } else {
      setIsGoogleMapsLoaded(true);
    }
  }, []);

  if (!isGoogleMapsLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <Router>
      <ErrorBoundary>
        <NavBar />
        <Container maxWidth="lg" style={{ paddingTop: '24px', paddingBottom: '24px' }}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/rental-requests" element={<RentalRequestsPage />} />
            <Route path="/rental-requests/new" element={<RentalRequestDetailsPage />} />
            <Route path="/rental-requests/:id" element={<RentalRequestDetailsPage />} />
            <Route path="/quotes" element={<QuotesPage />} />
            <Route path="/quotes/:id" element={<QuoteDetailsPage />} />
            <Route path="/quotes/new" element={<QuoteDetailsPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/customers/new" element={<CustomerDetailsPage />} />
            <Route path="/customers/:id" element={<CustomerDetailsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Container>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
```

# src/App.test.tsx

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

```

# src/App.css

```css
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

```

# public/robots.txt

```txt
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:

```

# public/manifest.json

```json
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}

```

# public/logo512.png

This is a binary file of the type: Image

# public/logo192.png

This is a binary file of the type: Image

# public/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>

```

# public/favicon.ico

This is a binary file of the type: Binary

# src/types/esignature.ts

```ts
// src/types/Esignature.ts

export interface EsignatureRequest {
    documentId: string;
    recipientEmail: string;
  }
  
  export interface EsignatureStatus {
    documentId: string;
    status: 'sent' | 'viewed' | 'signed' | 'declined';
  }
```

# src/types/RentalRequest.ts

```ts
export type InstallTimeframe = 'Within 24 hours' | 'Within 2 days' | 'Within 3 days' | 'Within 1 week' | 'Over 1 week';

export type MobilityAid = 'wheelchair' | 'motorized_scooter' | 'walker_cane' | 'none';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface RampDetails {
  knowRampLength: boolean;
  rampLength?: number;
  knowRentalDuration: boolean;
  rentalDuration?: number;
  installTimeframe: InstallTimeframe;
  mobilityAids: MobilityAid[];
}

export interface RentalRequest {
  _id: string;
  customerInfo: CustomerInfo;
  rampDetails: RampDetails;
  installAddress: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  additionalNotes?: string; // Make it optional if it's not always present
}
```

# src/types/Quote.ts

```ts
// src/types/Quote.ts

export interface RampComponent {
  type: 'ramp' | 'landing';
  length: number;
  width?: number;
  quantity: number;
}

export interface RampConfiguration {
  components: RampComponent[];
  totalLength: number;
}

export interface PricingCalculations {
  deliveryFee: number;
  installFee: number;
  monthlyRentalRate: number;
  totalUpfront: number;
  distance: number;
}

export interface Quote {
  _id: string;
  customerId: string;
  customerName: string;
  rampConfiguration: RampConfiguration;
  pricingCalculations: PricingCalculations;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  warehouseAddress: string;
  installAddress: string;
}

export type NewQuote = Omit<Quote, '_id'>;
```

# src/types/Pricing.ts

```ts
// src/types/Pricing.ts

export interface PricingVariables {
  warehouseAddress: string;
  baseDeliveryFee: number;
  deliveryFeePerMile: number;
  baseInstallFee: number;
  installFeePerComponent: number;
  rentalRatePerFt: number;
}

export interface PricingInput {
  rampConfiguration: {
    components: Array<{
      type: 'ramp' | 'landing';
      length: number;
      width?: number;
    }>;
    totalLength: number;
  };
  pricingVariables: PricingVariables;
  customerAddress: string;
  warehouseAddress: string;
  distance: number;
}

export interface PricingResult {
  deliveryFee: number;
  installFee: number;
  monthlyRentalRate: number;
  rentalRate: number;
  totalAmount: number;
  distance: number; // Add this line
}
```

# src/types/Payment.ts

```ts
// src/types/Payment.ts

export interface PaymentLinkResponse {
    url: string;
    id: string;
  }
  
  export interface PaymentStatus {
    id: string;
    status: 'pending' | 'completed' | 'failed';
  }
```

# src/types/Customer.ts

```ts
export interface Customer {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    installAddress: string; // Changed from 'address' to 'installAddress'
    mobilityAids: string[];
    notes: string;
    createdAt?: string;
    updatedAt?: string;
  }
```

# src/pages/SettingsPage.tsx

```tsx
import React from 'react';
import { Typography, Container } from '@mui/material';
import PricingVariablesComponent from '../components/pricing/PricingVariablesSettings';

const SettingsPage: React.FC = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <PricingVariablesComponent />
      {/* Add other settings components here in the future */}
    </Container>
  );
};

export default SettingsPage;
```

# src/pages/RentalRequestsPage.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { Typography, Grid, TextField, InputAdornment, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchRentalRequests } from '../api/apiService';
import { RentalRequest } from '../types/RentalRequest';
import EntityCard from '../components/shared/EntityCard';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';

const RentalRequestsPage: React.FC = () => {
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<RentalRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadRentalRequests = async () => {
      try {
        const data = await fetchRentalRequests();
        setRentalRequests(data);
        setFilteredRequests(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch rental requests');
      } finally {
        setIsLoading(false);
      }
    };
    loadRentalRequests();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRequests(
      rentalRequests.filter((request) =>
        `${request.customerInfo.firstName} ${request.customerInfo.lastName}`.toLowerCase().includes(query)
      )
    );
  };

  const handleCardClick = (id: string) => {
    navigate(`/rental-requests/${id}`);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Rental Requests
      </Typography>
      <div className="flex justify-between mb-4">
        <TextField
          placeholder="Search rental requests"
          value={searchQuery}
          onChange={handleSearch}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/rental-requests/new')}
        >
          Create Rental Request
        </Button>
      </div>
      <Grid container spacing={3}>
        {filteredRequests.map((request) => (
          <Grid item xs={12} sm={6} md={4} key={request._id}>
            <EntityCard
              id={request._id}
              title={`${request.customerInfo.firstName} ${request.customerInfo.lastName}`}
              subtitle={`Status: ${request.status}`}
              entityType="rentalRequest"
              onClick={() => handleCardClick(request._id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RentalRequestsPage;
```

# src/pages/RentalRequestDetailsPage.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, Button, Grid, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { fetchRentalRequest, createCustomerFromRentalRequest, deleteRentalRequest } from '../api/apiService';
import { RentalRequest } from '../types/RentalRequest';
import { Customer } from '../types/Customer';

const RentalRequestDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [rentalRequest, setRentalRequest] = useState<RentalRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creatingCustomer, setCreatingCustomer] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadRentalRequest = async () => {
      try {
        if (id) {
          const data = await fetchRentalRequest(id);
          setRentalRequest(data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch rental request');
      } finally {
        setLoading(false);
      }
    };
    loadRentalRequest();
  }, [id]);

  const handleCreateCustomer = async () => {
    if (!id) return;
    setCreatingCustomer(true);
    try {
      const newCustomer: Customer = await createCustomerFromRentalRequest(id);
      // Navigate to the new customer's details page
      navigate(`/customers/${newCustomer._id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create customer');
    } finally {
      setCreatingCustomer(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await deleteRentalRequest(id);
      navigate('/rental-requests');
    } catch (err: any) {
      setError(err.message || 'Failed to delete rental request');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!rentalRequest) return <Typography>Rental request not found</Typography>;

  return (
    <Paper elevation={3} className="p-4">
      <Typography variant="h4" gutterBottom>Rental Request Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography><strong>Customer Name:</strong> {rentalRequest.customerInfo.firstName} {rentalRequest.customerInfo.lastName}</Typography>
          <Typography><strong>Email:</strong> {rentalRequest.customerInfo.email}</Typography>
          <Typography><strong>Phone:</strong> {rentalRequest.customerInfo.phone}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography><strong>Install Address:</strong> {rentalRequest.installAddress}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography><strong>Install Timeframe:</strong> {rentalRequest.rampDetails.installTimeframe}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography><strong>Mobility Aids:</strong> {rentalRequest.rampDetails.mobilityAids.join(', ')}</Typography>
        </Grid>
        {/* Only render additional notes if the property exists */}
        {'additionalNotes' in rentalRequest && (
          <Grid item xs={12}>
            <Typography><strong>Additional Notes:</strong> {rentalRequest.additionalNotes || 'None'}</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateCustomer}
            disabled={creatingCustomer}
            style={{ marginRight: '10px' }}
          >
            {creatingCustomer ? 'Creating Customer...' : 'Create Customer'}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsDeleting(true)}
          >
            Delete Request
          </Button>
        </Grid>
      </Grid>

      <Dialog
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this rental request? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleting(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default RentalRequestDetailsPage;
```

# src/pages/QuotesPage.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Typography, Grid, TextField, InputAdornment, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchQuotes } from '../api/apiService';
import { Quote } from '../types/Quote';
import EntityCard from '../components/shared/EntityCard';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';

const QuotesPage: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const data = await fetchQuotes();
        setQuotes(data);
        setFilteredQuotes(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch quotes');
      } finally {
        setIsLoading(false);
      }
    };
    loadQuotes();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredQuotes(
      quotes.filter((quote) =>
        quote.customerName.toLowerCase().includes(query)
      )
    );
  };

  const handleCardClick = (id: string) => {
    navigate(`/quotes/${id}`);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Quotes
      </Typography>
      <div className="flex justify-between mb-4">
        <TextField
          placeholder="Search quotes"
          value={searchQuery}
          onChange={handleSearch}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/quotes/new')}
        >
          Create Quote
        </Button>
      </div>
      <Grid container spacing={3}>
        {filteredQuotes.map((quote) => (
          <Grid item xs={12} sm={6} md={4} key={quote._id}>
            <EntityCard
              id={quote._id}
              title={quote.customerName}
              subtitle={`Total: $${quote.pricingCalculations.totalUpfront.toFixed(2)} | Status: ${quote.status}`}
              entityType="quote"
              onClick={() => handleCardClick(quote._id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default QuotesPage;
```

# src/pages/QuoteDetailsPage.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { fetchQuote, updateQuote, deleteQuote, fetchCustomers, createQuote } from '../api/apiService';
import { Quote, NewQuote } from '../types/Quote';
import { Customer } from '../types/Customer';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';
import QuoteForm from '../components/quotes/QuoteForm';

const QuoteDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | NewQuote | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [quoteData, customersData] = await Promise.all([
          id ? fetchQuote(id) : Promise.resolve(null),
          fetchCustomers()
        ]);
        if (quoteData) {
          setQuote(quoteData);
        } else if (!id) {
          // Initialize a new quote when creating
          setQuote({
            customerId: '',
            customerName: '',
            rampConfiguration: { components: [], totalLength: 0 },
            pricingCalculations: { deliveryFee: 0, installFee: 0, monthlyRentalRate: 0, totalUpfront: 0, distance: 0 },
            status: 'pending',
            warehouseAddress: '',
            installAddress: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          setIsEditing(true);
        }
        setCustomers(customersData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleSave = async (quoteData: NewQuote) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Saving quote data:', quoteData);
      if (id) {
        const updatedQuote = await updateQuote(id, quoteData);
        setQuote(updatedQuote);
        setIsEditing(false);
      } else {
        const createdQuote = await createQuote(quoteData);
        navigate(`/quotes/${createdQuote._id}`);
      }
    } catch (err: any) {
      console.error('Error saving quote:', err);
      setError(err.message || 'Failed to save quote');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (id) {
      setIsLoading(true);
      setError(null);
      try {
        await deleteQuote(id);
        navigate('/quotes');
      } catch (err: any) {
        setError(err.message || 'Failed to delete quote');
      } finally {
        setIsLoading(false);
        setIsDeleting(false);
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!quote && id) return <ErrorMessage message="Quote not found" />;

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        {id ? 'Quote Details' : 'Create New Quote'}
      </Typography>
      <Paper elevation={3} className="p-4">
        {(isEditing || !id) ? (
          <QuoteForm
            quote={quote as NewQuote}
            customers={customers}
            onSave={handleSave}
            onCancel={() => id ? setIsEditing(false) : navigate('/quotes')}
          />
        ) : quote && '_id' in quote ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Customer: {quote.customerName}</Typography>
              <Typography>Status: {quote.status}</Typography>
              <Typography>Total Upfront: ${quote.pricingCalculations.totalUpfront.toFixed(2)}</Typography>
              <Typography>Monthly Rental Rate: ${quote.pricingCalculations.monthlyRentalRate.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Ramp Configuration</Typography>
              {quote.rampConfiguration.components.map((component, index) => (
                <Typography key={index}>
                  {component.type === 'ramp' ? 'Ramp' : 'Landing'}: 
                  {component.length}ft x {component.quantity}
                  {component.width ? ` (${component.width}ft wide)` : ''}
                </Typography>
              ))}
              <Typography>Total Length: {quote.rampConfiguration.totalLength}ft</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Installation Address</Typography>
              <Typography>{quote.installAddress}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Pricing Details</Typography>
              <Typography>Delivery Fee: ${quote.pricingCalculations.deliveryFee.toFixed(2)}</Typography>
              <Typography>Install Fee: ${quote.pricingCalculations.installFee.toFixed(2)}</Typography>
              <Typography>Distance: {quote.pricingCalculations.distance.toFixed(2)} miles</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={() => setIsEditing(true)} className="mr-2">
                Edit
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setIsDeleting(true)}>
                Delete
              </Button>
            </Grid>
          </Grid>
        ) : null}
      </Paper>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate('/quotes')}
        className="mt-4"
      >
        Back to Quotes
      </Button>

      <Dialog
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this quote? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleting(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuoteDetailsPage;
```

# src/pages/DashboardPage.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  CircularProgress, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody,
  TableContainer // Add this import
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RentalRequest } from '../types/RentalRequest';
import { Quote } from '../types/Quote';
import { fetchRentalRequests, fetchQuotes } from '../api/apiService';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const [recentRentalRequests, setRecentRentalRequests] = useState<RentalRequest[]>([]);
  const [recentQuotes, setRecentQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rentalRequests, quotes] = await Promise.all([
          fetchRentalRequests(),
          fetchQuotes(),
        ]);
        
        console.log('Rental Requests:', rentalRequests);
        console.log('Quotes:', quotes);
        
        setRecentRentalRequests(rentalRequests.slice(-5).reverse());
        setRecentQuotes(quotes.slice(-5).reverse());
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRentalRequestClick = (id: string) => {
    navigate(`/rental-requests/${id}`);
  };

  const handleQuoteClick = (id: string) => {
    navigate(`/quotes/${id}`);
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {/* Recent Rental Requests */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Recent Rental Requests
              </Typography>
              {recentRentalRequests.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Install Address</TableCell>
                        <TableCell>Timeframe</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentRentalRequests.map((request) => (
                        <TableRow 
                          key={request._id} 
                          onClick={() => handleRentalRequestClick(request._id)}
                          style={{ cursor: 'pointer' }}
                          hover
                        >
                          <TableCell>{`${request.customerInfo.firstName} ${request.customerInfo.lastName}`}</TableCell>
                          <TableCell>{request.installAddress}</TableCell>
                          <TableCell>{request.rampDetails.installTimeframe}</TableCell>
                          <TableCell>{new Date(request.createdAt || '').toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography>No recent rental requests.</Typography>
              )}
            </Paper>
          </Grid>

          {/* Recent Quotes */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Recent Quotes
              </Typography>
              {recentQuotes.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell>Total Upfront</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Created At</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentQuotes.map((quote) => (
                        <TableRow 
                          key={quote._id}
                          onClick={() => handleQuoteClick(quote._id)}
                          style={{ cursor: 'pointer' }}
                          hover
                        >
                          <TableCell>{quote.customerName}</TableCell>
                          <TableCell>${quote.pricingCalculations.totalUpfront.toFixed(2)}</TableCell>
                          <TableCell>{quote.status}</TableCell>
                          <TableCell>{quote.createdAt ? new Date(quote.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography>No recent quotes.</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}

      <Grid container spacing={2} style={{ marginTop: '16px' }}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate('/rental-requests')}
          >
            View All Rental Requests
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate('/quotes')}
          >
            Manage All Quotes
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardPage;
```

# src/pages/CustomersPage.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { Typography, Grid, TextField, InputAdornment, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchCustomers } from '../api/apiService';
import { Customer } from '../types/Customer';
import EntityCard from '../components/shared/EntityCard';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch customers');
      } finally {
        setIsLoading(false);
      }
    };
    loadCustomers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredCustomers(
      customers.filter((customer) =>
        `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(query)
      )
    );
  };

  const handleCardClick = (id: string) => {
    navigate(`/customers/${id}`);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>
      <div className="flex justify-between mb-4">
        <TextField
          placeholder="Search customers"
          value={searchQuery}
          onChange={handleSearch}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/customers/new')}
        >
          Create Customer
        </Button>
      </div>
      <Grid container spacing={3}>
        {filteredCustomers.map((customer) => (
          <Grid item xs={12} sm={6} md={4} key={customer._id}>
            <EntityCard
              id={customer._id}
              title={`${customer.firstName} ${customer.lastName}`}
              subtitle={customer.email}
              entityType="customer"
              onClick={() => handleCardClick(customer._id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CustomersPage;
```

# src/pages/CustomerDetailsPage.tsx

```tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { fetchCustomer, createCustomer, updateCustomer, deleteCustomer } from '../api/apiService';
import { Customer } from '../types/Customer';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';
import CustomerForm from '../components/customers/CustomerForm';

const CustomerDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadCustomer = async () => {
      if (id) {
        try {
          const data = await fetchCustomer(id);
          setCustomer(data);
        } catch (err: any) {
          setError(err.message || 'Failed to fetch customer details');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsEditing(true);
        setIsLoading(false);
      }
    };
    loadCustomer();
  }, [id]);

  const handleSave = async (customerData: Omit<Customer, '_id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      if (id) {
        const updatedCustomer = await updateCustomer(id, customerData);
        setCustomer(updatedCustomer);
        setIsEditing(false);
      } else {
        await createCustomer(customerData);
        navigate('/customers');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save customer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  const handleDelete = async () => {
    if (id) {
      setIsLoading(true);
      setError(null);
      try {
        await deleteCustomer(id);
        navigate('/customers');
      } catch (err: any) {
        setError(err.message || 'Failed to delete customer');
      } finally {
        setIsLoading(false);
        setIsDeleting(false);
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!customer && id) return <ErrorMessage message="Customer not found" />;

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        {id ? 'Customer Details' : 'Create New Customer'}
      </Typography>
      <Paper elevation={3} className="p-4">
        {isEditing || !id ? (
          <CustomerForm
            customer={customer}
            onSave={handleSave}
            onCancel={handleCancelEdit}
          />
        ) : customer ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Personal Information</Typography>
              <Typography>Name: {`${customer.firstName} ${customer.lastName}`}</Typography>
              <Typography>Email: {customer.email}</Typography>
              <Typography>Phone: {customer.phone}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Address</Typography>
              <Typography>{customer.installAddress}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Mobility Aids</Typography>
              <Typography>{customer.mobilityAids.join(', ')}</Typography>
            </Grid>
            {customer.notes && (
              <Grid item xs={12}>
                <Typography variant="h6">Notes</Typography>
                <Typography>{customer.notes}</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleEdit} className="mr-2">
                Edit
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setIsDeleting(true)}>
                Delete
              </Button>
            </Grid>
          </Grid>
        ) : null}
      </Paper>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate('/customers')}
        className="mt-4"
      >
        Back to Customers
      </Button>

      <Dialog
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this customer? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleting(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomerDetailsPage;
```

# src/components/NavBar.tsx

```tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink, Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Ramp Rental App
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={RouterLink} to="/rental-requests">
          Rental Requests
        </Button>
        <Button color="inherit" component={RouterLink} to="/quotes">
          Quotes
        </Button>
        <Button color="inherit" component={RouterLink} to="/customers">
          Customers
        </Button>
        <Button color="inherit" component={Link} to="/settings">
          Settings
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
```

# src/components/EsignatureSender.tsx

```tsx
// src/components/EsignatureSender.tsx

import React, { useState } from 'react';
import { Button, Typography, CircularProgress, Paper, TextField } from '@mui/material';
import { sendEsignature, checkEsignatureStatus } from '../api/apiService';
import { EsignatureRequest, EsignatureStatus } from '../types/esignature';

const EsignatureSender: React.FC = () => {
  const [documentId, setDocumentId] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [esignatureStatus, setEsignatureStatus] = useState<EsignatureStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSendEsignature = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const payload: EsignatureRequest = {
        documentId,
        recipientEmail,
      };
      await sendEsignature(payload);
      setSuccessMessage('Agreement sent successfully!');
      setDocumentId('');
      setRecipientEmail('');
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || 'Failed to send agreement.'
      );
    } finally {
      setLoading(false);
    }
  };

  const checkSigningStatus = async () => {
    if (documentId) {
      setLoading(true);
      try {
        const response = await checkEsignatureStatus(documentId);
        setEsignatureStatus(response);
      } catch (error: any) {
        setErrorMessage(
          error.response?.data?.message || 'Failed to check signing status.'
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Send Agreement for E-Signature
      </Typography>
      <TextField
        label="Document ID"
        value={documentId}
        onChange={(e) => setDocumentId(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
        required
      />
      <TextField
        label="Recipient Email"
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
        required
        type="email"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendEsignature}
        disabled={loading}
        fullWidth
        style={{ marginTop: '16px' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Send Agreement'}
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        onClick={checkSigningStatus}
        disabled={loading || !documentId}
        fullWidth
        style={{ marginTop: '16px' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Check Signing Status'}
      </Button>

      {esignatureStatus && (
        <Typography style={{ marginTop: '16px' }}>
          Signing Status: {esignatureStatus.status}
        </Typography>
      )}

      {successMessage && (
        <Typography color="primary" style={{ marginTop: '16px' }}>
          {successMessage}
        </Typography>
      )}

      {errorMessage && (
        <Typography color="error" style={{ marginTop: '16px' }}>
          {errorMessage}
        </Typography>
      )}
    </Paper>
  );
};

export default EsignatureSender;
```

# src/components/ErrorBoundary.tsx

```tsx
// src/components/ErrorBoundary.tsx

import React, { Component, ReactNode } from 'react';
import { Typography, Button, Paper } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state to display fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service here
    console.error('Uncaught error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Paper elevation={3} style={{ padding: '24px', textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            Something went wrong.
          </Typography>
          <Button variant="contained" color="primary" onClick={this.handleReload}>
            Reload Page
          </Button>
        </Paper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

# src/api/apiService.ts

```ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import { RentalRequest, MobilityAid } from '../types/RentalRequest';
import { PricingVariables } from '../types/Pricing';
import { Quote } from '../types/Quote';
import { PaymentLinkResponse, PaymentStatus } from '../types/Payment';
import { EsignatureRequest, EsignatureStatus } from '../types/esignature';
import { Customer } from '../types/Customer';
import { RampConfiguration } from '../types/Quote';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://samedayramps-016e8e090b17.herokuapp.com/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Error handling function
const handleApiError = (error: AxiosError): string => {
  if (error.response) {
    return (error.response.data as any).message || 'An error occurred with the response';
  } else if (error.request) {
    return 'No response received from the server';
  } else {
    return error.message || 'An unexpected error occurred';
  }
};

// Rental Requests
export const fetchRentalRequests = async (): Promise<RentalRequest[]> => {
  try {
    const response = await apiClient.get<RentalRequest[]>('/rental-requests');
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const fetchRentalRequest = async (id: string): Promise<RentalRequest> => {
  try {
    const response = await apiClient.get<RentalRequest>(`/rental-requests/${id}`);
    const data = response.data;
    
    // Ensure mobilityAids is correctly typed
    data.rampDetails.mobilityAids = data.rampDetails.mobilityAids.filter((aid: string): aid is MobilityAid => 
      ['wheelchair', 'motorized_scooter', 'walker_cane', 'none'].includes(aid)
    );
    
    return data as RentalRequest;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 404) {
      throw new Error('Rental request not found');
    }
    throw new Error(handleApiError(axiosError));
  }
};

export const createRentalRequest = async (data: Omit<RentalRequest, '_id' | 'createdAt'>): Promise<RentalRequest> => {
  try {
    const response = await apiClient.post<RentalRequest>('/rental-requests', data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const updateRentalRequest = async (id: string, data: Partial<RentalRequest>): Promise<RentalRequest> => {
  try {
    const response = await apiClient.put<RentalRequest>(`/rental-requests/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const deleteRentalRequest = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/rental-requests/${id}`);
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

// Quotes
export const fetchQuotes = async (): Promise<Quote[]> => {
  try {
    const response = await apiClient.get<Quote[]>('/quotes');
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const fetchQuote = async (id: string): Promise<Quote> => {
  try {
    const response = await apiClient.get<Quote>(`/quotes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const createQuote = async (quoteData: Omit<Quote, '_id'>): Promise<Quote> => {
  try {
    const response = await apiClient.post<Quote>('/quotes', quoteData);
    return response.data;
  } catch (error) {
    console.error('Error creating quote:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Server response:', error.response.data);
    }
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const updateQuote = async (id: string, data: Partial<Quote>): Promise<Quote> => {
  try {
    const response = await apiClient.put<Quote>(`/quotes/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const deleteQuote = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/quotes/${id}`);
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

// Customers
export const fetchCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await apiClient.get<Customer[]>('/customers');
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const fetchCustomer = async (id: string): Promise<Customer> => {
  try {
    const response = await apiClient.get<Customer>(`/customers/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const createCustomer = async (data: Omit<Customer, '_id' | 'createdAt' | 'updatedAt'>): Promise<Customer> => {
  try {
    const response = await apiClient.post<Customer>('/customers', data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const updateCustomer = async (id: string, data: Partial<Customer>): Promise<Customer> => {
  try {
    const response = await apiClient.put<Customer>(`/customers/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const deleteCustomer = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/customers/${id}`);
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

// Pricing Variables
export const fetchPricingVariables = async (): Promise<PricingVariables> => {
  try {
    const response = await apiClient.get<PricingVariables>('/pricing-variables');
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const updatePricingVariables = async (data: PricingVariables): Promise<PricingVariables> => {
  try {
    const response = await apiClient.put<PricingVariables>('/pricing-variables', data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

// Calculate Pricing
export const calculatePricing = async (data: {
  rampConfiguration: RampConfiguration;
  installAddress: string;
  warehouseAddress: string;
}) => {
  try {
    console.log('Sending to backend:', data);
    const response = await apiClient.post('/calculate-pricing', data);
    return response.data;
  } catch (error) {
    console.error('Error in calculatePricing:', error);
    throw new Error(handleApiError(error as AxiosError));
  }
};

// Payments
export const createPaymentLink = async (data: { amount: number; customerEmail: string }): Promise<PaymentLinkResponse> => {
  try {
    const response = await apiClient.post<PaymentLinkResponse>('/payments/create-link', data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const checkPaymentStatus = async (id: string): Promise<PaymentStatus> => {
  try {
    const response = await apiClient.get<PaymentStatus>(`/payments/status/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

// E-signatures
export const sendEsignature = async (data: EsignatureRequest): Promise<void> => {
  try {
    await apiClient.post('/esignatures/send', data);
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const checkEsignatureStatus = async (documentId: string): Promise<EsignatureStatus> => {
  try {
    const response = await apiClient.get<EsignatureStatus>(`/esignatures/status/${documentId}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

// Additional functions
export const sendQuoteEmail = async (quoteId: string): Promise<void> => {
  try {
    await apiClient.post(`/quotes/${quoteId}/send-email`);
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const createCustomerFromRentalRequest = async (rentalRequestId: string): Promise<Customer> => {
  try {
    const response = await apiClient.post<Customer>(`/customers/from-rental-request/${rentalRequestId}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};
```

# src/components/rental-requests/RentalRequestForm.tsx

```tsx
import React, { useState } from 'react';
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Checkbox, FormGroup, FormControlLabel, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { RentalRequest } from '../../types/RentalRequest';

interface RentalRequestFormProps {
  rentalRequest: RentalRequest | null;
  onSave: (requestData: Omit<RentalRequest, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onCancel: () => void;
}

const RentalRequestForm: React.FC<RentalRequestFormProps> = ({ rentalRequest, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<RentalRequest, '_id' | 'createdAt' | 'updatedAt'>>(
    rentalRequest || {
      customerInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      rampDetails: {
        knowRampLength: false,
        knowRentalDuration: false,
        installTimeframe: 'Within 1 week',
        mobilityAids: [],
      },
      installAddress: '',
      status: 'pending',
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        [name]: value,
      },
    }));
    validateField(name, value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      installAddress: value,
    }));
    validateField('installAddress', value);
  };

  const handleRampDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>,
    checked?: boolean
  ) => {
    const { name, value } = e.target;
    const newValue = e.target instanceof HTMLInputElement && e.target.type === 'checkbox' ? checked : value;
    
    setFormData((prev) => ({
      ...prev,
      rampDetails: {
        ...prev.rampDetails,
        [name]: newValue,
      },
    }));
    validateField(name, newValue);
  };

  const handleMobilityAidChange = (aid: 'wheelchair' | 'motorized_scooter' | 'walker_cane' | 'none') => {
    setFormData((prev) => ({
      ...prev,
      rampDetails: {
        ...prev.rampDetails,
        mobilityAids: prev.rampDetails.mobilityAids.includes(aid)
          ? prev.rampDetails.mobilityAids.filter((item) => item !== aid)
          : [...prev.rampDetails.mobilityAids, aid],
      },
    }));
  };

  const handleInstallTimeframeChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      rampDetails: {
        ...prev.rampDetails,
        [name]: value as RentalRequest['rampDetails']['installTimeframe'],
      },
    }));
    validateField(name, value);
  };

  const validateField = (name: string, value: any) => {
    let error = '';
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'phone':
      case 'installAddress':
        if (!value.trim()) {
          error = `${name} is required`;
        }
        break;
      case 'email':
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          error = 'Invalid email address';
        }
        break;
      case 'rampLength':
        if (formData.rampDetails.knowRampLength && (!value || isNaN(value) || value <= 0)) {
          error = 'Invalid ramp length';
        }
        break;
      case 'rentalDuration':
        if (formData.rampDetails.knowRentalDuration && (!value || isNaN(value) || value < 1)) {
          error = 'Invalid rental duration';
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).every((error) => !error)) {
      await onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="firstName"
            label="First Name"
            value={formData.customerInfo.firstName}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="lastName"
            label="Last Name"
            value={formData.customerInfo.lastName}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            label="Email Address"
            type="email"
            value={formData.customerInfo.email}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="phone"
            label="Phone Number"
            value={formData.customerInfo.phone}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="installAddress"
            label="Installation Address"
            value={formData.installAddress}
            onChange={handleAddressChange}
            fullWidth
            required
            error={!!errors.installAddress}
            helperText={errors.installAddress}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.rampDetails.knowRampLength}
                onChange={handleRampDetailsChange}
                name="knowRampLength"
              />
            }
            label="Know Ramp Length"
          />
        </Grid>
        {formData.rampDetails.knowRampLength && (
          <Grid item xs={12} sm={6}>
            <TextField
              name="rampLength"
              label="Ramp Length (ft)"
              type="number"
              value={formData.rampDetails.rampLength || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRampDetailsChange(e)}
              fullWidth
              error={!!errors.rampLength}
              helperText={errors.rampLength}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.rampDetails.knowRentalDuration}
                onChange={handleRampDetailsChange}
                name="knowRentalDuration"
              />
            }
            label="Know Rental Duration"
          />
        </Grid>
        {formData.rampDetails.knowRentalDuration && (
          <Grid item xs={12} sm={6}>
            <TextField
              name="rentalDuration"
              label="Rental Duration (months)"
              type="number"
              value={formData.rampDetails.rentalDuration || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRampDetailsChange(e)}
              fullWidth
              error={!!errors.rentalDuration}
              helperText={errors.rentalDuration}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Install Timeframe</InputLabel>
            <Select
              name="installTimeframe"
              value={formData.rampDetails.installTimeframe}
              onChange={handleInstallTimeframeChange}
              required
            >
              <MenuItem value="Within 24 hours">Within 24 hours</MenuItem>
              <MenuItem value="Within 2 days">Within 2 days</MenuItem>
              <MenuItem value="Within 3 days">Within 3 days</MenuItem>
              <MenuItem value="Within 1 week">Within 1 week</MenuItem>
              <MenuItem value="Over 1 week">Over 1 week</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Mobility Aids</Typography>
          <FormGroup row>
            {(['wheelchair', 'motorized_scooter', 'walker_cane', 'none'] as const).map((aid) => (
              <FormControlLabel
                key={aid}
                control={
                  <Checkbox
                    checked={formData.rampDetails.mobilityAids.includes(aid)}
                    onChange={() => handleMobilityAidChange(aid)}
                  />
                }
                label={aid.replace('_', ' ')}
              />
            ))}
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={onCancel} variant="outlined" style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default RentalRequestForm;
```

# src/components/shared/SelectField.tsx

```tsx
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectProps } from '@mui/material';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends Omit<SelectProps, 'onChange'> {
  name: string;
  label: string;
  options: SelectOption[];
  onChange: (name: string, value: string) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({ name, label, options, value, onChange, ...props }) => (
  <FormControl fullWidth variant="outlined" margin="normal">
    <InputLabel id={`${name}-label`}>{label}</InputLabel>
    <Select
      labelId={`${name}-label`}
      id={name}
      name={name}
      value={value}
      onChange={(e) => onChange(name, e.target.value as string)}
      label={label}
      {...props}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
```

# src/components/shared/LoadingSpinner.tsx

```tsx
import React from 'react';
import { CircularProgress } from '@mui/material';

interface LoadingSpinnerProps {
  size?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40 }) => (
  <div className="flex justify-center items-center h-32">
    <CircularProgress size={size} />
  </div>
);
```

# src/components/shared/InstallAddressField.tsx

```tsx
import React, { useRef, useEffect } from 'react';
import { TextField } from '@mui/material';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { styled } from '@mui/system';

interface InstallAddressFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const libraries: ("places")[] = ['places'];

const StyledAutocomplete = styled(Autocomplete)({
  '& .pac-container': {
    zIndex: 1301, // This should be higher than the Dialog's z-index
  },
});

const InstallAddressField: React.FC<InstallAddressFieldProps> = ({ value, onChange }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
    libraries,
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (isLoaded) {
      const pacContainers = document.getElementsByClassName('pac-container');
      for (let i = 0; i < pacContainers.length; i++) {
        (pacContainers[i] as HTMLElement).style.zIndex = '1301';
      }
    }
  }, [isLoaded]);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place.formatted_address) {
        onChange(place.formatted_address);
      } else if (place.name) {
        // If formatted_address is not available, use the place name
        onChange(place.name);
      } else {
        // If neither formatted_address nor name is available, use whatever text is in the input
        const input = document.querySelector('input[aria-autocomplete="list"]') as HTMLInputElement;
        if (input) {
          onChange(input.value);
        }
      }
    }
  };

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <StyledAutocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <TextField
        label="Installation Address"
        variant="outlined"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        required
      />
    </StyledAutocomplete>
  );
};

export default InstallAddressField;
```

# src/components/shared/GoogleAddressField.tsx

```tsx
import React, { useRef, useEffect } from 'react';
import { TextField } from '@mui/material';

interface GoogleAddressFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const GoogleAddressField: React.FC<GoogleAddressFieldProps> = ({ value, onChange, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['address'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        onChange(place.formatted_address);
      } else if (inputRef.current) {
        // If formatted_address is not available, use the input value
        onChange(inputRef.current.value);
      }
    });

    autocompleteRef.current = autocomplete;

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onChange]);

  return (
    <TextField
      inputRef={inputRef}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      variant="outlined"
    />
  );
};

export default GoogleAddressField;
```

# src/components/shared/FormField.tsx

```tsx
import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface FormFieldProps extends Omit<TextFieldProps, 'onChange'> {
  name: string;
  label: string;
  value: string | number;
  onChange: (name: string, value: string) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ name, label, value, onChange, ...props }) => (
  <TextField
    name={name}
    label={label}
    value={value}
    onChange={(e) => onChange(name, e.target.value)}
    fullWidth
    variant="outlined"
    margin="normal"
    {...props}
  />
);
```

# src/components/shared/ErrorMessage.tsx

```tsx
import React from 'react';
import { Typography } from '@mui/material';

interface ErrorMessageProps {
  message: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <Typography color="error" className="mt-2">
      {message}
    </Typography>
  );
};
```

# src/components/shared/EntityCard.tsx

```tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface EntityCardProps {
  id: string;
  title: string;
  subtitle: string;
  entityType: 'customer' | 'quote' | 'rentalRequest';
  onClick: () => void;
}

const EntityCard: React.FC<EntityCardProps> = ({ id, title, subtitle, entityType, onClick }) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow" 
      onClick={onClick}
    >
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography color="textSecondary">{subtitle}</Typography>
      </CardContent>
    </Card>
  );
};

export default EntityCard;
```

# src/components/quotes/RampConfiguration.tsx

```tsx
// src/components/quotes/RampConfiguration.tsx

import React from 'react';
import { Button, Grid, Select, MenuItem, IconButton, Typography, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { RampConfiguration, RampComponent } from '../../types/Quote';

interface RampConfigurationComponentProps {
  configuration: RampConfiguration;
  onChange: (newConfig: RampConfiguration) => void;
}

const rampOptions = [4, 5, 6, 7, 8];
const landingOptions = [
  { length: 5, width: 4 },
  { length: 5, width: 5 },
  { length: 5, width: 8 },
];

const RampConfigurationComponent: React.FC<RampConfigurationComponentProps> = ({ configuration, onChange }) => {
  const addComponent = (type: 'ramp' | 'landing') => {
    const newComponent: RampComponent = type === 'ramp' 
      ? { type: 'ramp', length: 4, quantity: 1 } 
      : { type: 'landing', length: 5, width: 4, quantity: 1 };
    const newComponents = [...configuration.components, newComponent];
    updateConfiguration(newComponents);
  };

  const updateComponent = (index: number, field: string, value: any) => {
    const newComponents = configuration.components.map((comp, i) => 
      i === index ? { ...comp, [field]: value } : comp
    );
    updateConfiguration(newComponents);
  };

  const removeComponent = (index: number) => {
    const newComponents = configuration.components.filter((_, i) => i !== index);
    updateConfiguration(newComponents);
  };

  const updateConfiguration = (components: RampComponent[]) => {
    const totalLength = components.reduce((sum, comp) => sum + (comp.length * (comp.quantity || 1)), 0);
    onChange({ components, totalLength });
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>Ramp Configuration</Typography>
      {configuration.components.map((component, index) => (
        <Grid container spacing={2} key={index} alignItems="center">
          <Grid item xs={2}>
            <Select
              value={component.type}
              onChange={(e) => updateComponent(index, 'type', e.target.value)}
              fullWidth
            >
              <MenuItem value="ramp">Ramp</MenuItem>
              <MenuItem value="landing">Landing</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={3}>
            <Select
              value={component.type === 'ramp' ? component.length : `${component.length}x${component.width}`}
              onChange={(e) => {
                const value = e.target.value;
                if (component.type === 'ramp') {
                  updateComponent(index, 'length', Number(value));
                } else {
                  const [length, width] = (value as string).split('x').map(Number);
                  updateComponent(index, 'length', length);
                  updateComponent(index, 'width', width);
                }
              }}
              fullWidth
            >
              {component.type === 'ramp'
                ? rampOptions.map(length => (
                    <MenuItem key={length} value={length}>{length} ft</MenuItem>
                  ))
                : landingOptions.map(({ length, width }) => (
                    <MenuItem key={`${length}x${width}`} value={`${length}x${width}`}>{length}x{width} ft</MenuItem>
                  ))
              }
            </Select>
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="number"
              label="Quantity"
              value={component.quantity || 1}
              onChange={(e) => updateComponent(index, 'quantity', Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1 }}
              fullWidth
            />
          </Grid>
          <Grid item>
            <IconButton onClick={() => removeComponent(index)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button onClick={() => addComponent('ramp')} variant="outlined" style={{ marginTop: 10, marginRight: 10 }}>
        Add Ramp
      </Button>
      <Button onClick={() => addComponent('landing')} variant="outlined" style={{ marginTop: 10 }}>
        Add Landing
      </Button>
      <Typography style={{ marginTop: 10 }}>Total Length: {configuration.totalLength} ft</Typography>
    </div>
  );
};

export default RampConfigurationComponent;
```

# src/components/quotes/QuoteForm.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { Button, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Quote, RampConfiguration } from '../../types/Quote';
import { Customer } from '../../types/Customer';
import RampConfigurationComponent from './RampConfiguration';
import PricingCalculator from './PricingCalculator';
import { fetchPricingVariables } from '../../api/apiService';

interface QuoteFormProps {
  quote: Omit<Quote, '_id'> | null;
  customers: Customer[];
  onSave: (quoteData: Omit<Quote, '_id'>) => Promise<void>;
  onCancel: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ quote, customers, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Quote, '_id'>>(() => {
    if (quote) {
      return {
        ...quote,
        customerId: typeof quote.customerId === 'object' ? (quote.customerId as any)._id : quote.customerId,
        rampConfiguration: {
          ...quote.rampConfiguration,
          components: quote.rampConfiguration.components.map(comp => ({
            ...comp,
            quantity: comp.quantity || 1
          }))
        }
      };
    } else {
      return {
        customerId: '',
        customerName: '',
        rampConfiguration: {
          components: [],
          totalLength: 0,
        },
        pricingCalculations: {
          deliveryFee: 0,
          installFee: 0,
          monthlyRentalRate: 0,
          totalUpfront: 0,
          distance: 0,
        },
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        warehouseAddress: '',
        installAddress: '',
      };
    }
  });

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchWarehouseAddress = async () => {
      try {
        const variables = await fetchPricingVariables();
        setFormData(prev => ({
          ...prev,
          warehouseAddress: variables.warehouseAddress,
        }));
      } catch (error) {
        console.error('Failed to fetch warehouse address:', error);
      }
    };
    fetchWarehouseAddress();

    // Set initial customer if quote exists
    if (formData.customerId) {
      const customer = customers.find(c => c._id === formData.customerId);
      if (customer) {
        setSelectedCustomer(customer);
        setFormData(prev => ({
          ...prev,
          customerName: `${customer.firstName} ${customer.lastName}`,
          installAddress: customer.installAddress,
        }));
      }
    }
  }, [formData.customerId, customers]);

  const handleCustomerChange = (e: SelectChangeEvent<string>) => {
    const customerId = e.target.value;
    const selectedCustomer = customers.find((c) => c._id === customerId);
    if (selectedCustomer) {
      setFormData((prev) => ({
        ...prev,
        customerId,
        customerName: `${selectedCustomer.firstName} ${selectedCustomer.lastName}`,
        installAddress: selectedCustomer.installAddress,
      }));
      setSelectedCustomer(selectedCustomer);
    }
  };

  const handleRampConfigChange = (newConfig: RampConfiguration) => {
    setFormData(prev => ({
      ...prev,
      rampConfiguration: newConfig,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Customer</InputLabel>
            <Select
              name="customerId"
              value={formData.customerId || ''}
              onChange={handleCustomerChange}
            >
              {customers.map((customer) => (
                <MenuItem key={customer._id} value={customer._id}>
                  {`${customer.firstName} ${customer.lastName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <RampConfigurationComponent
            configuration={formData.rampConfiguration}
            onChange={handleRampConfigChange}
          />
        </Grid>

        {selectedCustomer && formData.rampConfiguration.components.length > 0 && (
          <Grid item xs={12}>
            <PricingCalculator
              rampConfiguration={formData.rampConfiguration}
              installAddress={formData.installAddress}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Quote['status'] }))}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Install Address"
            value={formData.installAddress || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, installAddress: e.target.value }))}
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={onCancel} variant="outlined" style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default QuoteForm;

```

# src/components/quotes/PricingCalculator.tsx

```tsx
// src/components/quotes/PricingCalculator.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Paper, Grid, CircularProgress } from '@mui/material';
import { RampConfiguration } from '../../types/Quote';
import { PricingVariables } from '../../types/Pricing';
import { calculatePricing, fetchPricingVariables } from '../../api/apiService';
import debounce from 'lodash/debounce';

interface PricingCalculatorProps {
  rampConfiguration: RampConfiguration;
  installAddress: string;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ rampConfiguration, installAddress }) => {
  const [pricingVariables, setPricingVariables] = useState<PricingVariables | null>(null);
  const [pricing, setPricing] = useState<{
    deliveryFee: number;
    installFee: number;
    monthlyRentalRate: number;
    totalUpfront: number;
    distance: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedCalculatePrices = useCallback(
    debounce(async (config: RampConfiguration, address: string, variables: PricingVariables) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await calculatePricing({
          rampConfiguration: config,
          installAddress: address,
          warehouseAddress: variables.warehouseAddress
        });
        setPricing(result);
      } catch (err: any) {
        console.error('Error calculating pricing:', err);
        setError('Failed to calculate pricing');
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    const fetchVariables = async () => {
      try {
        const variables = await fetchPricingVariables();
        setPricingVariables(variables);
      } catch (err: any) {
        console.error('Failed to fetch pricing variables:', err);
        setError('Failed to fetch pricing variables');
        setIsLoading(false);
      }
    };
    fetchVariables();
  }, []);

  useEffect(() => {
    if (pricingVariables && installAddress && rampConfiguration.components.length > 0) {
      debouncedCalculatePrices(rampConfiguration, installAddress, pricingVariables);
    } else {
      setIsLoading(false);
    }
  }, [rampConfiguration, installAddress, pricingVariables, debouncedCalculatePrices]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!pricing) {
    return <Typography>Please configure the ramp to see pricing.</Typography>;
  }

  return (
    <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
      <Typography variant="h6" gutterBottom>Pricing Calculation</Typography>
      <Grid container spacing={2}>
        {Object.entries(pricing).map(([key, value]) => (
          <React.Fragment key={key}>
            <Grid item xs={6}>
              <Typography>{key.charAt(0).toUpperCase() + key.slice(1)}:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                {typeof value === 'number' ? 
                  (key === 'distance' ? `${value.toFixed(2)} miles` : `$${value.toFixed(2)}`) : 
                  value}
              </Typography>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Paper>
  );
};

export default PricingCalculator;
```

# src/components/pricing/PricingVariablesSettings.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { fetchPricingVariables, updatePricingVariables } from '../../api/apiService';
import { PricingVariables } from '../../types/Pricing';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorMessage } from '../shared/ErrorMessage';

const initialPricingVariables: PricingVariables = {
  warehouseAddress: '',
  baseDeliveryFee: 0,
  deliveryFeePerMile: 0,
  baseInstallFee: 0,
  installFeePerComponent: 0,
  rentalRatePerFt: 0,
};

const PricingVariablesSettings: React.FC = () => {
  const [pricingVariables, setPricingVariables] = useState<PricingVariables>(initialPricingVariables);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchPricingVars();
  }, []);

  const fetchPricingVars = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchPricingVariables();
      setPricingVariables(response || initialPricingVariables);
      setIsLoading(false);
    } catch (error: any) {
      setError('Failed to fetch pricing variables');
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPricingVariables((prev) => ({
      ...prev,
      [name]: name === 'warehouseAddress' ? value : parseFloat(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    try {
      await updatePricingVariables(pricingVariables);
      setSuccessMessage('Pricing variables updated successfully');
    } catch (error: any) {
      setError('Failed to update pricing variables');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Pricing Variables</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="warehouseAddress"
            label="Warehouse Address"
            value={pricingVariables.warehouseAddress}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="baseDeliveryFee"
            label="Base Delivery Fee"
            type="number"
            value={pricingVariables.baseDeliveryFee}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="deliveryFeePerMile"
            label="Delivery Fee Per Mile"
            type="number"
            value={pricingVariables.deliveryFeePerMile}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="baseInstallFee"
            label="Base Install Fee"
            type="number"
            value={pricingVariables.baseInstallFee}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="installFeePerComponent"
            label="Install Fee Per Component"
            type="number"
            value={pricingVariables.installFeePerComponent}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="rentalRatePerFt"
            label="Rental Rate Per Ft"
            type="number"
            value={pricingVariables.rentalRatePerFt}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Update Pricing Variables
          </Button>
        </Grid>
      </Grid>
      {successMessage && (
        <Typography color="primary" style={{ marginTop: '16px' }}>
          {successMessage}
        </Typography>
      )}
    </form>
  );
};

export default PricingVariablesSettings;
```

# src/components/payment/PaymentLinkSender.tsx

```tsx
// src/components/PaymentLinkSender.tsx

import React, { useState } from 'react';
import { Button, Typography, Link, CircularProgress, Paper } from '@mui/material';
import { createPaymentLink, checkPaymentStatus } from '../../api/apiService';
import { PaymentLinkResponse, PaymentStatus } from '../../types/Payment';

interface PaymentLinkSenderProps {
  amount: number;
  customerEmail: string;
}

const PaymentLinkSender: React.FC<PaymentLinkSenderProps> = ({
  amount,
  customerEmail,
}) => {
  const [paymentLink, setPaymentLink] = useState<PaymentLinkResponse | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCreatePaymentLink = async () => {
    setLoading(true);
    try {
      const response = await createPaymentLink({ amount, customerEmail });
      setPaymentLink(response);
      // Optionally, send the link via email through backend
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || 'Failed to create payment link.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCheckPaymentStatus = async () => {
    if (paymentLink) {
      setLoading(true);
      try {
        const response = await checkPaymentStatus(paymentLink.id);
        setPaymentStatus(response);
      } catch (error: any) {
        setErrorMessage(
          error.response?.data?.message || 'Failed to check payment status.'
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Send Payment Link
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreatePaymentLink}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Generate Payment Link'}
      </Button>

      {paymentLink && (
        <div style={{ marginTop: '16px' }}>
          <Typography>Payment Link:</Typography>
          <Link href={paymentLink.url} target="_blank" rel="noopener">
            {paymentLink.url}
          </Link>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCheckPaymentStatus}
            style={{ marginTop: '8px' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Check Payment Status'}
          </Button>
        </div>
      )}

      {paymentStatus && (
        <Typography style={{ marginTop: '16px' }}>
          Payment Status: {paymentStatus.status}
        </Typography>
      )}

      {errorMessage && (
        <Typography color="error" style={{ marginTop: '16px' }}>
          {errorMessage}
        </Typography>
      )}
    </Paper>
  );
};

export default PaymentLinkSender;
```

# src/components/customers/CustomerForm.tsx

```tsx
import React, { useState } from 'react';
import { TextField, Button, Grid, Checkbox, FormGroup, FormControlLabel, Typography } from '@mui/material';
import { Customer } from '../../types/Customer';

interface CustomerFormProps {
  customer: Customer | null;
  onSave: (customerData: Omit<Customer, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Customer, '_id' | 'createdAt' | 'updatedAt'>>(
    customer ? {
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      email: customer.email,
      installAddress: customer.installAddress,
      mobilityAids: customer.mobilityAids,
      notes: customer.notes || '',
    } : {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      installAddress: '',
      mobilityAids: [],
      notes: '',
    }
  );

  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleMobilityAidChange = (aid: string) => {
    setFormData((prev) => ({
      ...prev,
      mobilityAids: prev.mobilityAids.includes(aid)
        ? prev.mobilityAids.filter((item) => item !== aid)
        : [...prev.mobilityAids, aid],
    }));
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'phone':
      case 'installAddress':
        if (!value.trim()) {
          error = `${name} is required`;
        }
        break;
      case 'email':
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          error = 'Invalid email address';
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).every((error) => !error)) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="phone"
            label="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Install Address"
            name="installAddress"
            value={formData.installAddress}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Mobility Aids</Typography>
          <FormGroup row>
            {['wheelchair', 'motorized_scooter', 'walker_cane', 'none'].map((aid) => (
              <FormControlLabel
                key={aid}
                control={
                  <Checkbox
                    checked={formData.mobilityAids?.includes(aid)}
                    onChange={() => handleMobilityAidChange(aid)}
                  />
                }
                label={aid.replace('_', ' ')}
              />
            ))}
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="notes"
            label="Notes"
            value={formData.notes}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={onCancel} variant="outlined" style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
      </Grid>
    </Grid>
  </form>
);
};

export default CustomerForm;
```


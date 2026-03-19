# Bandico Group Website

This is a single-page application for Bandico Group, built with React, TypeScript, and Tailwind CSS. The project is set up using Vite for a fast local development experience.

## Project Structure

- `index.html`: The main HTML entry point.
- `index.tsx`: The main React render entry point.
- `App.tsx`: The root component containing all page sections.
- `components/`: Contains all the React components for different sections of the page.
- `index.css`: Main stylesheet for importing Tailwind CSS and custom base styles.
- `package.json`: Defines project scripts and dependencies.
- `vite.config.ts`: Vite build tool configuration.
- `tailwind.config.js`: Tailwind CSS configuration.

## Local Development Setup

Follow these steps to get the project running on your local machine.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 18 or newer) and npm (which comes with Node.js) installed on your computer.

### Installation

1.  **Download and Unzip:**
    Make sure all the files provided are in a single project folder on your computer.

2.  **Open Terminal:**
    Navigate to the root directory of your project folder in your terminal or command prompt.

3.  **Install Dependencies:**
    Run the following command to install all the necessary packages defined in `package.json`:
    ```bash
    npm install
    ```

### Running the Development Server

Once the installation is complete, you can start the local development server with this command:

```bash
npm run dev
```

This will start the Vite development server, and you should see output in your terminal telling you which local address the site is running on (usually `http://localhost:5173/`). Open this URL in your web browser to see the website.

The server supports Hot Module Replacement (HMR), so any changes you make to the source code (e.g., in the `.tsx` files) will be reflected in the browser instantly without needing a full page reload.

## Building for Production

When you are ready to deploy the website, you can create an optimized production build by running:

```bash
npm run build
```

This command will compile the code and place the static output files in a `dist` directory. These are the files you would upload to your web hosting service.

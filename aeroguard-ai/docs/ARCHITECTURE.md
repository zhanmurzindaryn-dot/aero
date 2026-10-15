# Architecture

## Current prototype
The application is a static browser app:
- `index.html` defines the interface and sections.
- `styles.css` defines the visual system and responsive layouts.
- `app.js` contains the illustrative records, rendering, filtering, navigation, and JSON/CSV export.
- `data/*.json` provides separate, human-readable copies of the sample records for project inspection.

There is no backend, no telemetry, no external API, no authentication, and no persistent database. Refreshing the page resets the interface to the sample dataset.

## Trust and safety decisions
1. Label all data as synthetic/demo.
2. Show the factors behind each alert.
3. Use “review” language instead of claiming that a flight is safe or unsafe.
4. Do not present the prototype as a certified aviation tool.
5. Make the limitations visible in the UI and report export.

## Production-oriented next steps
Any real aviation use would require domain experts, verified data provenance, security review, validation, human-factors assessment, regulatory and operator approval, and integration with approved procedures. This prototype is not a substitute for any of those steps.

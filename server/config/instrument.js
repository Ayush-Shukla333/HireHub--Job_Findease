// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://2a4e0c04c4b5cdb49c22b8c8fde5e44b@o4510164879474688.ingest.de.sentry.io/4510164886487120",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  integrations: [
    Sentry.mongooseIntegration()
  ],
  sendDefaultPii: true,
});
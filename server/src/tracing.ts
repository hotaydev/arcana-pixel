import { IncomingMessage, ServerResponse } from "node:http";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { Resource } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from "@opentelemetry/semantic-conventions";

let sdk: NodeSDK | undefined;

export const initializeTracing = () => {
  try {
    sdk = new NodeSDK({
      resource: new Resource({
        [ATTR_SERVICE_NAME]: "arcana-pixel-server",
        [ATTR_SERVICE_VERSION]: process.env.npm_package_version ?? "0.0.0",
      }),
      traceExporter: new OTLPTraceExporter({ url: process.env.TELEMETRY_ENDPOINT ?? "http://localhost:4317" }),
      instrumentations: [
        getNodeAutoInstrumentations({
          "@opentelemetry/instrumentation-http": {
            responseHook: (span, info) => {
              if (info instanceof ServerResponse) {
                span.updateName(`${info.req.method}: ${info.req.url}`);
              } else if (info instanceof IncomingMessage) {
                span.updateName(`${info.method}: ${info.url}`);
              }
            },
          },
        }),
      ],
    });

    sdk.start();
    console.log("✅ Tracing Started");
  } catch (error) {
    console.log("❌ Error initializing tracing", error);
  }
};

process.on("SIGTERM", () => {
  if (!sdk) {
    process.exit(0);
  }

  sdk
    .shutdown()
    .catch((error) => console.log("Error terminating tracing", error))
    .finally(() => process.exit(0));
});

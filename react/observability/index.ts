import { initializeFaro, ReactIntegration } from "@grafana/faro-react";
import {
    ErrorsInstrumentation,
    SessionInstrumentation,
    ViewInstrumentation,
    WebVitalsInstrumentation,
    PerformanceInstrumentation,
    Faro
} from '@grafana/faro-web-sdk';
import { getDefaultOTELInstrumentations, TracingInstrumentation } from '@grafana/faro-web-tracing';

let faro: Faro;

/**
 * TODO: extend list
 */
const IGNORE_URL_PATTERNS = [
    /.*amplitude/gm,
    /.*localhost/gm,
];

export const initFaro = (name: string) => {
    const { deploymentInfo, observability } = window.config || {};

    if (!observability) {

        // No configuration provided for Grafana Faro
        return;
    }

    faro = initializeFaro({
        url: observability?.collectorUrl,
        apiKey: observability?.apiKey,
        app: {
            name,
            version: deploymentInfo?.releaseNumber,
            environment: deploymentInfo?.environment
        },
        batching: {
            enabled: true,
            sendTimeout: 3000,
            itemLimit: 50,
        },
        instrumentations: [
            new PerformanceInstrumentation(),
            new ErrorsInstrumentation(),
            new WebVitalsInstrumentation(),
            new SessionInstrumentation(),
            new ViewInstrumentation(),
            new TracingInstrumentation({
                instrumentations: [
                    ...getDefaultOTELInstrumentations({
                        ignoreUrls: [...IGNORE_URL_PATTERNS, observability?.collectorUrl],

                        // add Tracing instrumentation ("Traceparent" header: 00-[trace_id]-[span_id]-01) to CORS requests
                        propagateTraceHeaderCorsUrls: [
                            /.*8x8\.com/gm,
                            /.*api(-vo)?(-pilot)?(\.cloudflare)?.jitsi.net.*/gm
                        ],
                    }),
                ],
            }),
            new ReactIntegration()
        ],
    });
}

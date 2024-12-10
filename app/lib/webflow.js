import { WebflowClient } from "webflow-api"
export const webFlowClient = new WebflowClient({ accessToken: process.env.WEBFLOW_API_KEY })
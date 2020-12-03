/* eslint-disable no-restricted-globals */
import { isBrowser } from "./Util";

export const clientId = process.env.CLIENT_ID;
export const clientSecret = process.env.CLIENT_SECRET;
export const redirectUri = isBrowser ? location.origin + process.env.REDIRECT_URL : "";
export const oauthScope = "repo,read:packages,actions:read";

export default { clientId, clientSecret, redirectUri };

/* eslint-disable no-restricted-globals */
import { isBrowser } from "./Util";

export const clientId = "57f202d4c1f07138cd6a";
export const clientSecret = "abef994f0f63495819116190ca6fdd05a4499226";
export const redirectUri = isBrowser ? `${location.protocol}//${location.host}` : "http://localhost:3000";
export const oauthScope = "repo,read:packages,actions:read";

export default { clientId, clientSecret, redirectUri };

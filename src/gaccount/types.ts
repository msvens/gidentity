//https://developers.google.com/identity/gsi/web/reference/js-reference
export interface Credential {
    id: string
    password: string
}
export interface CredentialResponse {
    credential?: string
    select_by?:
        | "auto"
    | "user"
    | "user_1tap"
    | "user_2tap"
    | "btn"
    | "btn_confirm"
    | "btn_add_session"
    | "btn_confirm_session"
}

export interface IdJwtToken {
    iss: string //"https://accounts.google.com", // The JWT's issuer
    nbf: number //161803398874,
    aud: string //"314159265-pi.apps.googleusercontent.com", // Your server's client ID
    sub: string //"3141592653589793238", // The unique ID of the user's Google Account
    hd?: string //"gmail.com", If present, the host domain of the user's GSuite email address
    email: string //"elisa.g.beckett@gmail.com", // The user's email address
    email_verified: boolean //true, // true, if Google has verified the email address
    azp: string //"314159265-pi.apps.googleusercontent.com",
    name: string //"Elisa Beckett",
    picture?: string //If present, a URL to user's profile picture "https://lh3.googleusercontent.com/a-/e2718281828459045235360uler",
    given_name: string //"Elisa",
    family_name: string //"Beckett",
    iat: number//1596474000, // Unix timestamp of the assertion's creation time
    exp: number//1596477600, // Unix timestamp of the assertion's expiration time
    jti: string //"abc161803398874def"
}


export interface IdConfiguration {
    client_id: string
    auto_select?: boolean
    callback: (handleResponse: CredentialResponse) => void
    login_uri?: string
    native_callback?: (handleResponse: Credential) => void
    cancel_on_tap_outside?: boolean
    prompt_parent_id?: string
    nonce?: string
    context?: string
    state_cookie_domain?: string
    ux_mode?: "popup" | "redirect"
    allowed_parent_origin?: string | string[]
    intermediate_iframe_close_callback?: Function
}

export interface GsiButtonConfiguration {
    type: "standard" | "icon"
    theme?: "outline" | "filled_blue" | "filled_black"
    size?: "large" | "medium" | "small"
    text?: "signin_with" | "signup_with" | "continue_with" | "signup_with"
    shape?: "rectangular" | "pill" | "circle" | "square"
    logo_alignment?: "left" | "center"
    width?: string
    locale?: string
}

interface PromptMomentNotification {
    isDisplayMoment: () => boolean
    isDisplayed: () => boolean
    isNotDisplayed: () => boolean
    getNotDisplayedReason: () =>
        | "browser_not_supported"
        | "invalid_client"
        | "missing_client_id"
        | "opt_out_or_no_session"
        | "secure_http_required"
        | "suppressed_by_user"
        | "unregistered_origin"
        | "unknown_reason"
    isSkippedMoment: () => boolean
    getSkippedReason: () =>
        | "auto_cancel"
        | "user_cancel"
        | "tap_outside"
        | "issuing_failed"
    isDismissedMoment: () => boolean
    getDismissedReason: () =>
        | "credential_returned"
        | "cancel_called"
        | "flow_restarted"
    getMomentType: () => "display" | "skipped" | "dismissed"
}

interface RevocationResponse {
    successful: boolean
    error: string
}

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    cancel: () => void
                    disableAutoSelect: () => void
                    initialize: (config: IdConfiguration) => void
                    prompt: (listener?: (res: PromptMomentNotification) => void) => void
                    renderButton: (parent: HTMLElement, config: GsiButtonConfiguration) => void
                    revoke: (hint: string, callback: (done: RevocationResponse) => void) => void
                }
            }
        }

        [key: string]: any;
    }
}

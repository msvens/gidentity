import {useEffect, useState} from "react";
import {CredentialResponse, IdConfiguration, IdJwtToken} from "./types";
import {useScript} from "./useScript";
import jwtDecode from "jwt-decode";
import {useMountedState} from "./useMounted";

export const gsiScriptFlag: string = '__gsiScript__'
export const gsiScriptUrl: string = 'https://accounts.google.com/gsi/client'

export function responseToToken(resp: CredentialResponse): IdJwtToken|undefined {
    if(resp.credential) {
        return jwtDecode<IdJwtToken>(resp.credential)
    } else {
        return undefined
    }
}

export const useOneTap: (clientId: string, cancelOnUnmount: boolean) => [boolean, IdJwtToken | undefined] = (clientId, cancel) => {
    const [token, setToken] = useMountedState<IdJwtToken|undefined>(undefined)
    const [hasToken, setHasToken] = useMountedState<boolean>(false)

    const cb: (resp: CredentialResponse) => void = (resp) => {
        if (resp.credential) {
            let t: IdJwtToken = jwtDecode<IdJwtToken>(resp.credential)
            console.log(t)
            setToken(prev => t)
            //alert(t)
            setHasToken(prev => true)
        } else {
            setToken(undefined)
            setHasToken(false)
        }
    }

    const script = useScript(gsiScriptUrl)

    useEffect(() => {

        if (!window?.[gsiScriptFlag] && window.google && script === 'ready') {
            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: cb,
            })
            window[gsiScriptFlag] = true

        }
        if (window?.[gsiScriptFlag] && window.google && script === 'ready') {
            window.google.accounts.id.prompt()
            return () => {
                if (cancel) {
                    if(window.google) {
                        window.google.accounts.id.cancel()
                    }
                }
            }
        }
    },[script])

    return [hasToken,token]

}

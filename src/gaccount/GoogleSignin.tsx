import Button from "@mui/material/Button";
import {CredentialResponse, GsiButtonConfiguration, IdJwtToken} from "./types";
import {useMountedState} from "./useMounted";
import {useScript} from "./useScript";
import {gsiScriptUrl} from "./useGsiOneTap";
import {useEffect} from "react";
import jwtDecode from "jwt-decode";


type GoogleSigninProps = {
    buttonConf?: GsiButtonConfiguration
    clientId: string
    onSignin?: (jwt: IdJwtToken|undefined) => void,
}


const GoogleSignin: React.VFC<GoogleSigninProps> = ({clientId, buttonConf, onSignin}) => {
    const [token, setToken] = useMountedState<IdJwtToken | undefined>(undefined)

    const script = useScript(gsiScriptUrl)

    const cb: (resp: CredentialResponse) => void = (resp) => {
        if (resp.credential) {
            let t: IdJwtToken = jwtDecode<IdJwtToken>(resp.credential)
            console.log(t)
            setToken(prev => t)
            if(onSignin) {
                onSignin(t)
            }
        } else {
            setToken(undefined)
            if (onSignin) {
                onSignin(undefined)
            }
        }
    }

    useEffect(() => {
        if (window.google && script === 'ready') {
            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: cb,
            })
            let b = document.getElementById("google-sign-in-button")
            if (b) {
                window.google.accounts.id.renderButton(b, {type: "standard", theme: "outline", size: "large"})
            }
            return () => {
                if (window.google) {
                    window.google.accounts.id.cancel()
                }
            }
        }

    }, [script])

    return (
        <div id={"google-sign-in-button"}/>
    )
}

export default GoogleSignin
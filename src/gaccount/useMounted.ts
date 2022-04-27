import {Dispatch, MutableRefObject, SetStateAction, useCallback, useEffect, useRef, useState} from "react";


export const useMounted: () => () => boolean = () => {
    const mounted = useRef<boolean>(false)
    const isMounted = useCallback(() => mounted.current, [])

    useEffect(() => {
        mounted.current = true
        return () => {
            mounted.current = false
        }
    })
    return isMounted
}

export function useMountedState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
    const isMounted = useMounted()
    const [state, setState] = useState<S>(initialState)

    const setStateCallback = useCallback(
        (...args) => {
            if (isMounted()) {
                // @ts-ignore
                return setState(...args)
            }
            return null
        },
        [isMounted, setState],
    )
    return [state, setStateCallback]

}
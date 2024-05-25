

export const useMediaQuery = () => {
    const create = (conditions: string | string[]) => {
        if (conditions === '') { return null }
        return (typeof conditions === "string")
            ? window.matchMedia(conditions)
            : conditions.map(c => window.matchMedia(c))
    }

    const startListener = (
        mediaQueryLists: MediaQueryList | MediaQueryList[],
        fn: () => void,
        fnFirst = true
    ) => {
        if (fnFirst) { fn(); }
        return Array.isArray(mediaQueryLists)
            ? mediaQueryLists.map(mql => mql.addEventListener('change', fn))
            : mediaQueryLists.addEventListener('change', fn)
    }

    const removeListener = (
        mediaQueryLists: MediaQueryList | MediaQueryList[],
        fn: () => void
    ) => {
        return Array.isArray(mediaQueryLists)
            ? mediaQueryLists.map(mql => mql.removeEventListener('change', fn))
            : mediaQueryLists.removeEventListener('change', fn)
    }

    return {
        create,
        startListener,
        removeListener
    }
}
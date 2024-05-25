

export const useMediaQuery = () => {
    const create = (conditions: string | string[]) => {
        if (conditions === '') { return null }
        return (typeof conditions === "string")
            ? window.matchMedia(conditions)
            : conditions.map(c => window.matchMedia(c))
    }

    const startListener = (
        mediaQueryLists: MediaQueryList | MediaQueryList[],
        fn: (event: MediaQueryListEvent) => void,
        fnFirst = true
    ) => {
        const executeFn = (mql: MediaQueryList) => {
            const fakeEvent = { matches: mql.matches, media: mql.media } as MediaQueryListEvent
            fn(fakeEvent);
        }
        if (Array.isArray(mediaQueryLists)) {
            if (fnFirst) { mediaQueryLists.forEach(mql => executeFn(mql)); }
            return mediaQueryLists.map(mql => mql.addEventListener('change', fn))
        }
        else {
            if (fnFirst) { executeFn(mediaQueryLists); }
            return mediaQueryLists.addEventListener('change', fn)
        }
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
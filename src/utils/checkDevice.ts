const devices = {
    desktop: Infinity,
    tablet: 1280,
    mobile: 750,
    mobileSmall: 480,
}

export function checkDeviceByWidth(device: keyof typeof devices): boolean {
    const makeQuery = (px: number) => {
        return window.matchMedia(`(max-width: ${px}px)`);
    }

    return makeQuery(devices[device]).matches;
}

export function isDesktop() {
    return !('ontouchstart' in window);
} 
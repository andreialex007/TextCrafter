export function setLocalItem<T>(key: string, obj: T) {
    ;(window as any).localStorage.setItem(key, JSON.stringify(obj))
}

export function getLocalItem<T>(key: string): T | null {
    let item = (window as any).localStorage.getItem(key)
    if (!item) {
        return null
    }
    return JSON.parse(item) as T
}

export function sleep(ms: number, id?: string) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export const preloadImages = (imgList: Array<string>) => {
    ;(window as any).images = []
    for (let i = 0; i < imgList.length; i++) {
        let images = (window as any).images
        images[i] = new Image()
        images[i].src = imgList[i]
    }
}
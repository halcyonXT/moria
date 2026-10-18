const assets = import.meta.glob(
    "/src/assets/**/*.{png,jpg,jpeg,webp,gif,svg}",
    {
        eager: true,
        query: "?url",
        import: "default",
    }
);

export function preloadAssets(onProgress) {
    const sources = Object.values(assets);
    let loaded = 0;

    const updateProgress = () => {
        loaded++;
        onProgress?.(loaded, sources.length, loaded / sources.length);
    };

    return Promise.all(
        sources.map((src) => {
            return new Promise((resolve) => {
                const img = new Image();

                img.onload = () => {
                    updateProgress();
                    resolve();
                };

                img.onerror = () => {
                    updateProgress();
                    resolve();
                };

                img.src = src;
            });
        })
    );
}
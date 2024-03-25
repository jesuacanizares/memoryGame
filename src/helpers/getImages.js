
export const getImages = (size) => {
    const images = [
        "./animals/png/abeja.png",
        "./animals/png/coala.png",
        "./animals/png/elefante.png",
        "./animals/png/leon.png",
        "./animals/png/loro.png",
        "./animals/png/mono.png",
        "./animals/png/pato.png",
        "./animals/png/perro.png",
        "./animals/png/tortuga.png",
        "./animals/png/vaca.png",
        "./animals/png/zorro.png"
    ]

    const newImages = images.slice(0, size);

    return newImages.flatMap(item => [`1|${item}`, `2|${item}`])
        .sort(() => Math.random() - 0.5)
    // 50% 0 - 0.5   0.4 - 0.5 -
    // 50% 0.5 - 1   0.7 - 0.5 +
}
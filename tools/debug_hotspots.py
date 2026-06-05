from pathlib import Path

from PIL import Image, ImageDraw


HOTSPOTS = [
    ("macro-page-03.png", "knee", 69, 43, 15, 25),
    ("macro-page-04.png", "chest", 67, 40, 15, 22),
    ("macro-page-05.png", "head", 72, 16, 16, 22),
    ("macro-page-06.png", "foot", 72, 61, 14, 22),
    ("macro-page-07.png", "armpit", 75, 25, 10, 27),
    ("macro-page-08.png", "neck", 67, 34, 13, 15),
]


def main():
    out = Path("public/debug")
    out.mkdir(parents=True, exist_ok=True)

    for filename, name, x, y, width, height in HOTSPOTS:
        image = Image.open(Path("public/book") / filename).convert("RGB")
        image_width, image_height = image.size
        box = (
            int(x / 100 * image_width),
            int(y / 100 * image_height),
            int((x + width) / 100 * image_width),
            int((y + height) / 100 * image_height),
        )
        draw = ImageDraw.Draw(image)
        draw.ellipse(box, outline="red", width=8)
        draw.text((box[0], max(0, box[1] - 40)), name, fill="red")
        image.resize((900, 450)).save(out / f"macro-{name}-hotspot.jpg")


if __name__ == "__main__":
    main()

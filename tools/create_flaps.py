from pathlib import Path

from PIL import Image, ImageDraw


FLAPS = [
    ("page-03.jpg", "knee", 63, 31, 29, 45),
    ("page-04.jpg", "chest", 62, 24, 29, 49),
    ("page-05.jpg", "head", 61, 15, 31, 48),
    ("page-06.jpg", "foot", 64, 41, 30, 48),
    ("page-07.jpg", "armpit", 62, 21, 31, 51),
    ("page-08.jpg", "neck", 62, 18, 30, 53),
]


def percent_box(image, x, y, width, height):
    image_width, image_height = image.size
    return (
        int(x / 100 * image_width),
        int(y / 100 * image_height),
        int((x + width) / 100 * image_width),
        int((y + height) / 100 * image_height),
    )


def main():
    book_dir = Path("public/book")
    flap_dir = Path("public/flaps")
    debug_dir = Path("public/debug")
    flap_dir.mkdir(parents=True, exist_ok=True)
    debug_dir.mkdir(parents=True, exist_ok=True)

    for filename, name, x, y, width, height in FLAPS:
        page = Image.open(book_dir / filename).convert("RGBA")
        box = percent_box(page, x, y, width, height)
        crop = page.crop(box)

        mask = Image.new("L", crop.size, 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, crop.size[0] - 1, crop.size[1] - 1), fill=255)
        crop.putalpha(mask)
        crop.save(flap_dir / f"{name}-flap.png")

        debug = Image.open(book_dir / filename).convert("RGB")
        debug_draw = ImageDraw.Draw(debug)
        debug_draw.ellipse(box, outline="red", width=8)
        debug.resize((900, 451)).save(debug_dir / f"{name}-flap-box.jpg")


if __name__ == "__main__":
    main()

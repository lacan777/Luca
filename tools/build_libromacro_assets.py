from pathlib import Path

from PIL import Image


BOOK_DIR = Path("public/book")
CLUE_DIR = Path("public/clues")
SOURCE_DIR = Path("libromacro")
ZOOM_DIR = Path("imagenesconzoom")

CLUE_ZOOMS = {
    "knee": ("12.png", (292, 430), 620),
    "chest": ("12.png", (1375, 535), 680),
    "foot": ("13.png", (275, 455), 560),
    "head": ("13.png", (1415, 365), 560),
    "armpit": ("14.png", (560, 590), 660),
    "neck": ("14.png", (1420, 500), 660),
}


def save_png(source, target):
    Image.open(source).convert("RGB").save(target)


def centered_square(image, center, size):
    half = size // 2
    left = max(0, center[0] - half)
    top = max(0, center[1] - half)
    right = min(image.width, center[0] + half)
    bottom = min(image.height, center[1] + half)

    if right - left < size:
        if left == 0:
            right = min(image.width, size)
        else:
            left = max(0, image.width - size)

    if bottom - top < size:
        if top == 0:
            bottom = min(image.height, size)
        else:
            top = max(0, image.height - size)

    return image.crop((left, top, right, bottom))


def main():
    BOOK_DIR.mkdir(parents=True, exist_ok=True)
    CLUE_DIR.mkdir(parents=True, exist_ok=True)

    first_page = Image.open(SOURCE_DIR / "1.png").convert("RGB")
    width, height = first_page.size
    first_page.crop((width // 2, 0, width, height)).save(BOOK_DIR / "macro-cover.png")
    first_page.crop((0, 0, width // 2, height)).save(BOOK_DIR / "macro-back-cover.png")

    for page_number in range(2, 12):
        save_png(SOURCE_DIR / f"{page_number}.png", BOOK_DIR / f"macro-page-{page_number:02}.png")

    for name, (filename, center, size) in CLUE_ZOOMS.items():
        image = Image.open(ZOOM_DIR / filename).convert("RGB")
        centered_square(image, center, size).save(CLUE_DIR / f"{name}.png")


if __name__ == "__main__":
    main()

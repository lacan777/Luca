from pathlib import Path
from math import ceil

from PIL import Image, ImageDraw


def main():
    files = sorted(Path("imagenesconzoom").glob("*.png"), key=lambda path: int(path.stem))
    thumbs = []

    for file in files:
        image = Image.open(file).convert("RGB")
        print(file.name, image.size)
        image.thumbnail((520, 260))
        thumbs.append((file.name, image.copy()))

    sheet = Image.new("RGB", (1080, ceil(len(thumbs) / 2) * 320), "white")
    draw = ImageDraw.Draw(sheet)

    for index, (name, image) in enumerate(thumbs):
        x = (index % 2) * 540 + 10
        y = (index // 2) * 320 + 34
        draw.text((x, y - 24), name, fill=(0, 0, 0))
        sheet.paste(image, (x, y))

    sheet.save("imagenesconzoom/contact-sheet.jpg")


if __name__ == "__main__":
    main()

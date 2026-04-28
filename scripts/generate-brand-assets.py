from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
APP = ROOT / "app"
BRAND_DIR = PUBLIC / "brand"

INK = "#241b1d"
DEEP = "#314f4a"
ACCENT = "#8b4656"
GOLD = "#c9923e"
CREAM = "#fffaf7"
SOFT = "#f7e7e1"


def font(size, bold=False):
    candidates = [
        "C:/Windows/Fonts/georgiab.ttf" if bold else "C:/Windows/Fonts/georgia.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size=size)
    return ImageFont.load_default(size=size)


def gradient(size, top=CREAM, bottom=SOFT):
    width, height = size
    image = Image.new("RGB", size, top)
    draw = ImageDraw.Draw(image)
    top_rgb = tuple(int(top[i : i + 2], 16) for i in (1, 3, 5))
    bottom_rgb = tuple(int(bottom[i : i + 2], 16) for i in (1, 3, 5))
    for y in range(height):
        ratio = y / max(height - 1, 1)
        color = tuple(round(top_rgb[i] * (1 - ratio) + bottom_rgb[i] * ratio) for i in range(3))
        draw.line([(0, y), (width, y)], fill=color)
    return image


def draw_logo(draw, center, radius):
    x, y = center
    draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=DEEP)
    draw.ellipse((x - radius + 8, y - radius + 8, x + radius - 8, y + radius - 8), outline=GOLD, width=max(4, radius // 9))
    crystal = [
        (x, y - int(radius * 0.68)),
        (x + int(radius * 0.34), y - int(radius * 0.1)),
        (x + int(radius * 0.22), y + int(radius * 0.58)),
        (x - int(radius * 0.22), y + int(radius * 0.58)),
        (x - int(radius * 0.34), y - int(radius * 0.1)),
    ]
    draw.polygon(crystal, fill=CREAM)
    draw.line((x, y - int(radius * 0.55), x, y + int(radius * 0.48)), fill=GOLD, width=max(2, radius // 14))
    draw.line((x, y - int(radius * 0.08), x + int(radius * 0.24), y - int(radius * 0.1)), fill=GOLD, width=max(2, radius // 15))
    draw.line((x, y - int(radius * 0.08), x - int(radius * 0.24), y - int(radius * 0.1)), fill=GOLD, width=max(2, radius // 15))


def save_icon(size, target):
    image = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    draw_logo(draw, (size // 2, size // 2), int(size * 0.43))
    image.save(target)


def paste_stone(canvas, path, box):
    stone = Image.open(path).convert("RGBA")
    stone.thumbnail((box[2] - box[0], box[3] - box[1]), Image.Resampling.LANCZOS)
    shadow = Image.new("RGBA", stone.size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.ellipse((8, stone.size[1] - 42, stone.size[0] - 8, stone.size[1] - 4), fill=(49, 79, 74, 80))
    shadow = shadow.filter(ImageFilter.GaussianBlur(12))
    x = box[0] + ((box[2] - box[0]) - stone.size[0]) // 2
    y = box[1] + ((box[3] - box[1]) - stone.size[1]) // 2
    canvas.alpha_composite(shadow, (x, y + 24))
    canvas.alpha_composite(stone, (x, y))


def save_og():
    image = gradient((1200, 630)).convert("RGBA")
    draw = ImageDraw.Draw(image)

    draw.rounded_rectangle((54, 54, 1146, 576), radius=32, fill=(255, 250, 247, 235), outline="#e3d4cd", width=2)
    draw_logo(draw, (142, 142), 56)

    draw.text((220, 92), "Litho Intelligence", fill=INK, font=font(56, bold=True))
    draw.text((224, 160), "Pierres, intentions et rituels responsables", fill=ACCENT, font=font(25))

    draw.text((86, 242), "Trouvez la pierre adaptée", fill=DEEP, font=font(46, bold=True))
    draw.text((86, 298), "à votre intention", fill=DEEP, font=font(46, bold=True))
    draw.text((90, 374), "Recommandations personnalisées,", fill=INK, font=font(28))
    draw.text((90, 412), "formation gratuite, PDF, QCM", fill=INK, font=font(28))
    draw.text((90, 450), "et espace membre.", fill=INK, font=font(28))

    draw.rounded_rectangle((90, 500, 356, 548), radius=24, fill=GOLD)
    draw.text((124, 510), "Accéder au site", fill="white", font=font(22, bold=True))

    paste_stone(image, PUBLIC / "images" / "stones" / "amethyste.png", (810, 124, 1070, 390))
    paste_stone(image, PUBLIC / "images" / "stones" / "quartz-rose.png", (930, 302, 1124, 540))
    paste_stone(image, PUBLIC / "images" / "stones" / "citrine.png", (700, 330, 900, 548))

    image.convert("RGB").save(BRAND_DIR / "litho-intelligence-og.png", quality=92)


def main():
    BRAND_DIR.mkdir(parents=True, exist_ok=True)
    save_icon(32, APP / "icon.png")
    save_icon(180, APP / "apple-icon.png")
    save_icon(512, BRAND_DIR / "litho-intelligence-icon.png")
    save_og()
    print("app/icon.png")
    print("app/apple-icon.png")
    print("public/brand/litho-intelligence-icon.png")
    print("public/brand/litho-intelligence-og.png")


if __name__ == "__main__":
    main()

from PIL import Image

def convert(path, options):
    power_switcher = {
        0: 20,
        1: 30,
        2: 40,
    }
    # fetch power from options
    power = power_switcher.get(options['power'] if 'power' in options else 0, 20)

    image = Image.open(path)
    width, heigth = image.size

    pixel_map = image.load()

    # check is png
    is_transparent = len(image.getpixel((0, 0))) > 3

    for pixel_y in range(heigth):
        for pixel_x in range(width):

            if is_transparent:
                r, g, b, a = image.getpixel((pixel_x, pixel_y))
            else:
                r, g, b = image.getpixel((pixel_x, pixel_y))

            # transform RED, GREEN, BLUE
            tr = int(r + 2 * power)
            tg = int(g + power)
            tb = int(b)

            # check are values not to high, if yes then se its max value
            if tr > 255:
                tr = 255

            if tg > 255:
                tg = 255

            if tb > 255:
                tb = 255

            # set new values
            pixel_map[pixel_x, pixel_y] = (tr, tg, tb)

    return image
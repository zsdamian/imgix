from PIL import Image
import os

save_directory = '/home/wwwroot/app/upload/converted'


class Provider:
    """Provider valid converter (and check is exists) by type and forward to manager"""
    def __init__(self):
        self.map = {
            'sepia': Sepia(),
            'bnw': BlackAndWhite(),
        }
        self.manager = ConvertManager()

    def provide(self, type, path, options):
        if type not in self.map:
            print('Converter for type {} not found. Stop converting.'.format(type))
            return

        return self.manager.manage(self.map[type], path, options)


class ConvertManager:
    """Manage whole converting process"""
    def manage(self, converter, path, options):
        if not os.path.exists(path):
            print('There is no file in {}'.format(path))
            return

        print('Validate...')
        if not converter.is_valid(options):
            print('Options not valid. Stop converting...')
            return

        print('Options valid. Start converting...')
        origin_image = Image.open(path)
        image = converter.convert(origin_image, options)
        print("File converted with {} converter".format(converter.__class__))
        if not os.path.exists(save_directory):
            os.makedirs(save_directory)

        save_path = '{}/{}'.format(save_directory, os.path.basename(origin_image.filename))
        image.save(save_path)
        print("Converted file saved to {}".format(save_path))
        return save_path


class Converter:
    """Interaface of any converter in app"""
    def is_valid(self, data):
        pass

    def convert(self, image, data):
        pass


class Sepia(Converter):

    def __init__(self):
        self.palette_scheme_switcher = {
            0: (255, 240, 192),
            1: (255, 240, 180),
            2: (255, 220, 160),
            3: (255, 210, 150),
            4: (255, 200, 140),
        }

    def is_valid(self, data):
        if 'power' not in data:
            return False

        if data['power'] not in self.palette_scheme_switcher:
            return False

        return True

    def convert(self, image, data):
        # fetch power from options
        palette_scheme = self.palette_scheme_switcher.get(data['power'])

        sepia_filter = self.make_sepia_palette(palette_scheme)

        converted_to_gray = image.convert('L')
        converted_to_gray.putpalette(sepia_filter)

        return converted_to_gray.convert('RGB')

    def make_sepia_palette(self, color):
        palette = []
        r, g, b = color
        for i in range(255):
            palette.extend((r * i / 255, g * i / 255, b * i / 255))

        return palette


class BlackAndWhite(Converter):

    def __init__(self):
        self.mode_switcher = {
            0: True,
            1: False,
        }

    def is_valid(self, data):
        if 'mode' not in data:
            return False

        if data['mode'] not in self.mode_switcher:
            return False

        return True

    def convert(self, image, data):
        if self.mode_switcher[data['mode']]:
            return image.convert('L')
        else:
            return image.convert('1', dither=Image.NONE)



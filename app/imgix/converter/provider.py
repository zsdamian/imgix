from converter import sepia
import os

directory = '/home/wwwroot/app/upload/converted'

map = {
    'sepia': sepia
}


def provide(type, path, options):
    if type not in map:
        print('Converter for type {} not found. Stop converting.'.format(type))
        return

    print('Start converting...')
    image = map[type].convert(path, options)
    print("File converted with {} converter".format(type))
    if not os.path.exists(directory):
        os.makedirs(directory)

    save_path = directory + '/' + os.path.basename(image.filename)
    image.save(save_path)
    print("Converted file saved to {}".format(save_path))
    return save_path

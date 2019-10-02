<?php


namespace Imgix\File\Handler\FilenameGenerator;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class DatetimeFilenameGenerator implements FilenameGeneratorInterface
{

    public function generate(UploadedFile $file): string
    {
        return
            date('Ymdhis')
            . '_'
            . hash('crc32', $file->getBasename())
            . '.'
            . $file->getClientOriginalExtension();
    }
}
<?php


namespace Imgix\File\Handler\FilenameGenerator;

use Symfony\Component\HttpFoundation\File\UploadedFile;

interface FilenameGeneratorInterface
{

    public function generate(UploadedFile $file): string;

}
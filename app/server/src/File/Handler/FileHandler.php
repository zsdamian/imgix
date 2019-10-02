<?php

namespace Imgix\File\Handler;

use Imgix\File\Handler\FilenameGenerator\FilenameGeneratorInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileHandler implements FileHandlerInterface
{

    /** @var string */
    private $directory;

    /** @var Filesystem */
    private $filesystem;

    /** @var FilenameGeneratorInterface */
    private $filenameGenerator;

    public function __construct(
        Filesystem $filesystem,
        FilenameGeneratorInterface $filenameGenerator,
        string $fileHandlerDirectory
    )
    {
        $this->directory = $fileHandlerDirectory;
        $this->filesystem = $filesystem;
        $this->filenameGenerator = $filenameGenerator;
    }


    public function handle(UploadedFile $file): File
    {
        if (!is_dir($this->directory)) {
            mkdir($this->directory, 0777, true);
        }

        return $file->move($this->directory, $this->filenameGenerator->generate($file));
    }

}
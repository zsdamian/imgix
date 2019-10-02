<?php


namespace Imgix\File\Handler;


use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;

interface FileHandlerInterface
{

    public function handle(UploadedFile $file): File;

}
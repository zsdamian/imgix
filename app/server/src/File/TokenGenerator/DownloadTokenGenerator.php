<?php


namespace Imgix\File\TokenGenerator;


class DownloadTokenGenerator implements TokenGeneratorInterface
{

    public function generate(string $seed = null): string
    {
        return hash('sha256', $seed ?: microtime(false));
    }
}
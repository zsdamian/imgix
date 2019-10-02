<?php


namespace Imgix\File\TokenGenerator;


interface TokenGeneratorInterface
{

    public function generate(string $seed = null): string;

}
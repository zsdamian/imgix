<?php


namespace Imgix\Model;


use Symfony\Component\HttpFoundation\File\File;

class BlackAndWhiteDTO
{

    /** @var File|null*/
    private $file;

    /** @var int|null */
    private $mode;

    /**
     * @return File|null
     */
    public function getFile(): ?File
    {
        return $this->file;
    }

    /**
     * @param File|null $file
     */
    public function setFile(?File $file): void
    {
        $this->file = $file;
    }

    /**
     * @return int|null
     */
    public function getMode(): ?int
    {
        return $this->mode;
    }

    /**
     * @param int|null $mode
     */
    public function setMode(?int $mode): void
    {
        $this->mode = $mode;
    }

}
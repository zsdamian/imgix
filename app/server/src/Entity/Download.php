<?php

namespace Imgix\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 */
class Download
{

    public const STATUS_NEW = 0;
    public const STATUS_READY = 1;
    public const STATUS_ERROR = 2;

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @var int|null
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     *
     * @var \DateTime|null
     */
    private $expirationTime;

    /**
     * @ORM\Column(type="string", unique=true)
     *
     * @var string|null
     */
    private $token;

    /**
     * @ORM\Column(type="string", nullable=true)
     *
     * @var string|null
     */
    private $filePath;

    /**
     *  @ORM\Column(type="integer")
     *
     * @var int|null
     */
    private $status;

    public function __construct()
    {
        $this->status = self::STATUS_NEW;
        $this->expirationTime = new \DateTime("+1 hours");
    }

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return \DateTime|null
     */
    public function getExpirationTime(): ?\DateTime
    {
        return $this->expirationTime;
    }

    /**
     * @param \DateTime|null $expirationTime
     */
    public function setExpirationTime(?\DateTime $expirationTime): void
    {
        $this->expirationTime = $expirationTime;
    }

    /**
     * @return string|null
     */
    public function getToken(): ?string
    {
        return $this->token;
    }

    /**
     * @param string|null $token
     */
    public function setToken(?string $token): void
    {
        $this->token = $token;
    }

    /**
     * @return string|null
     */
    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    /**
     * @param string|null $filePath
     */
    public function setFilePath(?string $filePath): void
    {
        $this->filePath = $filePath;
    }

    /**
     * @return int|null
     */
    public function getStatus(): ?int
    {
        return $this->status;
    }

    /**
     * @param int|null $status
     */
    public function setStatus(?int $status): void
    {
        $this->status = $status;
    }

}
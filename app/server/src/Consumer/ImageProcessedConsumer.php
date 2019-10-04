<?php


namespace Imgix\Consumer;


use Doctrine\ORM\EntityManagerInterface;
use Imgix\Entity\Download;
use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use PhpAmqpLib\Message\AMQPMessage;

class ImageProcessedConsumer implements ConsumerInterface
{

    /** @var ProducerInterface */
    private $rabbitProducerImageProcessed;

    /** @var EntityManagerInterface */
    private $entityManager;

    public function __construct(ProducerInterface $rabbitProducerImageProcessed, EntityManagerInterface $entityManager)
    {
        $this->rabbitProducerImageProcessed = $rabbitProducerImageProcessed;
        $this->entityManager = $entityManager;
    }


    public function execute(AMQPMessage $msg)
    {
        $data = json_decode($msg->getBody(), true);
        /** @var Download $download */
        $download = $this->entityManager->getRepository(Download::class)->findOneByToken($data['download_token']);

        if (isset($data['error'])) {
            $download->setStatus(Download::STATUS_ERROR);
            $this->entityManager->persist($download);
            $this->entityManager->flush();
            return true;
        }

        if (!$download) {
            return true;
        }

        $download->setStatus(Download::STATUS_READY);
        $download->setFilePath($data['path']);

        $this->entityManager->persist($download);
        $this->entityManager->flush();

        $this->rabbitProducerImageProcessed->publish(json_encode([
            'link' => $download->getId(),
            'token' => $download->getToken(),
        ]), 'image-ready-socket');

        return true;
    }
}
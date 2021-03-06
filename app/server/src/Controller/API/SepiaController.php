<?php

namespace Imgix\Controller\API;

use Doctrine\ORM\EntityManagerInterface;
use Imgix\Entity\Download;
use Imgix\File\Handler\FileHandlerInterface;
use Imgix\File\TokenGenerator\DownloadTokenGenerator;
use Imgix\Form\SepiaForm;
use Imgix\Model\SepiaDTO;
use Imgix\Response\ImgixJsonResponse;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class SepiaController
{

    /** @var ProducerInterface */
    private $rabbitProducerUploadImage;

    /** @var FormFactoryInterface */
    private $formFactory;

    /** @var FileHandlerInterface */
    private $fileHandler;

    /** @var DownloadTokenGenerator */
    private $downloadTokenGenerator;

    /** @var EntityManagerInterface */
    private $entityManager;

    public function __construct(
        ProducerInterface $rabbitProducerUploadImage,
        FormFactoryInterface $formFactory,
        FileHandlerInterface $fileHandler,
        DownloadTokenGenerator $downloadTokenGenerator,
        EntityManagerInterface $entityManager
    )
    {
        $this->rabbitProducerUploadImage = $rabbitProducerUploadImage;
        $this->formFactory = $formFactory;
        $this->fileHandler = $fileHandler;
        $this->downloadTokenGenerator = $downloadTokenGenerator;
        $this->entityManager = $entityManager;
    }


    public function __invoke(Request $request)
    {
        $sepiaDTO = new SepiaDTO();
        $form = $this->formFactory->create(SepiaForm::class, $sepiaDTO);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $downloadToken = $this->downloadTokenGenerator->generate($sepiaDTO->getFile()->getBasename());

            $sepiaDTO->setFile(
                $this->fileHandler->handle(
                    $sepiaDTO->getFile()
                )
            );

            $download = new Download();
            $download->setToken($downloadToken);
            $this->entityManager->persist($download);
            $this->entityManager->flush();

            $this->rabbitProducerUploadImage->publish(json_encode([
                'file' => $sepiaDTO->getFile() ? $sepiaDTO->getFile()->getRealPath() : null,
                'type' => 'sepia',
                'token' => $downloadToken,
                'options' => [
                    'power' => $sepiaDTO->getPower(),
                ]
            ]), 'upload-image');

            return new ImgixJsonResponse([
                'token' => $downloadToken
            ], 200);
        }

        return $form->getErrors();
    }

}
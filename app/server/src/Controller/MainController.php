<?php


namespace Imgix\Controller;


use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MainController
{

    /** @var EngineInterface */
    private $templateEngine;

    public function __construct(EngineInterface $templateEngine)
    {
        $this->templateEngine = $templateEngine;
    }

    public function __invoke(Request $request): Response{
        return $this->templateEngine->renderResponse(
            'base.html.twig',
            $request->attributes->all()
        );
    }

}
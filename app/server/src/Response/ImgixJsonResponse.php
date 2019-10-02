<?php


namespace Imgix\Response;


use Symfony\Component\HttpFoundation\JsonResponse;

class ImgixJsonResponse extends JsonResponse
{

    public function __construct($message = '', int $status = 200, array $headers = [])
    {
        parent::__construct($message, $status, $headers);
    }

}
import pika
import json
from converter.converter import Provider

connection = pika.BlockingConnection(pika.ConnectionParameters(
    'rabbit',
    5672,
    '/',
    pika.credentials.PlainCredentials('root', 'root')
))

channel = connection.channel()

provider = Provider()


def consume(channel, method, properties, body):
    print("Received {}".format(body))
    parsedBody = json.loads(body)
    save_path = provider.provide(
        parsedBody['type'],
        parsedBody['file'],
        {} if 'file' not in parsedBody else parsedBody['options']
    )
    body = json.dumps({
        "path": save_path,
        "download_token": parsedBody['token']
    })

    channel.basic_publish(exchange='amq.direct',routing_key='image-ready-backend', body=body)


channel.basic_consume(queue='upload-image',
                      auto_ack=True,
                      on_message_callback=consume)

channel.start_consuming()
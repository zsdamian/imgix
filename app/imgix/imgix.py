import pika
import json
import converter.provider as provider


connection = pika.BlockingConnection(pika.ConnectionParameters(
    'rabbit',
    5672,
    '/',
    pika.credentials.PlainCredentials('root', 'root')
))


def consume(channel, method, properties, body):
    print("Received {}".format(body))
    parsedBody = json.loads(body)
    image = provider.provide(
        parsedBody['type'],
        parsedBody['file'],
        {} if 'file' not in parsedBody else parsedBody['options']
    )



channel = connection.channel()


channel.basic_consume(queue='upload-image',
                      auto_ack=True,
                      on_message_callback=consume)

channel.start_consuming()
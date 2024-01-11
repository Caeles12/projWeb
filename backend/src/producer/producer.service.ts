import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect(['amqp://admin:admin@rabbitmq']);
    this.channelWrapper = connection.createChannel({
      json: true,
      setup: (channel: Channel) => {
        return channel.assertQueue('administration_queue', { durable: true });
      },
    });
  }

  async addToEmailQueue(mail: any) {
    try {
      this.channelWrapper
        .sendToQueue('administration_queue', mail)
        .then(function () {
            return console.log('Message was sent!  Hooray!');
        })
        .catch(function (err) {
            return console.log('Message was rejected...  Boo!');
        });
    } catch (error) {
      throw new HttpException(
        'Error adding mail to queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
import os
import discord
import pika
import json
import asyncio

config = json.load(open('config.json'))

intents = discord.Intents.default()
intents.message_content = True
intents.guilds = True
intents.members = True

client = discord.Client(intents=intents)

#create discord embed message
def create_embed_message(title, description, color):
  embed = discord.Embed(title=title, description=description, color=color)
  return embed

@client.event
async def on_ready():
  print(f'We are logged in as {client.user}')

def on_open(connection):
  connection.channel(on_open_callback=on_channel_open)

def on_channel_open(channel):
  channel.basic_publish('',
                        'contact',
                        'Test Message',
                        pika.BasicProperties(content_type='text/plain',
                                              type='example'))

def on_close(connection, exception):
  connection.ioloop.stop()

connectionParameters = pika.ConnectionParameters(host='rabbitmq', credentials=pika.PlainCredentials(os.environ.get('RABBITMQ_USER'), os.environ.get('RABBITMQ_PASS')))
connection = pika.SelectConnection(parameters=connectionParameters, on_open_callback=on_open, on_close_callback=on_close)

try:
  asyncio.gather(
    client.run(os.environ.get("DISCORD_TOKEN")),
    connection.ioloop.start()
  )
except KeyboardInterrupt:
  connection.close()
  connection.ioloop.start()

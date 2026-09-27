---
title: Modbus TCP to MQTT Gateway with Live Web Dashboard
summary: Gateway that polls a Siemens PAC3200 power meter over Modbus TCP and republishes the data to MQTT, with a Python dashboard that sends commands back.
fields: [embedded]
order: 120
featured: true
tools: [Modbus TCP, MQTT, TCP/IP, Arduino Ethernet, ESP32, UART, Python]
highlights:
  - Siemens PAC3200 power meter polled over Modbus TCP (holding registers) by an Arduino Ethernet client.
  - Data relayed over UART to an ESP32 and republished to an MQTT broker.
  - Python HTTP dashboard subscribes to the same topics and issues commands back.
---
Modbus TCP carries the Modbus protocol over Transmission Control Protocol/Internet Protocol (TCP/IP) networks such as Ethernet, and devices such as power meters expose their measurements as holding registers that a client reads. MQTT is a publish–subscribe messaging protocol: clients publish messages to named topics on a broker, and every client subscribed to a topic receives them. A gateway between the two lets polled field data reach applications that expect a message stream.

An Arduino Ethernet client polled the holding registers of a Siemens PAC3200 power meter over Modbus TCP. The data was relayed over a universal asynchronous receiver-transmitter (UART) link to an ESP32, which republished it to an MQTT broker. A Python dashboard served over Hypertext Transfer Protocol (HTTP) subscribed to the same topics to show the data live and issued commands back.

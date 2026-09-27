---
title: Spiking Neural Network for Neuromorphic Classification of Environmental Sound
summary: Biologically inspired spiking network that classifies environmental sound from STFT spectrograms using event-based keypoint encoding.
fields: [research]
context: BSc thesis, AUST
period: "2025"
order: 140
featured: true
tools: [Python, Jupyter, STFT, spiking neural networks]
highlights:
  - Modeled biological neurons as RC circuits, with voltage level as the firing trigger.
  - Translated the circuit-level model into a neural network implementation.
  - STFT-based spectrogram preprocessing with adaptive thresholding and sparse keypoints to cut computational cost.
links:
  - { label: Source code, href: "https://github.com/s-m-arafat/spiking-neural-network-experiments" }
---
A spiking neural network (SNN) passes information as discrete spikes over time rather than continuous activations, so neurons compute only when events occur. This event-driven style suits low-power and neuromorphic hardware, which is built to run spiking computation directly.

This BSc thesis at Ahsanullah University of Science and Technology (AUST) modeled biological neurons as resistor-capacitor (RC) circuits, with the voltage level acting as the firing trigger, and translated that circuit-level model into a neural network implementation. The result is a biologically inspired SNN architecture for environmental sound classification that uses event-based keypoint encoding and energy-efficient spiking computation.

Preprocessing converted audio into spectrograms with the short-time Fourier transform (STFT), then applied adaptive thresholding and sparse keypoints to cut computational cost. The architecture was evaluated on UrbanSound8K and aimed at low-power and neuromorphic hardware.

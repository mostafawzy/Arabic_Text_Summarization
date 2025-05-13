# Arabic Text Summarization Using AraBART

This project aims to perform automatic text summarization on Arabic text using a fine-tuned model based on the pretrained moussaKam/AraBART model.

## Overview

The goal is to fine-tune the AraBART model on a custom Arabic summarization dataset to generate concise summaries for Arabic articles. The project uses the Hugging Face Transformers library for model fine-tuning and evaluation.

## Features

- Fine-tuned AraBART model for Arabic text summarization.
- Evaluation using ROUGE and BLEU metrics.
- Support for processing and summarizing Arabic text.

## Pretrained Model

This model is based on the moussaKam/AraBART pretrained model, which is a transformer-based model for Arabic text processing.

## Requirements

- Python 3.8+
- transformers library (for model training and inference)
- datasets library (for dataset management)
- torch (for model computation)
- nltk (for evaluation metrics)
- pandas (for data manipulation)
- scipy (for evaluation metrics)

## 🧠 Fine-Tuning Objective

The goal was to adapt the pretrained AraBART model to generate more accurate and relevant summaries for Arabic documents such as articles and books.

## 📊 Evaluation Results

| Metric      | Pretrained AraBART | Fine-Tuned AraBART |
|-------------|--------------------|---------------------|
| ROUGE-1     | 0.0000             | 0.0421              |
| ROUGE-2     | 0.0000             | 0.0015              |
| ROUGE-L     | 0.0000             | 0.0421              |
| BLEU        | 0.0441             | 0.2341              |

> 📈 The fine-tuned model significantly outperforms the base model on all metrics.


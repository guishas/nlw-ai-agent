import { GoogleGenAI } from '@google/genai';
import { env } from '../env.ts';

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

const model = 'gemini-2.5-flash';

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcreva o áudio para português do Brasil. Seja preciso e natural na transcrição. Mantenha a pontuação e a gramática corretas. Divida o texto em parágrafos quando for apropriado.',
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  });

  if (!response.text) {
    throw new Error('Failed to transcribe audio');
  }

  return response.text;
}

export async function generateEmbedding(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [{ text }],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT',
    },
  });

  if (!response.embeddings?.[0].values) {
    throw new Error('Failed to generate embedding');
  }

  return response.embeddings[0].values;
}

export async function generateAnswer(
  question: string,
  transcriptions: string[]
) {
  const context = transcriptions.join('\n\n');

  const prompt = `
  Com base no texto fornecido abaixo como context, responda a pergunta de forma clara e precisa em português do Brasil.

  CONTEXTO:
  ${context}

  PERGUNTA:
  ${question}

  INSTRUÇÕES:
  - Use apenas informações do contexto para responder a pergunta.
  - Se não houver informações suficientes no contexto, responda que não sabe.
  - Se a pergunta não for relacionada ao contexto, responda que não se aplica.
  - Se a pergunta for ambígua, responda de forma clara e precisa.
  - Se a pergunta for sobre um assunto que não foi abordado no contexto, responda que não se aplica.
  - Se a pergunta for sobre um assunto que não foi abordado no contexto, responda que não se aplica.
  - Mantenha um tom educativo e didático.
  - Cite trechos do contexto para suportar sua resposta.
  - Se for citar o contexto, utilize o termo "conteúdo da aula" para se referir ao texto.
  `.trim();

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  });

  if (!response.text) {
    throw new Error('Failed to generate answer');
  }

  return response.text;
}

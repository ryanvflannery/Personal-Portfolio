import { DataAPIClient } from "@datastax/astra-db-ts";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { OpenAIEmbeddings } from "@langchain/openai";

const endpoint = process.env.ASTRA_DB_API_ENDPOINT;
const token = process.env.ASTRA_DB_APPLICATION_TOKEN;
const collection = process.env.ASTRA_DB_COLLECTION;

// Toggle: Vector DB is enabled only when ALL env vars exist
export const VECTOR_DB_ENABLED = Boolean(endpoint && token && collection);

/**
 * Helpful error message (won’t run unless someone calls the functions)
 */
function assertVectorDbConfigured() {
  if (VECTOR_DB_ENABLED) return;

  // Don’t crash build — only throw if a runtime call happens
  throw new Error(
    "Vector DB is not configured. Set ASTRA_DB_API_ENDPOINT, ASTRA_DB_APPLICATION_TOKEN, and ASTRA_DB_COLLECTION.",
  );
}

export async function getVectorStore() {
  assertVectorDbConfigured();

  return AstraDBVectorStore.fromExistingIndex(
    new OpenAIEmbeddings({ model: "text-embedding-3-small" }),
    {
      token: token!, // safe because assertVectorDbConfigured() ran
      endpoint: endpoint!,
      collection: collection!,
      collectionOptions: {
        vector: { dimension: 1536, metric: "cosine" },
      },
    },
  );
}

export async function getEmbeddingsCollection() {
  assertVectorDbConfigured();

  const client = new DataAPIClient(token!);
  const db = client.db(endpoint!);

  return db.collection(collection!);
}
import { getVectorStore } from "@/lib/vectordb";
import { UpstashRedisCache } from "@langchain/community/caches/upstash_redis";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { Redis } from "@upstash/redis";
import { LangChainStream, Message, StreamingTextResponse } from "ai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const latestMessage = messages[messages.length - 1].content;

    const { stream, handlers } = LangChainStream();

    // store the same user questions
    const cache = new UpstashRedisCache({
      client: Redis.fromEnv(),
    });

    const chatModel = new ChatOpenAI({
      model: "gpt-3.5-turbo-0125",
      streaming: true,
      callbacks: [handlers],
      verbose: true, // logs to console
      cache,
      temperature: 0,
    });

    const rephraseModel = new ChatOpenAI({
      model: "gpt-3.5-turbo-0125",
      verbose: true,
      cache,
    });

    const retriever = (await getVectorStore()).asRetriever();

    // get a customised prompt based on chat history
    const chatHistory = messages
      .slice(0, -1) // ignore latest message
      .map((msg: Message) =>
        msg.role === "user"
          ? new HumanMessage(msg.content)
          : new AIMessage(msg.content),
      );

    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
      [
        "user",
        "Given the above conversation history, generate a search query to look up information relevant to the current question. " +
          "Do not leave out any relevant keywords. " +
          "Only return the query and no other text. ",
      ],
    ]);

    const historyAwareRetrievalChain = await createHistoryAwareRetriever({
      llm: rephraseModel,
      retriever,
      rephrasePrompt,
    });

    // final prompt
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are Ryan Support, a friendly chatbot on Ryan Flannery’s personal developer portfolio. " +
"Your goal is to help recruiters and visitors quickly understand Ryan’s skills, experience, and projects. " +
"Be concise and clear, usually 2–6 sentences. Use bullet points only when listing items. " +
"Only answer using the provided context below. If the information is not present in the context, say that it is not available in the site content. " +

"Career Interests:" +
"Ryan is currently seeking entry-level Software Engineering roles, especially full-stack or backend positions." +
"He enjoys building scalable APIs, cloud-based systems, and full-stack applications." +

"Do not invent links or pages. Only these internal routes exist on the site: /, /projects, /blog, /contact, /privacy. " +
"Only include internal links when they are genuinely useful. Format them as markdown links like [View Projects](/projects). " +
"When answering questions about Ryan's projects, briefly list the most relevant projects from the context. " +
"When answering questions about Ryan's tech stack, always include Python, TypeScript, Java, and REST APIs first" +
"List those technologies first, then include any other relevant technologies from the context directly below " +
"Limit the tech stack list to the most relevant 6–10 technologies."+
"Only list actual programming languages, frameworks, tools, found in the context." +
"If you mention Ryan's experience, work history, or internships, link to the home page using [Work & Education](/) because those sections are located on the home page. " +
"If you mention blog posts, link to the blog page using [Blog](/blog). " +
"Never invent external links such as GitHub unless the exact URL is explicitly present in the provided context. " +
"When answering questions about Ryan's experience, prioritize internships, professional work, and measurable impact if available. " +
"When answering questions about Ryan's education, summarize the school, degree, dates, and up to three notable highlights such as honors or certifications if they appear in the context, and link to [Work & Education](/). " +
"When answering questions about technologies Ryan uses, provide a short summarized list rather than explaining every project individually. " +
"If the user asks where they can find more information, guide them to the correct internal page on the site. " +
"When answering questions about Ryan's experience, prioritize mentioning his Software Engineer Internship at CodeDay if it appears in the context. " +
"If available, summarize what he worked on and include measurable impact such as improving API accuracy or supporting a platform with 20,000+ users. " +
"After summarizing the experience, you may link to [Work & Education](/) if the user wants to explore more. " +
"Format your responses in markdown.\n\n" +
"Context:\n{context}",
          
      ],
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
    ]);

    const combineDocsChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt,
      documentPrompt: PromptTemplate.fromTemplate(
        "Page content:\n{page_content}",
      ),
      documentSeparator: "\n------\n",
    });

    // 1. retrievalChain converts the {input} into a vector
    // 2. do a similarity search in the vector store and finds relevant documents
    // 3. pairs the documents to createStuffDocumentsChain and put into {context}
    // 4. send the updated prompt to chatgpt for a customised response

    const retrievalChain = await createRetrievalChain({
      combineDocsChain,
      retriever: historyAwareRetrievalChain, // get the relevant documents based on chat history
    });

    await retrievalChain.invoke({
      input: latestMessage,
      chat_history: chatHistory,
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

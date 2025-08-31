import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";

// carrega variáveis do .env
dotenv.config();
console.log("TOKEN:", process.env.TWITTER_BEARER?.slice(0,20) + "..."); 


const client = new TwitterApi(process.env.TWITTER_BEARER).readOnly;

export async function searchTweets(query) {
  try {
    const tweets = await client.v2.search(query, {
      max_results: 10, // limite (10–100)
      "tweet.fields": "author_id,created_at"
    });

    // tweets.data é um objeto paginado
    return tweets.data.data; 
  } catch (err) {
    console.error("Erro ao buscar tweets:", err);
  }
}

// exemplo de uso
if (process.argv[2]) {
  const keyword = process.argv[2];
  searchTweets(keyword).then((tweets) => {
    console.log(`Tweets encontrados com "${keyword}":`);
    console.log(tweets);
  });
}else {
  console.log("Por favor, forneça uma palavra-chave para busca.");
}

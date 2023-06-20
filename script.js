import { config } from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'
// import readline from 'readline'
import linebot from 'linebot'
config()
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  apiKey: process.env.API_KEY
})

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.API_KEY
}
))

// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// userInterface.prompt()
// userInterface.on('line', async (input) => {
//   const res = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     messages: [{ role: 'user', content: 'input' }]
//   })
//   console.log('@@@' + res.data.choices[0].message.content)
//   userInterface.prompt()
// })

bot.on('message', async (event) => {
  const text = event.message.text
  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: text }]
  })
  console.log('@@@' + res.data.choices[0].message.content)
  event.reply(res.data.choices[0].message.content)
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('bot is running on 3000')
})

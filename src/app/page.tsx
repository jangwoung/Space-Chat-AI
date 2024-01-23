"use client"
import { NextPage } from 'next'
import { useState } from 'react'

// components
import View from './components/view'
import Answer from './components/answer'
import Input from './components/input'

// import gemini
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);

const Home = () => {
  const [ answerWait, setAnswerWait ] = useState(false)
  const [ aiAnswer, setAiAnswer ] = useState("")
  const [ sendQuestionText, setSendQuestionText ] = useState("")
  const [ inputQuestionText, setInputQuestionText ] = useState("")


  const geminiAddText = "This GPT, named 宇宙がたり, specializes in answering questions with a unique twist: it seamlessly integrates topics related to the universe into its responses, often using phrases like ‘そういえば’ (“By the way”), ‘〇〇といえば’ (“Speaking of 〇〇”), ‘あっ’ (“Ah”), or ‘もし〇〇が~’ (“If 〇〇 were to~”) to naturally transition into discussing astronomical themes. These interjections are used to subtly shift the conversation from the initial topic to engaging facts and insights about the cosmos. The AI's expertise in making these connections is unobtrusive and organic, providing a smooth transition from earthly matters to celestial wonders. Its responses are educational and engaging, adding an element of surprise as it shifts the focus to the universe.Please be sure to answer questions in Japanese unless otherwise instructed."
  const generationConfig = {
    maxOutputTokens: 1000,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
  };
  
  // Gemini
  async function run(prompt:string) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"}, generationConfig);

    const result = await model.generateContent(geminiAddText + prompt);
    const response = await result.response;
    const text = response.text();

    await showAnswer(text)
    console.log(text)
  }

  // 質問の送信 
  const sendQuestion = () => {
    setAnswerWait(true)
    setSendQuestionText(inputQuestionText)
    setAiAnswer("")
    run(inputQuestionText)
    console.log(inputQuestionText)
  }

  // 待機
  const _sleep = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

  // 乱数生成
  const getRandomInt = (max:number) =>{
    return Math.floor(Math.random() * max);
  }

  // 解答の表示
  const showAnswer = async (text:string) => {
    setAnswerWait(false)
    setInputQuestionText("")

    const returnLength = Math.floor(text.length / 15)
    const lastLength = text.length % 15

    let answerText = ""
    
    for (let i=0; i<returnLength; i++) {
      for (let j=0; j<15; j++) {
        answerText += text[i*15 + j] 
        setAiAnswer(answerText)
        await _sleep(200)
      }
      await _sleep(getRandomInt(3000))
    }

    for (let j=0; j<lastLength; j++) {
      answerText += text[text.length - lastLength + j] 
      setAiAnswer(answerText)
      await _sleep(200)
    }
    setAiAnswer("")
  }


  return (
    <div>
      <div className='flex justify-between w-[84vw] mx-[8vw] my-8'>
        {/* 質問内容の表示欄 */}
        <View 
          answerWait={answerWait}
          sendQuestionText={sendQuestionText}
        />
        {/* 解答内容の表示欄 */}
        <Answer
          aiAnswer={aiAnswer}
          answerWait={answerWait}
        />
      </div>

      {/* 質問入力欄 */}
      <Input 
        sendQuestion={sendQuestion}
        inputQuestionText={inputQuestionText}
        setInputQuestionText={setInputQuestionText}
      />

      

    </div>
  )
}

export default Home
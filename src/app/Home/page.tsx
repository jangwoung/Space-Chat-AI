"use client"
import { NextPage } from 'next'
import { useState } from 'react'

// components
import View from '../Home/components/view'
import Answer from '../Home/components/answer'
import Input from '../Home/components/input'

// import gemini
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);

const Home = () => {
  const [ answerWait, setAnswerWait ] = useState(false)
  const [ aiAnswer, setAiAnswer ] = useState("")
  const [ sendQuestionText, setSendQuestionText ] = useState("")
  const [ inputQuestionText, setInputQuestionText ] = useState("")
  
  
  // Gemini
  async function run(prompt:string) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
  
    setAiAnswer(text)
  }

  // 質問の送信 
  const sendQuestion = () => {
    setSendQuestionText(inputQuestionText)
    console.log(inputQuestionText)
    setInputQuestionText("")
    setAnswerWait(true)
    setAiAnswer("")

    getAnswer()
  }

  // 待機
  const _sleep = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

  // 解答の取得
  const getAnswer = async() => {
    setAnswerWait(false)
    console.log(process.env.NEXT_PUBLIC_API_KEY)
    await run(sendQuestionText)
    await _sleep(20000)
    showAnswer(aiAnswer)
  }

  // 乱数生成
  const getRandomInt = (max:number) =>{
    return Math.floor(Math.random() * max);
  }

  // 解答の表示
  const showAnswer = async (text:string) => {
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
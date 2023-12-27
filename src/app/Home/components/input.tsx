import { NextPage } from 'next'

interface Props {
	sendQuestion: Function
  inputQuestionText: string
  setInputQuestionText: Function
}

const input: NextPage<Props> = (Props: Props) => {
  return (
    <div className='w-[84vw] h-12 mx-[8vw] bg-chat-black rounded-md text-white'>
      <form action="" className='flex justify-center items-center h-[100%] mx-4 my-2'>
        
        {/* 入力欄 */}
        <input 
          value={Props.inputQuestionText} 
          type="text"
          placeholder='質問を記入してください。'
          autoComplete='off'
          className='w-[90%] h-[80%] mr-4 bg-chat-black border-b-2 border-chat-black focus:outline-none focus:border-white text-sm'
          onChange={(e) => Props.setInputQuestionText(e.target.value)}
        />

        {/* 送信ボタン */}
        <button 
          type="button" 
          className='w-12 h-[50%] bg-chat-blue text-xs text-black font-semibold rounded-sm hover:bg-sky-600 hover:text-white'
          onClick={() => Props.sendQuestion()}
        >
          送信
        </button>

      </form>
    </div>
  )
}

export default input

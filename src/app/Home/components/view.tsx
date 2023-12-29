import { NextPage } from 'next'

interface Props {
  sendQuestionText: string 
}

const view: NextPage<Props> = (props: Props) => {
  return (
    <div className='w-[28vw] h-[64vh] bg-chat-black rounded-md text-white'>
      <div className='h-[90%] m-4'>
        {
          (props.sendQuestionText!=="") ? (
            <div>
              <p className='mb-4'>あなたの質問</p>
              <p>{props.sendQuestionText}</p>
            </div>
          ):(
            <div className='flex flex-col justify-center h-[100%] opacity-60 text-sm text-center'>
              <p className='mb-2'>質問内容が、ここに表示されます。</p>
              <p>美少女に質問してみましょう！！</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default view

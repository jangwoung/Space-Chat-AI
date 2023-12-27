import { NextPage } from 'next'

interface Props {
  aiAnswer:string
  answerWait: boolean
}

const answer: NextPage<Props> = (props: Props) => {
  return (
    <div className='w-[28vw] h-[64vh] bg-white opacity-60 rounded-md'>
      <div className='h-[92%] m-[1vw]'>
        {
          props.answerWait ? (
            <div className='flex flex-col justify-center h-[100%] opacity-60 text-lg text-center'>
              <svg className='flex justify-center w-[2vw] h-[2vw] mx-[12vw] items-center' viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="#74007a" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="2s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                </circle>
              </svg>
            </div>
          ):(
            (props.aiAnswer!=="")?(
              <div>
                {props.aiAnswer}
              </div>
            ):(
              <div className='flex flex-col justify-center h-[100%] text-md text-center'>
                質問をしてください。
              </div>
            )
          )
        }
      </div>
    </div>
  )
}

export default answer

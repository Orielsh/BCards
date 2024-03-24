import "./MessagePane.css"

interface IMessagePaneProps{
  className: string
  title?:string,
  message: string,
  setError(isError: Error | undefined):void,
}


//refactor this component for message or error etc..
export default function MessagePane(props: IMessagePaneProps) {
  return (
    <div className={`MessagePane ${props.className}`}>
      <h3>{props.title}</h3>
      <span>{props.message}</span>
      <button onClick={()=>{props.setError(undefined)}}>Back</button>
    </div>
  )
}


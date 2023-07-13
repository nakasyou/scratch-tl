import { useEffect, useState } from "react"

export interface Props {
  studio_id: number

  actor_id: number
  actor_username: string
}
const thumbnailStyle: React.CSSProperties = {
  width: "50vmin",
  border: "solid #ddd 1px",
}
interface StudioData {
  id: number
  title: number
  description: string
  image: string
}
export default (props: Props) => {
  const [data, setData] = useState<StudioData>()
  useEffect(()=>{
    fetch(`https://api.scratch.mit.edu/studios/${props.studio_id}`).then(res=>res.json()).then(setData)
  }, [])
  return <div style={{
    margin: "auto",
    textAlign: "center",
  }}>
    <a href={`https://scratch.mit.edu/studios/${props.studio_id}`}>
      <div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5em",
          justifyItems: "center",
          textAlign: "center",
          margin: "0 auto",
        }}>
          <img src={`https://uploads.scratch.mit.edu/users/avatars/${props.actor_id}.png`} style={{
            width: "3em",
            height: "3em",
            border: "solid #ddd 2px",
            borderRadius: "100%",
          }} />
          <a href={`https://scratch.mit.edu/users/${props.actor_username}`}>
            { props.actor_username }
          </a>
          <span style={{
            color: "#000",
          }}>のスタジオ</span>
        </div>
        <div style={{
          display: "flex",
          gap: "1em",
          justifyContent: "space-around",
          maxHeight: "300px",
        }}>
          <div>
            <img
              src={data?.image}
              style={thumbnailStyle}
              />
          </div>
          <div style={{
            fontSize: "1em",
            color: "#000",
            fontWeight: "100",
            overflowY: "scroll",
            maxHeight: "100%",
            border: "solid #ddd 1px",
            borderRadius: "0.5em",
          }}>
            <div>{ data?.description }</div>
          </div>
        </div>
      </div>
      <div style={{
        fontSize: "1.2em"
      }}>{ data?.title }</div>
    </a>
  </div>
}

import { useEffect, useState } from "react"

export interface Props {
  title: string
  project_id: number
}
const thumbnailStyle: React.CSSProperties = {
  width: "50vmin",
  border: "solid #ddd 1px",
}
interface ProjectData {
  description: string
  instructions: string
  author: {
    id: number
    username: string
  }
  title: string
  stats: {
    favorites: number
    loves: number
    remixes: number
    views: number
  }
}
const statIconStyle: React.CSSProperties = {
  width: "2em",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}
export default (props: Props) => {
  const [data, setData] = useState<ProjectData>()
  useEffect(()=>{
    fetch(`https://api.scratch.mit.edu/projects/${props.project_id}`).then(res=>res.json()).then(setData)
  }, [])
  return <div style={{
    margin: "auto",
    textAlign: "center",
  }}>
    <a href={`https://scratch.mit.edu/projects/${props.project_id}`}>
      <div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5em",
          justifyItems: "center",
          textAlign: "center",
          margin: "0 auto",
        }}>
          <img src={`https://uploads.scratch.mit.edu/users/avatars/${data?.author.id as number}.png`} style={{
            width: "3em",
            height: "3em",
            border: "solid #ddd 2px",
            borderRadius: "100%",
          }} />
          <a href={`https://scratch.mit.edu/users/${data?.author.username ? data?.author.username : ""}`}>
            { data?.author.username }
          </a>
        </div>
        <div style={{
          display: "flex",
          gap: "1em",
          justifyContent: "space-around",
          maxHeight: "300px",
        }}>
          <div>
            <img
              src={`https://uploads.scratch.mit.edu/get_image/project/${props.project_id}_480x360.png`}
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
            <h5>使い方</h5>
            <div>{ data?.description }</div>
            <h5>メモとクレジット</h5>
            <div>{ data?.instructions }</div>
          </div>
        </div>
      </div>
      <div style={{
        fontSize: "1.2em"
      }}>{ data?.title }</div>
      <div style={{ display: "flex" }}>
        {/*stats*/}
        <div style={{ display: "flex" }}>
          <div style={{ backgroundImage: "url(https://scratch.mit.edu/svgs/project/love-red.svg)", ...statIconStyle }} />
          <div>
            { data?.stats.loves }
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ backgroundImage: "url(https://scratch.mit.edu/svgs/project/fav-yellow.svg)", ...statIconStyle }} />
          <div>
            { data?.stats.favorites }
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ backgroundImage: "url(https://scratch.mit.edu/svgs/project/remix-gray.svg)", ...statIconStyle }} />
          <div>
            { data?.stats.remixes }
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ backgroundImage: "url(https://scratch.mit.edu/svgs/project/views-gray.svg)", ...statIconStyle }} />
          <div>
            { data?.stats.views }
          </div>
        </div>
      </div>
    </a>
  </div>
}
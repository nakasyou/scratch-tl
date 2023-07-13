import { type Message } from "../App.tsx"
import Project from "./Project.tsx"
import Studio from "./Studio.tsx"

export interface Props {
  message: Message
}
const iconStyle: React.CSSProperties = {
  width: "2em",
  height: "2em",
}
export default (props: Props) => {
  return <div style={{
    margin: "1em auto",
    width: "90%",
  }}>
    <div style={{
      border: "solid #ddd 2px",
      margin: "auto",
      padding: "0.5em",
      borderRadius: "0.5rem",
      filter: "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
      backgroundColor: "#fff",
    }}>{(()=>{
      switch(props.message.type) {
        case "followuser":
          return <div style={{
            textAlign: "center",
          }}>
            <div>
              <a href={`https://scratch.mit.edu/users/${props.message.actor_username}`}>{ props.message.actor_username }</a>
              <span>が</span>
              <a href={`https://scratch.mit.edu/users/${props.message.followed_username!}`}>{ props.message.followed_username! }</a>
              <span>をフォローしました</span>
            </div>
            <div>
              <img src={`https://uploads.scratch.mit.edu/users/avatars/${props.message.actor_id}.png`} style={iconStyle} />
              <span>→</span>
              <img src={`https://uploads.scratch.mit.edu/users/avatars/${props.message.followed_user_id!}.png`} style={iconStyle} /> 
            </div>
          </div>
        case "loveproject":
          return <div>
            <div style={{
              textAlign: "left",
            }}>
              <b style={{
                fontSize: "0.9em",
              }}>
                <a href={`https://scratch.mit.edu/users/${props.message.actor_username}`}>{ props.message.actor_username }</a> がいいね</b>
            </div>
            <div>
              <Project project_id={props.message.project_id!} title={props.message.title!} />
            </div>
          </div>
        case "favoriteproject":
          return <div>
            <div style={{
              textAlign: "left",
            }}>
              <b style={{
                fontSize: "0.9em",
              }}>
                <a href={`https://scratch.mit.edu/users/${props.message.actor_username}`}>{ props.message.actor_username }</a> がお気に入り</b>
            </div>
            <div>
              <Project project_id={props.message.project_id!} title={props.message.title!} />
            </div>
          </div>
        case "shareproject":
          return <div>
            <div style={{
              textAlign: "left",
            }}>
              <b style={{
                fontSize: "0.9em",
              }}>
                <a href={`https://scratch.mit.edu/users/${props.message.actor_username}`}>{ props.message.actor_username }</a> がお気に入り</b>
            </div>
            <div>
              <Project project_id={props.message.project_id!} title={props.message.title!} />
            </div>
          </div>
        case "becomeownerstudio":
          return <div>
            <div style={{
              textAlign: "left",
            }}>
              <b style={{
                fontSize: "0.9em",
              }}>
                <a href={`https://scratch.mit.edu/users/${props.message.actor_username}`}>{ props.message.actor_username }</a> がマネージャーに昇格</b>
            </div>
            <div>
              <Studio studio_id={props.message.gallery_id!} actor_id={props.message.actor_id} actor_username={props.message.actor_username} />
            </div>
          </div>
        case "becomecurator":
          return <div>
            <div style={{
              textAlign: "left",
            }}>
              <b style={{
                fontSize: "0.9em",
              }}>
                <a href={`https://scratch.mit.edu/users/${props.message.actor_username}`}>{ props.message.actor_username }</a> がマネージャーに昇格</b>
            </div>
            <div>
              <Studio studio_id={props.message.gallery_id!} actor_id={props.message.actor_id} actor_username={props.message.actor_username} />
            </div>
          </div>
      }
    })()}</div>
  </div>
}
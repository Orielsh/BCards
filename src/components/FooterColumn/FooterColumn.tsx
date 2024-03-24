import { Link } from "react-router-dom"
import { ILinkCol } from "../../interfaces/common/ILink"
import "./FooterColumn.css"

interface IFooterColumnProps{
  col: ILinkCol,
}

export default function FooterColumn(props: IFooterColumnProps) {

  const {title, links} = props.col;

  return (
    <div className="FooterColumn">
      <h5><Link to={title.link}>{title.text}</Link></h5>
      {links.map((link, index)=>(
        <Link to={link.link} key={index}>{link.text !== "" ? link.text : "#"}</Link>
      ))}
    </div>
  )
}


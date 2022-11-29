import P from 'prop-types'
import './styles.css'

const PostCard = ({ title, body, cover, id }) => (
  <div className="post" id={id}>
    <img src={cover} alt={title} />
    <div className="post-content">
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  </div>
)

PostCard.propTypes = {
  title: P.string.isRequired,
  body: P.string.isRequired,
  cover: P.string.isRequired,
  id: P.number.isRequired
}

export default PostCard

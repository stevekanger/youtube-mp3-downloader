import { useSearchParams, Link } from 'react-router-dom'

export default function Message() {
  const [searchParams] = useSearchParams()
  const msg = searchParams.get('msg') || 'This message is a mystery.'
  const referer = searchParams.get('referer')

  return (
    <div>
      <p>{msg}</p>
      {referer && <Link to={referer}>Return to previous content.</Link>}
    </div>
  )
}

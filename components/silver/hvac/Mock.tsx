import type { Mock as MockT } from '@/lib/hvac'

/** A small example UI card (canvas gen_hvac.py mock_*). Always labelled as an example. */
export default function Mock({ mock, example, style }: { mock: MockT; example: string; style?: React.CSSProperties }) {
  return (
    <div className="mock" style={style}>
      <div className="hd">
        <b>{mock.title}</b>
        <span className="ex">{example}</span>
      </div>
      {mock.rows.map((r) => (
        <div key={r.a} className={r.hi ? 'r hi' : 'r'}>
          <span>
            {r.a}
            {r.sub && (
              <>
                <br />
                <em className={r.flag ? 'flag' : undefined}>{r.sub}</em>
              </>
            )}
          </span>
          {r.em ? <em>{r.em}</em> : r.right ? <span>{r.right}</span> : null}
        </div>
      ))}
    </div>
  )
}

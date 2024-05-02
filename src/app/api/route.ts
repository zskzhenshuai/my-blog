import { mock } from 'mockjs'
export function GET() {
  return Response.json(
    mock({
      'list|1-10': [
        {
          'id|+1': 1,
        },
      ],
    })
  )
}

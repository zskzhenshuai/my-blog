export async function POST(request: Request) {
  const body = await request.json()
  const { phone, verify } = body

  return Response.json({
    code: 0,
    data: {
      phone,
      verify,
    },
  })
}

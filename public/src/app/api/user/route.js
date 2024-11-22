import service from "@/backend/services/users.mjs";
/**
 * @param {import("next/server").NextRequest} req
 * @param {import("next/server").NextResponse} res
 */
export const GET = async (req) => {
  const email = new URL(req.url).searchParams.get("email");
  if (!email) {
    return new Response(JSON.stringify({ message: "email is required" }), {
      status: 400,
    });
  }
  const user = await service.getUser({ email });
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }
  if (user.error) {
    return new Response(JSON.stringify({ message: user.error }), {
      status: 400,
    });
  }
  return new Response(JSON.stringify({ user }), { status: 200 });
};

export const POST = async (req) => {
  const { email, name = "", photo = "", birthday = "", phone = "" } = await req.json();
  if (!email) {
    return new Response(JSON.stringify({ message: "email is required" }), {
      status: 400,
    });
  }
  const user = await service.createUser({
    email,
    name,
    photo,
    birthday,
    phone,
  });
  if (user.error) {
    return new Response(JSON.stringify({ message: user.error }), {
      status: 400,
    });
  }
  return new Response(JSON.stringify({ user }), { status: 200 });
};

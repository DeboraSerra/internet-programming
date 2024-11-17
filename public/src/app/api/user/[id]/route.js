import service from "@/backend/services/users.mjs";

export const PUT = async (req) => {
  const { email, name, birthday, phone } = await req.json();
  const id = req.nextUrl.pathname.split("/").at(-1);
  if (!email) {
    return new Response(JSON.stringify({ message: "email is required" }), {
      status: 400,
    });
  }
  if (!id) {
    return new Response(JSON.stringify({ message: "id is required" }), {
      status: 400,
    });
  }
  const user = await service.updateUser({ email, name, id, birthday, phone });
  if (!user) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 400,
    });
  }
  if (user.error) {
    return new Response(JSON.stringify({ message: user.error }), {
      status: 400,
    });
  }
  return new Response(JSON.stringify({ user }), { status: 200 });
};

/**
 * @param {import("next/server").NextRequest} req
 * @param {import("next/server").NextResponse} res
 */
export const DELETE = async (req) => {
  const id = req.nextUrl.pathname.split("/").at(-1);
  const user = await service.deleteUser({ id });
  return new Response(JSON.stringify({ user }), { status: 200 });
};

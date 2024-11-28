import service from "@/backend/services/tasks.mjs";

export const PUT = async (req) => {
  const body = await req.json();
  const id = req.nextUrl.pathname.split("/").at(-1);
  const userId = new URL(req.url).searchParams.get("userId");
  if (!userId)
    return new Response({ message: "userId is required" }, { status: 400 });
  if (!id) {
    return new Response(JSON.stringify({ message: "id is required" }), {
      status: 400,
    });
  }
  const task = await service.updateTask({ ...body, id, userId });
  if (!task) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 400,
    });
  }
  if (task.error) {
    return new Response(JSON.stringify({ message: task.error }), {
      status: 400,
    });
  }
  return new Response(JSON.stringify({ task }), { status: 200 });
};

export const PATCH = async (req) => {
  const id = req.nextUrl.pathname.split("/").at(-1);
  const userId = new URL(req.url).searchParams.get("userId");
  if (!userId)
    return new Response({ message: "userId is required" }, { status: 400 });
  if (!id) {
    return new Response(JSON.stringify({ message: "id is required" }), {
      status: 400,
    });
  }
  const task = await service.completeTask({ id, userId });
  if (!task) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 400,
    });
  }
  if (task.error) {
    return new Response(JSON.stringify({ message: task.error }), {
      status: 400,
    });
  }
  return new Response(JSON.stringify({ task }), { status: 200 });
};

/**
 * @param {import("next/server").NextRequest} req
 * @param {import("next/server").NextResponse} res
 */
export const DELETE = async (req) => {
  const userId = new URL(req.url).searchParams.get("userId");
  if (!userId)
    return new Response({ message: "userId is required" }, { status: 400 });
  const id = req.nextUrl.pathname.split("/").at(-1);
  const task = await service.deleteTask({ id, userId });
  if (task.error) {
    return new Response(JSON.stringify({ message: task.error }), {
      status: 400,
    });
  }
  return new Response(JSON.stringify({ task }), { status: 200 });
};

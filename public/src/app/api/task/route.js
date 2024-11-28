import service from "@/backend/services/tasks.mjs";

/**
 * @param {import("next/server").NextRequest} req
 * @param {import("next/server").NextResponse} res
 */
export const GET = async (req, res) => {
  const userId = new URL(req.url).searchParams.get("userId");
  if (!userId)
    return new Response({ message: "userId is required" }, { status: 400 });
  const tasks = await service.getTasks({ userId });
  if (tasks.error) {
    return new Response(JSON.stringify({ message: tasks.error }), {
      status: 400,
    });
  }
  return new Response(JSON.stringify({ tasks }));
};

export const POST = async (req) => {
  const userId = new URL(req.url).searchParams.get("userId");
  const body = await req.json();
  if (!userId)
    return new Response({ message: "userId is required" }, { status: 400 });
  const task = await service.createTask({ ...body, userId });
  if (task.error) {
    return new Response(JSON.stringify({ message: task.error }), {
      status: 400,
    });
  }
  return new Response(JSON.stringify({ task }));
};

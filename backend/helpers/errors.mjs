export function ErrorHandler(error, req, res, next) {
  console.log({ error })
  if (error instanceof Array) {
    return res.status(400).json({ message: JSON.stringify(error) });
  }
  res.status(400).json({ message: error.message });
}

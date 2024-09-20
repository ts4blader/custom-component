export async function safeAwait<T, E = Error>(
  promise: () => Promise<T>
): Promise<[T, null] | [null, E]> {
  try {
    const res = await promise()
    return [res, null]
  } catch (e) {
    return [null, e as E]
  }
}

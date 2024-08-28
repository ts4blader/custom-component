export const reqBucket = async <T>(promises: Promise<T>[], max = 10) => {
  const result: Awaited<T>[] = []

  for (let i = 0; i < promises.length; i += max) {
    const part = promises.slice(i, i + max)
    const values = await Promise.all(part)
    result.push(...values)
  }

  return result
}

export const reqBucketSettled = async <T>(promises: Promise<T>[], max = 10) => {
  const result: PromiseSettledResult<Awaited<T>>[] = []

  for (let i = 0; i < promises.length; i += max) {
    const part = promises.slice(i, i + max)
    const values = await Promise.allSettled(part)
    result.push(...values)
  }

  return result
}

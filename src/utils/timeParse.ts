interface ITime {
  h: number | string
  m: number | string
  s: number | string
}

export const timeParse = (time: ITime): number => {
  let setTime = 0
  Object.entries(time).forEach(([key, value]) => {
    if (key === 'h') {
      setTime += value * 3600
    }
    if (key === 'm') {
      setTime += value * 60
    }
    if (key === 's') {
      setTime += value
    }
  })

  return setTime
}

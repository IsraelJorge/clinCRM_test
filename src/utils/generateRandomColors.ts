type Colors = {
  bgColor: string[]
  borderColor: string[]
}

export const generateRandomColors = (num: number) => {
  const colors: Colors = { bgColor: [], borderColor: [] } // Inicializa as propriedades bgColor e borderColor como arrays vazios
  let count = 0

  while (count < num) {
    const randomColorValue = () => Math.floor(Math.random() * 255)

    const r = randomColorValue()
    const g = randomColorValue()
    const b = randomColorValue()

    const color = (alpha: number = 1) => `rgba(${r}, ${g}, ${b}, ${alpha})`

    const bgColor = color(0.7)
    const borderColor = color()

    colors.bgColor.push(bgColor)
    colors.borderColor.push(borderColor)

    count++
  }

  return colors
}

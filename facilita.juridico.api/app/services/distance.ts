export interface Point {
  x: number
  y: number
  identifier?: string
  visited?: boolean
}

interface BetweenPoint {
  origin: Point
  destination: Point
}

type Route = Record<number, Point>

export class Distance {
  private points: Route = {}

  constructor(private point: Point = { identifier: 'Empresa (0, 0)', x: 0, y: 0 }) {
    this.push(this.point)
  }

  push(point: Point) {
    this.points[this.size() + 1] = { ...point, visited: false }
  }

  size(): number {
    return Object.keys(this.points).length
  }

  calculate({ origin, destination }: BetweenPoint) {
    const X = Math.pow(origin.x - destination.x, 2)
    const Y = Math.pow(origin.y - destination.y, 2)
    return Math.sqrt(X + Y)
  }

  tsp(): Point[] {
    const points = Object.values(this.points)
    const n = points.length
    const route: Point[] = []

    const tspHelper = (c: number): void => {
      points[c].visited = true
      route.push(points[c])

      let adjacent = -1
      let minDistance = Number.POSITIVE_INFINITY
      for (let k = 0; k < n; k++) {
        if (!points[k].visited) {
          const distance = this.calculate({ origin: points[c], destination: points[k] })
          if (distance < minDistance) {
            minDistance = distance
            adjacent = k
          }
        }
      }

      // Verificar se todos os pontos foram visitados antes de encerrar a recursão
      const allVisited = points.every((point) => point.visited)
      if (!allVisited) tspHelper(adjacent)
    }

    tspHelper(0)

    // Retornar à empresa (ponto inicial)
    route.push(points[0])

    return route
  }
  show(points: Point[]) {
    return points.flatMap((point) => point.identifier).join(' ➡️ ')
  }
}

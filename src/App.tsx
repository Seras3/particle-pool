import { useWindowSize } from "rooks"
import "./App.css"
import ParticleImage, {
  ParticleForce,
  ParticleOptions,
  Vector,
  forces,
} from "react-particle-image"

const STEP = 30

const round = (n: number, step = 20) => Math.ceil(n / step) * step

function App() {
  const { innerWidth, innerHeight } = useWindowSize()

  const particleOptions: ParticleOptions = {
    filter: ({ x, y, image }) => {
      // Get pixel
      const pixel = image.get(x, y)
      // Make a particle for this pixel if magnitude < 200 (range 0-255)
      const magnitude = (pixel.r + pixel.g + pixel.b) / 3
      return magnitude < 240
    },
    color: ({ x, y, image }) => {
      const { r, g, b, a } = image.get(x, y)
      return `rgba(${round(r, STEP)},${round(g, STEP)},${round(b, STEP)},${
        round(a, STEP) / 255
      })`
    },
    radius: ({ x, y, image }) => {
      const pixel = image.get(x, y)
      const magnitude = (pixel.r + pixel.g + pixel.b) / 3
      // Lighter colors will have smaller radius
      return 2 + (magnitude / 255) * 1.2
    },
    mass: () => 40,
    friction: () => 0.15,
    initialPosition: ({ canvasDimensions }) => {
      return new Vector(canvasDimensions.width / 2, canvasDimensions.height / 2)
    },
  }

  const motionForce = (x: number, y: number): ParticleForce => {
    return forces.disturbance(x, y, 4)
  }

  return (
    <div
      className="container"
      style={{ width: Number(innerWidth), height: Number(innerHeight) }}
    >
      <ParticleImage
        src={"/me.png"}
        width={Number(innerWidth)}
        height={Number(innerHeight)}
        scale={0.7}
        entropy={5}
        maxParticles={60000}
        particleOptions={particleOptions}
        mouseMoveForce={motionForce}
        touchMoveForce={motionForce}
        backgroundColor="#000000"
      />
    </div>
  )
}

export default App

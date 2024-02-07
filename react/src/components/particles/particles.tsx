import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export const Particle = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        console.log(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        await console.log(container);
    }, []);

    return (
      <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
              background: {
                  color: {
                      value: "#191919",
                  },
              },
              fpsLimit: 100,
              interactivity: {
                  events: {
                      onClick: {
                          enable: true,
                          mode: "push",
                      },
                      onHover: {
                          enable: true,
                          mode: "repulse",
                      },
                      resize: true,
                  },
                  modes: {
                      push: {
                          quantity: 8,
                      },
                      repulse: {
                          distance: 120,
                          duration: 0.4,
                      },
                  },
              },
              particles: {
                  color: {
                      value: "#ffffff",
                  },
                  links: {
                      color: "#ffffff",
                      distance: 100,
                      enable: true,
                      opacity: 0.5,
                      width: 1,
                  },
                  move: {
                      direction: "none", // "none", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left"
                      enable: true,
                      outModes: {
                          default: "bounce", // "bounce" | "none" | OutMode | "bounceHorizontal" | "bounceVertical" | "out" | "destroy" | "split"
                      },
                      random: false,
                      speed: 1,
                      straight: false,
                  },
                  number: {
                      density: {
                          enable: true,
                          area: 800, // Here, we can change the area of particles. Lower number = more particles
                      },
                      value: 50, // Here, we can change the number of particles
                  },
                  opacity: {
                      value: 0.5,
                  },
                  shape: {
                      type: "circle", // "circle", "square", "triangle", "polygon", "star", "image"
                  },
                  size: {
                      value: { min: 1, max: 5 },
                  },
              },
              detectRetina: true,
          }}
      />
  );
};


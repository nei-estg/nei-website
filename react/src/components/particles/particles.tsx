import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { RootState } from "@src/components/redux/store";
import { useSelector } from "react-redux";


export const Particle = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const particlesInit = useCallback(async (engine: Engine) => {
    //console.log(engine);
    await loadSlim(engine);
  }, [darkMode]);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      //await console.log(container);
      await container;
    },
    [darkMode]
  );

  DarkReader.disable();

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: darkMode ? "#191919" : "#FFFFFF",
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
            value: darkMode ? "#FFFFFF" : "#191919",
          },
          links: {
            color: {
              value: darkMode ? "#FFFFFF" : "#191919",
            },
            distance: 100,
            enable: true,
            opacity: darkMode ? "0.5" : "0.2",
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

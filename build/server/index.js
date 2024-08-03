import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Meta, Links, Outlet, Scripts } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const styles = "/assets/tailwind-eirhfC2j.css";
const links = () => [{ rel: "stylesheet", href: styles }];
function App() {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("link", { rel: "icon", href: "data:image/x-icon;base64,AA" }),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true }),
      /* @__PURE__ */ jsx(
        "link",
        {
          href: "https://fonts.googleapis.com/css2?family=Reem+Kufi+Fun:wght@400..700&display=swap",
          rel: "stylesheet"
        }
      ),
      /* @__PURE__ */ jsx(
        "link",
        {
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Noto+Sans+Old+Persian&family=Reem+Kufi+Fun:wght@400..700&display=swap",
          rel: "stylesheet"
        }
      ),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const Hero = () => {
  return /* @__PURE__ */ jsxs("div", { className: "hero", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-x grid grid-cols-12 items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "col-span-8", children: /* @__PURE__ */ jsx("h1", { children: "I'm Michael - Web Developer & Software Engineer" }) }),
      /* @__PURE__ */ jsx("div", { className: "col-span-4", children: /* @__PURE__ */ jsx("img", { src: "logo-harf.png", className: "w-60 rounded-xl" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "section-col flex gap-4", children: /* @__PURE__ */ jsx("h3", { className: "", children: "Driven Software Engineer with 2 years of experience building, upgrading, and maintaining websites. Team Collaborator and Passionate about the product." }) })
  ] });
};
function KeyWordScroll({
  showFullList,
  setShowFullList,
  slides
}) {
  return /* @__PURE__ */ jsx("div", { className: "relative", children: slides ? slides.map((slideArray, i) => {
    const animationKey = slides.length === 4 ? { 0: "one", 1: "two", 2: "three", 3: "four" } : { 0: "one", 1: "two", 2: "three" };
    console.log(i, slideArray, animationKey[i], slides.length);
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `absolute flex w-full justify-between banner-scrolling fade-in-out-v${animationKey[i]}`,
        children: slideArray.map((text, i2) => /* @__PURE__ */ jsx("h3", { className: "banner-text", children: text }, i2))
      },
      i
    );
  }) : /* @__PURE__ */ jsx("div", {}) });
}
const About = () => {
  const [seeMore, setSeeMore] = useState(false);
  const [slideUp, setSlideUp] = useState(false);
  useEffect(() => {
    if (slideUp) {
      setTimeout(() => {
        setSlideUp(false);
      }, 2e3);
    }
  }, [slideUp]);
  let buttonText = seeMore ? "See Less" : "Read more about my experience";
  return /* @__PURE__ */ jsxs("div", { className: "cash-content", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-20 section-col !pt-0", children: /* @__PURE__ */ jsx(
      KeyWordScroll,
      {
        slides: [
          ["Full-Stack Developer", "UI/UX Optimization"],
          ["Agile Methods", "Responsive Web Design"],
          ["Web App Development", "Server Side Programming"],
          ["React", "Typescript", "Java", "MySQL", "Node.js"]
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col section-col", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Hello and welcome! I'm a Junior-Mid Level Software Engineer based in Charleston, SC, where I've called home for the past nine years. My journey into the tech world began during the Covid pandemic, a time that allowed me to explore and dive deeply into a field that had always intrigued me. From attending Hack Reactor to my residency there and later joining Data Protocol, each step has been pivotal in shaping my career.",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("br", {}),
        "Over the past two years, I've honed my skills in React and TypeScript, crafting user-friendly interfaces and ensuring accessibility. I've seamlessly blended front-end and back-end technologies to drive projects forward while fostering collaboration as a team leader. Now, as my journey unfolds, I'm eager to bring my passion and expertise to your team, ready to tackle new challenges together.",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("br", {}),
        "Beyond coding, I enjoy playing basketball, hitting the golf course, and exploring Charleston's vibrant coffee scene. Music has always been a significant part of my life; my initial career aspirations were aligned with the music industry before the pandemic reshaped my path. I also have a cat who keeps me company and brings joy to my daily routine. Growing up in New Jersey, I've carried with me a love for diverse cultures and experiences, which continues to inspire my work in tech.",
        seeMore && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {})
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs("div", { className: seeMore ? "relative block" : "hidden", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "As a versatile problem-solver with a strong command of JavaScript and a keen eye for design, I thrive in fast-paced Agile environments. My expertise in crafting visually compelling user interfaces with React, Remix, and TypeScript, along with constructing RESTful APIs and implementing SQL databases and dynamic Content Management Systems (CMS), underscores my technical proficiency. I also enjoy organization and have experience managing tasks with GitHub and Jira, ensuring projects are on track and well-coordinated. Additionally, I use Notion for a variety of personal and professional tasks, which helps me stay organized and productive.",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          "During my time at REI Systems, I took a proactive approach to identifying and fixing UI-related defects, ensuring that issues were resolved promptly using TypeScript. This commitment to quality allowed us to meet project deadlines consistently. I was responsible for creating and maintaining various feature forms throughout the site, utilizing a full-stack approach that included React, Java, and MySQL. Working closely with a diverse team, I presented technical updates on new features and functionalities. Additionally, I enhanced our product's reliability by improving unit test coverage to ensure a success rate of at least 90%.",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          "At Data Protocol, a small yet dynamic team, I played a key role in developing over 50 distinct and responsive web pages using React and TypeScript, demonstrating my ability to create visually appealing and user-friendly interfaces. I integrated seamless animations and interactive elements to enhance the user experience. My work involved developing dynamic web applications by effectively integrating API endpoints with front-end technologies. I also designed user-friendly CMS features using Node.js within the Admin interface, making content management more efficient. Collaborating with cross-functional teams, I implemented feedback to refine UI/UX aspects. I also conducted in-depth research on appropriate technologies, ensuring scalability and long-term sustainability to minimize future technical debt.",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          "An engaged collaborator with strong interpersonal skills, I have a hunger to learn and a proven ability to discuss optimal solutions with other developers, efficiently communicate with various teams, and ensure transparency and organization. I am willing to relocate for the right opportunity, eager to bring my passion for innovative solutions and team-oriented approach to new challenges."
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mask" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs(
      "div",
      {
        className: seeMore && !slideUp ? "slide" : slideUp ? "slide-up" : "",
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "see-more",
              onClick: () => {
                if (seeMore) {
                  setSlideUp(true);
                  setTimeout(() => {
                    setSeeMore(false);
                  }, 2e3);
                } else {
                  setSeeMore(true);
                  expandDiv();
                }
              },
              children: buttonText
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 section-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0 section-col !p-0", children: [
              /* @__PURE__ */ jsx("h2", { className: "my-0", children: "Work Experience" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsx("h3", { children: "Software Engineer" }),
                /* @__PURE__ */ jsx("p", { className: "italic", children: "REI Systems" }),
                /* @__PURE__ */ jsx("p", { children: "2024" }),
                /* @__PURE__ */ jsx("h3", { children: "Software Engineer" }),
                /* @__PURE__ */ jsx("p", { className: "italic", children: "Data Protocol" }),
                /* @__PURE__ */ jsx("p", { children: "2021 - 2023" }),
                /* @__PURE__ */ jsx("h3", { children: "Software Engineering Immersive Resident" }),
                /* @__PURE__ */ jsx("p", { className: "italic", children: "Hack Reactor" }),
                /* @__PURE__ */ jsx("p", { children: "2021" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col section-col !p-0", children: [
              /* @__PURE__ */ jsx("h2", { className: "mb-0", children: "Education" }),
              /* @__PURE__ */ jsx("h3", { children: "Bootcamp Certificate" }),
              /* @__PURE__ */ jsx("p", { children: "Hack Reactor - 2021" }),
              /* @__PURE__ */ jsx("h3", { children: "Bachelor of Arts" }),
              /* @__PURE__ */ jsx("p", { children: "College of Charleston - Art's Management - 2015-2019" })
            ] })
          ] })
        ]
      }
    ) })
  ] });
};
function Index() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(About, {})
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DyY_Wzg3.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-CnnW4tk2.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DnG0VfyE.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-CnnW4tk2.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-ltEen4Dj.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] } }, "url": "/assets/manifest-6ada6c93.js", "version": "6ada6c93" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false, "unstable_fogOfWar": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};

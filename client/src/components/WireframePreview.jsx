export default function WireframePreview({
  layout
}) {
  const rootId = layout.rootNodes[0];

  const artboard =
    layout.nodes[rootId];

  const aspectRatio =
    artboard.height /
    artboard.width;

  const artboardBackground =
    artboard.style?.backgroundColor ||
    artboard.data?.backgroundColor ||
    "#000";

  return (
    <div className="flex justify-center items-center min-h-full py-10">

      {/* Outer Glow */}
      <div className="p-[2px] rounded-[40px] bg-gradient-to-br from-blue-500/40 to-purple-500/30 shadow-[0_0_80px_rgba(59,130,246,0.25)]">

        {/* Main Canvas */}
        <div
          className="relative rounded-[36px] overflow-hidden border border-white/10"
          style={{
            width: "520px",
            height: `${
              520 * aspectRatio
            }px`,
            backgroundColor:
              artboardBackground
          }}
        >

          {/* Background Image */}
          {artboard.children.map(
            (id) => {
              const node =
                layout.nodes[id];

              const isBg =
                node.type ===
                  "image" &&
                node.name
                  ?.toLowerCase()
                  .includes(
                    "background"
                  );

              if (!isBg)
                return null;

              if (node.style?.backgroundColor) {
                return (
                  <div
                    key={id}
                    className="absolute inset-0"
                    style={{
                      backgroundColor:
                        node.style.backgroundColor
                    }}
                  />
                );
              }

              return (
                <img
                  key={id}
                  src={
                    node.data
                      ?.sourceUrl
                  }
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              );
            }
          )}

          {/* Other Layers */}
          {artboard.children.map(
            (id) => {
              const node =
                layout.nodes[id];

              const isBackground =
                node.type ===
                  "image" &&
                node.name
                  ?.toLowerCase()
                  .includes(
                    "background"
                  );

              if (
                isBackground
              )
                return null;

              const isText =
                node.type ===
                  "text" &&
                node.data
                  ?.content;

              return (
                <div
                  key={id}
                  className={`absolute ${
                    isText
                      ? "flex"
                      : ""
                  }`}
                  style={{
                    left: `${
                      node.nx *
                      100
                    }%`,

                    top: `${
                      node.ny *
                      100
                    }%`,

                    width: `${
                      node.nw *
                      100
                    }%`,

                    height: `${
                      node.nh *
                      100
                    }%`,

                    zIndex:
                      isText
                        ? 20
                        : 10
                  }}
                >

                  {/* IMAGE */}
                  {node.type ===
                    "image" && (
                    <img
                      src={
                        node.data
                          ?.sourceUrl
                      }
                      alt={
                        node.name
                      }
                      className="w-full h-full object-contain"
                    />
                  )}

                  {/* SHAPE */}
                  {node.type ===
                    "shape" && (
                    <div
                      className="w-full h-full rounded-full"
                      style={{
                        background:
                          node
                            .style
                            ?.visual
                            ?.fill
                            ?.value ||
                          "#FACC15"
                      }}
                    />
                  )}

                  {/* TEXT */}
                  {isText && (
                    <div
                      style={{
                        color:
                          node
                            .style
                            ?.visual
                            ?.color
                            ?.value ||
                          "#fff",

                        fontSize: `${Math.max(
                          (
                            node
                              .style
                              ?.visual
                              ?.fontSize ||
                            32
                          ) *
                            Math.min(
                              node.nw *
                                1.4,
                              node.nh *
                                2.2
                            ) *
                            0.55,
                          12
                        )}px`,

                        fontWeight:
                          node
                            .style
                            ?.visual
                            ?.fontWeight ||
                          600,

                        fontStyle:
                          node
                            .style
                            ?.visual
                            ?.fontStyle ||
                          "normal",

                        lineHeight:
                          "1.15",

                        width:
                          "100%",

                        height:
                          "100%",

                        display:
                          "flex",

                        alignItems:
                          "flex-start",

                        justifyContent:
                          "flex-start",

                        textAlign:
                          "center",

                        whiteSpace:
                          "pre-line",

                        overflow:
                          "hidden",

                        wordBreak:
                          "break-word",

                        overflowWrap:
                          "break-word",

                        padding:
                          "6px 10px",

                        paddingTop:
                          "4px",

                        textShadow:
                          "0 2px 10px rgba(0,0,0,0.35)"
                      }}
                    >
                      {
                        node.data
                          ?.content
                      }
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
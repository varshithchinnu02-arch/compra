import express from "express";

import {
  resizeArtboard,
  moveNode,
  resizeNode,
  changeNodeColor
} from "../services/layoutTransforms.js";

const COLOR_KEYWORDS = [
  "black",
  "white",
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "pink",
  "orange",
  "cyan",
  "teal",
  "lime",
  "magenta",
  "brown",
  "gray",
  "grey",
  "navy",
  "olive",
  "maroon",
  "silver",
  "gold",
  "beige",
  "indigo",
  "lavender"
];

function extractColor(text) {
  const hexMatch = text.match(/#(?:[0-9a-f]{3}|[0-9a-f]{6})\b/i);
  if (hexMatch) return hexMatch[0];

  for (const color of COLOR_KEYWORDS) {
    const regex = new RegExp(`\\b${color}\\b`, "i");
    if (regex.test(text)) {
      return color;
    }
  }

  return null;
}

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const {
      message,
      layout
    } = req.body;

    const lower =
      message.toLowerCase();

    let updatedLayout = layout;

    let reply =
      "Layout updated successfully.";

    // =========================
    // ASPECT RATIOS
    // =========================

    if (
      lower.includes("9:16")
    ) {

      updatedLayout =
        resizeArtboard(
          layout,
          1080,
          1920
        );

      reply =
        "Converted layout to 9:16 format.";
    }

    else if (
      lower.includes("16:9")
    ) {

      updatedLayout =
        resizeArtboard(
          layout,
          1920,
          1080
        );

      reply =
        "Converted layout to 16:9 format.";
    }

    else if (
      lower.includes("4:5")
    ) {

      updatedLayout =
        resizeArtboard(
          layout,
          1080,
          1350
        );

      reply =
        "Converted layout to 4:5 format.";
    }

    // =========================
    // MOVE HEADLINE
    // =========================

    else if (
      lower.includes("headline") &&
      lower.includes("top")
    ) {

      updatedLayout =
        moveNode(
          layout,
          "headline",
          "top"
        );

      reply =
        "Moved headline to top.";
    }

    else if (
      lower.includes("headline") &&
      lower.includes("center")
    ) {

      updatedLayout =
        moveNode(
          layout,
          "headline",
          "center"
        );

      reply =
        "Centered headline.";
    }

    // =========================
    // MOVE PRODUCT
    // =========================

    else if (
      lower.includes("product") &&
      lower.includes("lower")
    ) {

      updatedLayout =
        moveNode(
          layout,
          "product",
          "lower"
        );

      reply =
        "Moved product lower.";
    }

    else if (
      lower.includes("product") &&
      lower.includes("left")
    ) {

      updatedLayout =
        moveNode(
          layout,
          "product",
          "left"
        );

      reply =
        "Moved product to left.";
    }

    else if (
      lower.includes("product") &&
      lower.includes("right")
    ) {

      updatedLayout =
        moveNode(
          layout,
          "product",
          "right"
        );

      reply =
        "Moved product to right.";
    }

    else if (
      lower.includes("product") &&
      lower.includes("center")
    ) {

      updatedLayout =
        moveNode(
          layout,
          "product",
          "center"
        );

      reply =
        "Centered product.";
    }

    // =========================
    // RESIZE
    // =========================

    else if (
      lower.includes("headline") &&
      (
        lower.includes("smaller") ||
        lower.includes("reduce")
      )
    ) {

      updatedLayout =
        resizeNode(
          layout,
          "headline",
          0.8
        );

      reply =
        "Reduced headline size.";
    }

    else if (
      lower.includes("product") &&
      lower.includes("bigger")
    ) {

      updatedLayout =
        resizeNode(
          layout,
          "product",
          1.2
        );

      reply =
        "Increased product size.";
    }

    else if (
      lower.includes("product") &&
      lower.includes("huge")
    ) {

      updatedLayout =
        resizeNode(
          layout,
          "product",
          1.5
        );

      reply =
        "Made product huge.";
    }

    // =========================
    // COLORS
    // =========================

    else if (
      lower.includes("headline")
    ) {
      const color = extractColor(lower);

      if (color) {
        updatedLayout =
          changeNodeColor(
            layout,
            "headline",
            color
          );

        reply =
          `Changed headline color to ${color}.`;
      }
    }

    else if (
      lower.includes("background")
    ) {
      const color = extractColor(lower);

      if (color) {
        updatedLayout =
          changeNodeColor(
            layout,
            "background",
            color
          );

        reply =
          `Changed background color to ${color}.`;
      }
    }

    res.json({
      updatedLayout,
      message: reply
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Something went wrong."
    });
  }
});

export default router;
const canvas = document.querySelector("canvas");
const tools = document.querySelectorAll(".tool");
const fill = document.querySelector("#fill");
const slide = document.querySelector("#slide");
const colors = document.querySelectorAll(".colors .choice");
const picker = document.querySelector("#pick");
const pickerNeon = document.querySelector("#picker");
const pickerNeon2 = document.querySelector("#picker2");
const clear = document.querySelector(".clear");
const save = document.querySelector(".save");
const ctx = canvas.getContext("2d");

let drawing = false;
let mouseX, mouseY, snapshot;
let toolSelect = "brush";
let linewidth = 2;
let selectedColorCode = "#fff";

const canvasBg = () => {
  ctx.fillStyle = "#0f0f0f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = selectedColorCode;
};

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  canvasBg();
});

//Rectangle
const rectangle = (e) => {
  const width = e.offsetX - mouseX;
  const height = e.offsetY - mouseY;

  ctx.strokeStyle = selectedColorCode;

  ctx.fillStyle = fill.checked ? selectedColorCode : "transparent";

  ctx.fillRect(mouseX, mouseY, width, height);
  ctx.strokeRect(mouseX, mouseY, width, height);
};

//Circle
const drawCircle = (e) => {
  const radius = Math.sqrt(
    (e.offsetX - mouseX) ** 2 + (e.offsetY - mouseY) ** 2
  );

  ctx.strokeStyle = selectedColorCode;

  ctx.fillStyle = fill.checked ? selectedColorCode : "transparent";

  ctx.beginPath();
  ctx.arc(mouseX, mouseY, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
};

//Triangle
const drawTriangle = (e) => {
  ctx.strokeStyle = selectedColorCode;
  ctx.fillStyle = fill.checked ? selectedColorCode : "transparent";
  ctx.lineWidth = linewidth;

  ctx.beginPath();
  ctx.moveTo(mouseX, mouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineTo(mouseX - (e.offsetX - mouseX), e.offsetY);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
};

// Star
const drawStar = (e) => {
  ctx.strokeStyle = selectedColorCode;
  ctx.fillStyle = fill.checked ? selectedColorCode : "transparent";
  ctx.lineWidth = linewidth;

  const spikes = 5;
  const outerRadius = 30;
  const innerRadius = 15;

  ctx.beginPath();
  for (let i = 0; i < spikes; i++) {
    const outerX = mouseX + Math.cos((i * 2 * Math.PI) / spikes) * outerRadius;
    const outerY = mouseY + Math.sin((i * 2 * Math.PI) / spikes) * outerRadius;
    ctx.lineTo(outerX, outerY);

    const innerX =
      mouseX + Math.cos(((i + 0.5) * 2 * Math.PI) / spikes) * innerRadius;
    const innerY =
      mouseY + Math.sin(((i + 0.5) * 2 * Math.PI) / spikes) * innerRadius;
    ctx.lineTo(innerX, innerY);
  }
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
};

// Moon
const drawMoon = (e) => {
  ctx.strokeStyle = selectedColorCode;
  ctx.fillStyle = fill.checked ? selectedColorCode : "transparent";
  ctx.lineWidth = linewidth;

  const moonRadius = 30;
  const crescentOffset = 10;
  const rotationAngle = 3.7;

  ctx.save();
  ctx.translate(mouseX, mouseY);
  ctx.rotate(rotationAngle);

  ctx.beginPath();
  ctx.arc(-crescentOffset, 0, moonRadius, 0.5 * Math.PI, 1.5 * Math.PI, false);
  ctx.quadraticCurveTo(-crescentOffset - 20, -5, -crescentOffset, moonRadius);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();

  ctx.restore();
};

//Cloud
const drawClouds = [];

const drawCloud = (x, y) => {
  ctx.strokeStyle = selectedColorCode;
  ctx.fillStyle = fill.checked ? selectedColorCode : "white";
  ctx.lineWidth = linewidth;

  const cloudRadius = 20;
  const cloudSpacing = 10;

  ctx.beginPath();
  ctx.arc(x, y, cloudRadius, 0, Math.PI * 2);
  ctx.arc(x + cloudSpacing, y, cloudRadius + 5, 0, Math.PI * 2);
  ctx.arc(x + cloudSpacing * 2, y, cloudRadius, 0, Math.PI * 2);
  ctx.arc(x - cloudSpacing, y - cloudSpacing, cloudRadius, 0, Math.PI * 2);
  ctx.arc(x + cloudSpacing, y - cloudSpacing, cloudRadius, 0, Math.PI * 2);

  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};

const startDrawingCloud = (e) => {
  if (toolSelect === "cloud") {
    const cloudX = e.offsetX;
    const cloudY = e.offsetY;
    drawClouds.push({ x: cloudX, y: cloudY });
    drawCloud(cloudX, cloudY);
  }
};

// Hexagon
const drawHexagon = (e) => {
  ctx.strokeStyle = selectedColorCode;
  ctx.fillStyle = fill.checked ? selectedColorCode : "transparent";
  ctx.lineWidth = linewidth;

  const sideLength = e.offsetX - mouseX;

  ctx.beginPath();
  ctx.moveTo(mouseX + sideLength, mouseY);
  for (let i = 1; i <= 5; i++) {
    const angle = (i * 2 * Math.PI) / 6;
    const x = mouseX + sideLength * Math.cos(angle);
    const y = mouseY + sideLength * Math.sin(angle);
    ctx.lineTo(x, y);
  }
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
};

// Octagon
const drawOctagon = (e) => {
  ctx.strokeStyle = selectedColorCode;
  ctx.fillStyle = fill.checked ? selectedColorCode : "transparent";
  ctx.lineWidth = linewidth;

  const sideLength = e.offsetX - mouseX;

  ctx.beginPath();
  ctx.moveTo(mouseX + sideLength, mouseY);
  for (let i = 1; i <= 7; i++) {
    const angle = (i * 2 * Math.PI) / 8;
    const x = mouseX + sideLength * Math.cos(angle);
    const y = mouseY + sideLength * Math.sin(angle);
    ctx.lineTo(x, y);
  }
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
};

// Heart
const drawHeart = (e) => {
  ctx.strokeStyle = selectedColorCode;
  ctx.fillStyle = fill.checked ? selectedColorCode : "transparent";
  ctx.lineWidth = linewidth;

  const heartSize = 18;

  ctx.beginPath();
  ctx.moveTo(mouseX, mouseY);
  ctx.bezierCurveTo(
    mouseX - heartSize,
    mouseY - heartSize,
    mouseX - 2 * heartSize,
    mouseY + heartSize / 2,
    mouseX,
    mouseY + 2 * heartSize
  );
  ctx.bezierCurveTo(
    mouseX + 2 * heartSize,
    mouseY + heartSize / 2,
    mouseX + heartSize,
    mouseY - heartSize,
    mouseX,
    mouseY
  );
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
};

let arrowStartX, arrowStartY;

// Left Arrow
const drawLeftArrow = (e) => {
  ctx.strokeStyle = selectedColorCode;
  ctx.fillStyle = fill.checked ? selectedColorCode : "transparent";
  ctx.lineWidth = linewidth;

  const arrowLength = e.offsetX - mouseX;
  const arrowHeadSize = 10;

  ctx.beginPath();
  ctx.moveTo(mouseX, mouseY);
  ctx.lineTo(mouseX + arrowLength - arrowHeadSize, mouseY);
  ctx.lineTo(mouseX + arrowLength, mouseY - arrowHeadSize / 2);
  ctx.lineTo(mouseX + arrowLength, mouseY + arrowHeadSize / 2);
  ctx.lineTo(mouseX + arrowLength - arrowHeadSize, mouseY);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
};

// Right Arrow
const drawRightArrow = (e) => {
  ctx.strokeStyle = selectedColorCode;
  ctx.fillStyle = fill.checked ? selectedColorCode : "transparent";
  ctx.lineWidth = linewidth;

  const arrowLength = mouseX - e.offsetX;
  const arrowHeadSize = 10;

  ctx.beginPath();
  ctx.moveTo(mouseX, mouseY);
  ctx.lineTo(mouseX - arrowLength + arrowHeadSize, mouseY);
  ctx.lineTo(mouseX - arrowLength, mouseY - arrowHeadSize / 2);
  ctx.lineTo(mouseX - arrowLength, mouseY + arrowHeadSize / 2);
  ctx.lineTo(mouseX - arrowLength + arrowHeadSize, mouseY);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
};

// Message
const drawMessage = (e) => {
  ctx.strokeStyle = selectedColorCode;
  ctx.fillStyle = fill.checked ? selectedColorCode : "transparent";
  ctx.lineWidth = linewidth;

  const messageWidth = 40;
  const messageHeight = 20;
  const tailWidth = 10;

  ctx.beginPath();
  ctx.moveTo(mouseX, mouseY);
  ctx.lineTo(mouseX + messageWidth, mouseY);
  ctx.lineTo(mouseX + messageWidth, mouseY + messageHeight);
  ctx.lineTo(mouseX + messageWidth / 2 + tailWidth / 2, mouseY + messageHeight);
  ctx.lineTo(mouseX + messageWidth / 2, mouseY + messageHeight + tailWidth);
  ctx.lineTo(mouseX + messageWidth / 2 - tailWidth / 2, mouseY + messageHeight);
  ctx.lineTo(mouseX, mouseY + messageHeight);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
};

canvas.addEventListener("mousedown", (e) => {
  if (toolSelect === "rightArrow" || toolSelect === "leftArrow") {
    arrowStartX = e.offsetX;
    arrowStartY = e.offsetY;
  }
});

const startDrawing = (e) => {
  drawing = true;
  mouseX = e.offsetX;
  mouseY = e.offsetY;

  console.log("Selected Color Code:", selectedColorCode);

  ctx.beginPath();
  ctx.lineWidth = linewidth;

  ctx.strokeStyle = selectedColorCode;
  ctx.fillStyle = selectedColorCode;

  console.log("Stroke Style:", ctx.strokeStyle);
  console.log("Fill Style:", ctx.fillStyle);

  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const draw = (e) => {
  if (!drawing) return;
  ctx.putImageData(snapshot, 0, 0);

  if (toolSelect === "brush" || toolSelect === "eraser") {
    applyNeonEffect(); 
    ctx.strokeStyle = toolSelect === "eraser" ? "#0f0f0f" : selectedColorCode;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (toolSelect === "rectangle") {
    applyNeonEffect(); 
    rectangle(e);
  } else if (toolSelect === "circle") {
    applyNeonEffect(); 
    drawCircle(e);
  } else if (toolSelect === "triangle") {
    applyNeonEffect(); 
    drawTriangle(e);
  } else if (toolSelect === "star") {
    applyNeonEffect(); 
    drawStar(e);
  } else if (toolSelect === "cloud") {
  } else if (toolSelect === "moon") {
    applyNeonEffect(); 
    drawMoon(e);
  } else if (toolSelect === "hexagon") {
    applyNeonEffect(); 
    drawHexagon(e);
  } else if (toolSelect === "octagon") {
    applyNeonEffect(); 
    drawOctagon(e);
  } else if (toolSelect === "heart") {
    applyNeonEffect(); 
    drawHeart(e);
  } else if (toolSelect === "message") {
    applyNeonEffect(); 
    drawMessage(e);
  }
};

tools.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".choose .active").classList.remove("active");
    btn.classList.add("active");
    toolSelect = btn.id;
  });
});

canvas.addEventListener("mousemove", (e) => {
  if (drawing) {
    ctx.putImageData(snapshot, 0, 0);
    if (toolSelect === "hexagon") {
      drawHexagon(e);
    } else if (toolSelect === "octagon") {
      drawOctagon(e);
    } else if (toolSelect === "rightArrow") {
      drawRightArrow(e);
    } else if (toolSelect === "leftArrow") {
      drawLeftArrow(e);
    }
  }
});

canvas.addEventListener("mouseup", (e) => {
  if (toolSelect === "rightArrow" || toolSelect === "leftArrow") {
    const arrowEndX = e.offsetX;
    const arrowEndY = e.offsetY;

    const arrowLength = Math.sqrt(
      (arrowEndX - arrowStartX) ** 2 + (arrowEndY - arrowStartY) ** 2
    );

    if (toolSelect === "rightArrow") {
      drawRightArrow({ offsetX: arrowStartX, offsetY: arrowStartY });
    } else {
      drawLeftArrow({ offsetX: arrowStartX, offsetY: arrowStartY });
    }

    if (toolSelect === "rightArrow") {
      drawRightArrow({ offsetX: arrowEndX, offsetY: arrowEndY });
    } else {
      drawLeftArrow({ offsetX: arrowEndX, offsetY: arrowEndY });
    }
  }
});

slide.addEventListener("change", () => (linewidth = slide.value));

colors.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".choose .selected").classList.remove("selected");
    btn.classList.add("selected");

    if (btn.classList.contains("neon-color")) {
      applyNeonEffect();
    } else {
      ctx.shadowColor = "transparent";
    }

    selectedColorCode = window
      .getComputedStyle(btn)
      .getPropertyValue("background-color");
  });
});

picker.addEventListener("change", () => {
  picker.parentElement.style.background = picker.value;
  picker.parentElement.click();

  ctx.shadowColor = picker.value;
});

pickerNeon.addEventListener("change", () => {
  pickerNeon.parentElement.style.background = pickerNeon.value;
  pickerNeon.parentElement.click();

  ctx.shadowColor = pickerNeon.value;
});

pickerNeon2.addEventListener("change", () => {
  pickerNeon2.parentElement.style.background = pickerNeon2.value;
  pickerNeon2.parentElement.click();

  ctx.shadowColor = pickerNeon2.value;
});

clear.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvasBg();
});

save.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = `${Date.now()}.jpg`;
  link.href = canvas.toDataURL();
  link.click();
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mousedown", startDrawingCloud);

document
  .getElementById("hexagon")
  .addEventListener("click", () => (toolSelect = "hexagon"));
document
  .getElementById("octagon")
  .addEventListener("click", () => (toolSelect = "octagon"));
document
  .getElementById("right-arrow")
  .addEventListener("click", () => (toolSelect = "rightArrow"));
document
  .getElementById("left-arrow")
  .addEventListener("click", () => (toolSelect = "leftArrow"));
document
  .getElementById("heart")
  .addEventListener("click", () => (toolSelect = "heart"));
document
  .getElementById("message")
  .addEventListener("click", () => (toolSelect = "message"));

  const applyNeonEffect = () => {
    const selectedColorElement = document.querySelector(".colors .selected");
  
    if (selectedColorElement.classList.contains("neon-color") && toolSelect !== "eraser") {
      const selectedColor = window
        .getComputedStyle(selectedColorElement)
        .getPropertyValue("background-color");
  
      ctx.shadowColor = selectedColor;
      ctx.shadowBlur = 20;
  
      picker.style.boxShadow = `0 0 10px 5px ${selectedColor}`;
    } else {
      ctx.shadowColor = "transparent";
      picker.style.boxShadow = "none";
    }
  };
  
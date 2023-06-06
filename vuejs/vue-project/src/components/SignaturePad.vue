<template>
  <div class="flexDiv">
    <button
      class="btn btn-primary default-button"
      id="sig-submitBtn"
      @click="openDialog()"
    >
      Edit Signature
    </button>
    <dialog class="canvasDiv" ref="editDialog">
      <canvas
        v-if="render"
        id="sig-canvas"
        width="320"
        height="100"
        ref="canvas"
      >
        Seems like your browser doesn't support this canvas. :(
      </canvas>

      <div class="buttons">
        <button
          class="btn btn-primary default-button"
          id="sig-submitBtn"
          @click="submitSignature()"
        >
          Submit Signature
        </button>
        <button
          class="btn btn-default default-button"
          id="sig-clearBtn"
          @click="clearSignature()"
        >
          Clear Signature
        </button>
      </div>
    </dialog>
    <div class="preview">
      <textarea id="sig-dataUrl" class="form-control" rows="5" ref="dataUrl">
Data URL for your signature will go here!</textarea
      >
      <img
        id="sig-image"
        src=""
        alt="Your signature will go here!"
        ref="image"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SignaturePad",
  data() {
    return {
      render: true,
    };
  },
  mounted() {
    if (document.readyState === "complete") {
      // if page already loaded
      this.renderSignaturePad();
    } else {
      // wait for page to load if not yet loaded
      document.onreadystatechange = () => {
        if (document.readyState === "complete") {
          this.renderSignaturePad();
        }
      };
    }
  },
  methods: {
    openDialog: function () {
      this.$refs.editDialog.showModal(); // open ui dialog
    },

    closeDialog: function () {
      this.$refs.editDialog.close(); // close ui dialog
    },
    renderSignaturePad: function () {
      // render drawing
      window.requestAnimFrame = (function (callback) {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimaitonFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60);
          }
        );
      })();

      let canvas = this.$refs.canvas;

      // set canvas settings
      let ctx = canvas.getContext("2d");
      ctx.strokeStyle = "#222222";
      ctx.lineWidth = 4;

      let drawing = false;
      let mousePos = {
        x: 0,
        y: 0,
      };
      let lastPos = mousePos;

      canvas.addEventListener(
        "mousedown",
        function (e) {
          drawing = true;
          lastPos = getMousePos(canvas, e);
        },
        false
      );

      canvas.addEventListener(
        "mouseup",
        function (e) {
          drawing = false;
        },
        false
      );

      canvas.addEventListener(
        "mousemove",
        function (e) {
          mousePos = getMousePos(canvas, e);
        },
        false
      );

      // Add touch event support for mobile
      canvas.addEventListener("touchstart", function (e) {}, false);

      canvas.addEventListener(
        "touchmove",
        function (e) {
          let touch = e.touches[0];
          let me = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY,
          });
          canvas.dispatchEvent(me);
        },
        false
      );

      canvas.addEventListener(
        "touchstart",
        function (e) {
          mousePos = getTouchPos(canvas, e);
          let touch = e.touches[0];
          let me = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY,
          });
          canvas.dispatchEvent(me);
        },
        false
      );

      canvas.addEventListener(
        "touchend",
        function (e) {
          let me = new MouseEvent("mouseup", {});
          canvas.dispatchEvent(me);
        },
        false
      );

      function getMousePos(canvasDom, mouseEvent) {
        let rect = canvasDom.getBoundingClientRect();
        return {
          x: mouseEvent.clientX - rect.left,
          y: mouseEvent.clientY - rect.top,
        };
      }

      function getTouchPos(canvasDom, touchEvent) {
        let rect = canvasDom.getBoundingClientRect();
        return {
          x: touchEvent.touches[0].clientX - rect.left,
          y: touchEvent.touches[0].clientY - rect.top,
        };
      }

      function renderCanvas() {
        if (drawing) {
          ctx.moveTo(lastPos.x, lastPos.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.stroke();
          lastPos = mousePos;
        }
      }

      // Prevent scrolling when touching the canvas
      document.body.addEventListener(
        "touchstart",
        function (e) {
          if (e.target === canvas) {
            e.preventDefault();
          }
        },
        false
      );
      document.body.addEventListener(
        "touchend",
        function (e) {
          if (e.target === canvas) {
            e.preventDefault();
          }
        },
        false
      );
      document.body.addEventListener(
        "touchmove",
        function (e) {
          if (e.target === canvas) {
            e.preventDefault();
          }
        },
        false
      );

      (function drawLoop() {
        requestAnimFrame(drawLoop);
        renderCanvas();
      })();
    },
    clearCanvas: function () {
      let canvas = this.$refs.canvas;

      canvas.width = canvas.width;
      let ctx = canvas.getContext("2d");
      ctx.lineWidth = 4;
    },
    submitSignature: function () {
      let sigText = this.$refs.dataUrl;
      let sigImage = this.$refs.image;
      let canvas = this.$refs.canvas;

      let dataUrl = canvas.toDataURL();
      sigText.innerHTML = dataUrl;
      sigImage.setAttribute("src", dataUrl);

      this.closeDialog();
    },
    clearSignature: function () {
      let sigText = this.$refs.dataUrl;
      let sigImage = this.$refs.image;

      this.clearCanvas();
      sigText.innerHTML = "Data URL for your signature will go here!";
      sigImage.setAttribute("src", "");

      this.closeDialog();
    },
  },
};
</script>

<style scoped>
#sig-canvas {
  border: 2px solid var(--accent-c-pink-full-visibility);
  box-shadow: 0 0 15px var(--accent-c-pink-low-visibility);

  border-radius: 15px;
  cursor: crosshair;
  background: white;

  margin-top: 10px;
}

.flexDiv {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.flexDiv > * {
  flex: 1 1 0;
}

#sig-image {
  filter: hue-rotate(220deg) saturate(5);
  border: none;
  box-shadow: 0 0 15px var(--accent-c-pink-low-visibility);

  border-radius: 15px;
  cursor: not-allowed;
  background: white;

  width: 320px;
  height: 100px;

  margin-left: 10px;
}

#sig-dataUrl {
  border: none;
  box-shadow: 0 0 15px var(--accent-c-pink-low-visibility);

  border-radius: 15px;
  padding: 10px;
  background: var(--color-background-mute);
  color: var(--color-text);

  width: 320px;
  height: 100px;
}
</style>

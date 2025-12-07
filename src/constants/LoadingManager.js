// src/utils/loadingManager.js
import * as THREE from "three";

// Create the global loading manager
const manager = new THREE.LoadingManager();

let onProgressCallback = () => {};
let onLoadCallback = () => {};

// Utility: ensures loading finishes AFTER first paint
function runAfterFrame(fn) {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn);
  });
}

// Called every time an asset loads (textures, models, images, etc.)
manager.onProgress = (url, loaded, total) => {
  // If nothing uses the manager yet, total = 1 → avoid showing weird %.
  if (total > 1) {
    onProgressCallback(Math.round((loaded / total) * 100));
  }
};

// Called when ALL assets tracked by manager are finished
manager.onLoad = () => {
  // Wait until browser finishes layout + paint
  runAfterFrame(async () => {
    try {
      // FUTURE: Shader compile (Three.js only)
      if (
        window.__THREE_RENDERER__ &&
        window.__THREE_SCENE__ &&
        window.__THREE_CAMERA__ &&
        window.__THREE_RENDERER__.compileAsync
      ) {
        await window.__THREE_RENDERER__.compileAsync(
          window.__THREE_SCENE__,
          window.__THREE_CAMERA__
        );
      }
    } catch (err) {
      console.warn("Shader compile skipped:", err);
    }

    // Trigger final callback
    onLoadCallback();
  });
};

// Allow components to subscribe to progress/load events
export const setOnProgress = (fn) => (onProgressCallback = fn);
export const setOnLoad = (fn) => (onLoadCallback = fn);

/**
 * Manual trigger for NOW when no assets are being loaded.
 * When you add real Three.js loading later, this will not be needed.
 */
export function triggerSoftLoadComplete() {
  onProgressCallback(100);
  runAfterFrame(() => onLoadCallback());
}

export default manager;
